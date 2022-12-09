class ConnectAction
extends Action
{
    outputNodeId;
    outputId;
    outputOrder           = -1;
    
    inputNodeId;
    inputId;
    
    newActiveNodeIds      = [];

    
    oldOutputNodeId       = '';
    oldOutputId;
    oldOutputOrder        = -1;
    oldOutputActiveNodeId = '';
    
    oldInputActiveNodeIds = [];
    oldInputValues        = []; // in id,value pairs, to be restored on undo

   

    get outputNode()    { return nodeFromId(this.outputNodeId); }
    get output()        { return this.outputNode.outputFromId(this.outputId); }
    
    get inputNode()     { return nodeFromId(this.inputNodeId); }
    get input()         { return this.inputNode.inputFromId(this.inputId); }
    

    get oldOutputNode() { return nodeFromId(this.oldOutputNodeId); }
    


    constructor(output, input)
    {
        super('CONNECT ' 
            + output.node.id + '.' + output.id
            + ' ' + rightArrowChar(output.supportsTypes(LIST_TYPES)) + ' '
            + input.node.id + '.' + input.id);


        this.outputNodeId    = output.node.id;
        this.outputId        = output.id;
   
        this.inputNodeId     = input.node.id;
        this.inputId         = input.id;


        this.oldOutputNodeId = input.connected ? input.connectedOutput.node.id : '';
        this.oldOutputId     = input.connected ? input.connectedOutput.id      : '';
        this.oldOutputOrder  = input.connected ? input.connection.outputOrder  : -1;
    }


    
    do()
    {
        this.newActiveNodeIds = [];
        const updateNodes     = [];


        // save old output active nodes

        this.oldOutputActiveNodeId = idFromNode(getActiveFromNodeId(this.outputNodeId));


        // save old input active nodes & values

        this.oldInputValues        = this.input.getValuesForUndo ? this.input.getValuesForUndo() : [];
        this.oldInputActiveNodeIds = getActiveNodesRightFromNodeId(this.inputNodeId).map(n => n.id);


        // make new connection
        
        const conn = uiConnect(this.output, this.input, this.inputId);
            
        this.outputOrder = conn.outputOrder;

        uiSaveConnection(
            this.outputNodeId, this.outputId, this.outputOrder,
            this.inputNodeId,  this.inputId,
            conn.toJson());


        // activate old output & active node

        if (    this.oldOutputNode
            && !getActiveFromNode(this.oldOutputNode))
        {
            this.oldOutput.updateSavedConnectionOrder(this.oldOutputOrder, -1);

            this.newActiveNodeIds.push(this.oldOutputNodeId);
            
            uiMakeNodeActive(this.oldOutputNode);

            pushUnique(updateNodes, this.oldOutputNode);
            pushUnique(updateNodes, nodeFromId(this.oldOutputActiveNodeId));
        }


        // activate old input & active nodes

        const oldInputActiveNodeIds = [...this.oldInputActiveNodeIds].sort((x, y) => 
            (nodeFromId(x) === nodeFromId(y)) ? 0 : nodeFromId(y).isOrFollows(nodeFromId(x)) ? -1 : 1);

        for (const id of oldInputActiveNodeIds)
        {
            this.newActiveNodeIds.push(id);

            const node = nodeFromId(id);
            uiMakeNodeActive(node);
            pushUnique(updateNodes, node);
        }


        // update nodes

        pushUnique(updateNodes, this.inputNode);

        if (!this.outputNode.cached) 
            pushUnique(updateNodes, this.outputNode.getUncachedInputNodes());

        if (    this.oldOutputNode
            && !this.oldOutputNode.cached) 
            pushUnique(updateNodes, this.oldOutputNode.getUncachedInputNodes());


        // clean up now irrelevant objects

        uiDeleteObjects([
               this.oldOutputActiveNodeId, 
            ...this.oldInputActiveNodeIds]); 


        //

        pushUpdate(updateNodes);
    }



    undo()
    {
        const updateNodes = [];


        // remove new connection

        const input = this.inputNode.inputFromId(this.inputId);
        
        uiDeleteSavedConn(input.connection);
        uiDisconnect(input);

            
        // restore old connection

        if (this.oldOutputNodeId != '')
        {
            this.oldOutput.updateSavedConnectionOrder(this.oldOutputOrder, +1);

            const oldConn = uiVariableConnect(
                this.oldOutputNode, this.oldOutputId, 
                this.inputNode, this.inputId,
                this.oldOutputOrder);

            uiSaveConnection(
                this.oldOutputNodeId, this.oldOutputId,
                this.outputOrder,
                this.inputNodeId, this.inputId,
                oldConn.toJson());
        }


        // restore old input values

        for (const param of this.oldInputValues)
        {
            this.inputNode.params[this.inputNode.params.findIndex(p => p.id == param[0])]
                .setValue(param[1], true, true, false);
        }


        // deactivate new active nodes & clean up their objects

        for (const id of this.newActiveNodeIds)
            uiMakeNodePassive(nodeFromId(id));

        uiDeleteObjects(this.newActiveNodeIds); 


        // activate old active nodes
        
        for (const id of this.oldInputActiveNodeIds)
        {
            const node = nodeFromId(id);
            uiMakeNodeActive(node);
            pushUnique(updateNodes, node);
        }
        
        if (!this.oldInputActiveNodeIds.includes(this.oldOutputActiveNodeId))
        {
            console.assert(this.oldOutputActiveNodeId, 'there should be an old output active node ID at this point')

            const node = nodeFromId(this.oldOutputActiveNodeId);
            uiMakeNodeActive(node);
            pushUnique(updateNodes, node);
        }
 

        // cleanup

        this.oldOutputActiveNodeId = '';
        this.oldInputActiveNodeIds = [];


        //
        
        pushUpdate(updateNodes);
    }
}