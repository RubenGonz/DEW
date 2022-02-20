import { useEffect, useState } from "react";
import { Fetch } from "../hooks/Fetch";
import ListaCartas from "./ListaCartas";
import CartasSeleccionadas from './CartasSeleccionadas';

/**
 * Componente que engloba la página
 * @returns html de la página
 */
const PaginaCartas = () => {
    const [cartasGuardadas, setStorage] = useState([]);
    const cartasApi = Fetch();

    /**
     * Función que obtiene las cartas de localStorage
     * @returns cartas en Json
     */
    const obtenerCartas = () => {
        return JSON.parse(localStorage.getItem('cartas-guardadas'));
    }

    /**
     * Metodo que guarda en el estado las cartas del localStorage
     */
    useEffect(() => {
        if (localStorage.getItem("cartas-guardadas")) {
            setStorage(obtenerCartas());
        }
    }, []);

    /**
     * Metodo que guarda las cartas en el localStorage
     */
    useEffect(() => {
        localStorage.setItem("cartas-guardadas", JSON.stringify(cartasGuardadas));
    }, [cartasGuardadas]);


    /**
     * Funcion que busca una carta 
     * @param {string} id id de la carta
     * @returns indice de la carta
     */
    const buscarCarta = (id) => {
        return cartasGuardadas.findIndex(item => item.card.id === id);
    }

    /**
     * Función que aniade una carta a las cartas 
     * @param {*} card carta a guardar
     */
    const aniadirSeleccionada = (card) => {
        setStorage((old) => {
            const index = buscarCarta(card.id);
            if (index === -1) return [...old, { card, cantidad: 1 }];
            const cartaEncontrada = [...old][index];
            let copia = [...old];
            if (cartaEncontrada.cantidad >= 4) return copia;
            copia.splice(index, 1, { card, cantidad: cartaEncontrada.cantidad++ });
            return copia;
        });
    };

    return (
        <>
            <div className="cartasApi">
                <ListaCartas cartas={cartasApi} add={aniadirSeleccionada} />
            </div>
            <div className="cartasSeleccionadas">
                <CartasSeleccionadas cartas={cartasGuardadas} />
            </div>
        </>
    )
}

export default PaginaCartas;