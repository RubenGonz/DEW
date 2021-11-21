/**
 * Guardamos los objetos del DOM
 */
const DOM = {
    body: document.getElementsByTagName("body")[0],
    canvas: document.getElementById("canvas")
}

/**
 * Ajustamos algunos valores para ver el canvas
 * en pantalla completa
 */
DOM.body.style.margin = 0;
DOM.body.style.overflow = "hidden";
DOM.canvas.style.backgroundColor = "black";
DOM.canvas.setAttribute("width", window.innerWidth);
DOM.canvas.setAttribute("height", window.innerHeight);
let ctx = DOM.canvas.getContext("2d");

/**
 * Constante que devuelve un numero random
 * 
 * @param number numero más chiquito posible 
 * @param number numero más alto posible  
 * @returns numero random entre los dos limites
 */
const numRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
}

/**
 * Clase bola donde guardaremos la informacion de las bolas
 * del canvas
 */
class bola {
    /**
     * Constructor por defecto de bola que 
     * asigan parametros aleatorios
     */
    constructor() {
        this.color = "rgb(" + numRandom(0, 255) + "," + numRandom(0, 255) + "," + numRandom(0, 255) + ")";
        this.tamanio = numRandom(10, 20);
        this.coordenadaX = numRandom(this.tamanio, window.innerWidth - this.tamanio);
        this.coordenadaY = numRandom(this.tamanio, window.innerHeight - this.tamanio);
        this.velX = numRandom(-10, 10);
        this.velY = numRandom(-10, 10);
    }

    /**
     * Metodo que dibuja la esfera en el canvas
     */
    draw() {
        ctx.beginPath();
        ctx.arc(this.coordenadaX, this.coordenadaY, this.tamanio, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    /**
     * Metodo que mueve la bola tras comprobar si 
     * se ha chocado contra algo y si es asi 
     * la cambia de color
     */
    update() {
        if ((this.coordenadaX + this.tamanio) >= window.innerWidth) {
            this.color = "rgb(" + numRandom(0, 255) + "," + numRandom(0, 255) + "," + numRandom(0, 255) + ")";
            this.velX = -(this.velX);
        }
        if ((this.coordenadaX - this.tamanio) <= 0) {
            this.color = "rgb(" + numRandom(0, 255) + "," + numRandom(0, 255) + "," + numRandom(0, 255) + ")";
            this.velX = -(this.velX);
        }
        if ((this.coordenadaY + this.tamanio) >= window.innerHeight) {
            this.color = "rgb(" + numRandom(0, 255) + "," + numRandom(0, 255) + "," + numRandom(0, 255) + ")";
            this.velY = -(this.velY);
        }
        if ((this.coordenadaY - this.tamanio) <= 0) {
            this.color = "rgb(" + numRandom(0, 255) + "," + numRandom(0, 255) + "," + numRandom(0, 255) + ")";
            this.velY = -(this.velY);
        }

        bolas.forEach(bola => {
            if (!(bola === this)) {
                let separacionAncho = this.coordenadaX - bola.coordenadaX;
                let separacionAlto = this.coordenadaY - bola.coordenadaY;
                let separacionMinima = Math.sqrt(separacionAncho * separacionAncho + separacionAlto * separacionAlto);

                if (separacionMinima < (this.tamanio + bola.tamanio)) {
                    this.color = "rgb(" + numRandom(0, 255) + "," + numRandom(0, 255) + "," + numRandom(0, 255) + ")";
                    this.velX = -(this.velX);
                    this.velY = -(this.velY);
                }
            }
        });

        this.coordenadaX += this.velX;
        this.coordenadaY += this.velY;
    }
}

/**
 * Creamos un array con todas las bolas
 */
let bolas = [];

/**
 * Constante que crea tantas bolas como le pidamos
 * @param number numero de bolas a crear 
 */
const generarBolas = (numeroBolas) => {
    for (let i = 0; i < numeroBolas; i++) {
        bolas.push(new bola());
    }
}

/**
 * Constante que crea el efecto de movimiento en la 
 * pantalla
 */
const animar = () => {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    bolas.forEach(bola => {
        bola.update();
        bola.draw();
    });
    requestAnimationFrame(animar);
}

/**
 * Al cargar la ventana se generaran las bolas y 
 * se animara
 */
window.onload = () => {
    generarBolas(25);
    animar();
}

/**
 * Si la pantalla se cambia de tamanio se ajustará el
 * canvas a la nueva dimension
 */
window.onresize = () => {
    DOM.canvas.setAttribute("width", window.innerWidth);
    DOM.canvas.setAttribute("height", window.innerHeight);
}

/**
 * Constante que cambia la velocidad 
 * de las bolas de la pantalla
 */
addEventListener("keydown", (tecla) => {
    if (tecla.key == "ArrowUp") {
        bolas.forEach(bola => {
            if (bola.velX > 0 && bola.velX != 10) bola.velX = bola.velX + 1;
            if (bola.velX < 0 && bola.velX != -10) bola.velX = bola.velX - 1;
            if (bola.velY > 0 && bola.velY != 10) bola.velY = bola.velY + 1;
            if (bola.velY < 0 && bola.velY != -10) bola.velY = bola.velY - 1;
        });
    }
    if (tecla.key == "ArrowDown") {
        bolas.forEach(bola => {
            if (bola.velX > 0 && (bola.velX - 1) != 0) bola.velX = bola.velX - 1;
            if (bola.velX < 0 && (bola.velX + 1) != 0) bola.velX = bola.velX + 1;
            if (bola.velY > 0 && (bola.velY - 1) != 0) bola.velY = bola.velY - 1;
            if (bola.velY < 0 && (bola.velY + 1) != 0) bola.velY = bola.velY + 1;
        });
    }
})
