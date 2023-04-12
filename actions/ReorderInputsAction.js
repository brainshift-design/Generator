class ReorderInputsAction
extends Action
{
    nodeId;

    oldIndex;
    newIndex;
 


    constructor(nodeId, oldIndex, newIndex)
    {
        super(
            REORDER_INPUTS_ACTION,
              'REORDER INPUTS ' + nodeFromId(nodeId).id 
            + '.' + oldIndex
            + ' to .' + newIndex);

        this.nodeId   = nodeId;
        this.oldIndex = oldIndex;
        this.newIndex = newIndex;
    }



    do(updateNodes)
    {
        // .. already done

        this.saveInputConnections();
        
        pushUnique(updateNodes, nodeFromId(this.nodeId));
    }



    undo(updateNodes)
    {
        const node = nodeFromId(this.nodeId);

        moveInArray(node.inputs, this.newIndex, this.oldIndex);
        uiSaveNodes([this.nodeId]);
        
        this.saveInputConnections();

        pushUnique(updateNodes, node);
    }



    redo(updateNodes)
    {
        const node = nodeFromId(this.nodeId);

        moveInArray(node.inputs, this.oldIndex, this.newIndex);
        uiSaveNodes([this.nodeId]);

        this.saveInputConnections();

        pushUnique(updateNodes, node);
    }



    saveInputConnections()
    {
        uiDeleteSavedConnectionsToNodeId(this.nodeId);
        
        const node = nodeFromId(this.nodeId);

        for (const input of node.inputs.filter(i => i.connected))
            uiSaveConn(input.connection);
    }
}