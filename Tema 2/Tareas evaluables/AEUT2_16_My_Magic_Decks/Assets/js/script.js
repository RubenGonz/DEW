const DOM = {
    cartas: document.getElementById("cartas"),
    seleccionIdioma: document.getElementById("seleccionIdioma"),
    idiomas: document.getElementById("idiomas")
}

const apisBasicas = ["https://api.scryfall.com/cards/search?order=set&q=e%3Aitp&unique=prints",
    "https://api.scryfall.com/cards/search?order=set&q=e%3Azne&unique=prints",
    "https://api.scryfall.com/cards/search?order=set&q=e%3Aw17&unique=prints",
    "https://api.scryfall.com/cards/search?order=set&q=e%3Aw16&unique=prints",
    "https://api.scryfall.com/cards/search?order=set&q=e%3Augin&unique=prints"];

class cartaNormal {
    constructor(nombre, precio, baraja, colorIdentificador, tipo, mana, imagen) {
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
    constructor(nombre, precio, baraja, colorIdentificador, tipo, mana, imagen, fuerza, resistencia) {
        super(nombre, precio, baraja, colorIdentificador, tipo, mana, imagen);
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
                cartaFinal = new cartaNormal(nombreCarta, cartaApi.prices.eur, cartaApi.set_name, cartaApi.color_identity, cartaApi.type_line, cartaApi.mana_cost, cartaApi.image_uris.png);
            } else {
                cartaFinal = new cartaCriatura(nombreCarta, cartaApi.prices.eur, cartaApi.set_name, cartaApi.color_identity, cartaApi.type_line, cartaApi.mana_cost, cartaApi.image_uris.png, cartaApi.power, cartaApi.toughness);
            }
            cartasFinales.push(cartaFinal);
        }
    }
    return cartasFinales;
}

const ordenarCartas = (cartas, cualidad = "nombre", tipo = "Asc") => {
    let cartasOrdenadas = cartas.sort(function (a, b) {
        if (typeof cualidad == "string") {
            return (eliminarAcentos(b[cualidad]) < eliminarAcentos(a[cualidad]));
        } else {
            return (eliminarAcentos(b[cualidad]) - eliminarAcentos(a[cualidad]));
        }
    })
    if (tipo == "Desc") cartasOrdenadas = cartasOrdenadas.reverse();
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

const mostrarCartas = (idioma = "es", cualidad = "nombre", tipo = "Asc") => {
    recibirCartas(idioma).then(cartas => {
        if (DOM.cartas.innerHTML != "") DOM.cartas.innerHTML = "";
        let cartasOrdenadas = ordenarCartas(cartas, cualidad, tipo);
        cartasOrdenadas.forEach(carta => {
            let contenedor = crearCarta(carta);
            DOM.cartas.appendChild(contenedor);
        });
    }).catch(error => {
        console.log("Hubo un error: " + error)
    })
}

DOM.idiomas.addEventListener("click", (e) => {
    mostrarCartas(e.target.id, "nombre");
    DOM.seleccionIdioma.innerHTML = e.target.innerHTML;
});

window.onload = () => {
    mostrarCartas("es");
}