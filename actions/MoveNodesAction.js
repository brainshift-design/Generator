class MoveNodesAction
extends Action
{
    nodeIds;

    newPositions = [];
    oldPositions = [];



    constructor(nodeIds, newPositions)
    {
        super(
            MOVE_NODES_ACTION,
              'MOVE ' + nodeIds.length 
            + ' ' + countString(nodeIds.length, 'node'));

        this.selfUpdate   = true;
        this.nodeIds      = [...nodeIds];
        this.newPositions = [...newPositions];
    }



    do(updateNodes)
    {
        const movedNodes = this.nodeIds.map(id => nodeFromId(id));

        this.oldPositions = [];


        for (const node of movedNodes)
            this.oldPositions.push(point(node.div.offsetLeft, node.div.offsetTop));


        for (let i = 0; i < movedNodes.length; i++)
            movedNodes[i].setPosition(this.newPositions[i].x, this.newPositions[i].y);

            
        for (const node of movedNodes)
        {
            node.updateMeasureData();
            node.updateNode();
        }


        uiSaveNodes(this.nodeIds);
    }



    undo(updateNodes)
    {
        const movedNodes = this.nodeIds.map(id => nodeFromId(id));


        for (let i = 0; i < movedNodes.length; i++)
            movedNodes[i].setPosition(this.oldPositions[i].x, this.newPositions[i].y);

            
        for (const node of movedNodes)
        {
            node.updateMeasureData();
            node.updateNode();
        }


        uiSaveNodes(this.nodeIds);
    }
}
