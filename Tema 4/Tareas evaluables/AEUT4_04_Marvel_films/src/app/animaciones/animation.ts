import { animate, query, style, transition, trigger } from "@angular/animations"

/**
 * Constante que guarda nuestra animacion 
 */
export const animacion =
    trigger('myAnimation', [
        transition('* => *', [
            query(
                ':enter',
                [style({ opacity: 0 })],
                { optional: true }
            ),
            query(
                ':leave',
                [style({ opacity: 1 }), animate('0.3s', style({ opacity: 0 }))],
                { optional: true }
            ),
            query(
                ':enter',
                [style({ opacity: 0 }), animate('0.3s', style({ opacity: 1 }))],
                { optional: true }
            )
        ])
    ]);
