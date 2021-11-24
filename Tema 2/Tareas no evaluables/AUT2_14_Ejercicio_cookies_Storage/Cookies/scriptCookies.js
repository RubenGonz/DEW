/**
 * Constante que guarda 
 */
const DOM = {
    cookies: document.getElementById("cookies")
}

/**
 * Constante que crea un parrafo en el div del DOM
 * @param {String} contenido contenido a agregar
 */
const crearParrafo = (contenido) => {
    let elemento = document.createElement("p");
    elemento.innerHTML = contenido;
    DOM.cookies.appendChild(elemento);
}

/**
 * Constante que comprueba la existencia de una cookie
 * en el navegador
 * @param {String} clave clave de la cookie 
 * @returns true si existe o false si no existe
 */
const comprobarExistencia = (clave) => {
    let cookies = document.cookie.split("; ");
    let encontrada = false;
    cookies.forEach(cookie => {if(cookie.split("=")[0] == clave) encontrada = true;});
    return encontrada;
}

/**
 * Constante que lista todas las cookies creadas y las muestra
 */
const verCookies = () => {
    if (DOM.cookies.innerHTML = "") DOM.cookies.innerHTML = "";
    let cookies = document.cookie.split("; ");
    if (cookies[0] != "") {
        crearParrafo("Clave  => valor");
        DOM.cookies.appendChild(document.createElement("hr"));
        cookies.forEach(cookie => {
            let clave = cookie.split("=")[0];
            let valor = cookie.split("=")[1];
            crearParrafo(clave + " => " + valor);
        });
    } else {
        crearParrafo("No hay cookies creadas");
    }
}

/**
 * Constante donde se le pide al usuario los 
 * valores para crear una nueva cookie
 */
const nuevaCookie = () => {
    if (DOM.cookies.innerHTML = "") DOM.cookies.innerHTML = "";
    let clave = prompt("Introduzca el nombre de la cookie a crear");
    if (!comprobarExistencia(clave)) {
        let valor = prompt("Introduzca el valor de la cookie a crear");
        let expedicion = prompt("Introduzca el tiempo que tardará en expirar en dias");
        crearCookie(clave, valor, expedicion);
        crearParrafo("La cookie '" + clave + "' ha sido creada con éxito.");
    } else crearParrafo("No se ha creado esta cookie porque ya existe una con este nombre");
}

/**
 * Constante que crea una cookie y la aniade
 * al navegador
 * @param {String} clave clave de la cookie
 * @param {*} valor valor de la cookie
 * @param {Number} expedicion expedicion dias de duracion
 */
const crearCookie = (clave, valor, expedicion) => {
    let date = new Date();
    date.setTime(date.getTime() + (expedicion * 24 * 60 * 60 * 1000));
    document.cookie = clave + "=" + valor + "; expires=" + date.toGMTString();
}

/**
 * Constante que modifica una cookie en el 
 * caso de que exista
 */
const modificarCookie = () => {
    if (DOM.cookies.innerHTML = "") DOM.cookies.innerHTML = "";
    let clave = prompt("Introduzca el nombre de la cookie a modificar");

    if (comprobarExistencia(clave)) {
        let valor = prompt("Introduzca el valor de la cookie a crear");
        let expedicion = prompt("Introduzca el tiempo que tardará en expirar en dias");
        crearCookie(clave, valor, expedicion);
        crearParrafo("La cookie '" + clave + "' ha sido modificada con éxito.");
    } else crearParrafo("No existe una cookie con ese nombre");
}

/**
 * Constante que ensenia el valor de 
 * una cookie en el caso de que exista
 */
const leerCookie = () => {
    if (DOM.cookies.innerHTML = "") DOM.cookies.innerHTML = "";
    let claveIntroducida = prompt("Introduce el nombre de la cookie");

    if (comprobarExistencia(claveIntroducida)) {
        let cookies = document.cookie.split("; ");
        cookies.forEach(cookie => {
            let clave = cookie.split("=")[0];
            let valor = cookie.split("=")[1];
            if (claveIntroducida == clave) crearParrafo("La cookie '" + claveIntroducida + "' tiene como valor '" + valor + "'.");
        });
    } else crearParrafo("No existe una cookie con ese nombre");
}

/**
 * Constante que borra una cookie en el caso de 
 * que exista
 */
const borrarCookie = () => {
    if (DOM.cookies.innerHTML = "") DOM.cookies.innerHTML = "";
    let clave = prompt("Introduzca el nombre de la cookie a borrar");

    if (comprobarExistencia(clave)) {
        crearCookie(clave, "", -1);
        crearParrafo("La cookie '" + clave + "' ha sido borrada con éxito.");
    } else crearParrafo("No existe una cookie con ese nombre");
}

/**
 * Eventos
 */
document.getElementById("verTodas").addEventListener("click", verCookies);
document.getElementById("crearCookie").addEventListener("click", nuevaCookie);
document.getElementById("modificarCookie").addEventListener("click", modificarCookie);
document.getElementById("leerCookie").addEventListener("click", leerCookie);
document.getElementById("borrarCookie").addEventListener("click", borrarCookie);