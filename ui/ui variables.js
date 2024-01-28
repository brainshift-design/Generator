var variableTimer = setInterval(() =>
{
    if (!graph.currentPage)
        return;
    
    const varNodes = graph.currentPage.nodes.filter(n => 
           n.type             == VARIABLE 
        && n.linkedVariableId != NULL);

    uiQueueMessageToFigma({
        cmd:         'figGetVariableUpdates',
        linkedVarIds: varNodes.map(n => n.linkedVariableId)});
},
333);



function uiReturnFigGetAllLocalVariables(msg)
{
    const variables = JSON.parse(msg.variables);

    initLocalVariablesMenu(variables, msg.nodeId, msg.nCollections);

    menuLocalVariables.showAt(msg.px, msg.py, false);
}



function uiReturnFigGetVariableUpdates(values)
{
    const varNodes = graph.currentPage.nodes.filter(n => 
               n.type             == VARIABLE 
            && n.linkedVariableId != NULL);


    for (let value of values)
    {
        const node = varNodes.find(n => n.linkedVariableId == value.id);

        if (node)
        {
            node.updateValueParamType(value.resolvedType);

            if (node.paramValue)
            {
                if (node.paramValue.input.connected)
                    uiUpdateVariable(value.id, getVariableValue(node.paramValue.value));
                else
                    node.updateValueParamValues(value.resolvedType, value.name, [value.value], true);
            }
        }
    }
}



function uiReturnFigLinkNodeToVariable(msg)
{
    const node = nodeFromId(msg.nodeId);

    node.updateValueParamValues(
        msg.resolvedType, 
        msg.variableName,
        msg.values);

    pushUpdate(null, [node]);
}



function initLocalVariablesMenu(variables, nodeId, nCollections)
{
    const node = nodeFromId(nodeId);
    consoleAssert(node.type == VARIABLE, 'node must be VARIABLE');


    const linkedNodes = graph.currentPage.nodes.filter(n => 
           n.type == VARIABLE
        && n.linkedVariableId != NULL);


    menuLocalVariables.clearItems();

    
    for (const variable of variables)
    {
        const options = {};

        options.callback = () => actionManager.do(
            new LinkExistingVariableAction(
                nodeId,
                variable.id,
                variable.resolvedType,
                variable.name));

        options.enabled = !linkedNodes.find(n => n.linkedVariableId == variable.id);


        switch (variable.resolvedType)
        {
            case 'FLOAT':   options.icon = iconVarNumber;  break;
            case 'BOOLEAN': options.icon = iconVarBoolean; break;
            case 'STRING':  options.icon = iconVarText;    break;
            case 'COLOR':   options.icon = iconVarColor;   break;
        }


        let name = '';
        
        if (nCollections > 1)
            name += variable.collectionName + '/';
        
        name += variable.name;


        const item = new MenuItem(name.replaceAll('/', ' / '), null, options);

        item.setChecked(variable.id == node.linkedVariableId);

        menuLocalVariables.addItems([item]);
    }


    if (!isEmpty(variables))
        menuLocalVariables.addItems([new MenuItem('', null, {separator: true})]);

        
    menuLocalVariables.addItems(
    [
        new MenuItem('None', null, 
        {
            callback: e => actionManager.do(new LinkExistingVariableAction(nodeId, NULL, NULL, '')),
            enabled:  node.linkedVariableId != NULL
        })
    ]);


    const divSearch     = createDiv    ('variableSearch'    );
    const divIcon       = createDiv    ('variableSearchIcon');
    const divSearchText = createTextbox('variableSearchText');

    divIcon.innerHTML = iconSearchMenu2;
    
    divSearch.appendChild(divIcon);
    divSearch.appendChild(divSearchText);
    

    if (!menuLocalVariables.div.contains(divSearch))
        menuLocalVariables.div.insertBefore(divSearch, menuLocalVariables.divItems);

    menuLocalVariables.divItems.style.marginTop = '36px';

    divSearchText.placeholder      = 'Find...';
    divSearchText.style.background = 'none';

    menuLocalVariables.showCallback = () => 
    {
        divSearch.style.width = menuLocalVariables.divItems.offsetWidth;
        divSearchText.focus();
    };
}



function uiLinkNodeToVariable(node, varId, varType, varName)
{
    node.linkedVariableId   = varId;
    node.linkedVariableType = varType;
    node.linkedVariableName = varName;
    
    if (varName != NULL)
        node.name = varName;


    node.updateValueParamType(varType);


    uiQueueMessageToFigma(
    {
        cmd:       'figLinkNodeToVariable',
        nodeId:     node.id,
        variableId: varId
    });
}



function uiUpdateVariable(variableId, value)
{
    uiQueueMessageToFigma({
        cmd:       'figUpdateVariable',
        variableId: variableId,
        value:      value});
}



function getValueFromVariable(resolvedType, val)
{
    let value;

    switch (resolvedType)
    {
        case 'FLOAT':   value = new NumberValue(val);            break;
        case 'BOOLEAN': value = new NumberValue(val ? 1 : 0, 0); break;
        case 'STRING':  value = new TextValue(val);              break;

        case 'COLOR':
            value = ColorValue.create(
                1, 
                Math.round(val.r * 0xff), 
                Math.round(val.g * 0xff), 
                Math.round(val.b * 0xff)); 
            
            break;
    }

    return value;
}



function getVariableValue(value)
{
    switch (value.type)
    {
        case NUMBER_VALUE: return value.value;
        case TEXT_VALUE:   return value.value;
        case COLOR_VALUE:  return value.toRgbObject(true);
    }
}