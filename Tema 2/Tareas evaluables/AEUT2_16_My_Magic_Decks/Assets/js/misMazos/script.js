const DOM = {
    seleccionMazo: document.getElementById("seleccionMazo"),
    mazo: document.getElementById("mazo"),
    seleccionCualidad: document.getElementById("seleccionCualidad"),
    cualidad: document.getElementById("cualidad"),
    seleccionOrden: document.getElementById("seleccionOrden"),
    orden: document.getElementById("orden"),
    cartas: document.getElementById("cartas"),
    inputBuscador: document.getElementById("inputBuscador"),
    listaOpciones: document.getElementById("listaOpciones"),
    botonBuscador: document.getElementById("botonBuscador"),
    borrarMazo: document.getElementById("borrarMazo")
}

class carta {
    constructor(info) {
        this.info = this.intretarInfo(info);
        this.cantidad = 1;
        this.importeTotal = 0;
        this.calcularImporte();
    }

    intretarInfo(info) {
        let infoConvertida = info;
        if (infoConvertida.colores.length != 0) {
            for (let i = 0; i < infoConvertida.colores.length; i++) {
                if (infoConvertida.colores[i] == "W") infoConvertida.colores[i] = "White";
                if (infoConvertida.colores[i] == "U") infoConvertida.colores[i] = "Blue";
                if (infoConvertida.colores[i] == "B") infoConvertida.colores[i] = "Black";
                if (infoConvertida.colores[i] == "R") infoConvertida.colores[i] = "Red";
                if (infoConvertida.colores[i] == "G") infoConvertida.colores[i] = "Green";
            }
        } else {
            infoConvertida.colores = "Carta incolora"
        }
        infoConvertida.colores = infoConvertida.colores.toString().replace(",", ", ");

        infoConvertida.precio = parseFloat(infoConvertida.precio);
        if (infoConvertida.fuerza != null) infoConvertida.fuerza = parseFloat(infoConvertida.fuerza);
        if (infoConvertida.resistencia != null) infoConvertida.resistencia = parseFloat(infoConvertida.resistencia);

        return infoConvertida;
    }

    calcularImporte() {
        this.importeTotal = parseFloat((this.info.precio * this.cantidad).toFixed(2));
    }
}

class mazo {
    constructor(cartas) {
        this.cartas = cartas;
        this.cartasTotales = 0;
        this.calcularCantidad();
        this.importeMazo = 0;
        this.calcularImporte();
    }

    calcularCantidad() {
        let contadorCantidad = 0;
        this.cartas.forEach(carta => {
            contadorCantidad = contadorCantidad + carta.cantidad;
        })
        this.cartasTotales = contadorCantidad;
    }

    calcularImporte() {
        let contadorImporte = 0;
        this.cartas.forEach(carta => {
            contadorImporte = contadorImporte + carta.importeTotal;
        })
        this.importeMazo = parseFloat(contadorImporte.toFixed(2));
    }
}

const ordenarMazo = (mazoIntroducido, cualidad = "nombre", orden = "asc") => {
    let cartasOrdenadas;
    if (cualidad != "fuerza" && cualidad != "resistencia") {
        cartasOrdenadas = mazoIntroducido.cartas.sort(function (a, b) {
            if (typeof a.info[cualidad] == "string") {
                return (eliminarAcentos(b.info[cualidad]) < eliminarAcentos(a.info[cualidad]));
            } else {
                return (a.info[cualidad] - b.info[cualidad]);
            }
        })
    }
    if (orden == "desc") cartasOrdenadas = cartasOrdenadas.reverse();
    return new mazo(cartasOrdenadas);
}

const eliminarAcentos = (texto) => {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
}

const mostrarMazo = (mazo, cualidad, orden) => {
    if (DOM.cartas.innerHTML != "") DOM.cartas.innerHTML = "";
    let mazoOrdenado = ordenarMazo(mazo, cualidad, orden);
    mazoMostrado = mazoOrdenado;
    crearCartas(mazoOrdenado.cartas);
}

const buscarCarta = (cualidad, valor) => {
    let encontrada = false;
    let i = 0;
    let carta = null;
    do {
        if (mazoMostrado.cartas[i].info[cualidad] == valor) {
            encontrada == true;
            carta = mazoMostrado.cartas[i];
        }
        i++;
    } while (encontrada == false && i < mazoMostrado.cartas.length);
    return carta;
}

const eliminarModal = () => {
    modalInfo.hide();
    if (document.getElementById('staticBackdrop') != null) {
        document.getElementById('staticBackdrop').remove();
    }
}

