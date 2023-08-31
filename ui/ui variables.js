function uiReturnFigGetAllLocalVariables(msg)
{
    const variables = JSON.parse(msg.variables);

    initLocalVariablesMenu(variables, msg.nodeId);

    menuLocalVariables.showAt(msg.px, msg.py, false);
}



function uiReturnFigLinkNodeToVariable(msg)
{
    const node = nodeFromId(msg.nodeId);

    node.updateValueParam(msg.type);
}



function initLocalVariablesMenu(variables, nodeId)
{
    const node = nodeFromId(nodeId);
    consoleAssert(node.type == VARIABLE, 'node must be VARIABLE');


    menuLocalVariables.clearItems();

    for (const variable of variables)
    {
        const options = {};

        options.callback = () => actionManager.do(
            new LinkExistingVariableAction(
                nodeId,
                variable.id,
                variable.name));


        switch (variable.type)
        {
            case 'FLOAT':   options.icon = iconVarNumber;  break;
            case 'BOOLEAN': options.icon = iconVarBoolean; break;
            case 'STRING':  options.icon = iconVarText;    break;
            case 'COLOR':   options.icon = iconVarColor;   break;
        }


        const name = variable.collectionName + '/' + variable.name;
        const item = new MenuItem(name.replaceAll('/', ' / '), null, options);

        item.setChecked(variable.id == node.linkedVariableId);

        menuLocalVariables.addItems([item]);
    }


    if (!isEmpty(variables))
        menuLocalVariables.addItems([new MenuItem('', null, {separator: true})]);

        
    menuLocalVariables.addItems([
        new MenuItem('None', null, {
            callback: e => actionManager.do(new LinkExistingVariableAction(nodeId, NULL, '')),
            enabled:  node.linkedStyleId != NULL})
    ]);
}



function uiLinkNodeToVariable(node, variableId, variableName)
{
    node.linkedVariableId   = variableId;
    node.linkedVariableName = variableName;


    if (variableName != NULL)
        node.name = variableName;

    pushUpdate(null, [node]);


    uiQueueMessageToFigma(
    {
        cmd:       'figLinkNodeToVariable',
        variableId: variableId,
        nodeId:     node.id 
    });
}
