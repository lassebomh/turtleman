import { createRequire } from "https://deno.land/std@0.106.0/node/module.ts";

const require = createRequire(import.meta.url);
const PF = require("./modules/PathFinding3D.js-master/index.js");

console.log(PF);

var nodes = [
    new PF.Node(0,0,0),
    new PF.Node(1,0,0),
    new PF.Node(2,0,0),
    new PF.Node(1,1,0),
    new PF.Node(2,1,0),
];

nodes[0].neighbors.push(nodes[1]);
nodes[1].neighbors.push(nodes[0],nodes[2],nodes[3]);
nodes[2].neighbors.push(nodes[1],nodes[4]);
nodes[3].neighbors.push(nodes[1],nodes[4]);
nodes[4].neighbors.push(nodes[3],nodes[2]);

var finder = new PF.AStarFinder();
var path = finder.findPath(nodes[0], nodes[3], nodes);

console.log(path);
