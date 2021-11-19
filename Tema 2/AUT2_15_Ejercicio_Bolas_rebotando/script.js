const DOM = {
    body: document.getElementsByTagName("body")[0],
    canvas: document.getElementById("canvas")
}

DOM.body.style.margin = 0;
DOM.body.style.overflow = "hidden";
DOM.canvas.style.backgroundColor = "black";
DOM.canvas.setAttribute("width", window.innerWidth);
DOM.canvas.setAttribute("height", window.innerHeight);

window.onresize = () => {
    DOM.canvas.setAttribute("width", window.innerWidth);
    DOM.canvas.setAttribute("height", window.innerHeight);
}

const numRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
}

class bola {
    constructor() {
        this.coordenadaX = numRandom(20, window.innerWidth);
        this.coordenadaY = numRandom(20, window.innerHeight);
        this.velX = numRandom(-10, 10);
        this.velY = numRandom(-10, 10);
        this.color = "rgb(" + numRandom(0, 255) + "," + numRandom(0, 255) + "," + numRandom(0, 255) + ")";
        this.tamanio = numRandom(10, 20);
    }
}

function mover() {
    if (bola.co == window.innerWidth) {
       
        



    } else if (direcion == "abajo") {
        if (bola.coordenadaY > 0) {
            bola.coordenadaY = bola.coordenadaY - bola.velY;
        }
    }
    return mostrarPosicion();
}