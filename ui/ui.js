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



function uiReturnFigGetAllLocalColorStyles(msg)
{
    const styles = JSON.parse(msg.styles);

    initLocalStylesMenu(styles, msg.nodeId);

    menuLocalStyles.showAt(msg.px, msg.py);
}



function initLocalStylesMenu(styles, nodeId)
{
    menuLocalStyles.clearItems();


    for (const style of styles)
    {
        const options = {};

        if (style.paints.length == 1)
        {
            const rgb = style.paints[0];

            options.icon = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="8" fill="' + rgb2style(rgb) + '"/></svg>';
        }
        
        options.callback = e => actionManager.do(
            new LinkExistingStyleAction(
                nodeId, 
                style.name,
                //style.styleIndex, 
                style.paints));
            
        menuLocalStyles.addItems([new MenuItem(style.name, options)]);
    }
}



function dockWindowTop()
{
    uiQueueMessageToFigma({ 
        cmd: 'figPositionWindow',
        x:    0,
        y:    0
    });        
}



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