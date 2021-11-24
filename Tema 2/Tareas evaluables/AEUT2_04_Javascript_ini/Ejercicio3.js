/* Realiza un programa que pida números por teclado hasta que nos 
 * introduzcan un número menor que 1 o mayor que 50, momento en el que se invertirán los 
 * elementos dentro del array. Mostrar el array invertido. Se valorará el uso de 1 solo array para todo 
 * el programa.
*/

function ejercicio3() {

    //Creamos el array donde trabajaremos
    var array = [];

    //Creamos un bucle que pregunte al usuario numeros 
    do {
        //Se pide el numero al usuario
        var numeroIntroducido = parseInt(prompt("Introduzca numeros entre 1 y 50"));
        //Se evalua si ha metido un numero
        if (isNaN(numeroIntroducido)) {
            //Se manda un mensaje de error
            alert("Este valor no es válido");
            //Se evalua si está entre los numeros indicados
        } else if ((numeroIntroducido <= 50) && (numeroIntroducido >= 1)) {
            //Se mete al array
            array.push(numeroIntroducido);
        }
        //Ponemos las condiciones para poder salir del bucle
    } while ((numeroIntroducido <= 50) && (numeroIntroducido >= 1) && (!isNaN(numeroIntroducido)));

    if (array.length > 0) {
        //Mostramos el array original para comparar
        console.log("El array original es:");
        console.log(array);

        //Mostramos el array invertido para comparar
        console.log("El array invertido es:");
        console.log(array.reverse());
    } else {
        console.log("No hay valores para mostrar un array");
    }
}
