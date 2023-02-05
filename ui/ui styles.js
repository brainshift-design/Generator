function uiLinkNodeToExistingColorStyle(node, styleId, styleName, paints)
{
    node.linkedStyleId   = styleId;
    node.linkedStyleName = styleName;


    node.name =
        styleName != NULL
        ? styleName
        : node.defShortName;


    if (styleId != NULL)
    {
        if (paints.length > 0)
        {
            const c = paints[0];

            node.paramValue.setValue(ColorValue.fromRgb([
                Math.round(c[0] * 0xff),
                Math.round(c[1] * 0xff),
                Math.round(c[2] * 0xff)]));
        }
    }
    else
    {
        node.paramValue.setValue(ColorValue.NaN);

        if (node.paramValue.input.connected)
            actionManager.do(new DisconnectAction(node.paramValue.input), true);
    }


    pushUpdate(null, [node]);


    uiQueueMessageToFigma({
        cmd:    'figLinkNodeToExistingColorStyle',
        nodeId:  node.id,
        styleId: styleId});
}



function uiStylePropertyChange(msg)
{
    const node = graph.nodes.find(n => 
           n.type == COLOR_STYLE 
        && n.linkedStyleId == cleanStyleId(msg.styleId));

    if (!node)
        return;
    
    
    for (const prop of msg.properties)
    {
        switch (prop)
        {
            case 'name':
                node.name = msg.name;
                break;

            case 'paint':
                if (msg.paints.length > 0)
                {
                    const paint = msg.paints[0];

                    if (paint.type == 'SOLID')
                    {
                        const c = paint.color;

                        node.paramValue.setValue(ColorValue.fromRgb([
                            Math.round(c.r * 0xff),
                            Math.round(c.g * 0xff),
                            Math.round(c.b * 0xff)]));
                    }
                }

                break;
        }
    }


    if (node)
    {
        pushUpdate(null, [node]);

        actionManager.clear();
        uiShowClearUndoWarning();
    }
}



function uiStyleDelete(msg)
{
    const node = graph.nodes.find(n => 
           n.type == COLOR_STYLE 
        && n.linkedStyleId == cleanStyleId(msg.styleId));


    if (node)
    {
        uiLinkNodeToExistingColorStyle(node, NULL, '', []);
        
        actionManager.clear();
        uiShowClearUndoWarning();
    }
}



function uiReturnFigGetAllLocalColorStyles(msg)
{
    const styles = JSON.parse(msg.styles);

    initLocalStylesMenu(styles, msg.nodeId);

    menuLocalStyles.showAt(msg.px, msg.py);
}



function uiSetStyleId(msg)
{
    nodeFromId(msg.nodeId).linkedStyleId = msg.styleId;
}



function uiHideClearUndoWarning()
{
    updateSettingAndMenu(
        'showClearUndoWarning',  
         true, 
        !settings.showClearUndoWarning);
}



function initLocalStylesMenu(styles, nodeId)
{
    const node = nodeFromId(nodeId);
    console.assert(node.type == COLOR_STYLE, 'node must be COLOR_STYLE');


    menuLocalStyles.clearItems();

    for (const style of styles)
    {
        const options = {};

        if (style.paints.length == 1)
        {
            const rgb = style.paints[0];
            options.icon = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="8" fill="' + rgb2style(rgb) + '"/></svg>';
        }

        if (   style.existing == undefined
            || style.existing)
            options.enabled = false;

        options.callback = () => actionManager.do(
            new LinkExistingStyleAction(
                nodeId,
                style.id, 
                style.name,
                style.paints));
            
        const item = new MenuItem(style.name.replaceAll('/', ' / '), options);

        item.setChecked(style.nodeId == node.id);

        menuLocalStyles.addItems([item]);
    }


    menuLocalStyles.addItems([
        new MenuItem('',     {separator: true}),   
        new MenuItem('None', {
            callback: e => actionManager.do(new LinkExistingStyleAction(nodeId, NULL, '', [])),
            enabled:  node.linkedStyleId != NULL})
    ]);
}



