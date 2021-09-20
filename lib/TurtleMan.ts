import { Application, Router, Response, Request } from 'https://deno.land/x/oak@v9.0.0/mod.ts'
import { TurtleStore } from './TurtleStore.ts'
import { Turtle } from './Turtle.ts'

export class TurtleMan {
    turtles: TurtleStore = { }

    assignFunc = (id: string): Turtle => {return new Turtle(id, this)}

    assign(func: (id: string) => Turtle) {
        this.assignFunc = func
    }

    start(HOST: string, PORT: number): Promise<void> {

        const postPayload = async ({ request, response }: { params: { name: string }; response: Response, request: Request }) => {

            const id = request.url.searchParams.get("id")
            if (id == null) {
                throw new Error("id is null")
            }
            
            const bodyRaw = request.body({ type: "json" });
            const body = await bodyRaw.value;

            const promiseRequest = new Promise<string>((resolve) => {
                
                if (this.turtles[id] === undefined) {
                    this.turtles[id] = {
                        turtle: this.assignFunc(id),
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
                
        app.use(async (context) => {
            const root = Deno.cwd() + '/lib/static/'
            try {
                await context.send({ root })
            } catch {
                context.response.status = 404
                context.response.body = `"${context.request.url}" not found`
            }
        })

        app.use(router.routes())
        app.use(router.allowedMethods())

        console.log('C:\\Users\\lasse\\Code\\turtleman\\lib\\static\\');

        console.log(`Listening on http://${HOST}:${PORT}/`)

        return app.listen(`${HOST}:${PORT}`)
    }
}
