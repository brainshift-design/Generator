const noUpdateVariableIds  = [];
const noUpdatePrecisionIds = [];


var variableTimer = null;

startVariablePolling();



function startVariablePolling()
{
    variableTimer = setInterval(() =>
    {
        if (!graph.currentPage)
            return;
    
        // this is variable polling

        const varNodes = graph.currentPage.nodes.filter(n => 
            n.type     == VARIABLE 
            && n.variableId != NULL);

        uiQueueMessageToFigma({
            cmd:         'figGetVariableUpdates',
            linkedVarIds: varNodes.map(n => n.variableId)});
    },
    333);
}



function stopVariablePolling()
{
    if (!variableTimer)
        return;

    clearInterval(variableTimer);
    variableTimer = null;
}



function uiReturnFigGetAllLocalVariables(msg)
{
    const variables = JSON.parse(msg.variables);

    initLocalVariablesMenu(variables, msg.nodeId, msg.nCollections);

    menuLocalVariables.showAt(msg.px, msg.py, false);
}



function uiReturnFigGetVariableUpdates(variables)
{
    const varNodes = graph.currentPage.nodes.filter(n =>
               n.type       == VARIABLE
            && n.variableId != NULL);


    for (let variable of variables)
    {
        const foundIndex = noUpdateVariableIds.indexOf(variable.id);

        if (foundIndex > -1)
        {
            noUpdateVariableIds.splice(foundIndex, 1);
            continue;
        }


        const node = varNodes.find(n => n.variableId == variable.id);

        if (node)
        {
            node.updateValueParamsFromResolved(
                variable.resolvedType,
                variable.resolvedValues);

            if (node.paramValues.length > 0)
            {
                // if (!node.paramValue.input.connected)
                // {
                    node.updateValueParamValuesFromResolved(
                        variable.resolvedType,
                        variable.name,
                        variable.resolvedValues,
                        true);
                // }
            }
        }
    }
}



function uiReturnFigLinkNodeToVariable(msg)
{
    //const node = nodeFromId(msg.nodeId);

    // node.updateValueParamValuesFromResolved(
    //     msg.resolvedType, 
    //     msg.variableName,
    //     msg.values);

    //pushUpdate(null, [node]);
}



function uiReturnFigRelinkVariable(msg)
{
    const node = graph.currentPage.nodes.find(n => 
           n.type == VARIABLE 
        && n.variableId == msg.oldVariableId);

    node.variableId = msg.newVariableId;
}



