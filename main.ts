import { Turtle } from './lib/Turtle.ts'
import { TurtleMan } from './lib/TurtleMan.ts'

class ExampleTurtle extends Turtle  {
    async loop() {
        await this.turnTowards(0, 1)
    }
}

const tman = new TurtleMan()

tman.assign((id: string) => {
    return new ExampleTurtle(id, tman)
})

await tman.start('localhost', 8000)