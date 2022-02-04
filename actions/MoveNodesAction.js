// class MoveNodesAction
// extends Action
// {
//     nodeIds;

//     fromPos;
//     toPos;

//     from;
//     to;



//     constructor(nodeIds, fromPos, toPos)
//     {
//         super('move nodes');


//         this.nodeIds = [...nodeIds];

//         this.fromPos = fromPos;
//         this.toPos   = toPos;

//         const dx = this.toPos.x - this.fromPos.x;
//         const dy = this.toPos.y - this.fromPos.y;


//         this.from = [];
//         this.to   = [];

//         for (const id of this.nodeIds)
//         {
//             const node = graph.nodeFromId(id);

//             this.from.push(point(node.div.slx,      node.div.sly     ));
//             this.to  .push(point(node.div.slx + dx, node.div.sly + dy));
//         }
//     }



//     do()
//     {
//         for (var i = 0; i < this.nodeIds.length; i++)
//         {
//             const node = graph.nodeFromId(this.nodeIds[i]);

//             setNodePosition(
//                 node.div.op,
//                 this.to[i].x,
//                 this.to[i].y);
//         }
//     }



//     undo()
//     {
//         for (var i = 0; i < this.nodeIds.length; i++)
//         {
//             const node = graph.nodeFromId(this.nodeIds[i]);

//             setNodePosition(
//                 node.div.op,
//                 this.from[i].x,
//                 this.from[i].y);
//         }
//     }
// }