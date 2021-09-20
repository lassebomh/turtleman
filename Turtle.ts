import { TurtleStore } from './TurtleStore.ts'

export class Turtle {
    id: string
    online = false;

    x = 0
    y = 0
    z = 0
    directionX = 1
    directionY = 0
    surfaceLevel = 0

    turtles: TurtleStore

    constructor(id: string, turtles: TurtleStore) {
        this.id = id;
        this.turtles = turtles;
    }

    async connect() {
        this.online = true
        console.log(`Turtle #${this.id} has connected`)

        const l = async () => {
            if (this.online) {
                await this.loop()
                l()
            }
        }

        await this.onConnect()
        l()
    }

    disconnect() {
        this.online = false
        console.log(`Turtle #${this.id} has disconnected`)
        this.onDisconnect()
    }

    onConnect() {}
    onDisconnect() {}
    loop() {}


    eval(lua: string): Promise<JSON> {
        this.turtles[this.id].resolveRequest(lua)

        return new Promise<JSON>((resolve, reject) => {
            
            const timeout = setTimeout(() => {
                reject()
                this.disconnect()
            }, 15000);

            this.turtles[this.id].resolvePayload = (json) => {
                clearTimeout(timeout)
                resolve(json)
            }
        })
    }

    nextTo(x: number, y: number, z: number): boolean {
        const diffX = x - this.x
        const diffY = y - this.y
        const diffZ = z - this.z

        return Math.abs(diffX) + Math.abs(diffY) + Math.abs(diffZ) === 1
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

    async turnTowards(x: number, y: number): Promise<boolean> {

        let diffX = x - this.x
        let diffY = y - this.y

        if (this.directionX == -1) {
            [diffX, diffY] = [-diffX, -diffY]
        } else if (this.directionY == 1) {
            [diffX, diffY] = [diffY, -diffX]
        } else if (this.directionY == -1) {
            [diffX, diffY] = [-diffY, diffX]
        }

        if (diffX >= Math.abs(diffY)) {
            return await true
        } else if (diffY >= Math.abs(diffX)) {
            return await this.turnLeft()
        } else if (-diffY >= Math.abs(diffX)) {
            return await this.turnRight()
        } else if (-diffX >= Math.abs(diffY)) {
            return await this.turnLeft() && await this.turnLeft()
        }
        
        return await true
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

    // async walkTo(x, y, z): Promise<boolean> {
    //     return await 
    // }
}