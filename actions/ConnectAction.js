class ConnectAction
extends Action
{
    outputNodeId;
    outputId;

    get outputNode() { return nodeFromId(this.outputNodeId); }
    get output()     { return this.outputNode.outputs.find(o => o.id == this.outputId); }
    
    oldOutputNodeId = '';
    oldOutputId;
    
    get oldOutputNode() { return nodeFromId(this.oldOutputNodeId); }
    
    inputNodeId;
    inputId;
    
    get inputNode() { return nodeFromId(this.inputNodeId); }
    get input()     { return this.inputNode.inputFromId(this.inputId); }
    

    oldOutputActiveNodeId;      // the active node in the output node's tree
    oldInputActiveNodeIds = []; // the active nodes in the input node's tree
    
    newActiveNodeIds      = [];
     
    oldInputValues        = []; // in id,value pairs, to be restored on undo



    constructor(output, input)
    {
        const oldOutputId = 
            input.connected 
            ? input.connectedOutput.id
            : ''; 

        super('CONNECT ' 
            + output.node.id + '.' + output.id
            + ' ' + rightArrowChar(output.supportsTypes(LIST_TYPES)) + ' '
            + input.node.id + '.' + input.id);


        this.outputNodeId    = output.node.id;
        this.outputId        = output.id;
   
        this.oldOutputNodeId = input.connected ? input.connectedOutput.node.id : '';
        this.oldOutputId     = oldOutputId;
   
        this.inputNodeId     = input.node.id;
        this.inputId         = input.id;
    }


    
    do()
    {
        this.oldInputValues = 
            this.input.getValuesForUndo
            ? this.input.getValuesForUndo()
            : [];


        this.oldOutputActiveNodeId = idFromNode(getActiveFromNodeId(this.outputNodeId));
        this.oldInputActiveNodeIds = getActiveNodesRightFromNodeId(this.inputNodeId).map(n => n.id);


        for (const id of [this.oldOutputActiveNodeId, ...this.oldInputActiveNodeIds]) 
            uiDeleteObjects([id]); // clean up now irrelevant objects


        const conn = uiConnect(
            this.outputNode.outputs.find(o => o.id == this.outputId), 
            this.inputNode. inputs .find(i => i.id == this. inputId),
            this.inputId);

        uiSaveConnection(
            this.outputNodeId,
            this.outputId,
            this.inputNodeId,
            this.inputId,
            conn.toJson());


        this.newActiveNodeIds = [];

        const updateNodes = [this.inputNode];

        
        if (    this.oldOutputNode
            && !getActiveFromNode(this.oldOutputNode))
        {
            uiMakeNodeActive(this.oldOutputNode);
            this.newActiveNodeIds.push(this.oldOutputNodeId);
        }


        const oldOutputActiveNode = nodeFromId(this.oldOutputActiveNodeId);
        if (oldOutputActiveNode) pushUnique(updateNodes, oldOutputActiveNode);


        const oldInputActiveNodeIds = [...this.oldInputActiveNodeIds];
        oldInputActiveNodeIds.sort((x, y) => (nodeFromId(x) === nodeFromId(y)) ? 0 : nodeFromId(y).isOrFollows(nodeFromId(x)) ? -1 : 1);

        for (const id of oldInputActiveNodeIds)
        {
            uiMakeNodeActive(nodeFromId(id));
            this.newActiveNodeIds.push(id);
        }


        const pushUpdateNodes = oldInputActiveNodeIds.map(id => nodeFromId(id));

        if (!this.outputNode.cached) 
            pushUnique(pushUpdateNodes, this.outputNode.getUncachedInputNodes());

        if (    this.oldOutputNode
            && !this.oldOutputNode.cached) 
            pushUnique(pushUpdateNodes, this.oldOutputNode.getUncachedInputNodes());

        pushUpdate(pushUpdateNodes);
    }



    undo()
    {
        const input = this.inputNode.inputFromId(this.inputId);
        
        uiDisconnect(input);
        uiRemoveSavedConn(input.connection);

            
        if (this.oldOutputNodeId != '')
        {
            const oldConn = uiVariableConnect(
                this.oldOutputNode, this.oldOutputId, 
                this.inputNode,     this.inputId);

            uiSaveConnection(
                this.oldOutputNodeId, this.oldOutputId,
                this.inputNodeId,     this.inputId,
                oldConn.toJson());

        }


        // restore old values
        for (const param of this.oldInputValues)
        {
            this.inputNode.params[this.inputNode.params.findIndex(p => p.id == param[0])]
                .setValue(param[1], true, true, false);
        }


        for (const id of this.newActiveNodeIds)
        {
            const node = nodeFromId(id);
            uiMakeNodePassive(node);
        }

        uiDeleteObjects(this.newActiveNodeIds); // clean up now irrelevant objects


        for (const id of this.oldInputActiveNodeIds)
        {
            const node = nodeFromId(id);
            uiMakeNodeActive(node);
        }


        if (!this.oldInputActiveNodeIds.includes(this.oldOutputActiveNodeId))
        {
            const node = nodeFromId(this.oldOutputActiveNodeId);
            uiMakeNodeActive(node);
        }


        pushUpdate(this.oldInputActiveNodeIds.map(id => nodeFromId(id)));
 

        // cleanup
        this.oldOutputActiveNodeId = [];
        this.oldInputActiveNodeIds = [];
   }
}