import { InterfazPlaneta } from "../interfaces/planeta";

/**
 * Clase que permite construir un nuevo 
 * planeta usando su interfaz
 */
export class ClasePlaneta implements InterfazPlaneta {

    /**
     * Constructor de la clase planeta
     * @param id del planeta
     * @param name nombre del planeta
     * @param rotation_period tiempo que tarda en dar una vuelta sobre si mismo
     * @param orbital_period tiempo que tarda en dar una vuelta a su orbita
     * @param climate clima del planeta
     */
    constructor(public id: number, public name: string, public rotation_period: number, public orbital_period: number, public climate: string) {
        this.id = id;
        this.name = name;
        this.rotation_period = rotation_period;
        this.orbital_period = orbital_period;
        this.climate = climate;
    }

}