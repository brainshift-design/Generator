// function checkAddMenuItemProductKey(menuSelectItems)
// {
//     if (!validateProductKey(currentUser.id, productKey))
//         menuSelectItems.push({value: 'productKey', text: 'Enter product key'});
// }



// function removeMenuItemProductKey()
// {
//     let index = menuSelect.items.findIndex(item => item.value == 'productKey');
//     removeAt(menuSelect.items, index);
//     menuSelect.updateItems();
// }



function uiError(text, delay = 6000)
{
    uiNotify(text, GEN_LOGO + ' Error: ', delay, true);
}



function uiNotify(text, prefix = GEN_LOGO + ' ', delay = 4000, error = false)
{
    uiQueueMessageToFigma({ 
        cmd:   'figNotify',
        text:   text,
        prefix: prefix,
        delay:  delay,
        error:  error
    });        
}