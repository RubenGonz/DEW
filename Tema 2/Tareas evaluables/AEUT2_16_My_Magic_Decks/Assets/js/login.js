
 function crearAjax() {
    var ajax = null;
    try {
        ajax = new XMLHttpRequest();
    } catch (error) {
        try {
            ajax = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (error2) {
            try {
                ajax = new ActiveXObject("Msxml12.XMLHTTP");
            } catch (error3) {
                return null;
            }
        }
    }
    return ajax;
}

/**
 * Funcion encargada de gestionar los datos recibidos por la peticion ajax
 * @param datos datos recibidos en la peticion 
 */
 function gestionarDatos(datos) {
    datos = JSON.parse(datos);
    console.log("datos->", datos.validation);
	if(datos.validation == "true") {
        console.log("validacion correcta");
        document.getElementById("login").style.display = "none";
        //document.getElementById("login").style.visibility = "hidden";
        document.getElementById("logout").style.display = "inline";
        document.getElementById("selected").style.visibility ="visible";
        document.getElementById("myDeckA").style.display ="block";
        localStorage.setItem("user", "user");
        return true;
	} else if(datos.validation == "false") {
        alert("Usuario: user - Password: user");
		return false;
	}

}

/**
 * Funcion encargada de gestionar el objeto ajax y realizar la peticion de datos
 */
 function login(usuario, password) {
    console.log("login");
    var ajax = crearAjax();
    ajax.onreadystatechange = function comprobar() {
        console.log(ajax);
        if((ajax.readyState == 4) && (ajax.status == 200)) {
            console.log(this.responseText);
            return gestionarDatos(this.responseText);           
        }
    };
    
    ajax.open("GET","Ajax.php?usuario="+usuario+"&password="+password,true);
    ajax.send(null);
}