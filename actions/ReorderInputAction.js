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
    }



    undo()
    {
        const node = nodeFromId(this.nodeId);

        moveIn(
            node.inputs,
            this.newIndex,
            this.oldIndex);

        node.pushUpdate();
    }



    redo()
    {
        const node = nodeFromId(this.nodeId);

        moveIn(
            node.inputs,
            this.oldIndex,
            this.newIndex);

        node.pushUpdate();
    }
}