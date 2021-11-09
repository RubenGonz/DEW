/**
 * Constante donde se guardan algunos objetos importantes del documento
 */
const DOM = {
    avisos: document.getElementsByName("aviso"),
    inputs: {
        text: {
            dni: document.getElementById("dni"),
            telFijo: document.getElementById("telFijo"),
            telMovil: document.getElementById("telMovil"),
            ip: document.getElementById("ip")
        },
        select: {
            codPostal: document.getElementById("codPostal"),
            residencia: document.getElementById("residencia"),
            vehiculo: document.getElementById("vehiculo")
        }
    },
    submit: document.getElementById("submit")
}

/**
 * Constante donde se guardan todas las expresiones regulares 
 */
const EXPRESIONES = {
    nombre: "^([A-ZÁÉÍÓÚ]{1}[a-záéíóúü]+[ ]?){1,2}$",
    apellidos: "^([A-ZÁÉÍÓÚ]{1}[a-záéíóúü]+[ ]?){1,2}$",
    dni: "^[0-9]{8}[A-Z]$",
    codPostal: "^[0-9]{5}$",
    telFijo: "^(\\+34[ -]?)?(8|9)([0-9]){2}([ -]?([0-9]){3}){2}$",
    telMovil: "^(\\+34[ -]?)?(6|7)([0-9]){2}([ -]?([0-9]){3}){2}$",
    telInter: "^(\\+[0-9]{1,4}[ -]?)?([0-9][ -]?)+$",
    fechaIda: "^$",
    pasajeros: "^[1-5]$",
    email: "^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$",
    twiter: "^@[A-Za-z0-9_\\-]+$",
    instagram: "^[A-Za-z0-9_\\-]+$",
    marca: "^[A-ZÁÉÍÓÚ]{1}[a-záéíóúü]+$",
    matricula: "^[0-9]{4}-[A-Z]{3}$",
    ipV4: "^((25[0-5]|2[0-4][0-9]|[01]?[0-9]?[0-9])\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9]?[0-9])$",
    ipV6: "^$",
    motivo: "^$"
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
 * Constante que crea aniade un mensaje de aviso 
 * en un contenedor
 * 
 * @param idContenedor El id del contenedor donde se aniadirá el mensaje
 * @param mensajeError El mensaje que será aniadido
 */
const crearAviso = (idContenedor, mensajeError) => {
    let elemento = document.createElement("div");
    elemento.setAttribute("name", "aviso");
    elemento.style.width = "182px";
    elemento.style.fontSize = "0.75rem";
    elemento.style.color = "Red";
    elemento.innerHTML = mensajeError;
    document.getElementById(idContenedor).appendChild(elemento);
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
        document.getElementById("matricula").setAttribute("placeholder", "0000-XXX");
    } else if (document.getElementById("fieldsetMatricula") != null && document.getElementById("fieldsetMarca") != null) {
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
            document.getElementById("opcionNuevoCodigo").insertAdjacentElement("beforebegin", option);
        }
    } else {
        validarInputText("inputNuevoCodigo", EXPRESIONES.codPostal, "El codigo introducido no es válido");
    }
}

/**
 * Constante que valida si un documento es valido usando una 
 * expresion regular y despues asegurando que la letra del documento
 * sea la correcta
 * 
 * @param documento documento a validar
 * @returns true si es valido o false si no lo es
 */
const validarDocumento = (documento) => {
    if (validarTexto(EXPRESIONES.dni, documento)) {
        let numDoc = documento.substring(0, documento.length - 1);
        let letrasPosibles = "TRWAGMYFPDXBNJZSQVHLCKET";
        let posicion = numDoc % 23;
        let letraCorrecta = letrasPosibles.substring(posicion, posicion + 1);
        if (documento.charAt(8) == letraCorrecta) {
            return true;
        }
    } else {
        return false;
    };
}

const validarFecha = (fecha) => {

}

/**
 * Constante que reconoce que tipo de telefono le estamos introduciendo
 * entre un telefono fijo espaniol, un telefono movil espaniol,
 * un telefono internacional o uno que no es valido
 * 
 * @param telefono telefono a reconocer
 * @returns nombre del tipo de telefono introducido
 */
const reconocerTelefono = (telefono) => {
    if (validarTexto(EXPRESIONES.telMovil, telefono)) {
        return "telMovil";
    } else if (validarTexto(EXPRESIONES.telFijo, telefono)) {
        return "telFijo";
    } else if (validarTexto(EXPRESIONES.telInter, telefono)) {
        return "telInter";
    } else {
        return "telInvalido"
    }
}

/**
 * Constante que reconoce que tipo de Ip le estamos introduciendo
 * entre una IPv4, una IPv6 o una ip que no es valida
 * 
 * @param ip ip a reconocer
 * @returns nombre del tipo de ip introducida
 */
const reconocerIp = (ip) => {
    if (validarTexto(EXPRESIONES.ipV4, ip)) {
        return "ipV4";
    } else if (validarTexto(EXPRESIONES.ipV6, ip)) {
        return "ipV6";
    } else {
        return "ipInvalida"
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
    if (!validarDocumento(DOM.inputs.text.dni)) crearAviso("fieldsetDni", "El dni introducido no es válido");
    if (DOM.inputs.select.codPostal.value == "" || DOM.inputs.select.codPostal.value == "Nuevo") crearAviso("fieldsetCodPostal", "Introduzca un codigo postal válido");
    if ((reconocerTelefono(DOM.inputs.text.telFijo.value) != "telFijo") && (reconocerTelefono(DOM.inputs.text.telFijo.value) != "telInter")) crearAviso("fieldsetTelFijo", "El numero introducido no es un fijo español o un numero internacional");
    if ((reconocerTelefono(DOM.inputs.text.telMovil.value) != "telMovil") && (reconocerTelefono(DOM.inputs.text.telMovil.value) != "telInter")) crearAviso("fieldsetTelMovil", "El numero introducido no es un movil español o un numero internacional");
    /* validarFecha; */
    if (DOM.inputs.select.residencia.value == "") crearAviso("fieldsetResidencia", "Introduzca si es residente o no");
    validarInputText("pasajeros", EXPRESIONES.pasajeros, "El numero de pasajeros no es válido");
    validarInputText("email", EXPRESIONES.email, "El email introducido no es válido");
    validarInputText("twiter", EXPRESIONES.twiter, "El  usuario introducido no es válido");
    validarInputText("instagram", EXPRESIONES.instagram, "El  usuario introducido no es válido");
    if (DOM.inputs.select.vehiculo.value == "") {
        crearAviso("fieldsetVehiculo", "Introduzca si tiene o no vehiculo");
    } else if (DOM.inputs.select.vehiculo.value == "Si") {
        validarInputText("marca", EXPRESIONES.marca, "La marca introducida no es válida");
        validarInputText("matricula", EXPRESIONES.matricula, "La matricula introducida no es válida");
    }
    if (reconocerIp(DOM.inputs.text.ip.value) == "ipInvalida") crearAviso("fieldsetIp", "La Ip introducida no es válida");

    /*validarInputText("motivo", EXPRESIONES.motivo, "El motivo introducido no es válido");*/

    if (DOM.avisos.length == 0) console.log("Funciona");
}

DOM.submit.addEventListener("click", validarFormulario);
DOM.inputs.select.codPostal.addEventListener("change", generarInputPostal);
DOM.inputs.select.vehiculo.addEventListener("change", generarInputsVehiculo);




