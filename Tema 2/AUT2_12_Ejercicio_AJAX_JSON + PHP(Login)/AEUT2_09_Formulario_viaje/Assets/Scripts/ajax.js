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
 * Constante que obtiene la informacion de la pagina y si
 * lo consigue la manda al metodo 'comprobarDatos' y sino 
 * manda un mensaje de error
 */
const establecerConexion = () => {
    let ajax = crearAjax();
    if (ajax != null) {
        ajax.open("GET", "https://jsonplaceholder.typicode.com/users", true);
        ajax.send(null);
        ajax.onreadystatechange = () => {
            if (ajax.readyState == 4 && ajax.status == 200) {
                comprobarDatos(ajax.responseText);
            }
        }
    } else {
        console.log("Hubo un problema con la ejecución del Ajax");
    }
}

/**
 * Constante que comprieba los datos mandados y si se corresponden
 * habilita el segundo formulario y deshabilita el primero
 * 
 * @param datos informacion recibida de 'establecerConexion'
 */
const comprobarDatos = (datos) => {
    if (true) {
        habilitacionFormulario("datos", true);
        habilitacionFormulario("registro", false);
    }
}

/**
 * Constante que habilita o deshabilita los campos de un formulario
 * 
 * @param idFormulario id del formulario a cambiar
 * @param habilitacion true para habilitar o false para deshabilitar
 */
const habilitacionFormulario = (idFormulario, habilitacion) => {
    let inputs = document.getElementById(idFormulario).getElementsByTagName("input");
    let selects = document.getElementById(idFormulario).getElementsByTagName("select");
    if (habilitacion) {
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].style.border = "";
            inputs[i].disabled = false;
        }
        for (let i = 0; i < selects.length; i++) {
            selects[i].parentNode.style.border = "";
            selects[i].disabled = false;
        }
        document.getElementById(idFormulario).style.backgroundColor = "White";
    } else {
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].style.border = "2px solid grey";
            inputs[i].disabled = true;
        }
        for (let i = 0; i < selects.length; i++) {
            selects[i].parentNode.style.border = "2px solid grey";
            selects[i].disabled = true;
        }
        document.getElementById(idFormulario).style.backgroundColor = "lightGrey";
    }
}

/**
 * Eventos introducidos
 */
document.getElementById("registrar").addEventListener("click", establecerConexion);

/**
 * OnLoad
 */
window.onload = () => {
    habilitacionFormulario("datos", false);
}