class ReorderInputConnectionsAction
extends Action
{
    nodeId;

    oldInputId;
    newInputId;
 


    constructor(graph, nodeId, oldInputId, newInputId)
    {
        super(
            graph,
            REORDER_CONNECTIONS_ACTION,
              'REORDER CONNECTIONS ' + graph.nodeFromId(nodeId).id 
            + '.' + oldInputId
            + ' to .' + newInputId);

        this.nodeId     = nodeId;

        this.oldInputId = oldInputId;
        this.newInputId = newInputId;
    }



    do(updateNodes)
    {
        const node = this.graph.nodeFromId(this.nodeId);

        this.swapConnections();
        
        uiSaveNodes(this.graph, [this.nodeId]);

        this.saveInputConnections();

        pushUnique(updateNodes, node);
    }



    undo(updateNodes)
    {
        const node = this.graph.nodeFromId(this.nodeId);

        this.swapConnections();

        uiSaveNodes(this.graph, [this.nodeId]);
        
        this.saveInputConnections();

        pushUnique(updateNodes, node);
    }



    swapConnections()
    {
        const node = this.graph.nodeFromId(this.nodeId);

        const oldInput = node.inputFromId(this.oldInputId);
        const newInput = node.inputFromId(this.newInputId);

        const oldConn  = oldInput.connection;
        const newConn  = newInput.connection;

        const oldOutputInputIndex = oldConn.output.connectedInputs.indexOf(oldInput);
        const newOutputInputIndex = newConn.output.connectedInputs.indexOf(newInput);


        const tempInput = newConn.input;
        newConn.input = oldConn.input;
        oldConn.input = tempInput;

        const tempOrder = newConn.outputOrder;
        newConn.outputOrder = oldConn.outputOrder;
        oldConn.outputOrder = tempOrder;
        
        
        oldConn.input._connectedOutput = oldConn.output;
        newConn.input._connectedOutput = newConn.output;

        oldConn.input.connection = oldConn;
        newConn.input.connection = newConn;

        oldConn.output.connectedInputs.splice(oldOutputInputIndex, 1, oldConn.input);
        newConn.output.connectedInputs.splice(newOutputInputIndex, 1, newConn.input);
    }



    saveInputConnections()
    {
        uiDeleteSavedConnectionsToNodeId(this.nodeId);
        
        const node = this.graph.nodeFromId(this.nodeId);

        for (const input of node.inputs.filter(i => i.connected))
            uiSaveConn(input.connection);
    }
}