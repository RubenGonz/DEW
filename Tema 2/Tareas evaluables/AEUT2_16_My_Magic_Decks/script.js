const apis = ["https://api.scryfall.com/cards/search?order=set&q=e%3Aitp&unique=prints",
    "https://api.scryfall.com/cards/search?order=set&q=e%3Azne&unique=prints",
    "https://api.scryfall.com/cards/search?order=set&q=e%3Aw17&unique=prints",
    "https://api.scryfall.com/cards/search?order=set&q=e%3Aw16&unique=prints",
    "https://api.scryfall.com/cards/search?order=set&q=e%3Augin&unique=prints"];

const recibirCartas = () => {
    let cartas = [];
    apis.forEach(api => {
        fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                data.data.forEach(elemento => {
                    let carta = {
                        nombre: elemento.name,
                        precio: elemento.prices.eur,
                        baraja: elemento.set_name,
                        colorIdentificador: elemento.color_identity,
                        tipo: elemento.type_line,
                        coste: elemento.mana_cost,
                        imagen: elemento.image_uris.png
                    };
                    cartas.push(carta);
                });
            })
            .catch(error => {
                console.error(error);
            });
    })
    return cartas;
}

const crearCarta = (carta) => {
    let plantilla = document.getElementById("contenido");
    let fragmento = new DocumentFragment();
    

}


function tabla_template(datos) {

    const respuestas = JSON.parse(datos);
    console.log(respuestas);

    //creamos el fragmento
    const fragment = document.createDocumentFragment();
    //buscamos en template
    const template = document.querySelector("#template-fila").content;
    
    respuestas.forEach((item) => {
       //añadimos los valores a cada elemento
       template.querySelectorAll("td")[0].textContent = item.id;
       template.querySelectorAll("td")[1].textContent = item.name;
       template.querySelectorAll("td")[2].textContent = item.email;
       template.querySelectorAll("td")[3].textContent = item.username;
       //Clonamos el template para tener un elemento nuevo
       const clone = template.cloneNode(true);
       //añadimos el clone del template al fragment
       fragment.appendChild(clone);
    });
    //añadimos el fragment al html
    contenido.appendChild(fragment);
}