function crearCartas(cartas) {
    const fragment = document.createDocumentFragment();
    const template = document.getElementById("cartaApi").content;

    cartas.forEach(carta => {
        template.querySelectorAll("div")[0].id = carta.info.id;
        template.querySelectorAll("img")[0].src = carta.info.imagen;
        template.querySelectorAll("img")[0].alt = carta.info.nombre;
        template.querySelectorAll("h5")[0].textContent = carta.info.nombre;
        if (carta.info.precio == null) {
            template.querySelectorAll("p")[0].textContent = "No hay precio disponible";
        } else {
            template.querySelectorAll("p")[0].textContent = carta.info.precio + " €";
        }

        const clone = template.cloneNode(true);
        fragment.appendChild(clone);
    });
    DOM.cartas.appendChild(fragment);
}

const mostrarInfo = (idCarta) => {
    let carta = buscarCarta("id", idCarta);
    const fragment = document.createDocumentFragment();
    const template = document.getElementById("infoCarta").content;

    template.querySelectorAll("h5")[0].textContent = carta.info.nombre;
    template.querySelectorAll("img")[0].src = carta.info.imagen;
    template.querySelectorAll("img")[0].alt = carta.info.nombre;
    template.querySelectorAll("p")[1].textContent = carta.info.descripcion;
    template.querySelectorAll("p")[3].textContent = carta.info.precio + " €";
    template.querySelectorAll("p")[5].textContent = carta.info.baraja;
    template.querySelectorAll("p")[7].textContent = carta.info.colores;
    template.querySelectorAll("p")[9].textContent = carta.info.tipo;
    template.querySelectorAll("p")[11].textContent = carta.info.mana;
    if (carta.info.fuerza != undefined) {
        if (template.querySelectorAll("li")[6].classList.contains("d-none")) template.querySelectorAll("li")[6].classList.remove("d-none");
        template.querySelectorAll("p")[13].textContent = carta.info.fuerza;
    } else {
        if (!template.querySelectorAll("li")[6].classList.contains("d-none")) template.querySelectorAll("li")[6].classList.add("d-none");
    }
    if (carta.info.resistencia != undefined) {
        if (template.querySelectorAll("li")[7].classList.contains("d-none")) template.querySelectorAll("li")[7].classList.remove("d-none");
        template.querySelectorAll("p")[15].textContent = carta.info.resistencia;
    } else {
        if (!template.querySelectorAll("li")[7].classList.contains("d-none")) template.querySelectorAll("li")[7].classList.add("d-none");
    }

    template.querySelectorAll("button")[0].setAttribute("onclick", "eliminarModal()");
    const clone = template.cloneNode(true);
    fragment.appendChild(clone);

    if (document.getElementById('staticBackdrop') == null) {
        document.body.appendChild(fragment);
    } else {
        document.getElementById('staticBackdrop').remove();
        document.body.appendChild(fragment);
    }

    modalInfo = new bootstrap.Modal(document.getElementById('staticBackdrop'), "static")
    modalInfo.show();
}

const generarOpciones = (mazo = mazoMostrado) => {
    if (DOM.listaOpciones.innerHTML != "") DOM.listaOpciones.innerHTML = "";

    const fragment = document.createDocumentFragment();
    const template = document.getElementById("plantillaOpciones").content;

    mazo.cartas.forEach(carta => {
        template.querySelectorAll("option")[0].value = carta.info.nombre;
        const clone = template.cloneNode(true);
        fragment.appendChild(clone);
    });
    DOM.listaOpciones.appendChild(fragment);
}

const obtenerMazosCreados = () => {
    return JSON.parse(almacenamientoLocal.getItem("Mazos hechos"))
}

const añadirMazoCreado = (nuevoMazo) => {
    let mazosActuales = obtenerMazosCreados();
    mazosActuales.push(nuevoMazo);
    almacenamientoLocal.setItem("Mazos hechos", JSON.stringify(mazosActuales));
}

const generarMazosCreados = () => {
    if (DOM.mazo.innerHTML != "") DOM.mazo.innerHTML = "";

    const fragment = document.createDocumentFragment();
    const template = document.getElementById("plantillaMazos").content;
    obtenerMazosCreados().forEach(mazoCreado => {
        template.querySelectorAll("button")[0].id = mazoCreado.nombre;
        template.querySelectorAll("button")[0].innerHTML = mazoCreado.nombre;
        const clone = template.cloneNode(true);
        fragment.appendChild(clone);
    });
    DOM.mazo.appendChild(fragment);
}

const buscarMazo = (nombreMazo) => {
    let mazoEncontrado = null;
    obtenerMazosCreados().forEach(mazoCreado => {
        if (mazoCreado.nombre == nombreMazo) mazoEncontrado = mazoCreado;
    })
    return mazoEncontrado;
}

const borrarMazo = (nombreMazo) => {
    let mazosActuales = obtenerMazosCreados();
    let mazoBuscado = buscarMazo(nombreMazo);
    let indice;
    for (let i = 0; i < mazosActuales.length; i++) {
        if (mazosActuales[i].nombre == mazoBuscado.nombre) indice = i;
    }
    mazosActuales.splice(indice, 1);
    almacenamientoLocal.setItem("Mazos hechos", JSON.stringify(mazosActuales));
}

