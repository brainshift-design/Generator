class ConnectAction
extends Action
{
    outputNodeId;
    outputId;
    outputOrder           = -1;
    
    inputNodeId;
    inputId;
    inputActiveNodeIds    = [];
    inputValues           = []; // in id,value pairs, to be restored on undo

    newActiveNodeIds      = [];
    
    oldOutputNodeId       = '';
    oldOutputId;
    oldOutputOrder        = -1;
    oldOutputActiveNodeId = '';
    
   

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

        connectAction_saveOutputActiveNodes(this);
        connectAction_saveInputActiveNodesAndValues(this);
        
        connectAction_removeOldOutputConnection(this);
        
        connectAction_makeNewConnection(this);

        connectAction_updateOldOutput(this, updateNodes);
        connectAction_updateInputActiveNodes(this, updateNodes);

        connectAction_updateNodes(this, updateNodes);
        connectAction_cleanup(this);

        pushUpdate(updateNodes);
    }



    undo()
    {
        const updateNodes = [];

        connectAction_removeNewConnection(this);

        connectAction_restoreOldConnection(this);
        connectAction_restoreInputValues(this);

        connectAction_deactivateNewActiveNodes(this);
        connectAction_activateOldActiveNodes(this, updateNodes); 

        connectAction_restoreCleanup(this);

        pushUpdate(updateNodes);
    }
}



function connectAction_saveOutputActiveNodes(act)
{
    act.oldOutputActiveNodeId = idFromNode(getActiveFromNodeId(act.outputNodeId));
}



function connectAction_saveInputActiveNodesAndValues(act)
{
    act.inputValues        = act.input.getValuesForUndo ? act.input.getValuesForUndo() : [];
    act.inputActiveNodeIds = getActiveNodesRightFromNodeId(act.inputNodeId).map(n => n.id);
}



function connectAction_makeNewConnection(act)
{
    const conn = uiConnect(act.output, act.input, act.inputId);
            
    act.outputOrder = conn.outputOrder;

    uiSaveConn(conn);
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



function connectAction_updateInputActiveNodes(act, updateNodes)
{
    const inputActiveNodeIds = [...act.inputActiveNodeIds].sort((x, y) => 
        (nodeFromId(x) === nodeFromId(y)) ? 0 : nodeFromId(y).isOrFollows(nodeFromId(x)) ? -1 : 1);

    for (const id of inputActiveNodeIds)
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
     ...act.inputActiveNodeIds]); 
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

        uiSaveConn(oldConn);
    }
}



function connectAction_restoreInputValues(act)
{
    for (const value of act.inputValues)
    {
        const param = act.inputNode.params.find(p => p.id == value[0]);

        if (param)
            param.setValue(value[1], true, true, false);
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
    for (const id of act.inputActiveNodeIds)
    {
        const oldInputActiveNode = nodeFromId(id);
        
        uiMakeNodeActive(oldInputActiveNode);
        pushUnique(updateNodes, oldInputActiveNode);
    }

    
    if (    act.oldOutputActiveNodeId != ''
        && !act.inputActiveNodeIds.includes(act.oldOutputActiveNodeId))
    {
        console.assert(act.oldOutputActiveNodeId != '', 'there should be an old output active node ID at this point')

        const oldOutputActiveNode = nodeFromId(act.oldOutputActiveNodeId);

        uiMakeNodeActive(oldOutputActiveNode);
        pushUnique(updateNodes, oldOutputActiveNode);
    }
}



function connectAction_restoreCleanup(act)
{
    act.oldOutputActiveNodeId = '';
    act.inputActiveNodeIds = [];
}