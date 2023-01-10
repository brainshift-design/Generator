class ReorderInputAction
extends Action
{
    nodeId;

    oldIndex;
    newIndex;
 


    constructor(nodeId, oldIndex, newIndex)
    {
        super(
              'REORDER ' + nodeFromId(nodeId).id 
            + '.' + oldIndex
            + ' to .' + newIndex);

        this.nodeId   = nodeId;
        this.oldIndex = oldIndex;
        this.newIndex = newIndex;
    }



    do(updateNodes)
    {
        // .. already done


        uiDeleteSavedConnectionsToNodeId(this.nodeId);


        const node = nodeFromId(this.nodeId);

        for (const input of node.inputs.filter(i => i.connected))
        {
            const output = input.connectedOutput;

            uiSaveConnection(
                output.node.id, output.id, input.connection.outputOrder,
                input.node.id, input.id,
                input.connection.toJson());
        }

        
        pushUnique(updateNodes, node);
    }



    undo(updateNodes)
    {
        const node = nodeFromId(this.nodeId);

        moveInArray(node.inputs, this.newIndex, this.oldIndex);
        uiSaveNodes([this.nodeId]);
        
        pushUnique(updateNodes, node);
    }



    redo(updateNodes)
    {
        const node = nodeFromId(this.nodeId);

        moveInArray(node.inputs, this.oldIndex, this.newIndex);
        uiSaveNodes([this.nodeId]);

        pushUnique(updateNodes, node);
    }
}