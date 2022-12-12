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
    get oldOutput()     { return this.oldOutputNode.outputFromId(this.oldOutputId); }



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

        connectAction_saveOutputInput(this);
        
        connectAction_removeOldOutputConnection(this);
        
        connectAction_updateOldOutput(this, updateNodes);
        connectAction_updateOldInput(this, updateNodes);

        connectAction_makeNewConnection(this);

        connectAction_updateNodes(this, updateNodes);
        connectAction_cleanup(this);

        pushUpdate(updateNodes);
    }



    undo()
    {
        const updateNodes = [];

        connectAction_removeNewConnection(this);

        connectAction_restoreOldConnection(this);
        connectAction_restoreOldInputValues(this);

        connectAction_deactivateNewActiveNodes(this);
        connectAction_activateOldActiveNodes(this, updateNodes); 

        connectAction_restoreCleanup(this);
       
        pushUpdate(updateNodes);
    }
}



function connectAction_saveOutputInput(act)
{
    // save old output active nodes

    act.oldOutputActiveNodeId = idFromNode(getActiveFromNodeId(act.outputNodeId));


    // save old input active nodes & values

    act.oldInputValues        = act.input.getValuesForUndo ? act.input.getValuesForUndo() : [];
    act.oldInputActiveNodeIds = getActiveNodesRightFromNodeId(act.inputNodeId).map(n => n.id);
}



function connectAction_makeNewConnection(act)
{
    const conn = uiConnect(act.output, act.input, act.inputId);
            
    act.outputOrder = conn.outputOrder;

    uiSaveConnection(
        act.outputNodeId, act.outputId, act.outputOrder,
        act.inputNodeId,  act.inputId,
        conn.toJson());
}



function connectAction_removeOldOutputConnection(act)
{
    if (act.oldOutputNode)
        uiDeleteSavedConn(act.input.connection);
}



function connectAction_updateOldOutput(act, updateNodes)
{
    if (act.oldOutputNode)
    {
        act.oldOutput.updateSavedConnectionOrder(act.oldOutputOrder, -1);

        pushUnique(updateNodes, act.oldOutputNode);
        
        if (!getActiveFromNode(act.oldOutputNode))
        {
            uiMakeNodeActive(act.oldOutputNode);

            act.newActiveNodeIds.push(act.oldOutputNodeId);
            pushUnique(updateNodes, nodeFromId(act.oldOutputActiveNodeId));
        }
    }
}



function connectAction_updateOldInput(act, updateNodes)
{
    const oldInputActiveNodeIds = [...act.oldInputActiveNodeIds].sort((x, y) => 
        (nodeFromId(x) === nodeFromId(y)) ? 0 : nodeFromId(y).isOrFollows(nodeFromId(x)) ? -1 : 1);

    for (const id of oldInputActiveNodeIds)
    {
        act.newActiveNodeIds.push(id);

        const node = nodeFromId(id);
        uiMakeNodeActive(node);
        pushUnique(updateNodes, node);
    }
}



function connectAction_updateNodes(act, updateNodes)
{
    pushUnique(updateNodes, act.inputNode);

    if (!act.outputNode.cached) 
        pushUnique(updateNodes, act.outputNode.getUncachedInputNodes());

    if (    act.oldOutputNode
        && !act.oldOutputNode.cached) 
        pushUnique(updateNodes, act.oldOutputNode.getUncachedInputNodes());
}



function connectAction_cleanup(act)
{
    uiDeleteObjects([
        act.oldOutputActiveNodeId, 
     ...act.oldInputActiveNodeIds]); 
}



function connectAction_removeNewConnection(act)
{
    const input = act.inputNode.inputFromId(act.inputId);

    uiDeleteSavedConn(input.connection);
    uiDisconnect(input);
}



function connectAction_restoreOldConnection(act)
{
    if (act.oldOutputNodeId != '')
    {
        act.oldOutput.updateSavedConnectionOrder(act.oldOutputOrder, +1);

        const oldConn = uiVariableConnect(
            act.oldOutputNode, act.oldOutputId, 
            act.inputNode,     act.inputId,
            act.oldOutputOrder);

        uiSaveConn(oldConn);//ction(
            // act.oldOutputNodeId, act.oldOutputId, act.outputOrder,
            // act.inputNodeId, act.inputId,
            // oldConn.toJson());
    }
}



function connectAction_restoreOldInputValues(act)
{
    for (const param of act.oldInputValues)
    {
        act.inputNode.params[act.inputNode.params.findIndex(p => p.id == param[0])]
            .setValue(param[1], true, true, false);
    }
}



function connectAction_deactivateNewActiveNodes(act)
{
    for (const id of act.newActiveNodeIds)
        uiMakeNodePassive(nodeFromId(id));

    uiDeleteObjects(act.newActiveNodeIds); 
}



function connectAction_activateOldActiveNodes(act, updateNodes)
{
    for (const id of act.oldInputActiveNodeIds)
    {
        const node = nodeFromId(id);
        uiMakeNodeActive(node);
        pushUnique(updateNodes, node);
    }
    
    if (!act.oldInputActiveNodeIds.includes(act.oldOutputActiveNodeId))
    {
        console.assert(act.oldOutputActiveNodeId, 'there should be an old output active node ID at this point')

        const node = nodeFromId(act.oldOutputActiveNodeId);
        uiMakeNodeActive(node);
        pushUnique(updateNodes, node);
    }
}



function connectAction_restoreCleanup(act)
{
    act.oldOutputActiveNodeId = '';
    act.oldInputActiveNodeIds = [];
}