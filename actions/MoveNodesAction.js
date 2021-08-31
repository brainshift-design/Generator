class MoveNodesAction
extends Action
{
    nodeIds;

    fromPos;
    toPos;

    from;
    to;



    constructor(nodeIds, fromPos, toPos)
    {
        super('Move Nodes');

        
        this.nodeIds = [...nodeIds];

        this.fromPos = fromPos;
        this.toPos   = toPos;

        const dx = this.toPos.x - this.fromPos.x;
        const dy = this.toPos.y - this.fromPos.y;


        this.from = [];
        this.to   = [];

        for (const id of this.nodeIds)
        {
            const node = uiGraph.nodeFromId(id);

            this.from.push({ x: node.div.slx,      y: node.div.sly      });
            this.to  .push({ x: node.div.slx + dx, y: node.div.sly + dy });
        }
    }



    do()
    {
        for (var i = 0; i < this.nodeIds.length; i++)
        {
            const node = uiGraph.nodeFromId(this.nodeIds[i]);

            setNodePosition(
                node.div.op,
                this.to[i].x,
                this.to[i].y);
        }
    }



    undo()
    {
        for (var i = 0; i < this.nodeIds.length; i++)
        {
            const node = uiGraph.nodeFromId(this.nodeIds[i]);

            setNodePosition(
                node.div.op,
                this.from[i].x,
                this.from[i].y);
        }
    }
}