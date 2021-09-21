import { createRequire } from "https://deno.land/std@0.106.0/node/module.ts"
import { Space, getNeighbors } from './lib/spacial.ts'

const require = createRequire(import.meta.url)
const PF = require("./modules/PathFinding3D.js-master/index.js")

let s = new Space(JSON.parse(Deno.readTextFileSync('./static/data.json')))

const nodes: any[] = []

for (let i = 0; i < s.points.length; i++) {
    nodes.push(new PF.Node(...s.points[i]))
}

for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i]

    getNeighbors([node.x, node.y, node.z]).forEach(n => {
        if (s.exists(n)) {
            node.neighbors.push(nodes[s.indexOf([n[0], n[1], n[2]])])
        }
    });
}


const finder = new PF.AStarFinder();

const startNode = nodes[Math.floor(Math.random()*nodes.length)]
const endNode = nodes[Math.floor(Math.random()*nodes.length)]

let path = []

let tries = 0
while (path.length == 0 && tries < 20) {
    tries++
    console.log(`attempt n.${tries}`);
    path = finder.findPath(startNode, endNode, nodes);
}

if (path.length == 0) {
    Deno.writeTextFileSync('./static/path.json', JSON.stringify([[startNode.x, startNode.y, startNode.z], [endNode.x, endNode.y, endNode.z]]));
    
    throw new Error("Empty path")
} else {
    Deno.writeTextFileSync('./static/path.json', JSON.stringify(path));
}



// nodes[0].neighbors.push(nodes[1])
// nodes[1].neighbors.push(nodes[0],nodes[2],nodes[3])
// nodes[2].neighbors.push(nodes[1],nodes[4])
// nodes[3].neighbors.push(nodes[1],nodes[4])
// nodes[4].neighbors.push(nodes[3],nodes[2])

// var points = [
//     [6,5,0],
//     [7,5,0],
//     [8,2,0],
//     [9,2,0],
// ]

// var t0 = performance.now()
// var t1 = performance.now()
// console.log((t1 - t0) + " milliseconds.")
