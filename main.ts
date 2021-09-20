import { Application, Router } from 'https://deno.land/x/oak@v9.0.0/mod.ts'
import { TurtleStore } from './TurtleStore.ts'
import { ExampleTurtle } from './ExampleTurtle.ts'

const turtles: TurtleStore = { }

const postPayload = async ({ request, response }: { params: { name: string }; response: any, request: any }) => {

    const id: string = request.url.searchParams.get("id")
    
    const bodyRaw = request.body({ type: "json" });
    const body = await bodyRaw.value;

    const promiseRequest = new Promise<string>((resolve) => {
        
        if (turtles[id] === undefined) {
            turtles[id] = {
                turtle: new ExampleTurtle(request.url.searchParams.get("id"), turtles),
                resolveRequest: resolve,
                resolvePayload: (_resolve: JSON) => {},
            }

            turtles[id].turtle.connect()
        } else {
            turtles[id].resolveRequest = resolve
            turtles[id].resolvePayload(body)
        }
    })

    const evalString = await promiseRequest
    
    response.status = 200
    response.body = evalString
}

const router = new Router()
router.post('/carry', postPayload)

const HOST = 'localhost'
const PORT = 8000

const app = new Application()

app.use(router.routes())
app.use(router.allowedMethods())

console.log(`Listening on http://${HOST}:${PORT}`)

await app.listen(`${HOST}:${PORT}`)


