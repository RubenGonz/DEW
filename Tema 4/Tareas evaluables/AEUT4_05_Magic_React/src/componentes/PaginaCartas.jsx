import { useEffect, useState } from "react";
import { Fetch } from "../hooks/Fetch";
import ListaCartas from "./ListaCartas";
import CartasSeleccionadas from './CartasSeleccionadas';

const PaginaCartas = () => {
    const [cartasGuardadas, setStorage] = useState([]);
    const cartas = Fetch();

    const obtenerCartas = () => {
        return JSON.parse(localStorage.getItem('cartas-guardadas'));
    }

    /**
     * Hook que guarda en el estado las cartas del local storage
     */
    useEffect(() => {
        if (localStorage.getItem("cartas-guardadas")) {
            setStorage(obtenerCartas());
        }
    }, []);

    /**
     * Hook que guarda en el local storage las cartas
     */
    useEffect(() => {
        localStorage.setItem("cartas-guardadas", JSON.stringify(cartasGuardadas));
    }, [cartasGuardadas]);


    /**
     * Funcion que busca una carta en el array de cartas guardadas
     * @param {string} id de la carta
     * @returns indice de la carta en el array de cartas guardadas
     */
    const buscarCarta = (id) => {
        return cartasGuardadas.findIndex(item => item.card.id === id);
    }

    /**
     * Metodo que aniade una carta al deck de cartas seleccionadas
     * NOTA: NO FUNCIONA BIEN, SOBREESCRIBE LAS CARTAS CUANDO ANIADES MAS DE 1, TENGO QUE REVISARLO
     * @param {card} card a aniadir
     */
    const aniadirSeleccionada = (card) => {
        setStorage((old) => {
            const indexCard = buscarCarta(card.id);
            if (indexCard === -1) return [...old, { card, amount: 1 }];
            const foundCard = [...old][indexCard]
            return [...old].splice(indexCard, 1, { card, amount: foundCard.amount++ });
        });
    };

    return (
        <>
            <div className="cartasApi">
                <ListaCartas cartas={cartas} add={aniadirSeleccionada} />
            </div>
            <div className="cartasSeleccionadas">
                <CartasSeleccionadas cartas={cartasGuardadas} />
            </div>
        </>
    )
}

export default PaginaCartas;