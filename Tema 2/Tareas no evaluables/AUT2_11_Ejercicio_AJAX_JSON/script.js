/**
 * Constante que guarda algunos elementos del documento
 */
const DOM = {
    contenido: document.getElementById("contenido")
}

/**
 * Constante que intenta crear un objeto Ajax y si no lo 
 * consigue captura el error
 * 
 * @returns un objeto Ajax si ha funcionado o null si no funciona
 */
const crearAjax = () => {
    let ajax = null;
    try {
        ajax = new XMLHttpRequest();
    } catch (error1) {
        try {
            ajax = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (error2) {
            try {
                ajax = new ActiveXObject("Msxml12.XMLHTTP");
            } catch (error3) {
                ajax = null;
            }
        }
    }
    return ajax;
}

/**
 * Constante que obtiene la insformacion de la pagina y si
 * lo consigue la manda al metodo 'mostrarDatos' y sino 
 * manda un mensaje de error
 */
 const traer = () => {
    let ajax = crearAjax();
    if (ajax != null) {
        ajax.open("GET", "https://jsonplaceholder.typicode.com/users", true);
        ajax.send(null);
        ajax.onreadystatechange = () => {
            if (ajax.readyState == 4 && ajax.status == 200) {
                mostrarDatos(ajax.responseText);
            }
        }
    } else {
        console.log("Hubo un problema con la ejecución del Ajax");
    }
}

/**
 * Constante que muestra los datos obtenidos en la tabla de la 
 * pagina
 * 
 * @param respuestaAjax texto obtenido del metodo 'traer'
 */
const mostrarDatos = (respuestaAjax) => {
    if (DOM.contenido.innerHTML != "") DOM.contenido.innerHTML = "";

    let datos = JSON.parse(respuestaAjax);

    datos.forEach(elemento => {
        let tr = document.createElement("tr");

        tr.appendChild(crearElemento("td", elemento.id));
        tr.appendChild(crearElemento("td", elemento.name));
        tr.appendChild(crearElemento("td", elemento.email));
        tr.appendChild(crearElemento("td", elemento.username));

        DOM.contenido.appendChild(tr);
    });
}

/**
 * Constante que crea un elemento y le aniade un contenido
 * 
 * @param etiqueta nombre de la etiqueta a crear
 * @param contenido texto a aniadir en la etiqueta
 * @returns elemento con el contenido aniadido
 */
const crearElemento = (etiqueta, contenido) => {
    let elemento = document.createElement(etiqueta);
    elemento.innerHTML = contenido;
    return elemento;
}