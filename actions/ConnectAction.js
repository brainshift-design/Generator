class ConnectAction
extends Action
{
    outputNodeId;
    outputId;
    outputOrder           = -1;
    outputValues          = []; // in id,value pairs, to be restored on undo
    
    inputNodeId;
    inputId;
    inputActiveNodeIds    = [];
    inputValues           = []; // in id,value pairs, to be restored on undo

    newActiveNodeIds      = [];
    
    oldOutputNodeId       = NULL;
    oldOutputId;
    oldOutputOrder        = -1;
    oldOutputActiveNodeId = NULL;
    
    backInit              = false;
    shiftKey              = false;
   

    get outputNode()    { return nodeFromId(this.outputNodeId); }

    get output()        { return this.outputNode
                               ? this.outputNode.outputFromId(this.outputId)
                               : null; }
    
    get inputNode()     { return nodeFromId(this.inputNodeId); }

    get input()         { return this.inputNode
                               ? this.inputNode.inputFromId(this.inputId)
                               : null; }
    

    get oldOutputNode() { return nodeFromId(this.oldOutputNodeId); }
    get oldOutput()     { return this.oldOutputNode.outputFromId(this.oldOutputId); }



    constructor(output, input, options = {})
    {
        super(
            CONNECT_ACTION,
             'CONNECT '
            + output.node.id + '.' + output.id
            + ' ' + rightArrowChar(output.supportsTypes(LIST_TYPES)) + ' '
            + input.node.id + '.' + input.id);


        this.outputNodeId    = output.node.id;
        this.outputId        = output.id;
   
        this.inputNodeId     = input.node.id;
        this.inputId         = input.id;


        this.oldOutputNodeId = input.connected ? input.connectedOutput.node.id : NULL;
        this.oldOutputId     = input.connected ? input.connectedOutput.id      : NULL;
        this.oldOutputOrder  = input.connected ? input.connection.outputOrder  : -1;


        if (isValid(options.backInit)) this.backInit = options.backInit;
        if (isValid(options.shiftKey)) this.shiftKey = options.shiftKey;
    }


    
    do(updateNodes)
    {
        this.oldOutputActiveNodeId = NULL;
        this.inputActiveNodeIds    = [];


        // connectAction_saveOutputActiveNodes(this);
        // connectAction_saveInputActiveNodes(this);

        connectAction_saveOutputValues(this);
        connectAction_saveInputValues(this);
        
        if (this.backInit)
            connectAction_backInitOutputValue(this);

        connectAction_removeOldOutputConnection(this);
        
        connectAction_makeNewConnection(this);

        connectAction_updateOldOutput(this, updateNodes);
        //connectAction_updateInputActiveNodes(this, updateNodes);

        connectAction_updateNodes(this, updateNodes);
        connectAction_cleanup(this);
    }



    undo(updateNodes)
    {
        connectAction_restoreInputValues(this);
        connectAction_restoreOutputValues(this);

        pushUnique(
            updateNodes, 
            [
                nodeFromId(this.outputNodeId),
                nodeFromId(this.inputNodeId)
            ]);
        
        //this.deactivateNewActiveNodes();
        //connectAction_activateOldActiveNodes(this, updateNodes); 

        connectAction_restoreCleanup(this);
    }
}



function connectAction_backInitOutputValue(act)
{
    if (    act.output.backInit
        &&  act.input.getBackInitValue)
        act.output.backInit(act.input.getBackInitValue());
}



function connectAction_saveOutputActiveNodes(act)
{
    act.oldOutputActiveNodeId = [];//idFromNode(getActiveFromNodeId(act.outputNodeId));
}



function connectAction_saveInputActiveNodes(act)
{
    act.inputActiveNodeIds = [];//getActiveNodesAfterNodeId(act.inputNodeId).map(n => n.id);
}



function connectAction_saveOutputValues(act)
{
    act.outputValues = 
           act.output 
        && act.output.getValuesForUndo 
        ? act.output.getValuesForUndo(act.output) 
        : [];
}



function connectAction_saveInputValues(act)
{
    act.inputValues = 
           act.input 
        && act.input.getValuesForUndo 
        ? act.input.getValuesForUndo(act.input) 
        : [];
}



