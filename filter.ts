
// type point = [number, number, number]

const list = JSON.parse(Deno.readTextFileSync('./static/data.json'))

let listOut: point [] = []

const lookup: boolean [][][] = []

for (let i = 0; i < list.length; i++) {
    const p: point = list[i];
    if (lookup[p[0]] == null) {
        lookup[p[0]] = []
    }
    if (lookup[p[0]][p[1]] == null) {
        lookup[p[0]][p[1]] = []
    }
    if (lookup[p[0]][p[1]][p[2]] == null) {
        lookup[p[0]][p[1]][p[2]] = true
    }
}

for (let i = 0; i < list.length; i++) {
    const p: point = list[i];

    const diffs = [
        [1,0,0],
        [-1,0,0],
        [0,1,0],
        [0,-1,0],
        [0,0,1],
        [0,0,-1],
    ]

    const neighborBools = diffs.map((d) => {
        return !(!lookup[p[0] - d[0]] || !lookup[p[0] - d[0]][p[1] - d[1]] || !lookup[p[0] - d[0]][p[1] - d[1]][p[2] - d[2]])
    })

    if(neighborBools.filter(Boolean).length < 6) {
        listOut.push(p);
    }
}

let minX = list[0][0]
let maxX = list[0][0]
let minY = list[0][1]
let maxY = list[0][1]
let minZ = list[0][2]
let maxZ = list[0][2]

for (let i = 0; i < list.length; i++) {
    const p: point = list[i];

    if (p[0] < minX) {
        minX = p[0]
    }
    if (p[0] > maxX) {
        maxX = p[0]
    }
    if (p[1] < minY) {
        minY = p[0]
    }
    if (p[1] > maxY) {
        maxY = p[0]
    }
    if (p[2] < minY) {
        minY = p[2]
    }
    if (p[2] > maxY) {
        maxY = p[2]
    }
}

listOut = listOut.map((e) => {
    return [e[0] - (minX + maxX)/2, e[1] - (minY + maxY)/2, e[2] - (maxZ - minZ)]
})

Deno.writeTextFileSync('./static/data.json', JSON.stringify(listOut));