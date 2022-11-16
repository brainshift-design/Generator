var _dataModeNodes = [];
var _dataModeConns = [];



function loadNodesAndConnsData(_nodes, _conns)
{
    _dataModeNodes = _nodes;
    _dataModeConns = _conns;

    for (const _node of daatModeNodes) dataViewNodes.appendChild(createNodeDataDiv(_node));
    for (const _conn of daatModeConns) dataViewConns.appendChild(createConnDataDiv(_conn));
}



function createNodeDataDiv(_node)
{
    const node = JSON.parse(_node);
    const div  = createDiv('dataViewNode');

    div.innerHTML = node.id;
    div.showJson  = false;


    div.addEventListener('dblclick', () =>
    {
        div.showJson = !div.showJson;

        if (div.showJson)
        {
            div.innerHTML           = formatSavedNodeDataJson(_node);

            div.style.paddingLeft   = '0px';
            div.style.paddingRight  = '10px';
            div.style.textAlign     = 'left';
            div.style.fontFamily    = 'Roboto Mono';
            div.style.letterSpacing = '-0.06em';
        }
        else
        {
            div.innerHTML           = node.id;

            div.style.paddingLeft   = '6px';
            div.style.paddingRight  = '6px';
            div.style.textAlign     = 'center';
            div.style.fontFamily    = 'Inter';
            div.style.letterSpacing = 0;
        }
    });


    div.addEventListener('pointerdown', e =>
    {
        e.preventDefault();

        if (e.button == 2)
        {
            hideAllMenus();
            menuNodeData.showAt(e.clientX, e.clientY);
        }
    });


    return div;
}



function createConnDataDiv(_conn)
{
    const conn = JSON.parse(_conn);
    const div  = createDiv('dataViewConn');

    const arrow = ' ' + rightArrowChar(parseBool(conn.list)) + ' ';

    div.innerHTML = 
         (false ? '🛑&nbsp;&nbsp' : '')
        + conn.outputNodeId + '.' + conn.outputId
        + arrow
        + conn.inputNodeId + '.' + conn.inputId;


    div.addEventListener('pointerdown', e =>
    {
        e.preventDefault();

        if (e.button == 2)
        {
            hideAllMenus();
            menuConnData.showAt(e.clientX, e.clientY);
        }
    });


    return div;
}



function dataModeDeleteNodes(node)
{
    const conns = dataModeConns.filter(_conn => 
    {
        const conn = JSON.parse(_conn);

        return conn.outputNodeId == node.id
            || conn. inputNodeId == node.id;
    });


    uiRemoveSavedNodesAndConns([node.id]);


    TODO remove node and connections from the data view (
}