/**
 * Constante que guarda 
 */
const DOM = {
    contador: document.getElementById("contador")
}

/**
 * Claves de las cookies
 */
const CLAVE_USER = "nombreUsuario";
const CLAVE_CONTADOR = "contador";

/**
 * Constante que crea una cookie
 * 
 * @param {String} clave clave de la cookie
 * @param {*} valor valor de la cookie
 * @param {Number} expedicion dias de la cookie
 */
const crearCookie = (clave, valor, expedicion = "") => {
    if (expedicion == "") {
        document.cookie = clave + "=" + valor + ";";
    } else {
        let date = new Date();
        date.setTime(date.getTime() + (expedicion * 24 * 60 * 60 * 1000));
        document.cookie = clave + "=" + valor + "; expires=" + date.toGMTString();
    }
}

/**
 * Constante que devuelve el valor de una cookie
 * 
 * @param {String} claveCookie clave de la cookie
 * @returns valor de la cookie
 */
const valorCookie = (claveCookie) => {
    let valor = null;
    let cookies = document.cookie.split("; ");
    cookies.forEach(cookie => { if (cookie.split("=")[0] == claveCookie) valor = cookie.split("=")[1]; });
    return valor;
}

/**
 * Constante que indica si una cookie existe
 * 
 * @param {String} claveCookie clave de la cookie
 * @returns true si existe o false si no existe
 */
const existeCookie = (claveCookie) => {
    let cookies = document.cookie.split("; ");
    let encontrada = false;
    cookies.forEach(cookie => { if (cookie.split("=")[0] == claveCookie) encontrada = true; });
    return encontrada;
}

/**
 * Constante que muestra un mensaje en el html
 * @param {String} texto texto a mostrar
 */
const mostrarTexto = (texto) => {
    if (DOM.contador.innerHTML != "") DOM.contador.innerHTML = "";
    let parrafo = document.createElement("p");
    parrafo.innerHTML = texto;
    DOM.contador.appendChild(parrafo);
}

/**
 * Constante que inicia la sesion de un usuario
 */
const logIn = () => {
    if (existeCookie(CLAVE_USER)) {
        mostrarTexto("Otra vez por aquí " + valorCookie(CLAVE_USER) + ", Cómo le va?");
    } else {
        let nombreUsuario = prompt("Veo que todavía no se como te llamas. Dime tu nombre:");
        if (typeof nombreUsuario == "string" && nombreUsuario != "" && isNaN(parseInt(nombreUsuario))) {
            crearCookie(CLAVE_USER, nombreUsuario, 365);
            crearCookie(CLAVE_CONTADOR, 0);
            mostrarTexto("Hola " + nombreUsuario + ",Bienvenida/o a nuestra web contador");
        } else mostrarTexto("No ha introducido un nombre válido");
    }
}

/**
 * Constante que cierra la sesion de un usuario
 */
const logOut = () => {
    if (existeCookie(CLAVE_USER)) {
        mostrarTexto("Se ha cerrado la sesión de '" + valorCookie(CLAVE_USER) + "'.");
        crearCookie(CLAVE_USER, "", -1);
        crearCookie(CLAVE_CONTADOR, "", -1);
    } else mostrarTexto("No hay ninguna sesión activa");
}

/**
 * Constante que cambia el valor del contador
 * 
 * @param {Number} valorSumado valor a sumarle al contador
 */
const cambiarContador = (valorSumado) => {
    if (existeCookie(CLAVE_USER) && existeCookie(CLAVE_CONTADOR)) {
        let nuevoValor = parseInt(valorCookie(CLAVE_CONTADOR)) + valorSumado;
        crearCookie(CLAVE_CONTADOR, nuevoValor);
        mostrarTexto("El valor del contador es: " + valorCookie(CLAVE_CONTADOR));
    } else mostrarTexto("Necesita loguearse para ejercer esta función")
}

/**
 * Eventos
 */
document.getElementById("Login").addEventListener("click", logIn);
document.getElementById("Incrementar").addEventListener("click", cambiarContador(+1));
document.getElementById("Decrementar").addEventListener("click", cambiarContador(-1));
document.getElementById("LogOut").addEventListener("click", logOut);