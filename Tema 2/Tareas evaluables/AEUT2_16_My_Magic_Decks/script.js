const DOM = {
    cartas: document.getElementById("cartas")
}

const apisBasicas = ["https://api.scryfall.com/cards/search?order=set&q=e%3Aitp&unique=prints",
    "https://api.scryfall.com/cards/search?order=set&q=e%3Azne&unique=prints",
    "https://api.scryfall.com/cards/search?order=set&q=e%3Aw17&unique=prints",
    "https://api.scryfall.com/cards/search?order=set&q=e%3Aw16&unique=prints",
    "https://api.scryfall.com/cards/search?order=set&q=e%3Augin&unique=prints"];

const traducirApi = (idioma) => {
    let apisTraducidas = [];
    apisBasicas.forEach(api => {
        let seccionIdioma = api.indexOf("e%");
        apisTraducidas.push(api.substr(0, seccionIdioma) + "lang%3A" + idioma + "+" + api.substr(seccionIdioma));
    })
    return apisTraducidas;
}

const recibirCartas = (idioma) => {
    let cartas = [];
    traducirApi(idioma).forEach(api => {
        fetch(api)
            .then(response => { return response.json(); })
            .then(data => {
                data.data.forEach(elemento => {
                    let carta = {
                        nombre: elemento.printed_name,
                        precio: elemento.prices.eur,
                        baraja: elemento.set_name,
                        colorIdentificador: elemento.color_identity,
                        tipo: elemento.type_line,
                        coste: elemento.mana_cost,
                        imagen: elemento.image_uris.png
                    };
                    cartas.push(carta);
                });
            })
            .catch(error => { return error; });
    })
    return cartas;
}

const ordenarCartas = (cualidad, tipo, idioma) => {
    let cartas = recibirCartas(idioma);
    let cartasOrdenadas = [];
    switch (cualidad) {
        case "nombre":
            cartas.sort(function (a, b) {
                return (b.nombre < a.nombre)
            })
            return cartasOrdenadas;
            break;
        default:
            break;
    }
}

const mostrarCartas = (cartas = "") => {
    if (DOM.cartas.innerHTML != "") DOM.cartas.innerHTML = "";
    if (cartas == "") cartas = recibirCartas(idioma);
    cartas.forEach(carta => {
        let contenedor = crearCarta(carta);
        DOM.cartas.appendChild(contenedor);
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