class ReorderInputAction
extends Action
{
    nodeId;

    oldIndex;
    newIndex;
 


    constructor(nodeId, oldIndex, newIndex)
    {
        super(
              'reorder ' + nodeFromId(nodeId).id 
            + '.inputs[' + oldIndex + ']'
            + ' to [' + newIndex + ']');

        this.nodeId   = nodeId;
        this.oldIndex = oldIndex;
        this.newIndex = newIndex;
    }



    do()
    {
        // .. already done

        nodeFromId(this.nodeId).pushUpdate();

        uiSaveNodesAndConns([this.nodeId]);
    }



    undo()
    {
        const node = nodeFromId(this.nodeId);

        moveIn(
            node.inputs,
            this.newIndex,
            this.oldIndex);
            
        node.pushUpdate();

        uiSaveNodesAndConns([this.nodeId]);
    }



    redo()
    {
        const node = nodeFromId(this.nodeId);

        moveIn(
            node.inputs,
            this.oldIndex,
            this.newIndex);

        uiSaveNodesAndConns([this.nodeId]);

        node.pushUpdate();
    }
}