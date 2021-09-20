
type point = [number, number, number]

const list = JSON.parse(Deno.readTextFileSync('./lib/static/suzanne.json'))

const listOut: point [] = []

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

Deno.writeTextFileSync('./lib/static/suzanne1.json', JSON.stringify(listOut));