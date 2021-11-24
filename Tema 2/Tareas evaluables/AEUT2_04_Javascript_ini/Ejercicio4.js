/* Programa que pide una frase y devuelve  cuantas veces aparece de cada una
 * de las 4 primeras letras del abcedario (nº de a’s, de b’s, etc.). Prueba con “Cuenta la leyenda que 
 * los dioses castigaron a algunos hombres convirtiéndolos en águilas.
*/

function ejercicio4() {

    //Se crea un bucle que para cuando se introduzca un texto
    do {
        //Se pide un texto
        var texto = prompt("Introduce el texto");
        //Se evalua si es válido
        if (!isNaN(texto)) {
            //Se manda un mensaje de error
            alert("No ha introducido ningun texto");
        }
        //Se establece la condicion del bucle    
    } while (!isNaN(texto));

    //Se muestra el texto para comparar posteriormente
    console.log("El texto original es:")
    console.log(texto);

    //Se pone todo en mayusculas para abarcarlas al contar
    texto = texto.toUpperCase();

    //Se crean variables que sirven como contador
    let contadorA = 0, contadorB = 0, contadorC = 0, contadorD = 0;

    //Se ejecuta el conteo tantas veces como elementos tenga el texto
    for (i = 0; i < texto.length; i++) {
        //Se separa cada elemento del texto
        let letraATratar = texto.substring(i, i + 1);
        //Se evalua si la letra coindice y se suma 1 al contador
        switch (letraATratar) {
            case "A":
            case "Á":
            case "À":
            case "Ä":
                contadorA++;
                break;
            case "B":
                contadorB++;
                break;
            case "C":
                contadorC++;
                break;
            case "D":
                contadorD++;
                break;
        }
    }
    
    //Se muestran los resultados
    console.log("Hay " + contadorA + " 'a's");
    console.log("Hay " + contadorB + " 'b's");
    console.log("Hay " + contadorC + " 'c's");
    console.log("Hay " + contadorD + " 'd's");
}
