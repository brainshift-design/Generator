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

        uiSaveNodes([this.nodeId]);


        uiRemoveSavedConnectionsToNode(this.nodeId);


        const node = nodeFromId(this.nodeId);

        for (const input of node.inputs.filter(i => i.isConnected))
        {
            const output = input.connectedOutput;

            uiSaveConnection(
                output.op.id, output.op.outputs.indexOf(output),
                 input.op.id,  input.op. inputs.indexOf( input),
                input.connection.toJson());
        }
    }



    undo()
    {
        const node = nodeFromId(this.nodeId);

        moveInArray(
            node.inputs,
            this.newIndex,
            this.oldIndex);
            
        node.pushUpdate();

        uiSaveNodes([this.nodeId]);
    }



    redo()
    {
        const node = nodeFromId(this.nodeId);

        moveInArray(
            node.inputs,
            this.oldIndex,
            this.newIndex);

        uiSaveNodes([this.nodeId]);

        node.pushUpdate();
    }
}