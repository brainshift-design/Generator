// --> from Figma
///////////////////////////////////////////////////////////////////////////////////////////////////

onmessage = e =>
{
    var msg = e.data.pluginMessage;

    switch (msg.cmd)
    {
        case 'uiForwardToGen': uiPostMessageToGenerator(msg.msg); break;
        case 'uiEndLoadState': uiEndLoadState          (msg);     break;
        //case 'uiUpdatePanAndZoom': graphView.updatePanAndZoom(); break;
    }    
}    
  
///////////////////////////////////////////////////////////////////////////////////////////////////



// from Generator <--
///////////////////////////////////////////////////////////////////////////////////////////////////

generator.onmessage = function(e)
{
    switch (e.data.msg)
    {
        case 'uiMakeActive':      uiMakeActive     (e.data.nodeIds);                            break;
        case 'uiShowParamValue':  uiShowParamValue (e.data.nodeId, e.data.param, e.data.value); break;
        case 'uiGenerateObjects': uiGenerateObjects(e.data.nodeIds);                            break;
        case 'uiUpdateObjects':   uiUpdateObjects  (e.data.objects);                            break;
    }
};

///////////////////////////////////////////////////////////////////////////////////////////////////



// <-- to Figma
function uiPostMessageToFigma(msg)
{
    parent.postMessage({ pluginMessage: msg }, '*');    
}



// to Generator -->
function uiPostMessageToGenerator(msg)
{
    generator.postMessage(msg);
}



///////////////////////////////////////////////////////////////////////////////////////////////////



function uiEndLoadState(msg)
{
    currentUser = msg.currentUser;
    productKey  = msg.productKey;

    initMenuSelect(menuSelect);
    menuSelect.initMenu();

    updateMenuSelectItems();
}



function updateMenuSelectItems()
{
    let items = 
    [
        {value: 'graph0',     text: 'Untitled'      },
        {value: 'new',        text: 'New graph'     },
        {value: 'loadLocal',  text: 'Load from file'}
    ];

    checkAddMenuItemsSave     (items);
    checkAddMenuItemProductKey(items);

    menuSelect.updateItems(items);
}



function checkAddMenuItemsSave(menuSelectItems)
{
    if (validateProductKey(currentUser.id, productKey))
    {
        menuSelectItems.push(...
        [
            {value: 'duplicate',  text: 'Duplicate'      },
            {value: 'saveLocal',  text: 'Save local copy'},
            {value: 'delete',     text: 'Delete'         } 
        ]);
    }
}



function checkAddMenuItemProductKey(menuSelectItems)
{
    if (!validateProductKey(currentUser.id, productKey))
        menuSelectItems.push({value: 'productKey', text: 'Enter product key'});
}



function removeMenuItemProductKey()
{
    let index = menuSelect.items.findIndex(item => item.value == 'productKey');
    removeAt(menuSelect.items, index);
    menuSelect.updateItems();
}



function uiNotify(text, prefix = 'Generator: ', delay = 4000)
{
    uiPostMessageToFigma({ 
        cmd:   'notify',
        text:   text,
        prefix: prefix,
        delay:  delay
    });        
}    