const crearCookie = (clave, valor, expedicion = "365") => {
    let date = new Date();
    date.setTime(date.getTime() + (expedicion * 24 * 60 * 60 * 1000));
    document.cookie = clave + "=" + valor + "; expires=" + date.toGMTString();
}

const comprobarCookie = (clave) => {
    let cookies = document.cookie.split("; ");
    let encontrada = false;
    cookies.forEach(cookie => { if (cookie.split("=")[0] == clave) encontrada = true; });
    return encontrada;
}

const leerCookie = (claveIntroducida) => {
    if (comprobarCookie(claveIntroducida)) {
        let cookies = document.cookie.split("; ");
        let valorCookie;
        cookies.forEach(cookie => {
            let clave = cookie.split("=")[0];
            let valor = cookie.split("=")[1];
            if (claveIntroducida == clave) valorCookie = valor;
        });
        return valorCookie;
    }
}

DOM.mazo.addEventListener("click", (e) => {
    DOM.seleccionMazo.innerHTML = e.target.innerHTML;
    if (obtenerMazosCreados().length != 0) {
        mostrarMazo(buscarMazo(DOM.seleccionMazo.innerHTML), leerCookie("Cualidad"), leerCookie("Orden"));
        generarOpciones();
    }
});

DOM.cualidad.addEventListener("click", (e) => {
    crearCookie("Cualidad", e.target.id);
    DOM.seleccionCualidad.innerHTML = e.target.innerHTML;
    if (obtenerMazosCreados().length != 0) mostrarMazo(buscarMazo(DOM.seleccionMazo.innerHTML), leerCookie("Cualidad"), leerCookie("Orden"));
});

DOM.orden.addEventListener("click", (e) => {
    crearCookie("Orden", e.target.id);
    DOM.seleccionOrden.innerHTML = e.target.innerHTML;
    if (obtenerMazosCreados().length != 0) mostrarMazo(buscarMazo(DOM.seleccionMazo.innerHTML), leerCookie("Cualidad"), leerCookie("Orden"));
});

DOM.inputBuscador.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
        let cartaBuscada = buscarCarta("nombre", DOM.inputBuscador.value);
        if (cartaBuscada != null) {
            mostrarInfo(cartaBuscada.info.id);
            DOM.inputBuscador.value = "";
        } else {
            DOM.inputBuscador.value = "Carta no encontrada";
        }
    }
});

DOM.botonBuscador.addEventListener("click", () => {
    let cartaBuscada = buscarCarta("nombre", DOM.inputBuscador.value);
    if (cartaBuscada != null) {
        mostrarInfo(cartaBuscada.info.id);
        DOM.inputBuscador.value = "";
    } else {
        DOM.inputBuscador.value = "Carta no encontrada";
    }
});

DOM.cartas.addEventListener("click", (e) => {
    if (e.target.name == "botonInfo") {
        mostrarInfo(e.target.closest(".carta").id);
    }
});

DOM.borrarMazo.addEventListener("click", () => {
    if (obtenerMazosCreados().length != 0) {
        borrarMazo(DOM.seleccionMazo.innerHTML);
        document.getElementById(DOM.seleccionMazo.innerHTML).remove();
        if (obtenerMazosCreados().length != 0) {
            if (DOM.borrarMazo.classList.contains("disabled")) DOM.borrarMazo.classList.remove("disabled");
            DOM.seleccionMazo.innerHTML = obtenerMazosCreados()[0].nombre;
            mostrarMazo(obtenerMazosCreados()[0], leerCookie("Cualidad"), leerCookie("Orden"));
            generarOpciones();
        } else {
            if (!DOM.borrarMazo.classList.contains("disabled")) DOM.borrarMazo.classList.add("disabled");
            DOM.seleccionMazo.innerHTML = "No tienes ningún mazo creado";
            DOM.cartas.innerHTML = "<h1>No tienes ningún mazo creado</h1>";
            DOM.listaOpciones.innerHTML = "";
        }
    } else {
        if (!DOM.borrarMazo.classList.contains("disabled")) DOM.borrarMazo.classList.add("disabled");
    }
});

window.onload = () => {
    if (!comprobarCookie("Cualidad")) crearCookie("Cualidad", "nombre");
    if (!comprobarCookie("Orden")) crearCookie("Orden", "asc");
    DOM.seleccionCualidad.innerHTML = document.getElementById(leerCookie("Cualidad")).innerHTML;
    DOM.seleccionOrden.innerHTML = document.getElementById(leerCookie("Orden")).innerHTML;
    if (obtenerMazosCreados().length != 0) {
        DOM.seleccionMazo.innerHTML = obtenerMazosCreados()[0].nombre;
        generarMazosCreados();
        mostrarMazo(obtenerMazosCreados()[0], leerCookie("Cualidad"), leerCookie("Orden"));
        generarOpciones();
    } else {
        DOM.borrarMazo.classList.add("disabled");
    }
}

let mazoMostrado = new mazo([]);
let modalInfo;
let almacenamientoLocal = window.localStorage;