function connectAction_makeNewConnection(act)
{
    const conn = uiConnect(act.output, act.input, act.inputId);
            
    pushUnique(act.newConnectionData, conn.toDataObject());
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
    if (!act.oldOutputNode)
        return;

        
    //act.oldOutput.updateSavedConnectionOrder(act.oldOutputOrder, -1);

    pushUnique(updateNodes, act.oldOutputNode);

    
    // if (!getActiveFromNode(act.oldOutputNode))
    // {
    //     uiMakeNodeActive(act.oldOutputNode, !act.shiftKey);

    //     act.newActiveNodeIds.push(act.oldOutputNodeId);

    //     if (act.oldOutputActiveNodeId != NULL)
    //         pushUnique(updateNodes, nodeFromId(act.oldOutputActiveNodeId));
    // }
}



function connectAction_updateInputActiveNodes(act, updateNodes)
{
    const inputActiveNodeIds = [...act.inputActiveNodeIds].sort((x, y) => 
        (nodeFromId(x) === nodeFromId(y)) ? 0 : nodeFromId(y).isOrFollows(nodeFromId(x)) ? -1 : 1);

    for (const id of inputActiveNodeIds)
    {
        act.newActiveNodeIds.push(id);

        const node = nodeFromId(id);

        uiMakeNodeActive(node, !act.shiftKey);
        pushUnique(updateNodes, node);
    }
}



function connectAction_updateNodes(act, updateNodes)
{
    pushUnique(updateNodes, act.outputNode);
    pushUnique(updateNodes, act. inputNode);

    if (!act.outputNode.cached) 
        pushUnique(updateNodes, act.outputNode.getUncachedInputNodes());

    if (    act.oldOutputNode
        && !act.oldOutputNode.cached) 
        pushUnique(updateNodes, act.oldOutputNode.getUncachedInputNodes());
}



function connectAction_cleanup(act)
{
    const nodeIds = 
        act.oldOutputActiveNodeId != ''
        ? [act.oldOutputActiveNodeId]
        : [];

    nodeIds.push(...act.inputActiveNodeIds.filter(id => 
        !act.newActiveNodeIds.includes(id)));

    uiDeleteObjectsAndStyles(nodeIds, false);
}



// function connectAction_removeNewConnection(act)
// {
//     const input = act.inputNode.inputFromId(act.inputId);

//     uiDeleteSavedConn(input.connection);
//     uiDisconnect(input);
// }



// function connectAction_restoreOldConnection(act)
// {
//     if (act.oldOutputNodeId != NULL)
//     {
//         act.oldOutput.updateSavedConnectionOrder(act.oldOutputOrder, +1);

//         const oldConn = uiVariableConnect(
//             act.oldOutputNode, act.oldOutputId, 
//             act.inputNode,     act.inputId,
//             act.oldOutputOrder);

//         uiSaveConn(oldConn);
//     }
// }



function connectAction_restoreInputValues(act)
{
    for (const undoValue of act.inputValues)
    {
        const param = act.inputNode.params.find(p => p.id == undoValue.paramId);
        if (param) param.node.restoreParamUndoValue(undoValue);
    }
}



function connectAction_restoreOutputValues(act)
{
    for (const undoValue of act.outputValues)
    {
        const param = act.outputNode.params.find(p => p.id == undoValue.paramId);
        if (param) param.node.restoreParamUndoValue(undoValue);
    }
}



function connectAction_activateOldActiveNodes(act, updateNodes)
{
    pushUnique(updateNodes, act.outputNode);


    for (const id of act.inputActiveNodeIds)
    {
        const oldInputActiveNode = nodeFromId(id);
        
        uiMakeNodeActive(oldInputActiveNode);
        pushUnique(updateNodes, oldInputActiveNode);
    }

    
    if (    act.oldOutputActiveNodeId != NULL
        && !act.inputActiveNodeIds.includes(act.oldOutputActiveNodeId))
    {
        consoleAssert(act.oldOutputActiveNodeId != NULL, 'there should be an old output active node ID at this point');

        const oldOutputActiveNode = nodeFromId(act.oldOutputActiveNodeId);

        uiMakeNodeActive(oldOutputActiveNode);
        pushUnique(updateNodes, oldOutputActiveNode);
    }
}



function connectAction_restoreCleanup(act)
{
    act.oldOutputActiveNodeId = NULL;
    act.inputActiveNodeIds    = [];
}