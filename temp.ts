
const pos = [3, 0]

const goto = [3, 0]

const width = 14
const height = 5

const beenTo: number [][] = []
const blocks: number [][] = [
    [3, 2],
]

const order = [0, 1]

const diff = []

for (let i = 0; i < goto.length; i++) {
    diff.push(goto[i] ? goto[i]/Math.abs(goto[i]) : 0)
}

for (let oi = 0; oi < 2; oi++) {
    const i = order[oi]
    while (pos[i] != goto[i]) {
        pos[i] += diff[i]
        beenTo.push([...pos])
    }
}

// return beenTo

/// garbage

const renderstr: string [][] = []

for (let y = height - 1; y >= 0; y--) {
    const xlist = []
    for (let x = 0; x < width; x++) {
        xlist.push("--")
    }
    renderstr.push(xlist)
}

renderstr[pos[1]][pos[0]] = "##"

for (const beenPos of beenTo) {
    renderstr[beenPos[1]][beenPos[0]] = "##"
}

for (const blockPos of blocks) {
    renderstr[blockPos[1]][blockPos[0]] = "//"
}

if (beenTo[beenTo.length - 1][0] == goto[0] && beenTo[beenTo.length - 1][1] == goto[1]) {
    renderstr[goto[1]][goto[0]] = "ØØ"
} else {
    renderstr[goto[1]][goto[0]] = "OO"
}


for (let y = height - 1; y >= 0; y--) {
    let outline = ""
    for (let x = 0; x < width; x++) {
        outline += renderstr[y][x] + ' '
    }
    console.log(outline)
}

console.log(beenTo)
