import Carta from "./Carta";

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