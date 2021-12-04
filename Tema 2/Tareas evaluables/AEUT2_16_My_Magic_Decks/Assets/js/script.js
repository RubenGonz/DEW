const DOM = {
    cartas: document.getElementById("cartas"),
    seleccionMazo: document.getElementById("seleccionMazo"),
    mazo: document.getElementById("mazo"),
    seleccionIdioma: document.getElementById("seleccionIdioma"),
    idiomas: document.getElementById("idiomas"),
    seleccionCualidad: document.getElementById("seleccionCualidad"),
    cualidad: document.getElementById("cualidad"),
    seleccionOrden: document.getElementById("seleccionOrden"),
    orden: document.getElementById("orden")
}

const apisBasicas = {
    "Welcome Deck 2016": "https://api.scryfall.com/cards/search?order=set&q=e%3Aw16&unique=prints",
    "Ugin's Fate": "https://api.scryfall.com/cards/search?order=set&q=e%3Augin&unique=prints",
    "Welcome Deck 2017": "https://api.scryfall.com/cards/search?order=set&q=e%3Aw17&unique=prints",
    "Zendikar Rising Expeditions": "https://api.scryfall.com/cards/search?order=set&q=e%3Azne&unique=prints",
    "Introductory Two-Player": "https://api.scryfall.com/cards/search?order=set&q=e%3Aitp&unique=prints"
}

class cartaNormal {
    constructor(id, nombre, descripcion, precio, baraja, colorIdentificador, tipo, mana, imagen) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.baraja = baraja;
        this.colorIdentificador = colorIdentificador;
        this.tipo = tipo;
        this.mana = mana;
        this.imagen = imagen;
    }
}

class cartaCriatura extends cartaNormal {
    constructor(id, nombre, descripcion, precio, baraja, colorIdentificador, tipo, mana, imagen, fuerza, resistencia) {
        super(id, nombre, descripcion, precio, baraja, colorIdentificador, tipo, mana, imagen);
        this.fuerza = fuerza;
        this.resistencia = resistencia;
    }
}

class mazo {
    constructor(cartas) {
        this.cartas = cartas;
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
            if (idioma == "en" || idioma == undefined) {
                nombreCarta = cartaApi.name;
            } else {
                nombreCarta = cartaApi.printed_name;
            }
            let cartaFinal;
            if (!cartaApi.type_line.toLowerCase().includes("creature")) {
                cartaFinal = new cartaNormal(cartaApi.id, nombreCarta, cartaApi.printed_text, cartaApi.prices.eur, cartaApi.set_name, cartaApi.color_identity, cartaApi.type_line, cartaApi.cmc, cartaApi.image_uris.png);
            } else {
                cartaFinal = new cartaCriatura(cartaApi.id, nombreCarta, cartaApi.printed_text, cartaApi.prices.eur, cartaApi.set_name, cartaApi.color_identity, cartaApi.type_line, cartaApi.cmc, cartaApi.image_uris.png, cartaApi.power, cartaApi.toughness);
            }
            cartasFinales.push(cartaFinal);
        }
    }
    return new mazo(cartasFinales);
}

const ordenarMazo = (mazoIntroducido, cualidad = "nombre", orden = "asc") => {
    let cartasOrdenadas = mazoIntroducido.cartas.sort(function (a, b) {
        if (typeof cualidad == "string") {
            return (eliminarAcentos(b[cualidad]) < eliminarAcentos(a[cualidad]));
        } else {
            return (b[cualidad] - a[cualidad]);
        }
    })
    if (orden == "desc") cartasOrdenadas = cartasOrdenadas.reverse();
    return new mazo(cartasOrdenadas);
}

const eliminarAcentos = (texto) => {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
}

const mostrarMazoApi = (apis, idioma, cualidad, orden) => {
    recibirCartas(apis, idioma).then(mazo => {
        mostrarMazo(mazo, cualidad, orden);
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
        template.querySelectorAll("div")[0].id = carta.id;
        template.querySelectorAll("img")[0].src = carta.imagen;
        template.querySelectorAll("img")[0].alt = carta.nombre;
        template.querySelectorAll("h5")[0].textContent = carta.nombre;
        template.querySelectorAll("p")[0].textContent = carta.precio + " €";

        const clone = template.cloneNode(true);
        fragment.appendChild(clone);
    });
    DOM.cartas.appendChild(fragment);
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

DOM.cartas.addEventListener("click", (e) => {
    console.log(e.target)
});

DOM.mazo.addEventListener("click", (e) => {
    crearCookie("Mazo", e.target.id);
    DOM.seleccionMazo.innerHTML = e.target.innerHTML;
    mostrarMazoApi([apisBasicas[leerCookie("Mazo")]], leerCookie("Idioma"), leerCookie("Cualidad"), leerCookie("Orden"));
});

DOM.idiomas.addEventListener("click", (e) => {
    crearCookie("Idioma", e.target.id);
    DOM.seleccionIdioma.innerHTML = e.target.innerHTML;
    mostrarMazoApi([apisBasicas[leerCookie("Mazo")]], leerCookie("Idioma"), leerCookie("Cualidad"), leerCookie("Orden"));
});

DOM.cualidad.addEventListener("click", (e) => {
    crearCookie("Cualidad", e.target.id);
    DOM.seleccionCualidad.innerHTML = e.target.innerHTML;
    mostrarMazoApi([apisBasicas[leerCookie("Mazo")]], leerCookie("Idioma"), leerCookie("Cualidad"), leerCookie("Orden"));
});

DOM.orden.addEventListener("click", (e) => {
    crearCookie("Orden", e.target.id);
    DOM.seleccionOrden.innerHTML = e.target.innerHTML;
    mostrarMazoApi([apisBasicas[leerCookie("Mazo")]], leerCookie("Idioma"), leerCookie("Cualidad"), leerCookie("Orden"));
});

window.onload = () => {
    if (!comprobarCookie("Mazo")) crearCookie("Mazo", "Todos");
    if (!comprobarCookie("Idioma")) crearCookie("Idioma", "es");
    if (!comprobarCookie("Cualidad")) crearCookie("Cualidad", "nombre");
    if (!comprobarCookie("Orden")) crearCookie("Orden", "asc");
    DOM.seleccionMazo.innerHTML = document.getElementById(leerCookie("Mazo")).innerHTML;
    DOM.seleccionIdioma.innerHTML = document.getElementById(leerCookie("Idioma")).innerHTML;
    DOM.seleccionCualidad.innerHTML = document.getElementById(leerCookie("Cualidad")).innerHTML;
    DOM.seleccionOrden.innerHTML = document.getElementById(leerCookie("Orden")).innerHTML;
    mostrarMazoApi([apisBasicas[leerCookie("Mazo")]], leerCookie("Idioma"), leerCookie("Cualidad"), leerCookie("Orden"));
}