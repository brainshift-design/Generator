var tooltipTimer, 
    tooltipInTimer,
    tooltipOutTimer, 
    tooltipLeaveTimer;

    

function uiEndLoadState(msg)
{
    currentUser = msg.currentUser;
    productKey  = msg.productKey;

    uiGetPluginData('graph'); // load graph from current page

    uiEndResizeWindow();

    window.focus();
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



function uiError(text, delay = 4000)
{
    uiPostMessageToFigma({ 
        cmd:   'figNotify',
        text:   text,
        prefix: 'Generator error: ',
        delay:  delay,
        error:  true
    });        
}



function uiNotify(text, prefix = 'Generator: ', delay = 4000, error = false)
{
    uiPostMessageToFigma({ 
        cmd:   'figNotify',
        text:   text,
        prefix: prefix,
        delay:  delay,
        error:  error
    });        
}