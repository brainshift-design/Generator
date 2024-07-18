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
                // if (node.paramValue.input.connected)
                // {
                //     uiUpdateVariable(
                //         value.id, 
                //         node.linkedVariableTemp, 
                //         getVariableValue(node.paramValue.value));
                // }
                // else
                //     node.updateValueParamValues(value.resolvedType, value.name, [value.value], true);
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


    menuLocalVariables.node      = node;
    menuLocalVariables.variables = variables;
    menuLocalVariables.menuItems = [];
    menuLocalVariables.itemIndex = -1;


    for (const variable of variables)
    {
        const options = {};

        options.callback = () => {};
        // () => actionManager.do(
        //     new LinkExistingVariableAction(
        //         nodeId,
        //         variable.id,
        //         variable.resolvedType,
        //         variable.name,
        //         false));

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


        const item = new MenuItem(name.replaceAll('/', ' / '), null, false, options);

        item.setChecked(variable.id == node.linkedVariableId);

        menuLocalVariables.menuItems.push(item);
    }


    for (const child of menuLocalVariables.div.children)
        if (   child != menuLocalVariables.divItems
            && child != menuLocalVariables.divArrow)
            menuLocalVariables.div.removeChild(child);


    menuLocalVariables.divSearch     = createDiv    ('variableSearch'    );
    menuLocalVariables.divIcon       = createDiv    ('variableSearchIcon');
    menuLocalVariables.divSearchText = createTextbox('variableSearchText');

    menuLocalVariables.divIcon.innerHTML = iconSearchMenu2;

    menuLocalVariables.divSearchText.spellcheck  = false;
    menuLocalVariables.divSearchText.style.color = '#fff';
    
    menuLocalVariables.divSearch.appendChild(menuLocalVariables.divIcon);
    menuLocalVariables.divSearch.appendChild(menuLocalVariables.divSearchText);
    

    if (!menuLocalVariables.div.contains(menuLocalVariables.divSearch))
        menuLocalVariables.div.insertBefore(menuLocalVariables.divSearch, menuLocalVariables.divItems);

    menuLocalVariables.divItems.style.marginTop = '39px';

    menuLocalVariables.divSearchText.placeholder      = 'Find...';
    menuLocalVariables.divSearchText.style.background = 'none';


    menuLocalVariables.selectIndex = index =>
    {
        menuLocalVariables.itemIndex = index;

        if (menuLocalVariables.itemIndex > -1)
            menuLocalVariables.items[menuLocalVariables.itemIndex].select();
    };


    menuLocalVariables.showCallback = () => 
    {
        menuLocalVariables.divSearch.style.width = menuLocalVariables.divItems.offsetWidth;
        menuLocalVariables.divSearchText.focus();

        // if (menuLocalVariables.items.length > 0)
        // {
        //     if (menuLocalVariables.itemIndex < 0)
        //         menuLocalVariables.itemIndex = 0;
        //     else
        //         menuLocalVariables.itemIndex = Math.min(menuLocalVariables.itemIndex, menuLocalVariables.items.length-1);
        
        //     menuLocalVariables.updateItem(menuLocalVariables.items[menuLocalVariables.itemIndex], true);
        // }
    };


    menuLocalVariables.updateItem = (item, highlight) =>
    {
        if (!item) return;
        
        item.divHighlight.style.left       = 0;
        item.divHighlight.style.width      = 'calc(100% - ' + (item.childMenu && item.callback ? item.arrowWidth : 0) + 'px)';
        item.divHighlight.style.background = highlight ? 'var(--figma-color-bg-brand)' : 'transparent';
    };
    


    menuLocalVariables.divSearchText.addEventListener('input', e => updateMenuLocalVariables());

    menuLocalVariables.divSearchText.addEventListener('keydown', e => 
    {
        e.stopImmediatePropagation();

        if (e.code == 'ArrowUp')
        {
            e.preventDefault();

            if (menuLocalVariables.itemIndex > -1)
                menuLocalVariables.updateItem(menuLocalVariables.items[menuLocalVariables.itemIndex], false);
            

            let scroll = 25;

            while (menuLocalVariables.itemIndex > 0
                && menuLocalVariables.items[menuLocalVariables.itemIndex-1].separator)
            {
                menuLocalVariables.itemIndex = Math.max(0, menuLocalVariables.itemIndex - 1);
                scroll += 25;
            }


            menuLocalVariables.itemIndex = Math.max(0, menuLocalVariables.itemIndex - 1);
            menuLocalVariables.updateItem(menuLocalVariables.items[menuLocalVariables.itemIndex], true);

            if (   menuLocalVariables.itemIndex > -1
                && menuLocalVariables.itemIndex * 25 - menuLocalVariables.div.scrollTop < 0)
                menuLocalVariables.div.scrollTop -= scroll;
        }
        else if (e.code == 'ArrowDown')
        {
            e.preventDefault();

            if (menuLocalVariables.itemIndex > -1)
                menuLocalVariables.updateItem(menuLocalVariables.items[menuLocalVariables.itemIndex], false);
    

            let scroll = 25;

            while (menuLocalVariables.itemIndex < menuLocalVariables.items.length-1
                && menuLocalVariables.items[menuLocalVariables.itemIndex+1].separator)
            {
                menuLocalVariables.itemIndex = Math.min(menuLocalVariables.itemIndex + 1, menuLocalVariables.items.length-1);
                scroll += 25;
            }

            
            menuLocalVariables.itemIndex = Math.min(menuLocalVariables.itemIndex + 1, menuLocalVariables.items.length-1);
            menuLocalVariables.updateItem(menuLocalVariables.items[menuLocalVariables.itemIndex], true);

            if (   menuLocalVariables.itemIndex > -1
                && (menuLocalVariables.itemIndex+1) * 25 - menuLocalVariables.div.scrollTop > menuLocalVariables.div.offsetHeight - 39)
                menuLocalVariables.div.scrollTop += scroll;
        }
        else if (e.code == 'Enter'
              || e.code == 'NumpadEnter')
        {
            e.preventDefault();
            menuLocalVariables.selectIndex(menuLocalVariables.itemIndex);
        }
        else if (e.code == 'Escape')
            hideAllMenus();
    });


    updateMenuLocalVariables();
}



