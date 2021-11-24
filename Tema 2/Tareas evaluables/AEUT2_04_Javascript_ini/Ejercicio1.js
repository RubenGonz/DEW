/* Queremos generar una aplicación para simular un servidor DHCP muy 
 * ‘basto’, queremos que el programa genere una IP válida de uno de los grupos de IPs que nos 
 * solicite el usuario.
 * 
 * El programa Pregunta al usuario que ‘clase de IP’ quiere y le devolverá una IP con números 
 * aleatorios de la clase solicitada. Debes dividir las acciones en funciones distintas ( mínimo 2) 
 * Recordamos que  podremos usar la siguiente tabla para determinarlo según el rango de la 
 * dirección IPv4
 * 
 * Rango de direcciones IPv4 Clase
 * 0.0.0.0 - 126.255.255.255 A
 * 127.0.0.0 - 191.255.255.255 B
 * 192.0.0.0 - 223.255.255.255 C
 * 224.0.0.0 - 239.255.255.255 D
 * 240.0.0.0 - 255.255.255.255 E
*/

function ejercicio1() {

    //Se crea un bucle que no para hasta obtener dos valores válidos
    do {
        //Se enseña la información de las 5 tipos de Ip
        alert(" A => 0.0.0.0 - 126.255.255.255 \n B => 127.0.0.0 - 191.255.255.255 \n C => 192.0.0.0 - 223.255.255.255 \n C => 240.0.0.0 - 255.255.255.255");
        //Se pide que el usuario elija una opcion
        var tipo = prompt("Introduzca el tipo del que quiere la Ip").toUpperCase();
        //Si no es adecuada manda un mensaje de alerta
        if (tipo != "A" && tipo != "B" && tipo != "C" && tipo != "D" && tipo != "E") alert("Has introducido mal los valores, vuelve a probar");
        //Se vuelven a pedir si los dos no cumplen la condición
    } while (tipo != "A" && tipo != "B" && tipo != "C" && tipo != "D" && tipo != "E");

    //Se evalua el tipo dependiendo de la opción elegida
    switch (tipo) {
        case "A":
            //Muestra la solución
            alert("La ip de tipo " + tipo + " generada es: " + generarIp(0, 126));
            break;
        case "B":
            //Muestra la solución
            alert("La ip de tipo " + tipo + " generada es: " + generarIp(127, 191));
            break;
        case "C":
            //Muestra la solución
            alert("La ip de tipo " + tipo + " generada es: " + generarIp(193, 223));
            break;
        case "D":
            //Muestra la solución
            alert("La ip de tipo " + tipo + " generada es: " + generarIp(224, 239));
            break;
        case "E":
            //Muestra la solución
            alert("La ip de tipo " + tipo + " generada es: " + generarIp(240, 255));
            break;
    }

    //Función que genera una ip pasando los valores límites
    function generarIp(inicioRango,finalRango) {
        return numeroAleatorio(inicioRango,finalRango) + "." + numeroAleatorio(0,255) + "." + numeroAleatorio(0,255) + "." + numeroAleatorio(0,255);
    }

    //Se crea una funcion que genera un numero aleatorio entre dos numeros que se le pasan
    function numeroAleatorio(valorMin, valorMax) {
        return Math.floor((Math.random() * (valorMax - valorMin)) + valorMin);
    }
}