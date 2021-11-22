var content_active = document.getElementById('content-1')
var boton_active = document.getElementById('boton-1')

function clickBoton(b){
    if(content_active!=null){
        content_active.removeAttribute('class')
        content_active = null
        boton_active.removeAttribute('class')
        boton_active = null
    }

    content_active = document.getElementById('content-'+b)
    content_active.className = 'active'
    boton_active = document.getElementById('boton-'+b)
    boton_active.className = 'active'
    resetGame()
}

var piezas_propiedades = [
    {w:118,h:118,c:'g',t:'s'},
    {w:93,h:104,c:'cb',t:'s'},
    {w:44,h:16,c:'db',t:'s'},
    {w:12,h:36,c:'db',t:'s'},
    {w:12,h:36,c:'db',t:'s'},
    {w:28,h:17,c:'cb',t:'s'},
    {w:27,h:128,c:'cb',t:'s'},
    {w:27,h:128,c:'cb',t:'s'},
    {w:22,h:109,c:'cb',t:'s'},
    {w:22,h:109,c:'cb',t:'s'},
    {w:64,h:36,c:'r',t:'s'},
    {w:64,h:36,c:'r',t:'s'},
    {w:43,h:43,c:'y',t:'c'},
    {w:43,h:43,c:'y',t:'c'},
    {w:31,h:31,c:'y',t:'c'},
    {w:31,h:31,c:'y',t:'c'},
    {w:41,h:27,c:'y',t:'s'}
]

var i = 0
var j = 0
var k = 0

function setGame(){
    for(i = 0;i<piezas_propiedades.length;i++){
        var p_data = piezas_propiedades[i]
        var p = document.getElementById('pieza-'+(i+1))
        var p2 = document.getElementById('pieza-seleccionada-'+(i+1))

        p.style.width = p_data.w+'px'
        p.style.height = p_data.h+'px'
        p2.style.width = p_data.w+'px'
        p2.style.height = p_data.h+'px'

        if(p_data.t=='c'){
            p.style.borderRadius = '50%'
            p2.style.borderRadius = '50%'
        }

        switch(p_data.c){
            case 'cb':
            p.style.backgroundColor = '#47A7D3';
            p2.style.backgroundColor = '#47A7D3';
            break;
            case 'db':
            p.style.backgroundColor = '#3E4992';
            p2.style.backgroundColor = '#3E4992';
            break;
            case 'g':
            p.style.backgroundColor = '#349642';
            p2.style.backgroundColor = '#349642';
            break;
            case 'r':
            p.style.backgroundColor = '#C33F33';
            p2.style.backgroundColor = '#C33F33';
            break;
            case 'y':
            p.style.backgroundColor = '#E7E238';
            p2.style.backgroundColor = '#E7E238';
            break;
            default:
            p.style.backgroundColor = '#FFFFFF';
            p2.style.backgroundColor = '#FFFFFF';
            break;
        }

        p.setAttribute('onmousedown','downPieza(event,'+i+')')
        p2.setAttribute('onmousedown','downPieza(event,'+i+')')
    }

}

var pieza_seleccionada = null
var actual_pieza = null


function downPieza(event,p){
    document.getElementById('juego').addEventListener('mousemove',movePieza, true)
    window.addEventListener('mouseup',upPieza, true)

    pieza_seleccionada = document.getElementById('pieza-seleccionada-'+(p+1))
    pieza_seleccionada.className = 'pieza-seleccionada pieza-seleccionada-on pieza-seleccionada-frente'
    actual_pieza = document.getElementById('pieza-'+(p+1))
    actual_pieza.className = 'pieza pieza-off'

    var actualx = event.pageX
    var actualy = event.pageY
    var juego_rect = document.getElementById('juego').getBoundingClientRect()
    
    var l = (actualx-juego_rect.left)-(piezas_propiedades[p].w/2)
    var t = ((actualy-juego_rect.top)-window.scrollY)-(piezas_propiedades[p].h/2)

    pieza_seleccionada.style.left = l+'px'
    pieza_seleccionada.style.top = t+'px'
    pieza_seleccionada.setAttribute('w',piezas_propiedades[p].w)
    pieza_seleccionada.setAttribute('h',piezas_propiedades[p].h)
}

function movePieza(event){
    var actualx = event.pageX
    var actualy = event.pageY
    var juego_rect = document.getElementById('juego').getBoundingClientRect()

    var actualw = Number(pieza_seleccionada.getAttribute('w'))
    var actualh = Number(pieza_seleccionada.getAttribute('h'))

    var l = (actualx-juego_rect.left)-(actualw/2)
    var t = ((actualy-juego_rect.top)-window.scrollY)-(actualh/2)

    pieza_seleccionada.style.left = l+'px'
    pieza_seleccionada.style.top = t+'px'
}

function upPieza(event){
    document.getElementById('juego').removeEventListener('mousemove',movePieza, true)
    window.removeEventListener('mouseup',upPieza, true)

    //pieza_seleccionada.className = 'pieza-seleccionada-off'
    pieza_seleccionada.classList.remove('pieza-seleccionada-frente')

}

function resetGame(){
    document.getElementById('juego').removeEventListener('mousemove',movePieza, true)
    window.removeEventListener('mouseup',upPieza, true)

    for(i = 0;i<piezas_propiedades.length;i++){
        var p = document.getElementById('pieza-'+(i+1))
        var p2 = document.getElementById('pieza-seleccionada-'+(i+1))
        //p.removeAttribute('onmousedown')
        //p.removeAttribute('style')
        p.className = 'pieza'
        //p2.removeAttribute('onmousedown')
        //p2.removeAttribute('style')
        p2.className = 'pieza-seleccionada pieza-seleccionada-off'
    }
}