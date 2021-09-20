import { Turtle } from '../lib/Turtle.ts'
import { TurtleMan } from '../lib/TurtleMan.ts'

class ExampleTurtle extends Turtle  {
    async loop() {
        await this.turnTowards(0, 1)
    }
}

const HOST = 'localhost'
const PORT = 8000

const tman = new TurtleMan(HOST, PORT)

tman.assign((id: string) => {
    return new ExampleTurtle(id)
})