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



// function dockWindowTop()
// {
//     uiQueueMessageToFigma({ 
//         cmd: 'figPositionWindow',
//         x:    0,
//         y:    0
//     });        
// }



function uiError(text, delay = 6000)
{
    uiNotify(text, delay, true);
}



function uiNotify(text, delay = 4000, error = false, prefix = GENERATOR_LOGO + '  ')
{
    uiQueueMessageToFigma({ 
        cmd:   'figNotify',
        text:   text,
        prefix: prefix,
        delay:  delay,
        error:  error
    });        
}