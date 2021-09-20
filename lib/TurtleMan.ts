import { Application, Router } from 'https://deno.land/x/oak@v9.0.0/mod.ts'
import { TurtleStore } from './TurtleStore.ts'
import { Turtle } from './Turtle.ts'

export class TurtleMan {
    turtles: TurtleStore = { }

    host: string
    port: number

    assignFunc = function(id: string): Turtle {return new Turtle(id)}

    constructor(host: string, port: number) {
        this.host = host
        this.port = port
    }

    assign(func: (id: string) => Turtle) {
        this.assignFunc = func
    }

    start(): Promise<void> {

        const postPayload = async ({ request, response }: { params: { name: string }; response: any, request: any }) => {

            const id: string = request.url.searchParams.get("id")
            
            const bodyRaw = request.body({ type: "json" });
            const body = await bodyRaw.value;

            const promiseRequest = new Promise<string>((resolve) => {
                
                if (this.turtles[id] === undefined) {
                    this.turtles[id] = {
                        turtle: this.assignFunc(request.url.searchParams.get("id")),
                        resolveRequest: resolve,
                        resolvePayload: (_resolve: JSON) => {},
                    }

                    this.turtles[id].turtle.connect()
                } else {
                    this.turtles[id].resolveRequest = resolve
                    this.turtles[id].resolvePayload(body)
                }
            })

            const evalString = await promiseRequest
            
            response.status = 200
            response.body = evalString
        }

        const router = new Router()
            .post('/carry', postPayload)

        const app = new Application()

        app.use(router.routes())
        app.use(router.allowedMethods())

        console.log(`Listening on http://${this.host}:${this.port}`)

        return app.listen(`${this.host}:${this.port}`)
    }
}
