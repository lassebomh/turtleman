import { createRequire } from "https://deno.land/std@0.106.0/node/module.ts"

const require = createRequire(import.meta.url)
const PF = require("./modules/PathFinding3D.js-master/index.js")

var nodes = [
    new PF.Node(0,0,0),
    new PF.Node(1,0,0),
    new PF.Node(2,0,0),
    new PF.Node(1,1,0),
    new PF.Node(2,1,0),
]

nodes[0].neighbors.push(nodes[1])
nodes[1].neighbors.push(nodes[0],nodes[2],nodes[3])
nodes[2].neighbors.push(nodes[1],nodes[4])
nodes[3].neighbors.push(nodes[1],nodes[4])
nodes[4].neighbors.push(nodes[3],nodes[2])

var points = [
    [6,5,0],
    [7,5,0],
    [8,2,0],
    [9,2,0],
]

const grid: any[][][] = []

// var t0 = performance.now()
// var t1 = performance.now()
// console.log((t1 - t0) + " milliseconds.")
