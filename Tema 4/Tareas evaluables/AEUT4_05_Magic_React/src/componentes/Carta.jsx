/**
 * Componente plantilla de una carta de la lista de cartas
 * @param {*} props carta
 * @returns 
 */
const Carta = (props) => {
  const card = props.card;
  return (
    <div className='carta'>
      <img className='imagenCarta' onClick={() => props.add(card)} src={card.image_uris.normal} alt={card.name} />
      <p className='nombreCarta'>{card.name}</p>
      <button className='botonCarta' onClick={() => props.add(card)}>Añadir al carrito</button>
    </div>
  );
}

export default Carta;