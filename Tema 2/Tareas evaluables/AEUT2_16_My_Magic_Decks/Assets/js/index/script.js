/**
 * Constantes
*/

/**
 * Constante DOM que guarda algunas variables del html
 */
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
    footerSeleccionadas: document.getElementById("footerSeleccionadas"),
    inputBuscador: document.getElementById("inputBuscador"),
    listaOpciones: document.getElementById("listaOpciones"),
    botonBuscador: document.getElementById("botonBuscador")
}

/**
 * Constante que guarda las diferentes apis desde las 
 * que podemos recoger información
 */
const apisBasicas = {
    "Todas": "Todas",
    "Welcome Deck 2016": "https://api.scryfall.com/cards/search?order=set&q=e%3Aw16&unique=prints",
    "Ugin's Fate": "https://api.scryfall.com/cards/search?order=set&q=e%3Augin&unique=prints",
    "Welcome Deck 2017": "https://api.scryfall.com/cards/search?order=set&q=e%3Aw17&unique=prints",
    "Zendikar Rising Expeditions": "https://api.scryfall.com/cards/search?order=set&q=e%3Azne&unique=prints",
    "Introductory Two-Player": "https://api.scryfall.com/cards/search?order=set&q=e%3Aitp&unique=prints"
}

/**
 * Clases
*/

/**
 * Clase carta que guarda toda la información sobre una 
 * carta en específico
 */
class carta {
    constructor(info) {
        this.info = this.intretarInfo(info);
        this.cantidad = 1;
        this.importeTotal = 0;
        this.calcularImporte();
    }

