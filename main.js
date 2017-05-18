
'use strict'

////////////////////////////////////////////////////////////////////////////////
// OBJETOS
//
const info =
{
  centro:{ x:400, y:250 },
  hor:[ 'esq', 'dir' ],
  ver:[ 'cim', 'bai' ],
}

const estado =
{
  esq:0,
  dir:0,
  bola:{x:0,y:0},
  sentido:{ hor:'', ver:'' },
  veloc:4,
}

const chave =
{
  esq:{ cima:false, baixo:false },
  dir:{ cima:false, baixo:false },
}

const html =
{
  arena:document.getElementById( 'arena' ),
  esq:document.getElementById( 'esq' ),
  dir:document.getElementById( 'dir' ),
  bola:document.getElementById( 'bola' ),
  contador:document.getElementById( 'contador' ),

  letra:document.querySelectorAll( '.letra' ),
  numero:document.querySelectorAll( '.numero' ),
}

////////////////////////////////////////////////////////////////////////////////
// FUNÇÕES
//
const movimente = 
{
  //============================================================================
  //
  barras:()=>
  {
    //..........................................................................
    //
    if( chave.esq.cima === true
    && chave.esq.baixo === false )
    {
      if( estado.esq > 0 ){ estado.esq -= 10 }
    }

    else if( chave.esq.cima === false
    && chave.esq.baixo === true )
    {
      if( estado.esq < 500 - 120 ){ estado.esq += 10 }
    }

    //..........................................................................
    //
    if( chave.dir.cima === true
    && chave.dir.baixo === false )
    {
      if( estado.dir > 0 ){ estado.dir -= 10 }
    }

    else if( chave.dir.cima === false
    && chave.dir.baixo === true )
    {
      if( estado.dir < 500 - 120 ){ estado.dir += 10 }
    }
  },

  //============================================================================
  //
  bola:()=>
  {
    //..........................................................................
    //
    if( estado.sentido.hor === 'esq' ){ estado.bola.x -= estado.veloc / 2 }
    else if( estado.sentido.hor === 'dir' ){ estado.bola.x += estado.veloc / 2 }

    if( estado.sentido.ver === 'cim' ){ estado.bola.y -= estado.veloc / 2 }
    else if( estado.sentido.ver === 'bai' ){ estado.bola.y += estado.veloc / 2 }

    //..........................................................................
    //
    if( estado.bola.x < 0 )
    {
      estado.sentido.hor = 'dir'
      gol( 'esq' )
    }

    else if( estado.bola.x > 800 - 30 )
    {
      estado.sentido.hor = 'esq'
      gol( 'dir' )
    }

    if( estado.bola.y < 0 ){ estado.sentido.ver = 'bai' }
    else if( estado.bola.y > 500 - 30 ){ estado.sentido.ver = 'cim' }
  },
}

const botao =( indice, acao )=>
{
  if( acao === 'soltou' )
  {
    html.letra[ indice ].style.boxShadow = '0 5px 5px #005000'
    html.letra[ indice ].style.borderBottom = '4px solid #007000'
    html.letra[ indice ].style.color = '#70D070'
  }

  else if( acao === 'apertou' )
  {
    html.letra[ indice ].style.boxShadow = ''
    html.letra[ indice ].style.borderBottom = ''
    html.letra[ indice ].style.color = '#90F090'
  }
}

const atualize =()=>
{
  html.esq.style.marginTop = String( estado.esq ) + 'px'
  html.dir.style.marginTop = String( estado.dir ) + 'px'

  const valor = 'translate(' + estado.bola.x + 'px,' + estado.bola.y + 'px)'

  html.bola.style.transform = valor
}

const luzes =()=>
{
  //============================================================================
  //
  if( chave.esq.cima === true ){ botao( 0, 'apertou' ) }
  else if( chave.esq.cima === false ){ botao( 0, 'soltou' ) }

  if( chave.esq.baixo === true ){ botao( 1, 'apertou' ) }
  else if( chave.esq.baixo === false ){ botao( 1, 'soltou' ) }

  //============================================================================
  //
  if( chave.dir.cima === true ){ botao( 2, 'apertou' ) }
  else if( chave.dir.cima === false ){ botao( 2, 'soltou' ) }

  if( chave.dir.baixo === true ){ botao( 3, 'apertou' ) }
  else if( chave.dir.baixo === false ){ botao( 3, 'soltou' ) }
}

const gol =( lado )=>
{
  if( lado === 'esq' )
  {
    if( estado.esq - 30 < estado.bola.y && estado.esq + 120 > estado.bola.y )
    {
      estado.veloc += 1
    }
    else
    {
      const numero = Number( html.numero[ 1 ].innerHTML ) + 1
      html.numero[ 1 ].innerHTML = String( numero )
      motor.ligue()
    }
  }

  else if( lado === 'dir')
  {
    if( estado.dir - 30 < estado.bola.y && estado.dir + 120 > estado.bola.y )
    {
      estado.veloc += 1
    }
    else
    {
      const numero = Number( html.numero[ 0 ].innerHTML ) + 1
      html.numero[ 0 ].innerHTML = String( numero )
      motor.ligue()
    }
  }
}

////////////////////////////////////////////////////////////////////////////////
// CONTROLE
//
const comando =
{
  //============================================================================
  //
  apertou:( tecla )=>
  {
    if( tecla.key === 'e' ){ chave.esq.cima = true }
    else if( tecla.key === 'd' ){ chave.esq.baixo = true }

    if(tecla.key === ';' ){ chave.dir.cima = true }
    else if(tecla.key === '.' ){ chave.dir.baixo = true }
  },

  //============================================================================
  //
  soltou:( tecla )=>
  {
    if( tecla.key === 'e' ){ chave.esq.cima = false }
    else if( tecla.key === 'd' ){ chave.esq.baixo = false }

    if( tecla.key === ';' ){ chave.dir.cima = false }
    else if( tecla.key === '.' ){ chave.dir.baixo = false }
  },
}

const controle =
{
  apertou:addEventListener( 'keydown', comando.apertou, false ),
  soltou:addEventListener( 'keyup', comando.soltou, false ),
}

////////////////////////////////////////////////////////////////////////////////
// MOTOR
//
const motor =
{
  //============================================================================
  //
  ligue:()=>
  {
    estado.veloc = 4
    estado.sentido = { hor:'', ver:'' }
    html.contador.style.display = 'flex'
    html.contador.innerHTML = '3'

    const contagem = setInterval( ()=>
    {
      const valor = Number( html.contador.innerHTML )

      if( valor > 0 )
      {
        html.contador.innerHTML = String( valor - 1 )

        if( valor === 1 )
        {
          estado.sentido.hor = info.hor[ Math.floor( Math.random() * 2 ) ]
          estado.sentido.ver = info.ver[ Math.floor( Math.random() * 2 ) ]
        }
      }

      else if( valor === 0 )
      {
        html.contador.style.display = 'none'
        clearInterval( contagem )
      }
    },
    1000 )

    estado.bola.x = info.centro.x - 15
    estado.bola.y = info.centro.y - 15

    const esq = html.numero[0].innerHTML === '0'
    const dir = html.numero[1].innerHTML === '0'

    if( esq && dir ){ estado.esq = estado.dir = info.centro.y - 60 }
  },

  //============================================================================
  //
  rode:()=>
  {
    movimente.barras()
    movimente.bola()
    luzes()
    atualize()
    window.requestAnimationFrame( motor.rode )
  },
}

motor.ligue()
motor.rode()