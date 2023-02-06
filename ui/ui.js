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



function uiNotify(text, options = {})
{
    if (options.delay        == undefined) options.delay        = 4000;
    if (options.error        == undefined) options.error        = false;
    if (options.prefix       == undefined) options.prefix       = GENERATOR_LOGO + '  ';
    if (options.buttonText   == undefined) options.buttonText   = '';
    if (options.buttonAction == undefined) options.buttonAction = NULL;


    uiQueueMessageToFigma({ 
        cmd:         'figNotify',
        text:         text,
        prefix:       options.prefix,
        delay:        options.delay,
        error:        options.error,
        buttonText:   options.buttonText,
        buttonAction: options.buttonAction
    });        
}



function uiShowClearUndoWarning()
{
    if (settings.showClearUndoWarning)
    {
        // const options = {
        //     buttonText:   'Ignore',
        //     buttonAction: 'hideClearUndoWarning' };

        uiNotify('⚠️    Changing linked styles in Figma clears Generator\'s undo', {delay: 8000});//Undo has been cleared', options);
        updateSettingAndMenu('showClearUndoWarning', true, false);
    }
}



function uiHideClearUndoWarning()
{
    updateSettingAndMenu(
        'showClearUndoWarning',  
         true, 
        !settings.showClearUndoWarning);
}