    /**
     * Función local que apadta la información recibida a un 
     * formato legible para el usuario
     * @param {Array} info información recibida 
     * @returns información adaptada
     */
    intretarInfo(info) {
        let infoConvertida = info;
        if (infoConvertida.colores.length != 0) {
            for (let i = 0; i < infoConvertida.colores.length; i++) {
                if (infoConvertida.colores[i] == "W") infoConvertida.colores[i] = "Blanco";
                if (infoConvertida.colores[i] == "U") infoConvertida.colores[i] = "Azul";
                if (infoConvertida.colores[i] == "B") infoConvertida.colores[i] = "Negro";
                if (infoConvertida.colores[i] == "R") infoConvertida.colores[i] = "Rojo";
                if (infoConvertida.colores[i] == "G") infoConvertida.colores[i] = "Verde";
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

    /**
     * Función que calcula el importe total de esta carta
     * habiendose o no repetido en un mazo y se la setea a
     * importeTotal 
     */
    calcularImporte() {
        this.importeTotal = parseFloat((this.info.precio * this.cantidad).toFixed(2));
    }
}

/**
 * Clase que guarda un mazo de cartas con sus características
 */
class mazo {
    constructor(cartas) {
        this.cartas = cartas;
        this.cartasTotales = 0;
        this.calcularCantidad();
        this.importeMazo = 0;
        this.calcularImporte();
    }

    /**
     * Función que calcula las cartas totales del mazo
     * y se lo setea a cartasTotales 
     */
    calcularCantidad() {
        let contadorCantidad = 0;
        this.cartas.forEach(carta => {
            contadorCantidad = contadorCantidad + carta.cantidad;
        })
        this.cartasTotales = contadorCantidad;
    }

    /**
     * Función que calcula el importe total de todas las cartas
     * del mazo y se lo setea a importeMazo 
     */
    calcularImporte() {
        let contadorImporte = 0;
        this.cartas.forEach(carta => {
            contadorImporte = contadorImporte + carta.importeTotal;
        })
        this.importeMazo = parseFloat(contadorImporte.toFixed(2));
    }
}

/**
 * Funciones
*/

/**
 * Constante que traduce una api a un idioma
 * @param {String} api enlace de la api
 * @param {String} idioma abreviación del idioma
 * @returns 
 */
const traducirApi = (api, idioma = "en") => {
    let seccionIdioma = api.indexOf("e%");
    return api.substr(0, seccionIdioma) + "lang%3A" + idioma + "+" + api.substr(seccionIdioma);
}

/**
 * Función asincrona que trae los datos 
 * de las apis en un idioma y con ellos crea cartas
 * que porteriormente se usaran para crear un mazo
 * 
 * @param {Array} apis array de apis a tratar
 * @param {String} idioma abreviación del idioma
 * @returns mazo con las cartas de las apis
 */
async function recibirCartas(apis = [], idioma) {
    let apisFinales = [];
    if (apis == "Todas") {
        Object.values(apisBasicas).forEach(api => {
            if (api != "Todas") apisFinales.push(traducirApi(api, idioma));
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
                colores: cartaApi.color_identity,
                tipo: tipoCarta,
                mana: cartaApi.cmc,
                imagen: cartaApi.image_uris.png,
                url: cartaApi.scryfall_uri
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

/**
 * Constante que ordena un mazo segun se especifique
 * @param {Object} mazoIntroducido mazo a ordenar
 * @param {String} cualidad parametro por elq ue ordenar
 * @param {String} orden orden en el que se quiere ordenar
 * @returns Mazo ordenado
 */
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

/**
 * Constante que pasandole un texto te quita los acentos
 * @param {String} texto texto a convetir
 * @returns texto sin acentos
 */
const eliminarAcentos = (texto) => {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
}

/**
 * Constante que recoge la información de las apis y
 * muestra los mazos al usuario
 * @param {Array} apis apis a tratar
 * @param {String} idioma abreviación del idioma
 */
const recibirMazoApi = (apis, idioma) => {
    recibirCartas(apis, idioma).then(mazo => {
        mazoMostrado = mazo;
        generarOpciones(mazoMostrado);
        mostrarMazo(mazo, leerCookie("Cualidad"), leerCookie("Orden"));
    }).catch(error => {
        console.log("Hubo un error: " + error)
    })
}

/**
 * Constante que recibiendo un mazo y la forma 
 * de ordenacion muestra un mazo en la pantalla
 * @param {Object} mazo mazo a mostrar
 * @param {String} cualidad parametro por el que ordenar
 * @param {String} orden tipo de ordenacion
 */
const mostrarMazo = (mazo, cualidad, orden) => {
    if (DOM.cartas.innerHTML != "") DOM.cartas.innerHTML = "";
    let mazoOrdenado = ordenarMazo(mazo, cualidad, orden);
    crearCartas(mazoOrdenado.cartas);
}

/**
 * Constante que busca una carta entre 
 * las cartas mostradas en la pantalla
 * @param {String} cualidad parametro por el que buscar
 * @param {String} valor valor del parametro a buscar
 * @returns objeto carta
 */
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

/**
 * Constante que busca una carta entre las cartas
 * seleccionadas por el usuario
 * @param {String} idCarta identificador de la carta
 * @returns carta buscada
 */
const buscarConjunto = (idCarta) => {
    let cartaElegida = buscarCarta("id", idCarta);
    conjuntoBuscado = null;

    cartasElegidas.cartas.forEach(carta => {
        if (carta == cartaElegida) conjuntoBuscado = carta;
    })
    return conjuntoBuscado;
}

/**
 * Constante que agrega una carta al 
 * mazo de las cartas seleccionadas y lo
 * muestra
 * @param {String} idCarta identificador de la carta
 */
const agregarCarta = (idCarta) => {
    if (cartasElegidas.cartasTotales < 60) {
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
            conjuntoCartas.cantidad = 1;
            cartasElegidas.cartas.push(conjuntoCartas);
            cartasElegidas.calcularCantidad();
            cartasElegidas.calcularImporte();
            modificarSelecionadas(conjuntoCartas);
            modificarFooter();
        }
    } else {
        alert("Has alcanzado el límite de cartas");
    }
}

/**
 * Constante que elimina una carta del 
 * mazo de las cartas seleccionadas y lo
 * muestra
 * @param {String} idCarta identificador de la carta
 */
const quitarCarta = (idCarta) => {
    if (cartasElegidas.cartasTotales > 0) {
        let conjuntoElegido = buscarConjunto(idCarta);
        conjuntoElegido.cantidad = conjuntoElegido.cantidad - 1;
        conjuntoElegido.calcularImporte();
        cartasElegidas.calcularCantidad();
        cartasElegidas.calcularImporte();
        if (conjuntoElegido.cantidad == 0) {
            let indice = cartasElegidas.cartas.indexOf(conjuntoElegido);
            cartasElegidas.cartas.splice(indice, 1);
        }
        modificarSelecionadas(conjuntoElegido);
        modificarFooter();
    } else {
        alert("No puedes quitar más cartas");
    }
}

/**
 * Constante que elimina el modal
 * de mostrar información
 */
const eliminarModal = () => {
    modalInfo.hide();
    if (document.getElementById('staticBackdrop') != null) {
        document.getElementById('staticBackdrop').remove();
    }
}

/**
 * Constante que guarda un mazo en el almacenamiento local
 * en el caso de que no exista ya uno con el mismo nombre
 */
const guardarMazo = () => {
    let nombreMazo = prompt("Introduzca el nombre que le quiere dar a su mazo");
    if (nombreMazo != undefined && nombreMazo != "" && !existeMazoCreado(nombreMazo)) {
        let mazoFinal = cartasElegidas;
        mazoFinal.nombre = nombreMazo;
        cartasElegidas = new mazo([]);
        modificarSelecionadas();
        modificarFooter();
        añadirMazoCreado(mazoFinal);   
    } else {
        alert("No ha introducido un nombre válido, vuelve a intentarlo")
    }
}

/**
 * Constante que obtiene los mazos creados del almacenamiento local
 * @returns array de mazos creados
 */
const obtenerMazosCreados = () => {
    return JSON.parse(almacenamientoLocal.getItem("Mazos hechos"))
}

/**
 * Constante que añade un nuevo mazo al almacenamiento
 * @param {Object} nuevoMazo mazo a añadir
 */
const añadirMazoCreado = (nuevoMazo) => {
    let mazosActuales = obtenerMazosCreados();
    mazosActuales.push(nuevoMazo);
    almacenamientoLocal.setItem("Mazos hechos",JSON.stringify(mazosActuales));
}

/**
 * Constante qque comprueba si existe 
 * un mazo creado con el mismo nombre
 * @param {String} nombreMazo nombre del mazo a comprobar
 * @returns true si se encuentra o false si no se encuentra
 */
const existeMazoCreado = (nombreMazo) => {
    let encontrado = false;
    obtenerMazosCreados().forEach(mazoCreado => {
        if (mazoCreado.nombre == nombreMazo) encontrado = true; 
    })
    return encontrado;
}

/**
 * Constante que muestra las cartas en la pantalla
 * @param {Array} cartas cartas del mazo a mostrar
 */
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

/**
 * Constante que modifica el estado del body de la
 * tabla de las cartas seleccionadas al añadir o 
 * eliminar una carta
 * @param {Object} conjuntoCartas carta a añadir o eliminar de la tabla
 */
const modificarSelecionadas = (conjuntoCartas = null) => {
    if (conjuntoCartas == null) {
        DOM.bodySeleccionadas.innerHTML = "";
    } else {
        let trExistente = document.getElementsByName(conjuntoCartas.info.id)[0];

        if (conjuntoCartas.cantidad == 0 && typeof trExistente != "undefined") {
            trExistente.remove();
        } else {
            const fragment = document.createDocumentFragment();
            const template = document.getElementById("cartaColumna").content;

            template.querySelectorAll("tr")[0].setAttribute("name", conjuntoCartas.info.id);
            template.querySelectorAll("span")[0].textContent = conjuntoCartas.info.nombre;
            if (conjuntoCartas.info.precio == null) {
                template.querySelectorAll("td")[1].textContent = "No hay precio disponible";
            } else {
                template.querySelectorAll("td")[1].textContent = conjuntoCartas.info.precio + " €";
            }
            template.querySelectorAll("td")[2].textContent = conjuntoCartas.cantidad;
            template.querySelectorAll("td")[4].textContent = conjuntoCartas.importeTotal + " €";

            const clone = template.cloneNode(true);
            fragment.appendChild(clone);
            if (typeof trExistente == "undefined") {
                DOM.bodySeleccionadas.appendChild(fragment);
            } else {
                DOM.bodySeleccionadas.replaceChild(fragment, trExistente);
            }
        }
    }
}

/**
 * Constante que modifica el estado del footer de la
 * tabla de las cartas seleccionadas al añadir o 
 * eliminar una carta
 */
const modificarFooter = () => {
    if (DOM.footerSeleccionadas.innerHTML != "") DOM.footerSeleccionadas.innerHTML = "";
    const fragment = document.createDocumentFragment();
    let template;

    if (cartasElegidas.cartasTotales == 0) {
        template = document.getElementById("footerVacio").content;
    } else {
        template = document.getElementById("footerLLeno").content;
        template.querySelectorAll("td")[1].textContent = cartasElegidas.cartasTotales;
        template.querySelectorAll("td")[3].textContent = cartasElegidas.importeMazo + " €";
        if (cartasElegidas.cartasTotales < 60 || cartasElegidas.cartasTotales > 60) {
            if (!template.querySelectorAll("button")[0].classList.contains("disabled")) template.querySelectorAll("button")[0].classList.add("disabled");
            template.querySelectorAll("span")[0].textContent = "El mazo debe tener 60 cartas para poder guardarse";
        } else {
            if (template.querySelectorAll("button")[0].classList.contains("disabled")) template.querySelectorAll("button")[0].classList.remove("disabled");
            template.querySelectorAll("button")[0].setAttribute("onclick", "guardarMazo()");
            template.querySelectorAll("span")[0].textContent = "";
        }
    }

    const clone = template.cloneNode(true);
    fragment.appendChild(clone);
    DOM.footerSeleccionadas.appendChild(fragment);
}

/**
 * Constante que muestra un modal con toda 
 * la información de una carta
 * @param {String} idCarta identificador de la carta
 */
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

    template.querySelectorAll("a")[0].setAttribute("onclick", "agregarCarta('" + carta.info.id + "')");
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

/**
 * Constante que genera las opciones del buscador 
 * @param {Object} mazo mazo de donde queremos las opciones
 */
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

/**
 * Constante que crea una cookie
 * @param {String} clave identificador de la cookie
 * @param {String} valor valor de la cookie
 * @param {Number} expedicion dias de duración de la cookie
 */
const crearCookie = (clave, valor, expedicion = "365") => {
    let date = new Date();
    date.setTime(date.getTime() + (expedicion * 24 * 60 * 60 * 1000));
    document.cookie = clave + "=" + valor + "; expires=" + date.toGMTString();
}

/**
 * Constante que comprueba si una cookie existe
 * @param {String} clave identificador de la cookie 
 * @returns true si existe o false si no existe
 */
const comprobarCookie = (clave) => {
    let cookies = document.cookie.split("; ");
    let encontrada = false;
    cookies.forEach(cookie => { if (cookie.split("=")[0] == clave) encontrada = true; });
    return encontrada;
}

/**
 * Constane que lee el valor de una cookie
 * @param {String} claveIntroducida identificador de la cookie 
 * @returns valor de la cookie
 */
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

/**
 * Listeners
*/

/**
 * Listener del input del buscador que muestra 
 * la informacion de la carta escrita al pulsar 
 * enter
 */
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

/**
 * Listener del boton del buscador que muestra 
 * la informacion de la carta escrita en el input 
 * al pulsar en el
 */
DOM.botonBuscador.addEventListener("click", () => {
    let cartaBuscada = buscarCarta("nombre", DOM.inputBuscador.value);
        if (cartaBuscada != null) {
            mostrarInfo(cartaBuscada.info.id);
            DOM.inputBuscador.value = "";
        } else {
            DOM.inputBuscador.value = "Carta no encontrada";
        }
});

/**
 * Listener de los botones de las cartas seleccionadas 
 * para agregar y quitar cartas y el mostrar informacion
 * al pulsar en el nombre de un usuario
 */
DOM.bodySeleccionadas.addEventListener("click", (e) => {
    if (e.target.name == "sumarCarta") {
        agregarCarta(e.target.closest("tr").getAttribute("name"));
    }
    if (e.target.name == "restarCarta") {
        quitarCarta(e.target.closest("tr").getAttribute("name"));
    }
    if (e.target.getAttribute("name") == "nombreCarta") {
        mostrarInfo(e.target.closest("tr").getAttribute("name"));
    }
});

/**
 * Listeneres de la carta en la pantalla donde en la 
 * imagen o el boton de seleccionar se añade a 
 * la lista de cartas selccionadas y en el boton
 * de mostrar informacion se crea un modal
 */
DOM.cartas.addEventListener("click", (e) => {
    if (e.target.nodeName == "IMG" || e.target.nodeName == "A") {
        agregarCarta(e.target.closest(".carta").id);
    }
    if (e.target.name == "botonInfo") {
        mostrarInfo(e.target.closest(".carta").id);
    }
});

/**
 * Listener de la opcion de navegacion de seleccion
 * del mazo para mostrarlo
 */
DOM.mazo.addEventListener("click", (e) => {
    crearCookie("Mazo", e.target.id);
    DOM.seleccionMazo.innerHTML = e.target.innerHTML;
    recibirMazoApi([apisBasicas[leerCookie("Mazo")]], leerCookie("Idioma"));
    generarOpciones();
});

/**
 * Listener de la opcion de navegacion de seleccion
 * del idioma para mostrar el mazo en el idioma seleccionado
 */
DOM.idiomas.addEventListener("click", (e) => {
    crearCookie("Idioma", e.target.id);
    DOM.seleccionIdioma.innerHTML = e.target.innerHTML;
    recibirMazoApi([apisBasicas[leerCookie("Mazo")]], leerCookie("Idioma"));
    generarOpciones();
    cartasElegidas = new mazo([]);
    DOM.bodySeleccionadas.innerHTML = "";
    modificarFooter();
});

/**
 * Listener de la opcion de navegacion de seleccion
 * de la cualidad para mostrar el mazo segun la
 * cualidad seleccionada
 */
DOM.cualidad.addEventListener("click", (e) => {
    crearCookie("Cualidad", e.target.id);
    DOM.seleccionCualidad.innerHTML = e.target.innerHTML;
    recibirMazoApi([apisBasicas[leerCookie("Mazo")]], leerCookie("Idioma"));
    generarOpciones();
});

/**
 * Listener de la opcion de navegacion de seleccion
 * del orden para mostrar el mazo segun el
 * orden seleccionado
 */
DOM.orden.addEventListener("click", (e) => {
    crearCookie("Orden", e.target.id);
    DOM.seleccionOrden.innerHTML = e.target.innerHTML;
    recibirMazoApi([apisBasicas[leerCookie("Mazo")]], leerCookie("Idioma"));
    generarOpciones();
});

/**
 * Acciones a acometerse cuando la página cargue
 */
window.onload = () => {
    if (!comprobarCookie("Mazo")) crearCookie("Mazo", "Todas");
    if (!comprobarCookie("Idioma")) crearCookie("Idioma", "es");
    if (!comprobarCookie("Cualidad")) crearCookie("Cualidad", "nombre");
    if (!comprobarCookie("Orden")) crearCookie("Orden", "asc");
    DOM.seleccionMazo.innerHTML = document.getElementById(leerCookie("Mazo")).innerHTML;
    DOM.seleccionIdioma.innerHTML = document.getElementById(leerCookie("Idioma")).innerHTML;
    DOM.seleccionCualidad.innerHTML = document.getElementById(leerCookie("Cualidad")).innerHTML;
    DOM.seleccionOrden.innerHTML = document.getElementById(leerCookie("Orden")).innerHTML;
    recibirMazoApi([apisBasicas[leerCookie("Mazo")]], leerCookie("Idioma"));
    modificarFooter();
    if (JSON.parse(almacenamientoLocal.getItem("Mazos hechos")) == null) almacenamientoLocal.setItem("Mazos hechos",JSON.stringify([]))
}

/**
 * Variables globales
*/

let mazoMostrado = new mazo([]);
let cartasElegidas = new mazo([]);
let modalInfo;
let almacenamientoLocal = window.localStorage;