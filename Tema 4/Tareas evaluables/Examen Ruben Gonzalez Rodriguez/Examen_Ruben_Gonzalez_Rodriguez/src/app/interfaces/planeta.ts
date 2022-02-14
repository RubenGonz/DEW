/**
 * Interfaz de los planetas
 */
export interface InterfazPlaneta {
    id: number;
    name: string;
    rotation_period: number;
    orbital_period: number;
    climate: string;
}