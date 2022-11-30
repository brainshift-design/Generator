var _dataModeNodes = [];
var _dataModeConns = [];

var dataModeTimeout = null;



dataModeNodesWrapper.addEventListener('pointerdown', e =>
{
    e.preventDefault();

    if (e.button == 2)
    {
        e.stopPropagation();
        menuNodeDataNodes.showAt(e.clientX, e.clientY);
    }
});



dataModeConnsWrapper.addEventListener('pointerdown', e =>
{
    e.preventDefault();

    if (e.button == 2)
    {
        e.stopPropagation();
        menuConnDataConns.showAt(e.clientX, e.clientY);
    }
});



function loadNodesAndConnsData(_nodes, _conns)
{
    _dataModeNodes = _nodes;
    _dataModeConns = _conns;

    for (const _node of _dataModeNodes) dataModeNodes.appendChild(createNodeDataDiv(_node));
    for (const _conn of _dataModeConns) dataModeConns.appendChild(createConnDataDiv(_conn));
}



function createNodeDataDiv(_node)
{
    const div  = createDiv('dataModeNode');
    const node = JSON.parse(_node);


    div._node    = _node;
    div. node    =  node;

    div.showJson = false;

    expandNodeData(div, node, _node);


    div.addEventListener('dblclick', () =>
    {
        div.showJson = !div.showJson;
        expandNodeData(div, node, _node);
    });


    div.addEventListener('pointerenter', () => div.style.background = 'var(--data-mode-node-active)');
    div.addEventListener('pointerleave', () => { if (!menuNodeData._div) div.style.background = 'var(--data-mode-node)'; });


    div.addEventListener('pointerdown', e =>
    {
        e.preventDefault();

        if (e.button == 2)
        {
            e.stopPropagation();

            // div.style.background = 'var(--data-mode-node-active)';

            createDataMenuOnHide(
                menuNodeData,
                div,
                'var(--data-mode-node)'); 

            menuNodeData.showAt(e.clientX, e.clientY);
        }
    });


    return div;
}



function createConnDataDiv(_conn)
{
    const conn = JSON.parse(_conn);
    const div  = createDiv('dataModeConn');

    div._conn    = _conn;
    div. conn    =  conn;

    div.showJson = false;

    expandConnData(div, conn, _conn);


    div.addEventListener('dblclick', () =>
    {
        div.showJson = !div.showJson;
        expandConnData(div, conn, _conn);
    });


    div.addEventListener('pointerenter', () => div.style.background = 'var(--data-mode-conn-active)');
    div.addEventListener('pointerleave', () => { if (!menuConnData._div) div.style.background = 'var(--data-mode-conn)'; });


    div.addEventListener('pointerdown', e =>
    {
        e.preventDefault();
        
        if (e.button == 2)
        {
            e.stopPropagation();

            div.style.background = 'var(--data-mode-conn-active)';

            createDataMenuOnHide(
                menuConnData,
                div,
                'var(--data-mode-conn)');

            menuConnData.showAt(e.clientX, e.clientY);
        }
    });


    return div;
}



function createDataMenuOnHide(menu, div, normal)
{
    menu._div = div;
    
    menu.onHide = () =>
    { 
        menu._div.style.background = normal;
        setTimeout(() => menu._div = null);
    };
}



function expandNodeData(div, node, _node)
{
    if (div.showJson)
    {
        div.innerHTML =
             (node.loading ? '&nbsp;🛑<br/>' : '')
            + formatSavedDataJson(div._node);

        div.style.paddingLeft   = '0px';
        div.style.paddingRight  = '10px';
        div.style.textAlign     = 'left';
        div.style.fontFamily    = 'Roboto Mono';
        div.style.letterSpacing = '-0.06em';
    }
    else
    {
        div.innerHTML = 
             (node.loading ? '🛑&nbsp;&nbsp' : '')
            + div.node.id;

        div.style.paddingLeft   = '6px';
        div.style.paddingRight  = '6px';
        div.style.textAlign     = 'center';
        div.style.fontFamily    = 'Inter';
        div.style.letterSpacing = 0;
    }
}



function expandConnData(div, conn, _conn)
{
    if (div.showJson)
    {
        div.innerHTML =
             (conn.loading ? '&nbsp;🛑<br/>' : '')
            + formatSavedDataJson(div._conn);

        div.style.paddingLeft   = '0px';
        div.style.paddingRight  = '10px';
        div.style.textAlign     = 'left';
        div.style.fontFamily    = 'Roboto Mono';
        div.style.letterSpacing = '-0.06em';
    }
    else
    {
        div.innerHTML = 
             (conn.loading ? '🛑&nbsp;&nbsp' : '')
            + connToString(conn);

        div.style.paddingLeft   = '6px';
        div.style.paddingRight  = '6px';
        div.style.textAlign     = 'center';
        div.style.fontFamily    = 'Inter';
        div.style.letterSpacing = 0;
    }
}



function expandAllNodeData()
{
    for (const div of dataModeNodes.children)
    {
        div.showJson = true;
        expandNodeData(div, div.node, div._node);
    }
}



function collapseAllNodeData()
{
    for (const div of dataModeNodes.children)
    {
        div.showJson = false;
        expandNodeData(div, div.node, div._node);
    }
}



