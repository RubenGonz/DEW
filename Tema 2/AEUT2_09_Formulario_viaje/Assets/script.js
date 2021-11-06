const DOM = {
    avisos: document.getElementsByName("aviso"),
    inputs: {
        text: {
            nombre: document.getElementById("nombre"),
            apellidos: document.getElementById("apellidos")
        },
        select: {
            codPostal: document.getElementById("codPostal")
        }
    },
    nuevoCodigo: document.getElementById("nuevoCodigo"),
    submit: document.getElementById("submit")
}

const validarCodigo = (codigo) => {
    if (codigo) {
        return true;
    } else {
        validarInputText("nuevoCodigo", "([0-9]){5}", "El codigo introducido no es válido");
        return false;
    }
}

const agregarCodigo = () => {
    let codigo = document.getElementById("nuevoCodigo").value;
    validarCodigo(codigo);
    let option = document.createElement("option");
    option.innerHTML = codigo;
    /*
    if (DOM.inputs.select.codPostal. (no se repite)) {
        DOM.inputs.select.codPostal.appendChild(option);
    }
    */
    
}

const generarInputPostal = () => {
    if (DOM.inputs.select.codPostal.value == "Nuevo") {
        document.getElementById("fieldsetCodPostal").insertAdjacentElement("afterend", generarCampo("nuevoCodigo", "Nuevo codigo"));

        let input = document.createElement("input");
        input.setAttribute("type", "button");
        input.setAttribute("id", "botonCodigo");
        input.setAttribute("class", "btn");
        input.setAttribute("value", "Añadir código");
        input.style.width = "min-content";
        input.style.marginTop = "0";
        input.style.color = "White";
        input.addEventListener("click", agregarCodigo);

        document.getElementById("nuevoCodigo").insertAdjacentElement("afterend", input);

    } else if (document.getElementById("fieldsetNuevoCodigo") != null) {
        document.getElementById("fieldsetNuevoCodigo").remove();
    }
}

const generarCampo = (idCampo, nombreVisible) => {
    let fieldset = document.createElement("fieldset");
    fieldset.setAttribute("id", "fieldset" + idCampo.charAt(0).toUpperCase() + idCampo.slice(1));

    let label = document.createElement("label");
    label.setAttribute("for", idCampo);
    label.innerHTML = nombreVisible;

    let input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("id", idCampo);
    input.setAttribute("class", "input-form");
    input.setAttribute("maxlength", "20");

    fieldset.appendChild(label);
    fieldset.appendChild(input);

    return fieldset;
}

/**
 * Constante que crea aniade un mensaje de aviso 
 * en un contenedor
 * 
 * @param id El id del contenedor donde se aniadirá el mensaje
 * @param mensajeError El mensaje que será aniadido
 */
const crearAviso = (id, mensajeError) => {
    let elemento = document.createElement("div");
    elemento.setAttribute("name", "aviso");
    elemento.style.width = "182px";
    elemento.style.fontSize = "0.75rem";
    elemento.style.color = "Red";
    elemento.innerHTML = mensajeError;
    document.getElementById(id).appendChild(elemento);
}

/**
 * Constante que valida que un input de tipo texto cumple
 * una expresion regular y si no lo hace muestra un aviso
 * 
 * @param idInput id del input que queremos validar
 * @param expresion expresion regular que debe cumplir el input
 * @param mensajeError mensaje de aviso a mostrar
 */
const validarInputText = (idInput, expresion, mensajeError) => {
    let idContenedor = "fieldset" + idInput.charAt(0).toUpperCase() + idInput.slice(1);
    let patron = new RegExp(expresion);
    if (!patron.test(document.getElementById(idInput).value)) crearAviso(idContenedor, mensajeError);
}

const validarFormulario = () => {
    DOM.avisos.forEach(aviso => {
        aviso.remove();
    });
    validarInputText("nombre", "([A-ZÁÉÍÓÚ]{1}[a-záéíóúü]+(\s)?){1,2}", "El nombre introducido no es válido");
    validarInputText("apellidos", "([A-ZÁÉÍÓÚ]{1}[a-záéíóúü]+(\s)?){1,2}", "Los apellidos introducidos no son válidos");
    validarInputText("email", "/[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+/gm", "El email introducido no es válido");
}

DOM.submit.addEventListener("click", validarFormulario);
DOM.inputs.select.codPostal.addEventListener("change", generarInputPostal);



