function uiLinkNodeToExistingColorStyle(node, styleId, styleName, paints)
{
    node.linkedStyleId   = styleId;
    node.linkedStyleName = styleName;


    if (styleName != NULL)
        node.name = styleName;

    // node.name =
    //     styleName != NULL
    //     ? styleName
    //     : node.defName;

        
    if (styleId != NULL)
    {
        if (!isEmpty(paints))
        {
            const c = paints[0];

            node.paramValue.setValue(FillValue.create(
                Math.round(c[0] * 0xff),
                Math.round(c[1] * 0xff),
                Math.round(c[2] * 0xff),
                Math.round(c[3] * 100 )));
        }
    }
    else
    {
        node.paramValue.setValue(FillValue.NaN);

        // if (node.paramValue.input.connected)
        //     actionManager.do(new DisconnectAction(node.graph, node.paramValue.input), true);
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
                if (!isEmpty(msg.paints))
                {
                    const paint = msg.paints[0];

                    if (paint.type == 'SOLID')
                    {
                        node.paramValue.setValue(FillValue.create(
                            Math.round(paint.color.r * 0xff),
                            Math.round(paint.color.g * 0xff),
                            Math.round(paint.color.b * 0xff),
                            Math.round(paint.opacity * 100 )));
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

    menuLocalStyles.showAt(msg.px, msg.py, false);
}



function uiSetStyleId(msg)
{
    graph.nodeFromId(msg.nodeId).linkedStyleId = msg.styleId;
}



function initLocalStylesMenu(styles, nodeId)
{
    const node = graph.nodeFromId(nodeId);
    console.assert(node.type == COLOR_STYLE, 'node must be COLOR_STYLE');


    menuLocalStyles.clearItems();

    for (const style of styles)
    {
        const options = {};

        if (style.paints.length == 1)
        {
            const rgba = style.paints[0];
            options.icon = createStyleIcon(rgba);//'<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="8" fill="' + rgb2style(rgb) + '"/></svg>';
        }

        if (   style.existing == undefined
            || style.existing)
            options.enabled = false;

        options.callback = () => actionManager.do(
            new LinkExistingStyleAction(
                graph,
                nodeId,
                style.id, 
                style.name,
                style.paints));
            
        const item = new MenuItem(style.name.replaceAll('/', ' / '), options);

        item.setChecked(style.nodeId == node.id);

        menuLocalStyles.addItems([item]);
    }


    if (!isEmpty(styles))
        menuLocalStyles.addItems([new MenuItem('', {separator: true})]);

        
    menuLocalStyles.addItems([
        new MenuItem('None', {
            callback: e => actionManager.do(new LinkExistingStyleAction(node.graph, nodeId, NULL, '', [])),
            enabled:  node.linkedStyleId != NULL})
    ]);
}



function createStyleIcon(rgba)
{
    const rgba0 = hex2rgb('d9d9d9');
    const rgba1 = hex2rgb('f6f6f6');

    rgba0[3] = 1 - rgba[3];
    rgba1[3] = 1 - rgba[3];

    const icon = 
        '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"> \
            <g clip-path="url(#clip0_1300_182)"> \
            <rect width="16" height="16" rx="8" fill="#'+rgba2hex(rgba1)+'"/> \
            <path fill-rule="evenodd" clip-rule="evenodd" d="M3 0H0V3H3V6H0V9H3V12H0V15H3V18H6V15H9V18H12V15H15V18H18V15H15V12H18V9H15V6H18V3H15V0H12V3H9V0H6V3H3V0ZM6 6V3H9V6H6ZM6 9H3V6H6V9ZM9 9H6V12H3V15H6V12H9V15H12V12H15V9H12V6H15V3H12V6H9V9ZM9 9V12H12V9H9Z" fill="#'+rgba2hex(rgba0)+'"/> \
            <path d="M0 16V0L16 16H0Z" fill="#2C2C2C"/> \
            <rect width="16" height="16" fill="' + rgba2style(rgba) + '"/> \
            </g> \
            <defs> \
            <clipPath id="clip0_1300_182"> \
            <rect width="16" height="16" rx="8" fill="white"/> \
            </clipPath> \
            </defs> \
        </svg>';

    return icon.replaceAll('#', '%23');
}