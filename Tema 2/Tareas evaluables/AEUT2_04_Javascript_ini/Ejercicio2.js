/* Realiza un programa para escribir todos los números impares entre dos 
 * números A y B introducidos por teclado. Antes habrá que comprobar cuál de los dos números A y B
 * es mayor.
*/

function ejercicio2() {

    //Se crea un bucle que no para hasta obtener dos valores válidos
    do {
        //Se pregunta por los dos numeros
        var primerNumero = parseInt(prompt("Introduzca el primer numero a tratar"));
        var segundoNumero = parseInt(prompt("Introduzca el segundo numero a tratar"));
        //Se evalua si son válidos
        if (isNaN(primerNumero) || isNaN(segundoNumero)) alert("Has introducido mal los valores, vuelve a probar");
        //Se vuelven a pedir si los dos no cumplen la condición
    } while (isNaN(primerNumero) || isNaN(segundoNumero));

    //Se muestran los dos números para comparar
    console.log("El primer número es " + primerNumero + " y el segundo número es " + segundoNumero);

    //Se evalua si son diferentes 
    if (primerNumero != segundoNumero) {
        //Se comprueba que valor es mayor
        if (primerNumero > segundoNumero) {
            //Se muestra por pantalla
            console.log("El mayor numero es: " + primerNumero);
            //Se corrobora que es impar y si no lo fuese lo convierte
            if (primerNumero % 2 == 0) {
                primerNumero--;
            }
            //Se recorre los numeros intermedios
            recorrerImapares(primerNumero, segundoNumero);
        } else {
            //Se muestra por pantalla
            console.log("El mayor numero es: " + segundoNumero);
            //Se corrobora que es impar y si no lo fuese lo convierte
            if (segundoNumero % 2 == 0) {
                segundoNumero--;
            }
            //Se recorre los numeros intermedios
            recorrerImapares(segundoNumero, primerNumero);
        }
    } else {
        //Se muestrun mensaje de aviso de que ha incertado dos numeros iguales
        console.log("Los numero son iguales");
    }

    /*
     * Funcion que recorre los numeros impares entre dos 
     * valores hasta llegar al más pequeño
    */
    function recorrerImapares(mayorNumero, menorNumero) {
        //Se crea una variable con el mensaje que mostrará el log
        let mensaje = "Los números impares entremedios de mayor a menor son: " + mayorNumero;
        //Se crea una variable para el mejor entendimiento del código
        let numeroAMostrar = mayorNumero;
        //Se crea un bucle que no para hasta llegar al último numero impar más pequenio
        while ((numeroAMostrar > menorNumero) && (menorNumero + 1 != numeroAMostrar)) {
            //Se le resta 2 al numero impar
            numeroAMostrar = numeroAMostrar - 2;
            //Se aniade al mensaje
            mensaje += ", " + numeroAMostrar;
        }
        //Se muestra el mensaje entero
        console.log(mensaje);
    }
}