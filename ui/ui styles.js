function uiLinkNodeToExistingColorStyle(node, styleId, styleName, paints)
{
    console.log('styleId =', styleId);
    
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
    }


    uiQueueMessageToFigma({
        cmd:    'figLinkNodeToExistingColorStyle',
        nodeId:  node.id,
        styleId: styleId});
}



function uiStylePropertyChange(msg)
{
    //console.log('msg =', msg);
}



function uiStyleDelete(msg)
{
    console.log('msg =', msg);
    const node = graph.nodes.find(n => 
    {
        console.log('n =', n);

        return n.type == COLOR_STYLE 
            && n.linkedStyleId == msg.styleId;
    });

    console.log('node =', node);

    if (node)
        uiLinkNodeToExistingColorStyle(node, NULL, '', []);
}



function uiReturnFigGetAllLocalColorStyles(msg)
{
    const styles = JSON.parse(msg.styles);

    initLocalStylesMenu(styles, msg.nodeId);

    menuLocalStyles.showAt(msg.px, msg.py);
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
            enabled:  node.linkedStyle != NULL})
    ]);
}



