var _dataModeNodes = [];
var _dataModeConns = [];

var dataModeTimeout = null;



function initDataMode()
{
    initCheckbox(chkDataModeRestart, 'Restart in debug mode', true );
    initCheckbox(chkLoadingRestart,  'Restart in debug mode', false);

    chkLoadingRestart.style.display = 'none';

    chkDataModeRestart.addEventListener('change', () => uiSetLocalData('dataMode', boolToString(chkDataModeRestart.checked)));
    chkLoadingRestart .addEventListener('change', () => uiSetLocalData('dataMode', boolToString(chkLoadingRestart .checked)));
}



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

    _dataModeNodes.sort((n1, n2) => 
    {
        if (n1.y != n2.y ) return parseFloat(n1.value.y) - parseFloat(n2.value.y);
        if (n1.x != n2.x ) return parseFloat(n1.value.x) - parseFloat(n2.value.x);
        return 0;
    });

    _dataModeConns.sort((c1, c2) => 
    {
        if (c1.value.outputNodeId != c2.value.outputNodeId ) return c1.value.outputNodeId < c2.value.outputNodeId ? -1 : 1;
        if (c1.value.outputId     != c2.value.outputId     ) return c1.value.outputId     < c2.value.outputId     ? -1 : 1;
        if (c1.value.outputOrder  != c2.value.outputOrder  ) return parseInt(c1.value.outputOrder) - parseInt(c2.value.outputOrder);
        return 0;
    });

    
    for (const _node of _dataModeNodes) dataModeNodes.appendChild(createNodeDataDiv(_node));
    for (const _conn of _dataModeConns) dataModeConns.appendChild(createConnDataDiv(_conn));


    updateDataModeInfo();
}



function updateDataModeInfo()
{
    dataModeNodesTitle.innerHTML = dataModeNodes.children.length + '&thinsp;&nbsp;' + countString('node',       dataModeNodes.children.length);
    dataModeConnsTitle.innerHTML = dataModeConns.children.length + '&thinsp;&nbsp;' + countString('connection', dataModeConns.children.length);
}



function createNodeDataDiv(_node)
{
    const div    = createDiv('dataModeNode');
    
    const node   = JSON.parse(_node.value);
    node._key    = _node.key;


    div._node    = _node.value;
    div. node    =  node;

    div.showJson = false;

    expandNodeData(div);


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
    const div    = createDiv('dataModeConn');

    const conn   = JSON.parse(_conn.value);
    conn._key    = _conn.key;

    div._conn    = _conn.value;
    div. conn    =  conn;

    div.showJson = false;

    expandConnData(div);


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



function expandNodeData(div)
{
    if (div.showJson)
    {
        div.innerHTML =
        //   '<div>' + div._key + '</div><div>'
        // + (div.node.loading ? '&nbsp;🛑<br/>' : '')
              '<div class="nodeDataHeader">' + (div.node.loading ? '🛑&nbsp;' : '') + div.node._key + '</div>'
            + '<div class="connDataBody">' + formatSavedDataJson(div._node) + '</div>';

        div.style.paddingLeft   = '0px';
        div.style.paddingRight  = '0px';
        div.style.textAlign     = 'left';
        div.style.fontFamily    = 'Roboto Mono';
        div.style.letterSpacing = '-0.06em';
    }
    else
    {
        div.innerHTML = 
             (div.node.loading ? '🛑&nbsp;&nbsp' : '')
            + div.node.id;

        div.style.paddingLeft   = '6px';
        div.style.paddingRight  = '6px';
        div.style.textAlign     = 'center';
        div.style.fontFamily    = 'Inter';
        div.style.letterSpacing = 0;
    }
}



function expandConnData(div)
{
    if (div.showJson)
    {
        div.innerHTML =
                '<div class="connDataHeader">' 
                  + (div.conn.loading ? '🛑&nbsp;' : '') 
                  + div.conn._key.replaceAll('undefined', '<span class="dataUndefined">undefined</span>') 
              + '</div>'
              + '<div class="connDataBody">' + formatSavedDataJson(div._conn) + '</div>';

        div.style.paddingLeft   = '0px';
        div.style.paddingRight  = '0px';
        div.style.textAlign     = 'left';
        div.style.fontFamily    = 'Roboto Mono';
        div.style.letterSpacing = '-0.06em';
    }
    else
    {
        div.innerHTML = 
             (div.conn.loading ? '🛑&nbsp;&nbsp' : '')
            + connToString(div.conn);

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


    let notice = 'Deleted node \'' + node.id + '\'';

    if (nRemovedConns > 0)
        notice += ' and ' + nRemovedConns + ' ' + countString('connection', nRemovedConns);


    updateDataModeInfo();

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


    let notice = 'Deleted ' + nRemovedNodes + ' ' + countString('node', nRemovedNodes);

    if (nRemovedConns > 0)
        notice += ' and ' + nRemovedConns + ' ' + countString('connection', nRemovedConns);


    updateDataModeInfo();

    uiNotify(notice);
}



function dataModeDeleteAllConnections()
{
    uiRemoveAllSavedConnections();


    let nRemovedConns = dataModeConns.children.length;

    for (let i = dataModeConns.children.length-1; i >= 0; i--)
        dataModeConns.removeChild(dataModeConns.children[i]);


    updateDataModeInfo();

    if (nRemovedConns > 0)
        uiNotify('Deleted ' + nRemovedConns + ' ' + countString('connection', nRemovedConns));
}



function dataModeDeleteConnectionsToAndFromNode(node)
{
    uiDeleteSavedConnectionsToNodeId  (node.id);
    uiDeleteSavedConnectionsFromNodeId(node.id);

    
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


    updateDataModeInfo();

    if (nRemovedConns > 0)
        uiNotify('Deleted ' + nRemovedConns + ' ' + countString('connection', nRemovedConns) + ' to and from \'' + node.id + '\'');
}



function dataModeDeleteConnectionsFromNode(node)
{
    uiDeleteSavedConnectionsFromNodeId(node.id);


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


    updateDataModeInfo();

    if (nRemovedConns > 0)
        uiNotify('Deleted ' + nRemovedConns + ' ' + countString('connection', nRemovedConns) + ' from \'' + node.id + '\'');
}



function dataModeDeleteConnectionsToNode(node)
{
    uiDeleteSavedConnectionsToNodeId(node.id);


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


    updateDataModeInfo();

    if (nRemovedConns > 0)
        uiNotify('Deleted ' + nRemovedConns + ' ' + countString('connection', nRemovedConns) + ' to \'' + node.id + '\'');
}



function dataModeDeleteConnection(conn)
{
    uiDeleteSavedConnection(
        conn._key,
        conn.outputNodeId,
        conn.outputId,
        conn.outputOrder,
        conn.inputNodeId,
        conn.inputId,
        conn.list);


    for (let i = dataModeConns.children.length-1; i >= 0; i--)
    {
        const div = dataModeConns.children[i];

        if (div.conn._key == conn._key)
            dataModeConns.removeChild(div);
    }


    updateDataModeInfo();

    uiNotify('Deleted connection  ' + connToString(conn));
}
