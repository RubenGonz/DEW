/**
 * Constante donde se guardan algunos objetos importantes del documento
 */
const DOM = {
    avisos: document.getElementsByName("aviso"),
    inputs: {
        text: {
            nombre: document.getElementById("nombre"),
            apellidos: document.getElementById("apellidos")
        },
        select: {
            codPostal: document.getElementById("codPostal"),
            residencia: document.getElementById("residencia"),
            vehiculo: document.getElementById("vehiculo")
        }
    },
    opcionNuevoCodigo: document.getElementById("opcionNuevoCodigo"),
    submit: document.getElementById("submit")
}

/**
 * Constante donde se guardan todas las expresiones regulares 
 */
const EXPRESIONES = {
    nombre: "([A-ZÁÉÍÓÚ]{1}[a-záéíóúü]+(\s)?){1,2}",
    apellidos: "([A-ZÁÉÍÓÚ]{1}[a-záéíóúü]+(\s)?){1,2}",
    codPostal: "[0-9]{5}",
    telFijo: "(\+[0-9]{1,4}[ -])?(6|7)([0-9]){2}([ -]([0-9]){3}){2}",
    telMovil: "(\+[0-9]{1,4}[ -]?)?(8|9)([0-9]){2}([ -]?([0-9]){3}){2}",
    fechaIda: "",
    pasajeros: "[1-5]",
    email: "[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+",
    redesSociales: "",
    marca: "[A-ZÁÉÍÓÚ]{1}[a-záéíóúü]+",
    matricula: "[0-9]{4}-[A-Z]{3}",
    ip: "",
    motivo: ""
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
 * Constante que valida si un texto cumple una 
 * expresion regular
 * 
 * @param expresion expresion regular que debe cumplir el texto
 * @param texto texto a validar
 * @returns true si es valido o false si no lo es
 */
const validarTexto = (expresion, texto) => {
    let patron = new RegExp(expresion);
    return patron.test(texto);
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
    let texto = document.getElementById(idInput).value;
    if (!validarTexto(expresion, texto)) crearAviso(idContenedor, mensajeError);
}

/**
 * Constante que genera un campo nuevo al formulario
 * 
 * @param idCampo Este sera el identificador del input del campo
 * @param nombreVisible Este sera el texto que verá el usuario sobre el input
 * @returns Un fieldset con id englobando un label y un input identificado
 */
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
 * Constante que genera los campos correspondientes a los vehiculos
 * si la opcion marcada es "Si" y en el caso de que no sea asi elimina
 * estos campos
 */
const generarInputsVehiculo = () => {
    if (DOM.inputs.select.vehiculo.value == "Si") {
        document.getElementById("fieldsetVehiculo").insertAdjacentElement("afterend", generarCampo("matricula", "Matricula"));
        document.getElementById("fieldsetVehiculo").insertAdjacentElement("afterend", generarCampo("marca", "Marca"));
    } else {
        document.getElementById("fieldsetMatricula").remove();
        document.getElementById("fieldsetMarca").remove();
    }
}

/**
 * Constante que genera un input de tipo texto y un boton para
 * la generacion de un nuevo codigo postal
 * 
 * Se evalua si esta la opcion nuevo marcada en el select
 * Se genera un input de tipo texto y un boton con las características 
 * de la página
 * Se aniaden despues del select del codifgo postal
 * Si la opcion no esta marcada y estos campos estan creados se eliminan
 */
const generarInputPostal = () => {
    if (DOM.inputs.select.codPostal.value == "Nuevo") {
        document.getElementById("fieldsetCodPostal").insertAdjacentElement("afterend", generarCampo("inputNuevoCodigo", "Nuevo codigo"));

        let input = document.createElement("input");
        input.setAttribute("type", "button");
        input.setAttribute("id", "botonCodigo");
        input.setAttribute("class", "btn");
        input.setAttribute("value", "Añadir código");
        input.style.width = "min-content";
        input.style.marginTop = "0";
        input.style.color = "White";
        input.addEventListener("click", agregarCodigo);

        document.getElementById("inputNuevoCodigo").insertAdjacentElement("afterend", input);

    } else if (document.getElementById("fieldsetInputNuevoCodigo") != null) {
        document.getElementById("fieldsetInputNuevoCodigo").remove();
    }
}

/**
 * Constante que intenta agregar un codigo al select de codPostal
 * 
 * Evalua si hay un mensaje de aviso y si asi es lo elimina
 * Valida que el codigo sea correcto y si no lo es manda un aviso
 * Si es valido comprueba que ese codigo no este ya en las opciones
 * del select y si no esta lo aniade antes de la opcion "Nuevo"
 */
const agregarCodigo = () => {
    let codigo = document.getElementById("inputNuevoCodigo").value;

    if (document.querySelector("#fieldsetInputNuevoCodigo").childNodes.length == 4) {
        document.querySelector("#fieldsetInputNuevoCodigo").childNodes[3].remove();
    }

    if (validarTexto(EXPRESIONES.codPostal, codigo)) {

        let opciones = [];
        DOM.inputs.select.codPostal.childNodes.forEach(nodo => {
            if (nodo.nodeName == "OPTION") {
                opciones.push(nodo.innerHTML);
            }
        });

        if (!opciones.includes(codigo)) {
            let option = document.createElement("option");
            option.innerHTML = codigo;
            DOM.opcionNuevoCodigo.insertAdjacentElement("beforebegin", option);
        }
    } else {
        validarInputText("inputNuevoCodigo", EXPRESIONES.codPostal, "El codigo introducido no es válido");
    }
}

/**
 * Constante que valida todos los campos del formulario
 * 
 * Borra todos los mensajes de aviso del html y valida
 * cada campo, en el caso de que alguno este mal le genera
 * un aviso
 */
const validarFormulario = () => {
    while (DOM.avisos.length != 0) {
        DOM.avisos[0].remove();
    }

    validarInputText("nombre", EXPRESIONES.nombre, "El nombre introducido no es válido");
    validarInputText("apellidos", EXPRESIONES.apellidos, "Los apellidos introducidos no son válidos");

    if (DOM.inputs.select.codPostal.value == "" || DOM.inputs.select.codPostal.value == "Nuevo") crearAviso("fieldsetCodPostal", "Introduzca un codigo postal válido");
    validarInputText("telFijo", EXPRESIONES.telFijo, "El numero de telefono fijo introducido no es válido");
    validarInputText("telMovil", EXPRESIONES.telMovil, "El numero de telefono movil introducido no es válido");
    validarInputText("fechaIda", EXPRESIONES.fechaIda, "La fecha introducida no es válida");
    if (DOM.inputs.select.residencia.value == "") crearAviso("fieldsetResidencia", "Introduzca si es residente o no");
    validarInputText("pasajeros", EXPRESIONES.pasajeros, "El numero de pasajeros no es válido");
    validarInputText("email", EXPRESIONES.email, "El email introducido no es válido");
    /*validarInputText("redesSociales", EXPRESIONES.redesSociales, "El usuario introducido no es válido");*/
    if (DOM.inputs.select.vehiculo.value == "") {
        crearAviso("fieldsetVehiculo", "Introduzca si tiene o no vehiculo");
    } else if (DOM.inputs.select.vehiculo.value == "Si") {
        validarInputText("marca", EXPRESIONES.marca, "La marca introducida no es válida");
        validarInputText("matricula", EXPRESIONES.matricula, "La matricula introducida no es válida");
    }
    /*validarInputText("ip", EXPRESIONES.ip, "La ip introducida no es válida");
    validarInputText("motivo", EXPRESIONES.motivo, "El motivo introducido no es válido");*/
}

DOM.submit.addEventListener("click", validarFormulario);
DOM.inputs.select.codPostal.addEventListener("change", generarInputPostal);
DOM.inputs.select.vehiculo.addEventListener("change", generarInputsVehiculo);