function updateMenuLocalVariables()
{
    const items = menuLocalVariables.menuItems.filter(item => 
           includesSimilar(item.name.toLowerCase(), menuLocalVariables.divSearchText.value.toLowerCase(), 0.5)
        || item.name == 'None');
        
    menuLocalVariables.clearItems();
    

    menuLocalVariables.addItems(
    [
        new MenuItem('None', null, false,
        {
            callback: e => actionManager.do(new LinkExistingVariableAction(menuLocalVariables.node.nodeId, NULL, NULL, '', false)),
            enabled:  menuLocalVariables.node.linkedVariableId != NULL
        })
    ]);

    // if (!isEmpty(items))
    //     menuLocalVariables.addItems([new MenuItem('', null, false, {separator: true})]);

    menuLocalVariables.addItems(items);


    menuLocalVariables.showAt(
        menuLocalVariables.div.getBoundingClientRect().x - 4,
        menuLocalVariables.div.getBoundingClientRect().y,
        false);
}



function uiLinkNodeToVariable(node, varId, varType, varName, varTemp)
{
    if (   node.linkedVariableType != NULL
        && varType == NULL
        && node.paramValue)
    {
        if (node.paramValue.input.connected)
            uiDeleteSavedConn(node.paramValue.input.connection);

        if (node.paramValue.output.connected)
        {
            for (const input of node.paramValue.output.connectedInputs)
                uiDeleteSavedConn(input.connection);
        }
    }


    node.linkedVariableId   = varId;
    node.linkedVariableType = varType;
    node.linkedVariableName = varName;
    node.linkedVariableTemp = varTemp;
    
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



function uiUpdateVariable(variableId, variableTemp, value)
{
    uiQueueMessageToFigma({
        cmd:         'figUpdateVariable',
        variableId:   variableId,
        variableTemp: variableTemp,
        value:        value});
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