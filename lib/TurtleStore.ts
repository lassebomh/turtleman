import { Turtle } from './Turtle.ts';

export type TurtleStore = {
    [id: string]: {
        turtle: Turtle,
        resolvePayload: (resolve: JSON) => void
        resolveRequest: (resolve: string) => void
    }
}