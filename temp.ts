
class Turtle {
    x = 0
    y = 0
    z = 0
    directionX = 1
    directionY = 0

    async turnTowards(x: number, y: number): Promise<number []> {
        const diffX = x - this.x 
        const diffY = y - this.y 

        let ratioXY = diffX / diffY
        let ratioYX = diffY / diffX

        ratioXY = ratioXY == Infinity ? 1 : (ratioXY == -Infinity ? -1 : (ratioXY != ratioXY ? 0 : ratioXY))
        ratioYX = ratioYX == Infinity ? 1 : (ratioYX == -Infinity ? -1 : (ratioYX != ratioYX ? 0 : ratioYX))
        
        return await [ratioXY, ratioYX]
        // return await (diffXY ? diffXY/Math.abs(diffXY) : 0)
    }

    async turnLeft(): Promise<boolean> {
        console.log('turn left')
        return await true
    }

    async turnRight(): Promise<boolean> {
        console.log('turn right')
        return await true
    }
}

const t = new Turtle()


console.log(await t.turnTowards(10, 1));
console.log(await t.turnTowards(0, 1));
console.log(await t.turnTowards(1, 0));


// console.log("expected result =", -1);
// console.log("actual result   =", await t.turnTowards(0, 1));
// console.log();

// console.log("expected result =", 1);
// console.log("actual result   =", await t.turnTowards(0, -1));
// console.log();

// console.log("expected result =", 2, -2);
// console.log("actual result   =", await t.turnTowards(-1, 0));
// console.log();

// console.log("expected result =", -1);
// console.log("actual result   =", await t.turnTowards(1, 10));
// console.log();

// console.log("expected result =", 1);
// console.log("actual result   =", await t.turnTowards(-1, -10));
// console.log();

// console.log("expected result =", 0);
// console.log("actual result   =", await t.turnTowards(10, 1));
// console.log();

// console.log("expected result =", 2, -2);
// console.log("actual result   =", await t.turnTowards(-10, 1));
// console.log();


/* 

a task is a function
tasks are an array of functions that recursively return success

*/