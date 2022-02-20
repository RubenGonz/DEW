import { useEffect, useState } from "react";

/**
 * Hook que interactua con una api
 * @returns cartas de la api
 */
export const Fetch = () => {
    const API = 'https://api.scryfall.com/cards/search?order=set&q=e%3Augin&unique=prints';
    const [cartas, setCards] = useState([]);

    useEffect(() => obtenerCartasApi());

    /**
     * Metodo que recoge las cartas de la API y las guarda en el estado
     */
    const obtenerCartasApi = async () => {
        try {
            const cartas = await fetch(API).then(result => result.json());
            setCards([...cartas.data]);
        } catch (error) {
            console.log(error);
        }
    }
    return cartas;
}
