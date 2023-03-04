class ReorderInputsAction
extends Action
{
    nodeId;

    oldIndex;
    newIndex;
 


    constructor(graph, nodeId, oldIndex, newIndex)
    {
        super(
            graph,
            REORDER_INPUTS_ACTION,
              'REORDER INPUTS ' + graph.nodeFromId(nodeId).id 
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
        
        pushUnique(updateNodes, this.graph.nodeFromId(this.nodeId));
    }



    undo(updateNodes)
    {
        const node = this.graph.nodeFromId(this.nodeId);

        moveInArray(node.inputs, this.newIndex, this.oldIndex);
        uiSaveNodes(this.graph, [this.nodeId]);
        
        this.saveInputConnections();

        pushUnique(updateNodes, node);
    }



    redo(updateNodes)
    {
        const node = this.graph.nodeFromId(this.nodeId);

        moveInArray(node.inputs, this.oldIndex, this.newIndex);
        uiSaveNodes(this.graph, [this.nodeId]);

        this.saveInputConnections();

        pushUnique(updateNodes, node);
    }



    saveInputConnections()
    {
        uiDeleteSavedConnectionsToNodeId(this.nodeId);
        
        const node = this.graph.nodeFromId(this.nodeId);

        for (const input of node.inputs.filter(i => i.connected))
            uiSaveConn(input.connection);
    }
}