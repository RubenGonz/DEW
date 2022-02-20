/**
 * Componente que muestra la información de las cartas
 * seleccionadas en una tabla
 * @param {*} props cartas seleccionadas
 * @returns tabla en html
 */
const CartasSeleccionadas = (props) => {
    const cartasMazo = props.cartas;

    /**
     * Función que calcula el precio una cantidad de cartas
     * @param {*} carta carta
     * @returns precio conjunto
     */
    const calcularPrecioMonton = (carta) => {
        return (carta.cantidad * carta.card.prices.usd).toFixed(2);
    }

    /**
     * Función que calcula el total de cartas
     * @returns numero de cartas
     */
    const totalCartas = () => {
        let cartasTotales = 0;
        cartasMazo.forEach(carta => {
            cartasTotales += carta.cantidad;
        });
        return cartasTotales;
    }

    /**
     * Función que calcula el precio total de cartas
     * @returns precio de las cartas
     */
    const totalPrecio = () => {
        let precioTotal = 0;
        cartasMazo.forEach(carta => {
            precioTotal += parseFloat(calcularPrecioMonton(carta));
        });
        return precioTotal.toFixed(2);
    }

    return (
        <>
            <table className="tabla">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Cantidad</th>
                        <th>Precio</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {cartasMazo.map(cartaSeleccionada => (
                        <tr key={cartaSeleccionada.card.id}>
                            <td>{cartaSeleccionada.card.name}</td>
                            <td className="cantidadSeleccionada">{cartaSeleccionada.cantidad}</td>
                            <td className="cantidadSeleccionada">{cartaSeleccionada.card.prices.usd}€</td>
                            <td className="cantidadSeleccionada">{calcularPrecioMonton(cartaSeleccionada)}€</td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <th>Cantidad total</th>
                        <th>{totalCartas()}</th>
                        <th>Precio total</th>
                        <th>{totalPrecio()}€</th>
                    </tr>
                </tfoot>
            </table>
        </>
    )
}

export default CartasSeleccionadas;