const DOM = {
    cartas: document.getElementById("cartas"),
    seleccionIdioma: document.getElementById("seleccionIdioma"),
    idiomas: document.getElementById("idiomas"),
    seleccionCualidad: document.getElementById("seleccionCualidad"),
    cualidad: document.getElementById("cualidad"),
    seleccionOrden: document.getElementById("seleccionOrden"),
    orden: document.getElementById("orden")
}

const apisBasicas = ["https://api.scryfall.com/cards/search?order=set&q=e%3Aitp&unique=prints",
    "https://api.scryfall.com/cards/search?order=set&q=e%3Azne&unique=prints",
    "https://api.scryfall.com/cards/search?order=set&q=e%3Aw17&unique=prints",
    "https://api.scryfall.com/cards/search?order=set&q=e%3Aw16&unique=prints",
    "https://api.scryfall.com/cards/search?order=set&q=e%3Augin&unique=prints"];

class cartaNormal {
    constructor(id, nombre, precio, baraja, colorIdentificador, tipo, mana, imagen) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.baraja = baraja;
        this.colorIdentificador = colorIdentificador;
        this.tipo = tipo;
        this.mana = mana;
        this.imagen = imagen;
    }
}

class cartaCriatura extends cartaNormal {
    constructor(id, nombre, precio, baraja, colorIdentificador, tipo, mana, imagen, fuerza, resistencia) {
        super(id, nombre, precio, baraja, colorIdentificador, tipo, mana, imagen);
        this.fuerza = fuerza;
        this.resistencia = resistencia;
    }
}

const traducirApi = (idioma = "en") => {
    let apisTraducidas = [];
    apisBasicas.forEach(api => {
        let seccionIdioma = api.indexOf("e%");
        apisTraducidas.push(api.substr(0, seccionIdioma) + "lang%3A" + idioma + "+" + api.substr(seccionIdioma));
    })
    return apisTraducidas;
}

async function recibirCartas(idioma) {
    let cartasFinales = [];
    for (let api of traducirApi(idioma)) {
        let respuesta = await fetch(api);
        let cartasApi = await respuesta.json();
        for (let cartaApi of cartasApi.data) {
            let nombreCarta;
            if (idioma == "en" || idioma == undefined) {
                nombreCarta = cartaApi.name;
            } else {
                nombreCarta = cartaApi.printed_name;
            }
            let cartaFinal;
            if (!cartaApi.type_line.toLowerCase().includes("creature")) {
                cartaFinal = new cartaNormal(cartaApi.id, nombreCarta, cartaApi.prices.eur, cartaApi.set_name, cartaApi.color_identity, cartaApi.type_line, cartaApi.cmc, cartaApi.image_uris.png);
            } else {
                cartaFinal = new cartaCriatura(cartaApi.id, nombreCarta, cartaApi.prices.eur, cartaApi.set_name, cartaApi.color_identity, cartaApi.type_line, cartaApi.cmc, cartaApi.image_uris.png, cartaApi.power, cartaApi.toughness);
            }
            cartasFinales.push(cartaFinal);
        }
    }
    return cartasFinales;
}

const ordenarCartas = (cartas, cualidad = "nombre", orden = "asc") => {
    let cartasOrdenadas = cartas.sort(function (a, b) {
        if (typeof cualidad == "string") {
            return (eliminarAcentos(b[cualidad]) < eliminarAcentos(a[cualidad]));
        } else {
            return (b[cualidad] - a[cualidad]);
        }
    })
    if (orden == "desc") cartasOrdenadas = cartasOrdenadas.reverse();
    return cartasOrdenadas;
}

const eliminarAcentos = (texto) => {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
}

const crearCarta = (carta) => {
    let general = crearElemento("div", "", ["carta"]);

    let imagen = crearElemento("img", "", ["imgCarta"]);
    imagen.setAttribute("src", carta.imagen);
    general.appendChild(imagen);
    general.appendChild(crearElemento("h4", carta.nombre));
    return general;
}

const crearElemento = (etiqueta, contenido = "", clases = []) => {
    let elemento = document.createElement(etiqueta);
    elemento.innerHTML = contenido;
    if (clases.length != 0) {
        clases.forEach(clase => {
            elemento.classList.add(clase);
        })
    }
    return elemento;
}

const mostrarCartas = (idioma = "es", cualidad = "nombre", orden = "asc") => {
    recibirCartas(idioma).then(cartas => {
        if (DOM.cartas.innerHTML != "") DOM.cartas.innerHTML = "";
        let cartasOrdenadas = ordenarCartas(cartas, cualidad, orden);
        cartasOrdenadas.forEach(carta => {
            let contenedor = crearCarta(carta);
            DOM.cartas.appendChild(contenedor);
        });
    }).catch(error => {
        console.log("Hubo un error: " + error)
    })
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

DOM.idiomas.addEventListener("click", (e) => {
    crearCookie("Idioma", e.target.id);
    DOM.seleccionIdioma.innerHTML = e.target.innerHTML;
    mostrarCartas(leerCookie("Idioma"), leerCookie("Cualidad"), leerCookie("Orden"));
});

DOM.cualidad.addEventListener("click", (e) => {
    crearCookie("Cualidad", e.target.id);
    DOM.seleccionCualidad.innerHTML = e.target.innerHTML;
    mostrarCartas(leerCookie("Idioma"), leerCookie("Cualidad"), leerCookie("Orden"));
});

DOM.orden.addEventListener("click", (e) => {
    crearCookie("Orden", e.target.id);
    DOM.seleccionOrden.innerHTML = e.target.innerHTML;
    mostrarCartas(leerCookie("Idioma"), leerCookie("Cualidad"), leerCookie("Orden"));
});

window.onload = () => {
    if (!comprobarCookie("Idioma")) crearCookie("Idioma", "es");
    if (!comprobarCookie("Cualidad")) crearCookie("Cualidad", "nombre");
    if (!comprobarCookie("Orden")) crearCookie("Orden", "asc");
    DOM.seleccionIdioma.innerHTML = document.getElementById(leerCookie("Idioma")).innerHTML;
    DOM.seleccionCualidad.innerHTML = document.getElementById(leerCookie("Cualidad")).innerHTML;;
    DOM.seleccionOrden.innerHTML = document.getElementById(leerCookie("Orden")).innerHTML;;
    mostrarCartas(leerCookie("Idioma"), leerCookie("Cualidad"), leerCookie("Orden"));
}