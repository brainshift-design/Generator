class ReconnectAction
extends Action
{
    outputNodeId;
    outputIndex;
    get outputNode() { return nodeFromId(this.outputNodeId); }

    oldOutputNodeId = '';
    oldOutputIndex;
    get oldOutputNode() { return nodeFromId(this.oldOutputNodeId); }

    inputNodeId;
    inputIndex;
    get inputNode() { return nodeFromId(this.inputNodeId); }

    oldInputNodeId = '';
    oldInputIndex;
    get oldInputNode() { return nodeFromId(this.oldInputNodeId); }
    
    oldOutputActiveNodeId;      // the active node in the output node's tree
    oldInputActiveNodeIds = []; // the active nodes in the input node's tree

    newActiveNodeIds = [];



    constructor(output, oldInput, input)
    {
        const oldOutIndex = 
            input.connected 
            ? input.connectedOutput.index
            : -1; 


        super(
             'RECONNECT '
            + output.node.id + ' ' + output.index
            + ' (← '
            + oldInput.node.id + ' ' + oldInput.index
            + ') → '
            + input.node.id + ' ' + input.index);


        this.outputNodeId          = output.node.id;
        this.outputIndex           = output.index;
               
        this.oldOutputNodeId       = input.connected ? input.connectedOutput.node.id : '';
        this.oldOutputIndex        = oldOutIndex;
       
        this.oldInputNodeId        = oldInput.node.id;
        this.oldInputIndex         = oldInput.index;
       
        this.inputNodeId           = input.node.id;
        this.inputIndex            = input.index;

        this.oldOutputActiveNodeId = getActiveNodeInTreeFromNodeId(this.outputNodeId).id;
        this.oldInputActiveNodeIds = [...getActiveNodesInTreeFromNodeId(this.inputNodeId).map(n => n.id)];
    }



    do()
    {
        uiDisconnect(this.oldInputNode.inputs[this.oldInputIndex]);
        

        uiConnect(
            this.outputNode.outputs[this.outputIndex], 
            this. inputNode. inputs[this. inputIndex],
            this.inputIndex);
            

        this.newActiveNodeIds = [];

        if (!getActiveNodeInTreeFromNode(this.oldOutputNode))
        {
            uiMakeNodeActive(this.oldOutputNode);
            this.newActiveNodeIds.push(this.oldOutputNodeId);

            pushUpdate([this.oldOutputNode]);
        }


        let oldInputActiveNodeIds = [...this.oldInputActiveNodeIds];
        oldInputActiveNodeIds.sort((x, y) => (nodeFromId(x) === nodeFromId(y)) ? 0 : nodeFromId(y).follows(nodeFromId(x)) ? -1 : 1);

        for (const id of oldInputActiveNodeIds)
            uiMakeNodeActive(nodeFromId(id));
    }



    undo()
    {
        uiDisconnect(this.inputNode.inputs[this.inputIndex]);

            
        uiVariableConnect(
            this.outputNode, 
            this.outputIndex, 
            this.oldInputNode, 
            this.oldInputIndex);

        uiSaveNodes([this.oldInputNodeId]);
    

        if (this.oldOutputNodeId != '')
        {
            uiVariableConnect(
                this.oldOutputNode, 
                this.oldOutputIndex, 
                this.inputNode, 
                this.inputIndex);

            pushUpdate([this.inputNode]);
        }


        for (const id of this.newActiveNodeIds)
            uiMakeNodePassive(nodeFromId(id));

        for (const id of this.oldInputActiveNodeIds)
            uiMakeNodeActive(nodeFromId(id));

        if (!this.oldInputActiveNodeIds.includes(this.oldOutputActiveNodeId))
            uiMakeNodeActive(nodeFromId(this.oldOutputActiveNodeId));
    }
}