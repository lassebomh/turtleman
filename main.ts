import { Application, Router } from 'https://deno.land/x/oak@v9.0.0/mod.ts'


class Turtle {
    id: string
    online = false;

    x = 0
    y = 0
    z = 0
    directionX = 1
    directionY = 0
    surfaceLevel = 0

    async connect() {
        this.online = true
        console.log(`Turtle #${this.id} has connected`)

        const l = async () => {
            if (this.online) {
                // setTimeout(async () => {
                await this.loop()
                l()
                // }, 1500)
            }
            await this.onDisconnect()
        }

        await l()
        await this.onConnect()
    }

    disconnect() {
        this.online = false
        console.log(`Turtle #${this.id} has disconnected`)
    }

    onConnect() {}
    onDisconnect() {}
    loop() {}

    constructor(id: string) {
        this.id = id;
    }

    eval(lua: string): Promise<JSON> {
        turtles[this.id].resolveRequest(lua)

        return new Promise<JSON>((resolve, reject) => {
            
            const timeout = setTimeout(() => {
                reject()
                this.disconnect()
            }, 15000);

            turtles[this.id].resolvePayload = (json) => {
                clearTimeout(timeout)
                resolve(json)
            }
        })
    }

    async forward(): Promise<boolean> {
        const success = await <boolean><unknown>this.eval("turtle.forward()")
        if (success) {
            this.x += this.directionX
            this.y += this.directionY
        }
        return success
    }

    async back(): Promise<boolean> {
        const success = await <boolean><unknown>this.eval("turtle.back()")
        if (success) {
            this.x -= this.directionX
            this.y -= this.directionY
        }
        return success
    }

    async up(): Promise<boolean> {
        const success = await <boolean><unknown>this.eval("turtle.up()")
        if (success) {
            this.z++
        }
        return success
    }

    async down(): Promise<boolean> {
        const success = await <boolean><unknown>this.eval("turtle.down()")
        if (success) {
            this.z--
        }
        return success
    }

    async turnLeft(): Promise<boolean> {
        const success = await <boolean><unknown>this.eval("turtle.turnLeft()")
        if (success) {
            [this.directionX, this.directionY] = [-this.directionY, this.directionX]
            
        }
        return success
    }

    async turnRight(): Promise<boolean> {
        const success = await <boolean><unknown>this.eval("turtle.turnRight()")
        if (success) {
            [this.directionX, this.directionY] = [this.directionY, -this.directionX]
        }
        return success
    }

    async turnTowards(x: number, y: number, _z: number): Promise<boolean> {
        const diffX = this.x - x
        const diffY = this.y - y
        const flatdiffX = this.directionX - diffX/Math.abs(diffX)
        const flatdiffY = this.directionY - diffY/Math.abs(diffY)

        return await true;
    }

    async placeDown(): Promise<boolean> {
        const success = await <boolean><unknown>this.eval("turtle.placeDown()")
        // if (success) {}
        return success
    }

    async placeUp(): Promise<boolean> {
        const success = await <boolean><unknown>this.eval("turtle.placeUp()")
        // if (success) {}
        return success
    }

    async detect(): Promise<boolean> {
        return await <boolean><unknown>this.eval("turtle.detect()")
    }

    async detectUp(): Promise<boolean> {
        return await <boolean><unknown>this.eval("turtle.detectUp()")
    }

    async detectDown(): Promise<boolean> {
        return await <boolean><unknown>this.eval("turtle.detectDown()")
    }

    async compare(): Promise<boolean> {
        return await <boolean><unknown>this.eval("turtle.compare()")
    }

    async compareUp(): Promise<boolean> {
        return await <boolean><unknown>this.eval("turtle.compareUp()")
    }

    async compareDown(): Promise<boolean> {
        return await <boolean><unknown>this.eval("turtle.compareDown()")
    }

    async shellRun(command: string): Promise<boolean> {
        return await <boolean><unknown>this.eval(`shell.run(\"${command}\")`)
    }

}

const turtles: {
    [id: string]: {
        turtle: Turtle,
        resolvePayload: (resolve: JSON) => void
        resolveRequest: (resolve: string) => void
    }
} = { }

class ExampleTurtle extends Turtle  {
    async onConnect() {
        console.log(this.x, this.y, this.z)
        console.log(this.directionX, this.directionY)
        await this.forward()
        await this.turnRight()
        await this.forward()
        console.log(this.x, this.y, this.z)
        console.log(this.directionX, this.directionY)
    }

    onDisconnect() {
    }

    async loop() {
        // await this.turnRight()
        // await this.forward()
        // await this.forward()
    }
}

const postPayload = async ({ request, response }: { params: { name: string }; response: any, request: any }) => {

    const id: string = request.url.searchParams.get("id")
    
    const bodyRaw = request.body({ type: "json" });
    const body = await bodyRaw.value;

    const promiseRequest = new Promise<string>((resolve) => {
        
        if (turtles[id] === undefined) {
            turtles[id] = {
                turtle: new ExampleTurtle(request.url.searchParams.get("id")),
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


