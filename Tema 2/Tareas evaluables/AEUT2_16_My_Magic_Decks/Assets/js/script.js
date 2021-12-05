const DOM = {
    seleccionMazo: document.getElementById("seleccionMazo"),
    mazo: document.getElementById("mazo"),
    seleccionIdioma: document.getElementById("seleccionIdioma"),
    idiomas: document.getElementById("idiomas"),
    seleccionCualidad: document.getElementById("seleccionCualidad"),
    cualidad: document.getElementById("cualidad"),
    seleccionOrden: document.getElementById("seleccionOrden"),
    orden: document.getElementById("orden"),
    cartas: document.getElementById("cartas"),
    bodySeleccionadas: document.getElementById("bodySeleccionadas"),
    footerSeleccionadas: document.getElementById("footerSeleccionadas")
}

const apisBasicas = {
    "Welcome Deck 2016": "https://api.scryfall.com/cards/search?order=set&q=e%3Aw16&unique=prints",
    "Ugin's Fate": "https://api.scryfall.com/cards/search?order=set&q=e%3Augin&unique=prints",
    "Welcome Deck 2017": "https://api.scryfall.com/cards/search?order=set&q=e%3Aw17&unique=prints",
    "Zendikar Rising Expeditions": "https://api.scryfall.com/cards/search?order=set&q=e%3Azne&unique=prints",
    "Introductory Two-Player": "https://api.scryfall.com/cards/search?order=set&q=e%3Aitp&unique=prints"
}

