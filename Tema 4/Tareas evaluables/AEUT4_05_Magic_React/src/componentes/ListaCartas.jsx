import Carta from "./Carta";

/**
 * Componente que muestra la lista de cartas de la api
 * @param {*} props cartas de la api
 * @returns plantillas con la carta por parametro
 */
const ListaCartas = (props) => {
    return (
        <>
            {props.cartas.map((card) => (
                <Carta key={card.id} card={card} add={props.add}/>
            ))}
        </>
    )
}

export default ListaCartas;