const DOM = {
    input: {
        nombre: document.getElementById("nptNombre"),
        color: document.getElementById("nptColor"),
        fuente: document.getElementsByName("fuente")
    },
    resultado: document.getElementById("resultado")
}
const mostrarResultado = () => {
    let nombre = DOM.input.nombre.value;
    let color = DOM.input.color.value;
    let fuente = Array.from(DOM.input.fuente).filter(input => input.checked)[0].value;
    DOM.resultado.innerHTML = nombre;
    DOM.resultado.style.color = color;
    DOM.resultado.style.fontFamily = fuente;
}