class carta {
    constructor(info) {
        this.info = info;
        this.cantidad = 1;
        this.importeTotal = 0;
        this.calcularImporte();
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

const traducirApi = (api, idioma = "en") => {
    let seccionIdioma = api.indexOf("e%");
    return api.substr(0, seccionIdioma) + "lang%3A" + idioma + "+" + api.substr(seccionIdioma);
}

async function recibirCartas(apis = [], idioma) {
    let apisFinales = [];
    if (apis == ["Todos"]) {
        Object.values(apisBasicas).forEach(api => {
            apisFinales.push(traducirApi(api, idioma));
        })
    } else {
        apisFinales.push(traducirApi(apis[0], idioma));
    }
    let cartasFinales = [];
    for (let api of apisFinales) {
        let respuesta = await fetch(api);
        let cartasApi = await respuesta.json();
        for (let cartaApi of cartasApi.data) {
            let nombreCarta;
            let descripcionCarta;
            let tipoCarta;
            if (idioma == "en" || idioma == undefined) {
                nombreCarta = cartaApi.name;
                descripcionCarta = cartaApi.oracle_text;
                tipoCarta = cartaApi.type_line;
            } else {
                nombreCarta = cartaApi.printed_name;
                descripcionCarta = cartaApi.printed_text;
                tipoCarta = cartaApi.printed_type_line;
            }
            let info = {
                id: cartaApi.id,
                nombre: nombreCarta,
                descripcion: descripcionCarta,
                precio: cartaApi.prices.eur,
                baraja: cartaApi.set_name,
                colorIdentificador: cartaApi.color_identity,
                tipo: tipoCarta,
                mana: cartaApi.cmc,
                imagen: cartaApi.image_uris.png
            }
            if (cartaApi.type_line.toLowerCase().includes("creature")) {
                info.fuerza = cartaApi.power;
                info.resistencia = cartaApi.toughness;
            }
            cartasFinales.push(new carta(info));
        }
    }
    return new mazo(cartasFinales);
}

const ordenarMazo = (mazoIntroducido, cualidad = "nombre", orden = "asc") => {
    let cartasOrdenadas = mazoIntroducido.cartas.sort(function (a, b) {
        if (typeof cualidad == "string") {
            return (eliminarAcentos(b.info[cualidad]) < eliminarAcentos(a.info[cualidad]));
        } else {
            return (b.info[cualidad] - a.info[cualidad]);
        }
    })
    if (orden == "desc") cartasOrdenadas = cartasOrdenadas.reverse();
    return new mazo(cartasOrdenadas);
}

const eliminarAcentos = (texto) => {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
}

const recibirMazoApi = (apis, idioma) => {
    recibirCartas(apis, idioma).then(mazo => {
        mazoMostrado = mazo;
        mostrarMazo(mazo, leerCookie("Cualidad"), leerCookie("Orden"));
    }).catch(error => {
        console.log("Hubo un error: " + error)
    })
}

const mostrarMazo = (mazo, cualidad, orden) => {
    if (DOM.cartas.innerHTML != "") DOM.cartas.innerHTML = "";
    let mazoOrdenado = ordenarMazo(mazo, cualidad, orden);
    crearCartas(mazoOrdenado.cartas);
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

const buscarConjunto = (idCarta) => {
    let cartaElegida = buscarCarta("id", idCarta);
    conjuntoBuscado = null;

    cartasElegidas.cartas.forEach(carta => {
        if (carta == cartaElegida) {
            conjuntoBuscado = carta;
        }
    })
    return conjuntoBuscado;
}

const agregarCarta = (idCarta) => {
    let conjuntoElegido = buscarConjunto(idCarta);
    if (conjuntoElegido != null) {
        if (conjuntoElegido.cantidad < 4) {
            conjuntoElegido.cantidad = conjuntoElegido.cantidad + 1;
            conjuntoElegido.calcularImporte();
            cartasElegidas.calcularCantidad();
            cartasElegidas.calcularImporte();
            modificarSelecionadas(conjuntoElegido);
            modificarFooter();
        }
    } else {
        let conjuntoCartas = buscarCarta("id", idCarta);
        cartasElegidas.cartas.push(conjuntoCartas);
        cartasElegidas.calcularCantidad();
        cartasElegidas.calcularImporte();
        modificarSelecionadas(conjuntoCartas);
        modificarFooter();
    }
}

const quitarCarta = (idCarta) => {
    let conjuntoElegido = buscarConjunto(idCarta);
    conjuntoElegido.cantidad = conjuntoElegido.cantidad - 1;
    conjuntoElegido.calcularImporte();
    cartasElegidas.calcularCantidad();
    cartasElegidas.calcularImporte();
    modificarSelecionadas(conjuntoElegido);
    modificarFooter();
    if (conjuntoElegido.cantidad == 0) {
        let indice = cartasElegidas.cartas.indexOf(conjuntoElegido);
        cartasElegidas.cartas.splice(indice, 1);
    }
}

const modificarSelecionadas = (conjuntoCartas) => {

    let trExistente = document.getElementsByName(conjuntoCartas.info.id)[0];
    if (trExistente != null) trExistente.remove();
    if (conjuntoCartas.cantidad == 0) {
        trExistente.remove();
    } else {
        const fragment = document.createDocumentFragment();
        const template = document.getElementById("cartaColumna").content;

        template.querySelectorAll("tr")[0].setAttribute("name", conjuntoCartas.info.id);
        template.querySelectorAll("td")[0].textContent = conjuntoCartas.info.nombre;
        template.querySelectorAll("td")[1].textContent = conjuntoCartas.info.precio + " €";
        template.querySelectorAll("td")[2].textContent = conjuntoCartas.cantidad;
        template.querySelectorAll("td")[4].textContent = conjuntoCartas.importeTotal + " €";

        const clone = template.cloneNode(true);
        fragment.appendChild(clone);
        DOM.bodySeleccionadas.appendChild(fragment);
    }
}

const modificarFooter = () => {
    if (DOM.footerSeleccionadas.innerHTML != "") DOM.footerSeleccionadas.innerHTML = "";
    const fragment = document.createDocumentFragment();
    let template;

    if (cartasElegidas.cartas.length == 0) {
        template = document.getElementById("footerVacio").content;
    } else {
        template = document.getElementById("footerLLeno").content;
        template.querySelectorAll("td")[1].textContent = cartasElegidas.cartasTotales;
        template.querySelectorAll("td")[3].textContent = cartasElegidas.importeMazo + " €";
    }
    const clone = template.cloneNode(true);
    fragment.appendChild(clone);
    DOM.footerSeleccionadas.appendChild(fragment);
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

DOM.bodySeleccionadas.addEventListener("click", (e) => {
    if (e.target.name == "sumarCarta") {
        agregarCarta(e.target.closest("tr").getAttribute("name"));
    }
    if (e.target.name == "restarCarta") {
        quitarCarta(e.target.closest("tr").getAttribute("name"));
    }
});

DOM.cartas.addEventListener("click", (e) => {
    if (e.target.id != "cartas") {
        agregarCarta(e.target.closest(".carta").id);
    }
});

DOM.mazo.addEventListener("click", (e) => {
    crearCookie("Mazo", e.target.id);
    DOM.seleccionMazo.innerHTML = e.target.innerHTML;
    recibirMazoApi();
});

DOM.idiomas.addEventListener("click", (e) => {
    crearCookie("Idioma", e.target.id);
    DOM.seleccionIdioma.innerHTML = e.target.innerHTML;
    recibirMazoApi([apisBasicas[leerCookie("Mazo")]], leerCookie("Idioma"));
    cartasElegidas = new mazo([]);
    DOM.bodySeleccionadas.innerHTML = "";
    modificarFooter();
});

DOM.cualidad.addEventListener("click", (e) => {
    crearCookie("Cualidad", e.target.id);
    DOM.seleccionCualidad.innerHTML = e.target.innerHTML;
    recibirMazoApi([apisBasicas[leerCookie("Mazo")]], leerCookie("Idioma"));
});

DOM.orden.addEventListener("click", (e) => {
    crearCookie("Orden", e.target.id);
    DOM.seleccionOrden.innerHTML = e.target.innerHTML;
    recibirMazoApi([apisBasicas[leerCookie("Mazo")]], leerCookie("Idioma"));
});

window.onload = () => {
    if (!comprobarCookie("Mazo")) crearCookie("Mazo", "Welcome Deck 2016");
    if (!comprobarCookie("Idioma")) crearCookie("Idioma", "es");
    if (!comprobarCookie("Cualidad")) crearCookie("Cualidad", "nombre");
    if (!comprobarCookie("Orden")) crearCookie("Orden", "asc");
    DOM.seleccionMazo.innerHTML = document.getElementById(leerCookie("Mazo")).innerHTML;
    DOM.seleccionIdioma.innerHTML = document.getElementById(leerCookie("Idioma")).innerHTML;
    DOM.seleccionCualidad.innerHTML = document.getElementById(leerCookie("Cualidad")).innerHTML;
    DOM.seleccionOrden.innerHTML = document.getElementById(leerCookie("Orden")).innerHTML;
    recibirMazoApi([apisBasicas[leerCookie("Mazo")]], leerCookie("Idioma"));
    modificarFooter();
}

let mazoMostrado = new mazo([]);
let cartasElegidas = new mazo([]);