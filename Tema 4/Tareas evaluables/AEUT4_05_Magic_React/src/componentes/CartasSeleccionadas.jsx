const CartasSeleccionadas = (props) => {
    const cartasMazo = props.cartas;

    const calcularPrecioMonton = (carta) => {
        return (carta.amount * carta.card.prices.usd).toFixed(2);
    }

    const totalCartas = () => {
        let cartasTotales = 0;
        cartasMazo.forEach(carta => {
            cartasTotales += carta.amount;
        });
        return cartasTotales;
    }
    
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
                            <td className="cantidadSeleccionada">{cartaSeleccionada.amount}</td>
                            <td className="cantidadSeleccionada">{cartaSeleccionada.card.prices.usd}</td>
                            <td className="cantidadSeleccionada">{calcularPrecioMonton(cartaSeleccionada)}</td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <th>Cantidad total</th>
                        <th>{totalCartas()}</th>
                        <th>Precio total</th>
                        <th>{totalPrecio()}</th>
                    </tr>
                </tfoot>
            </table>
        </>
    )
}

export default CartasSeleccionadas;