function initLocalVariablesMenu(variables, nodeId, nCollections)
{
    const node = nodeFromId(nodeId);
    consoleAssert(node.type == VARIABLE, 'node must be VARIABLE');


    const linkedNodes = graph.currentPage.nodes.filter(n => 
           n.type       == VARIABLE
        && n.variableId != NULL);


    menuLocalVariables.node      = node;
    menuLocalVariables.variables = variables;
    menuLocalVariables.menuItems = [];
    menuLocalVariables.itemIndex = -1;


    const collator = new Intl.Collator(
        undefined, 
        { 
            numeric:      true, 
            sensitivity: 'base' 
        });
    

    variables.sort((a, b) => 
    {
        const aParts = a.name.split('/');
        const bParts = b.name.split('/');

      
        // compare the first part (e.g., "Collection 1")
        const firstPartComparison = collator.compare(aParts[0], bParts[0]);

        if (firstPartComparison !== 0) 
            return firstPartComparison;


        // if first parts are equal, sort by number of parts (shorter paths first)
        if (aParts.length !== bParts.length)
            return aParts.length - bParts.length;
        

        // compare remaining parts except the last one
        for (let i = 1; i < aParts.length - 1; i++) 
        {
            const aPart = aParts[i];
            const bPart = bParts[i];
        
            const comparison = collator.compare(aPart, bPart);
        
            if (comparison !== 0)
                return comparison;
        }


        // compare the last part with special logic
        const aLast        = aParts[aParts.length - 1];
        const bLast        = bParts[bParts.length - 1];

        const aNumberMatch = aLast.match(/\d+/);
        const bNumberMatch = bLast.match(/\d+/);

        const aHasNumber   = aNumberMatch !== null;
        const bHasNumber   = bNumberMatch !== null;


        if (aHasNumber && bHasNumber) // both have numbers, compare numerically in descending order
        {
            const aNumber = parseInt(aNumberMatch[0], 10);
            const bNumber = parseInt(bNumberMatch[0], 10);

            return bNumber - aNumber; // higher numbers come first
        }
        else if (aHasNumber) // only 'a' has a number, it comes before 'b'
            return -1;
        else if (bHasNumber) // only 'b' has a number, it comes before 'a'
            return 1;
        else                 // neither has a number, compare normally
            return collator.compare(aLast, bLast);
    });


    for (const variable of variables)
    {
        const options = {};

        options.callback = () => actionManager.do(
            new LinkExistingVariableAction(
                nodeId,
                variable.id,
                variable.resolvedType,
                variable.name,
                variable.resolvedValues));

        options.enabled = !linkedNodes.find(n => n.variableId == variable.id);


        switch (variable.resolvedType)
        {
            case 'FLOAT':   options.icon = iconVarNumber;  break;
            case 'BOOLEAN': options.icon = iconVarBoolean; break;
            case 'STRING':  options.icon = iconVarText;    break;
            case 'COLOR':   options.icon = iconVarColor;   break;
        }


        const name = variable.name;
        const item = new MenuItem(name.replaceAll('/', ' / '), null, false, options);

        item.setChecked(variable.id == node.variableId);

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
    const search = menuLocalVariables.divSearchText.value.toLowerCase();

    const items = menuLocalVariables.menuItems.filter(item => 
           includesSimilar(item.name.toLowerCase(), search, 0.5)
        || item.name == 'None');
        

    menuLocalVariables.clearItems();
    

    if (search.trim() == '')
    {
        menuLocalVariables.addItems(
        [
            new MenuItem('None', null, false,
            {
                callback: e => actionManager.do(new LinkExistingVariableAction(menuLocalVariables.node.nodeId, NULL, NULL, '', [])),
                enabled:  menuLocalVariables.node.variableId != NULL
            })
        ]);

        if (items.length > 0)
            menuLocalVariables.addItems([new MenuItem('', null, false, {separator: true})]);
    }


    let prevPath;
    
    for (const item of items)
    {
        const path = item.name.split('/').slice(0, -1).join('/');

        if (   prevPath
            && path != prevPath)
            menuLocalVariables.addItems([new MenuItem('', null, false, {separator: true})]);

        prevPath = path;


        menuLocalVariables.addItems([item]);
    }


    menuLocalVariables.showAt(
        menuLocalVariables.div.getBoundingClientRect().x - 4,
        menuLocalVariables.div.getBoundingClientRect().y,
        false);
}



function uiLinkNodeToVariable(node, varId, varType, varName, varValues)//, varTemp)
{
    if (   node.variableType != NULL
        && varType == NULL
        && node.paramValues.length > 0)
    {
        for (const paramValue of node.paramValues)
        {
            if (paramValue.input.connected)
                uiDeleteSavedConn(paramValue.input.connection);

            if (paramValue.output.connected)
            {
                for (const input of paramValue.output.connectedInputs)
                    uiDeleteSavedConn(input.connection);
            }
        }
    }


    node.variableId     = varId;
    node.variableType   = varType;
    node.variableName   = varName;
    node.variableValues = [...varValues];
    //node.linkedTemp = varTemp;
    
    node.name =
        varName != NULL
            ? varName
            : defaultVariableNodeName;


    node.updateValueParamsFromResolved(varType, varValues);


    pushUpdate(null, [node]);


    // uiQueueMessageToFigma(
    // {
    //     cmd:         'figLinkNodeToVariable',
    //     nodeId:       node.id,
    //     variableId:   varId,
    //     variableType: varType,
    //     variableName: varName
    // });
}



// function uiUpdateVariable(variableId, variableTemp, value)
// {
//     uiQueueMessageToFigma({
//         cmd:         'figUpdateVariable',
//         variableId:   variableId,
//         //variableTemp: variableTemp,
//         value:        value});
// }



function getValueFromVariable(resolvedType, val)
{
    let value;

    switch (resolvedType)
    {
        case 'FLOAT':   value = new NumberValue(roundTo(val, 2), Math.min(decDigits(roundTo(val, 2)), 2)); break;
        case 'BOOLEAN': value = new BooleanValue(val);                         break;
        case 'STRING':  value = new TextValue(val);                                            break;

        case 'COLOR':
            value = 
                val.a == 1
                    ? ColorValue.fromRgb(
                        [Math.round(val.r * 0xff), 
                         Math.round(val.g * 0xff), 
                         Math.round(val.b * 0xff)])
                    : FillValue.fromRgb(
                        [Math.round(val.r * 0xff), 
                         Math.round(val.g * 0xff), 
                         Math.round(val.b * 0xff)],
                        val.a * 100);
            
            break;
    }

    return value;
}



function getVariableValue(value)
{
    switch (value.type)
    {
        case NUMBER_VALUE: return value.value;
        case   TEXT_VALUE: return value.value;
        case  COLOR_VALUE: return value.toRgbObject(true);
        case   FILL_VALUE: return value.toRgbaObject(true);
    }
}