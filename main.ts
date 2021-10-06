import { Turtle } from './lib/Turtle.ts'
import { TurtleMan } from './lib/TurtleMan.ts'

const tman = new TurtleMan()

class ExampleTurtle extends Turtle  {
    async loop() {
        await this.turnTowards(0, 1)
    }
}

tman.assign((id: string) => {
    return new ExampleTurtle(id, tman)
})

await tman.start('localhost', 8000)
