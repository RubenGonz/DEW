const DOM = {
    cartas: document.getElementById("cartas")
}

const apisBasicas = ["https://api.scryfall.com/cards/search?order=set&q=e%3Aitp&unique=prints",
    "https://api.scryfall.com/cards/search?order=set&q=e%3Azne&unique=prints",
    "https://api.scryfall.com/cards/search?order=set&q=e%3Aw17&unique=prints",
    "https://api.scryfall.com/cards/search?order=set&q=e%3Aw16&unique=prints",
    "https://api.scryfall.com/cards/search?order=set&q=e%3Augin&unique=prints"];

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
            let cartaFinal = {
                nombre: cartaApi.printed_name,
                precio: cartaApi.prices.eur,
                baraja: cartaApi.set_name,
                colorIdentificador: cartaApi.color_identity,
                tipo: cartaApi.type_line,
                coste: cartaApi.mana_cost,
                imagen: cartaApi.image_uris.png
            };
            cartasFinales.push(cartaFinal);
        }
    }
    return cartasFinales;
}

window.onload = () => {
    mostrarCartas();
}

const ordenarCartas = (cartas, cualidad = "nombre", tipo = "Asc") => {
    let cartasOrdenadas = cartas.sort(function (a, b) {
        return (eliminarAcentos(b[cualidad]) < eliminarAcentos(a[cualidad]));
    })
    if (tipo == "Desc") cartasOrdenadas = cartasOrdenadas.reverse();
    return cartasOrdenadas;
}

const eliminarAcentos = (texto) => {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
}

const mostrarCartas = (idioma = "es", cualidad = "nombre", tipo = "Asc") => {
    recibirCartas(idioma).then(cartas => {
        if (DOM.cartas.innerHTML != "") DOM.cartas.innerHTML = "";
        let cartasOrdenadas = ordenarCartas(cartas,cualidad,tipo);
        cartasOrdenadas.forEach(carta => {
            let contenedor = crearCarta(carta);
            DOM.cartas.appendChild(contenedor);
        });
    });
}

const crearCarta = (carta) => {
    let general = crearElemento("div", "", ["carta"]);

    if (carta.imagen != null) {
        let imagen = crearElemento("img", "", ["imgCarta"]);
        imagen.setAttribute("src", carta.imagen);
        general.appendChild(imagen);
    }

    let info = crearElemento("div", "", ["info"]);
    if (carta.baraja != null) {
        let baraja = crearElemento("div", "", ["elementoCarta"]);
        baraja.appendChild(crearElemento("span", "Baraja:"));
        baraja.appendChild(crearElemento("span", carta.baraja));
        info.appendChild(baraja);
    }

    info.appendChild(crearElemento("div", carta.tipo));
    info.appendChild(crearElemento("div", carta.coste));
    info.appendChild(crearElemento("div", carta.colorIdentificador));
    info.appendChild(crearElemento("div", carta.precio));
    general.appendChild(crearElemento("h3", carta.nombre));
    general.appendChild(info);
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