function uiEndLoadState(msg)
{
    currentUser = msg.currentUser;
    productKey  = msg.productKey;

    setInterval(autoSave, 5000); // auto save every 5 seconds
    uiGetPluginData('graph'); // load graph from current page

    uiEndResizeWindow();
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
        cmd:   'figNotify',
        text:   text,
        prefix: prefix,
        delay:  delay
    });        
}