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
             'reconnect '
            + output.node.id + '.out[' + output.index + ']'
            + ' ( <- '
            + oldInput.node.id + '.in[' + oldInput.index + '])'
            + ' -> '
            + input.node.id + '.in[' + input.index + ']');


        this.outputNodeId          = output.node.id;
        this.outputIndex           = output.index;
               
        this.oldOutputNodeId       = input.connected ? input.connectedOutput.node.id : '';
        this.oldOutputIndex        = oldOutIndex;
       
        this.oldInputNodeId        = oldInput.node.id;
        this.oldInputIndex         = oldInput.index;
       
        this.inputNodeId           = input.node.id;
        this.inputIndex            = input.index;

        this.oldOutputActiveNodeId = getActiveNodeInTreeFrom(nodeFromId(this.outputNodeId)).id;
        this.oldInputActiveNodeIds = [...getActiveNodesInTreeFrom(nodeFromId(this.inputNodeId)).map(n => n.id)];
    }



    do()
    {
        uiDisconnect(this.oldInputNode.inputs[this.oldInputIndex]);

        graphView.updateNodeTransform(this.oldInputNode);
        

        uiConnect(
            this.outputNode.outputs[this.outputIndex], 
            this. inputNode. inputs[this. inputIndex],
            this.inputIndex);
            

        this.newActiveNodeIds = [];

        if (!getActiveNodeInTreeFrom(this.oldOutputNode))
        {
            uiMakeNodeActive(this.oldOutputNode);
            this.newActiveNodeIds.push(this.oldOutputNodeId);
            this.oldOutputNode.pushUpdate();
            //graphView.updateNodeTransform(oldPrevOutputActiveNode);
        }


        let oldInputActiveNodeIds = [...this.oldInputActiveNodeIds];
        oldInputActiveNodeIds.sort((x, y) => (nodeFromId(x) === nodeFromId(y)) ? 0 : nodeFromId(y).follows(nodeFromId(x)) ? -1 : 1);

        for (const id of oldInputActiveNodeIds)
            uiMakeNodeActive(nodeFromId(id));


        graphView.updateNodeTransform(this.inputNode);

        this.oldInputNode.pushUpdate();
        this.inputNode   .pushUpdate();
    }



    undo()
    {
        uiDisconnect(this.inputNode.inputs[this.inputIndex]);

        // if (this.oldOutputNodeId != '')
        //     uiDisconnect(this.inputNode.inputs[this.inputIndex]);

            
        uiVariableConnect(
            this.outputNode, 
            this.outputIndex, 
            this.oldInputNode, 
            this.oldInputIndex);

        graphView.updateNodeTransform(this.oldInputNode);
        this.oldInputNode.pushUpdate();
    

        if (this.oldOutputNodeId != '')
        {
            uiVariableConnect(
                this.oldOutputNode, 
                this.oldOutputIndex, 
                this.inputNode, 
                this.inputIndex);

            graphView.updateNodeTransform(this.inputNode);
            this.inputNode.pushUpdate();
        }


        for (const id of this.newActiveNodeIds)
            uiMakeNodePassive(nodeFromId(id));

        for (const id of this.oldInputActiveNodeIds)
            uiMakeNodeActive(nodeFromId(id));

        if (!this.oldInputActiveNodeIds.includes(this.oldOutputActiveNodeId))
            uiMakeNodeActive(nodeFromId(this.oldOutputActiveNodeId));
    }
}