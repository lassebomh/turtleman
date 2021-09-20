import { Turtle } from './Turtle.ts'

export class ExampleTurtle extends Turtle  {
    async onConnect() {
        
    }

    onDisconnect() {
    }

    async loop() {
        await this.turnTowards(0, 1)
    }
}
