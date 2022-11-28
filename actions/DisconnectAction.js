class DisconnectAction
extends Action
{
    outputNodeId;
    outputId;
    get outputNode() { return nodeFromId(this.outputNodeId); }

    inputNodeId;
    inputId;
    get inputNode() { return nodeFromId(this.inputNodeId); }

    oldActiveNodeIds = [];
    newActiveNodeIds = [];



    constructor(output, input)
    {
        //console.log('output =', output);
        //console.log('input =', input);

        super('DISCONNECT ' 
            + output.node.id + '.' + output.id
            + ' ' + rightArrowChar(output.supportsTypes(LIST_TYPES)) + ' '
            + input.node.id + '.' + input.id);


        this.outputNodeId = output.node.id;
        this.outputId     = output.id;

        this.inputNodeId  = input.node.id;
        this.inputId      = input.id;
    }



    do()
    {
        this.oldActiveNodeIds = [...getActiveNodesFromNodeId(this.inputNodeId).map(n => n.id)];

        for (const id of this.oldActiveNodeIds)
            uiDeleteObjects([id]); // clean up now irrelevant objects


        uiDisconnect(this.inputNode.inputFromId(this.inputId));
        this.inputNode.invalidate();
        
        
        if (!getActiveFromNode(this.inputNode))
        {
            uiMakeNodeActive(this.inputNode);
            this.newActiveNodeIds.push(this.inputNodeId);
        }


        if (   !getActiveLeftOnlyFromNode(this.outputNode)
            && !getActiveRightFromNode(this.outputNode))
        {
            uiMakeNodeActive(this.outputNode);
            this.newActiveNodeIds.push(this.outputNodeId);
        }


        this.outputNode.updateNode();
        this.inputNode .updateNode();


        const updateNodes = [this.inputNode, this.outputNode];

        if (!this.outputNode.cached)
            pushUnique(updateNodes, this.outputNode.getUncachedInputNodes());

        pushUpdate(updateNodes);
    }
    
    
    
    undo()
    {
        uiVariableConnect(
            this.outputNode, this.outputId, 
            this. inputNode, this. inputId);

            
        for (const id of this.newActiveNodeIds)
        {
            uiMakeNodePassive(nodeFromId(id));
            uiDeleteObjects([id]); // clean up now irrelevant objects
        }


        let oldActiveNodeIds = [...this.oldActiveNodeIds];
        this.oldActiveNodeIds = [];
        

        oldActiveNodeIds.sort((x, y) => (nodeFromId(x) === nodeFromId(y)) ? 0 : nodeFromId(y).isOrFollows(nodeFromId(x)) ? -1 : 1);

        for (const id of oldActiveNodeIds)
            uiMakeNodeActive(nodeFromId(id));


        this.inputNode.updateNode();
    }
}