class ReconnectAction
extends Action
{
    outputNodeId;
    outputId;
    get outputNode() { return nodeFromId(this.outputNodeId); }

    oldOutputNodeId = '';
    oldOutputId;
    get oldOutputNode() { return nodeFromId(this.oldOutputNodeId); }

    inputNodeId;
    inputId;
    get inputNode() { return nodeFromId(this.inputNodeId); }

    oldInputNodeId = '';
    oldInputId;
    get oldInputNode() { return nodeFromId(this.oldInputNodeId); }
    
    oldOutputActiveNodeId;      // the active node in the output node's tree
    oldInputActiveNodeIds = []; // the active nodes in the input node's tree

    newActiveNodeIds = [];



    constructor(output, oldInput, input)
    {
        const oldOutId = 
            input.connected 
            ? input.connectedOutput.id
            : -1; 


        super(
             'RECONNECT '
            + output.node.id + '.' + output.id
            + ' (' + leftArrowChar(oldInput.supports(LIST_TYPES)) + ' '
            + oldInput.node.id + '.' + oldInput.id
            + ') ' + rightArrowChar(output.supports(LIST_TYPES)) + ' '
            + input.node.id + '.' + input.id);


        this.outputNodeId          = output.node.id;
        this.outputId              = output.id;
               
        this.oldOutputNodeId       = input.connected ? input.connectedOutput.node.id : '';
        this.oldOutputId           = oldOutId;
       
        this.oldInputNodeId        = oldInput.node.id;
        this.oldInputId            = oldInput.id;
       
        this.inputNodeId           = input.node.id;
        this.inputId               = input.id;

        this.oldOutputActiveNodeId = getActiveFromNodeId(this.outputNodeId).id;
        this.oldInputActiveNodeIds = [...getActiveNodesFromNodeId(this.inputNodeId).map(n => n.id)];
    }



    do()
    {
        uiDisconnect(this.oldInputNode.inputFromId(this.oldInputId));
        

        uiConnect(
            this.outputNode.outputFromId(this.outputId), 
            this. inputNode. inputFromId(this. inputId),
            this.inputId);
            

        this.newActiveNodeIds = [];

        if (!getActiveFromNode(this.oldOutputNode))
        {
            uiMakeNodeActive(this.oldOutputNode);
            this.newActiveNodeIds.push(this.oldOutputNodeId);

            pushUpdate([this.oldOutputNode]);
        }


        let oldInputActiveNodeIds = [...this.oldInputActiveNodeIds];
        oldInputActiveNodeIds.sort((x, y) => (nodeFromId(x) === nodeFromId(y)) ? 0 : nodeFromId(y).isOrFollows(nodeFromId(x)) ? -1 : 1);

        for (const id of oldInputActiveNodeIds)
            uiMakeNodeActive(nodeFromId(id));
    }



    undo()
    {
        uiDisconnect(this.inputNode.inputFromId(this.inputId));

            
        uiVariableConnect(
            this.outputNode,   this.outputId, 
            this.oldInputNode, this.oldInputId);

        uiSaveNodes([this.oldInputNodeId]);
    

        if (this.oldOutputNodeId != '')
        {
            uiVariableConnect(
                this.oldOutputNode, this.oldOutputId, 
                this.inputNode,     this.inputId);

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