function expandAllConnData()
{
    for (const div of dataModeConns.children)
    {
        div.showJson = true;
        expandConnData(div, div.conn, div._conn);
    }
}



function collapseAllConnData()
{
    for (const div of dataModeConns.children)
    {
        div.showJson = false;
        expandConnData(div, div.conn, div._conn);
    }
}



function dataModeDeleteNode(node)
{
    uiRemoveSavedNodesAndConns([node.id]);


    for (let i = dataModeNodes.children.length-1; i >= 0; i--)
    {
        const div = dataModeNodes.children[i];

        if (div.node.id == node.id)
            dataModeNodes.removeChild(div);
    }


    let nRemovedConns = 0;

    for (let i = dataModeConns.children.length-1; i >= 0; i--)
    {
        const div = dataModeConns.children[i];

        if (   div.conn.outputNodeId == node.id
            || div.conn. inputNodeId == node.id)
        {
            dataModeConns.removeChild(div);
            nRemovedConns++;
        }
    }


    let notice = 'Removed node \'' + node.id + '\'';

    if (nRemovedConns > 0)
        notice += ' and ' + nRemovedConns + ' ' + countString('connection', nRemovedConns);

    uiNotify(notice);
}



function dataModeDeleteAllNodes()
{
    uiRemoveAllSavedNodesAndConns();


    let nRemovedNodes = dataModeNodes.children.length;

    for (let i = dataModeNodes.children.length-1; i >= 0; i--)
        dataModeNodes.removeChild(dataModeNodes.children[i]);


    let nRemovedConns = dataModeConns.children.length;

    for (let i = dataModeConns.children.length-1; i >= 0; i--)
        dataModeConns.removeChild(dataModeConns.children[i]);


    let notice = 'Removed ' + nRemovedNodes + ' ' + countString('node', nRemovedNodes);

    if (nRemovedConns > 0)
        notice += ' and ' + nRemovedConns + ' ' + countString('connection', nRemovedConns);

    uiNotify(notice);
}



function dataModeDeleteAllConnections()
{
    uiRemoveAllSavedConnections();


    let nRemovedConns = dataModeConns.children.length;

    for (let i = dataModeConns.children.length-1; i >= 0; i--)
        dataModeConns.removeChild(dataModeConns.children[i]);


    if (nRemovedConns > 0)
        uiNotify('Removed ' + nRemovedConns + ' ' + countString('connection', nRemovedConns));
}



function dataModeDeleteConnectionsToAndFromNode(node)
{
    uiRemoveSavedConnectionsToNodeId  (node.id);
    uiRemoveSavedConnectionsFromNodeId(node.id);

    
    let nRemovedConns = 0;

    for (let i = dataModeConns.children.length-1; i >= 0; i--)
    {
        const div = dataModeConns.children[i];

        if (   div.conn.outputNodeId == node.id
            || div.conn. inputNodeId == node.id)
        {
            dataModeConns.removeChild(div);
            nRemovedConns++;
        }
    }


    if (nRemovedConns > 0)
        uiNotify('Removed ' + nRemovedConns + ' ' + countString('connection', nRemovedConns) + ' to and from \'' + node.id + '\'');
}



function dataModeDeleteConnectionsFromNode(node)
{
    uiRemoveSavedConnectionsFromNodeId(node.id);


    let nRemovedConns = 0;

    for (let i = dataModeConns.children.length-1; i >= 0; i--)
    {
        const div = dataModeConns.children[i];

        if (div.conn.outputNodeId == node.id)
        {
            dataModeConns.removeChild(div);
            nRemovedConns++;
        }
    }


    if (nRemovedConns > 0)
        uiNotify('Removed ' + nRemovedConns + ' ' + countString('connection', nRemovedConns) + ' from \'' + node.id + '\'');
}



function dataModeDeleteConnectionsToNode(node)
{
    uiRemoveSavedConnectionsToNodeId(node.id);


    let nRemovedConns = 0;

    for (let i = dataModeConns.children.length-1; i >= 0; i--)
    {
        const div = dataModeConns.children[i];

        if (div.conn. inputNodeId == node.id)
        {
            dataModeConns.removeChild(div);
            nRemovedConns++;
        }
    }


    if (nRemovedConns > 0)
        uiNotify('Removed ' + nRemovedConns + ' ' + countString('connection', nRemovedConns) + ' to \'' + node.id + '\'');
}



function dataModeDeleteConnection(conn)
{
    uiRemoveSavedConnection(
        conn.outputNodeId,
        conn.outputId,
        conn.inputNodeId,
        conn.inputId,
        conn.order,
        conn.list);


    for (let i = dataModeConns.children.length-1; i >= 0; i--)
    {
        const div = dataModeConns.children[i];

        if (   div.conn.outputNodeId == conn.outputNodeId
            && div.conn.outputId     == conn.outputId
            && div.conn.inputNodeId  == conn.inputNodeId
            && div.conn.inputId      == conn.inputId
            && div.conn.order        == conn.order)
            dataModeConns.removeChild(div);
    }


    uiNotify('Removed connection  ' + connToString(conn));
}
