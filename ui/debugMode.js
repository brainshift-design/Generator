var _debugModePages = [];
var _debugModeNodes = [];
var _debugModeConns = [];



function initDebugMode()
{
    btnDebugModeRestart.addEventListener('click', () => uiRestartGenerator(false));
}



debugModeView.addEventListener('pointerdown', e =>
{
    e.preventDefault();

    if (   e.button == 0
        || e.button == 2)
        hideAllMenus();
});



debugModePagesWrapper.addEventListener('pointerdown', e =>
{
    e.preventDefault();

    if (e.button == 2)
    {
        e.stopPropagation();
        menuPageDataPages.showAt(e.clientX, e.clientY, false);
    }
});



debugModeNodesWrapper.addEventListener('pointerdown', e =>
{
    e.preventDefault();

    if (e.button == 2)
    {
        e.stopPropagation();
        menuNodeDataNodes.showAt(e.clientX, e.clientY, false);
    }
});



debugModeConnsWrapper.addEventListener('pointerdown', e =>
{
    e.preventDefault();

    if (e.button == 2)
    {
        e.stopPropagation();
        menuConnDataConns.showAt(e.clientX, e.clientY, false);
    }
});



function loadNodesAndConnsData(_pages, _nodes, _conns)
{
    _debugModePages = _pages;
    _debugModeNodes = _nodes;
    _debugModeConns = _conns;


    _debugModeNodes.sort((n1, n2) => 
    {
        if (n1.key.split(' ')[1] < n2.key.split(' ')[1]) return -1;
        if (n1.key.split(' ')[1] > n2.key.split(' ')[1]) return  1;
        return 0;
    });

    _debugModeConns.sort((c1, c2) => 
    {
        if (c1.value.outputNodeId != c2.value.outputNodeId) return c1.value.outputNodeId < c2.value.outputNodeId ? -1 : 1;
        if (c1.value.outputId     != c2.value.outputId    ) return c1.value.outputId     < c2.value.outputId     ? -1 : 1;
        if (c1.value.outputOrder  != c2.value.outputOrder ) return parseInt(c1.value.outputOrder) - parseInt(c2.value.outputOrder);
        return 0;
    });

    
    for (const _page of _debugModePages) debugModePages.appendChild(createPageDataDiv(_page));
    for (const _node of _debugModeNodes) debugModeNodes.appendChild(createNodeDataDiv(_node));
    for (const _conn of _debugModeConns) debugModeConns.appendChild(createConnDataDiv(_conn));


    updateDebugModeInfo();

    
    loadingOverlay.style.display = 'none';
}



function updateDebugModeInfo()
{
    debugModePagesTitle.innerHTML = debugModePages.children.length + '&thinsp;&nbsp;' + countString(debugModePages.children.length, 'page'      );
    debugModeNodesTitle.innerHTML = debugModeNodes.children.length + '&thinsp;&nbsp;' + countString(debugModeNodes.children.length, 'node'      );
    debugModeConnsTitle.innerHTML = debugModeConns.children.length + '&thinsp;&nbsp;' + countString(debugModeConns.children.length, 'connection');
}



function createPageDataDiv(_page)
{
    const div    = createDiv('debugModePage');
    
    const page   = JSON.parse(_page.value);
    page._key    = _page.key;


    div._page    = _page.value;
    div. page    =  page;

    div.showJson = false;


    expandPageData(div);


    div.addEventListener('dblclick', () =>
    {
        div.showJson = !div.showJson;
        expandPageData(div, page, _page);
    });


    div.addEventListener('pointerenter', () => div.style.background = 'var(--debug-mode-node-active)');
    div.addEventListener('pointerleave', () => { if (!menuPageData._div) div.style.background = 'var(--debug-mode-node)'; });


    div.addEventListener('pointerdown', e =>
    {
        e.preventDefault();

        if (e.button == 2)
        {
            e.stopPropagation();

            // div.style.background = 'var(--debug-mode-node-active)';

            createDataMenuOnHide(
                menuPageData,
                div,
                'var(--debug-mode-node)'); 

            menuPageData.showAt(e.clientX, e.clientY, false);
        }
    });


    return div;
}



function createNodeDataDiv(_node)
{
    const div    = createDiv('debugModeNode');
    
    const node   = JSON.parse(_node.value);
    node._key    = _node.key;
    node .div    = div;


    div._node    = _node.value;
    div. node    =  node;

    div.showJson = false;

    expandNodeData(div);


    div.addEventListener('dblclick', () =>
    {
        div.showJson = !div.showJson;
        expandNodeData(div, node, _node);
    });


    div.addEventListener('pointerenter', () => div.style.background = 'var(--debug-mode-node-active)');
    div.addEventListener('pointerleave', () => { if (!menuNodeData._div) div.style.background = 'var(--debug-mode-node)'; });


    div.addEventListener('pointerdown', e =>
    {
        e.preventDefault();

        if (e.button == 2)
        {
            e.stopPropagation();

            // div.style.background = 'var(--debug-mode-node-active)';

            createDataMenuOnHide(
                menuNodeData,
                div,
                'var(--debug-mode-node)'); 

            menuNodeData.showAt(e.clientX, e.clientY, false);
        }
    });


    return div;
}



function createConnDataDiv(_conn)
{
    const div    = createDiv('debugModeConn');

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


    div.addEventListener('pointerenter', () => div.style.background = 'var(--debug-mode-conn-active)');
    div.addEventListener('pointerleave', () => { if (!menuConnData._div) div.style.background = 'var(--debug-mode-conn)'; });


    div.addEventListener('pointerdown', e =>
    {
        e.preventDefault();
        
        if (e.button == 2)
        {
            e.stopPropagation();

            div.style.background = 'var(--debug-mode-conn-active)';

            createDataMenuOnHide(
                menuConnData,
                div,
                'var(--debug-mode-conn)');

            menuConnData.showAt(e.clientX, e.clientY, false);
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



function expandPageData(div)
{
    if (div.showJson)
    {
        div.innerHTML =
              '<div class="pageDataHeader">' + div.page._key + '</div>'
            + '<div class="pageDataBody">' + formatSavedDataJson(div._page) + '</div>';

        div.style.paddingLeft   = '0px';
        div.style.paddingRight  = '0px';
        div.style.textAlign     = 'left';
        div.style.fontFamily    = 'Roboto Mono';
        div.style.letterSpacing = '-0.06em';
    }
    else
    {
        div.innerHTML = div.page.id;

        div.style.paddingLeft   = '6px';
        div.style.paddingRight  = '6px';
        div.style.textAlign     = 'center';
        div.style.fontFamily    = 'Inter';
        div.style.letterSpacing = 0;
    }
}



function expandNodeData(div)
{
    if (div.showJson)
    {
        div.innerHTML =
        //   '<div>' + div._key + '</div><div>'
        // + (div.node.loading ? '&nbsp;🛑<br/>' : '')
              '<div class="nodeDataHeader">' + (div.node.loading ? '🛑&nbsp;' : '') + div.node._key + '</div>'
            + '<div class="nodeDataBody">' + formatSavedDataJson(div._node) + '</div>';

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



function expandAllPageData()
{
    for (const div of debugModePages.children)
    {
        div.showJson = true;
        expandPageData(div, div.page, div._page);
    }
}



function collapseAllPageData()
{
    for (const div of debugModePages.children)
    {
        div.showJson = false;
        expandPageData(div, div.page, div._page);
    }
}



function expandAllNodeData()
{
    for (const div of debugModeNodes.children)
    {
        div.showJson = true;
        expandNodeData(div, div.node, div._node);
    }
}



function collapseAllNodeData()
{
    for (const div of debugModeNodes.children)
    {
        div.showJson = false;
        expandNodeData(div, div.node, div._node);
    }
}



function expandAllConnData()
{
    for (const div of debugModeConns.children)
    {
        div.showJson = true;
        expandConnData(div, div.conn, div._conn);
    }
}



function collapseAllConnData()
{
    for (const div of debugModeConns.children)
    {
        div.showJson = false;
        expandConnData(div, div.conn, div._conn);
    }
}



function debugModeDeleteAllPages()
{
    const nPages = graph.pages.length;
    const notice = 'Deleted ' + nPages + ' ' + countString(nPages, 'page');

    for (const page of graph.pages)
        debugModeDeletePage(page, false);

    if (nPages > 0)
        uiNotify(notice);
}



function debugModeDeletePage(page, notify = true)
{
    for (let i = debugModePages.children.length-1; i >= 0; i--)
    {
        const div = debugModePages.children[i];

        if (div.page.id == page.id)
        debugModePages.removeChild(div);
    }


    uiRemoveSavedPage(page.id);

    graph.nodes
        .filter (n => n.pageId == page.id)
        .forEach(n => debugModeDeleteNode(n));


    const notice = 'Deleted page \'' + page.id + '\'';

    updateDebugModeInfo();

    if (notify)
        uiNotify(notice);
}



function debugModeDeleteNode(node)
{
    uiRemoveSavedNodesAndConns([node.id]);


    for (let i = debugModeNodes.children.length-1; i >= 0; i--)
    {
        const div = debugModeNodes.children[i];

        if (div.node.id == node.id)
        debugModeNodes.removeChild(div);
    }


    let nRemovedConns = 0;

    for (let i = debugModeConns.children.length-1; i >= 0; i--)
    {
        const div = debugModeConns.children[i];

        if (   div.conn.outputNodeId == node.id
            || div.conn. inputNodeId == node.id)
        {
            debugModeConns.removeChild(div);
            nRemovedConns++;
        }
    }


    let notice = 'Deleted node \'' + node.id + '\'';

    if (nRemovedConns > 0)
        notice += ' and ' + nRemovedConns + ' ' + countString(nRemovedConns, 'connection');


    updateDebugModeInfo();

    uiNotify(notice);
}



function debugModeDeleteAllNodes()
{
    uiRemoveAllSavedNodesAndConns();


    let nRemovedNodes = debugModeNodes.children.length;

    for (let i = debugModeNodes.children.length-1; i >= 0; i--)
        debugModeNodes.removeChild(debugModeNodes.children[i]);


    let nRemovedConns = debugModeConns.children.length;

    for (let i = debugModeConns.children.length-1; i >= 0; i--)
        debugModeConns.removeChild(debugModeConns.children[i]);


    let notice = 'Deleted ' + nRemovedNodes + ' ' + countString(nRemovedNodes, 'node');

    if (nRemovedConns > 0)
        notice += ' and ' + nRemovedConns + ' ' + countString(nRemovedConns, 'connection');


    updateDebugModeInfo();

    uiNotify(notice);
}



function debugModeDeleteAllConnections()
{
    uiRemoveAllSavedConnections();


    let nRemovedConns = debugModeConns.children.length;

    for (let i = debugModeConns.children.length-1; i >= 0; i--)
    debugModeConns.removeChild(debugModeConns.children[i]);


    updateDebugModeInfo();

    if (nRemovedConns > 0)
        uiNotify('Deleted ' + nRemovedConns + ' ' + countString(nRemovedConns, 'connection'));
}



function debugModeDeleteConnectionsToAndFromNode(node)
{
    uiDeleteSavedConnectionsToNodeId  (node.id);
    uiDeleteSavedConnectionsFromNodeId(node.id);

    
    let nRemovedConns = 0;

    for (let i = debugModeConns.children.length-1; i >= 0; i--)
    {
        const div = debugModeConns.children[i];

        if (   div.conn.outputNodeId == node.id
            || div.conn. inputNodeId == node.id)
        {
            debugModeConns.removeChild(div);
            nRemovedConns++;
        }
    }


    updateDebugModeInfo();

    if (nRemovedConns > 0)
        uiNotify('Deleted ' + nRemovedConns + ' ' + countString(nRemovedConns, 'connection') + ' to and from \'' + node.id + '\'');
}



function debugModeDeletePathFromNodeId(node)
{
    uiRemoveSavedNodesAndConns([node.id]);
    uiDeleteObjectsAndStyles([node.id], true);

    node.id = stripPathFromId(node.id);

    delete node.loading;
    delete node._key;
    delete node.div;

    uiSaveNodesJson([node.id], [node]);
}



function debugModeDeleteConnectionsFromNode(node)
{
    uiDeleteSavedConnectionsFromNodeId(node.id);


    let nRemovedConns = 0;

    for (let i = debugModeConns.children.length-1; i >= 0; i--)
    {
        const div = debugModeConns.children[i];

        if (div.conn.outputNodeId == node.id)
        {
            debugModeConns.removeChild(div);
            nRemovedConns++;
        }
    }


    updateDebugModeInfo();

    if (nRemovedConns > 0)
        uiNotify('Deleted ' + nRemovedConns + ' ' + countString(nRemovedConns, 'connection') + ' from \'' + node.id + '\'');
}



function debugModeDeleteConnectionsToNode(node)
{
    uiDeleteSavedConnectionsToNodeId(node.id);


    let nRemovedConns = 0;

    for (let i = debugModeConns.children.length-1; i >= 0; i--)
    {
        const div = debugModeConns.children[i];

        if (div.conn. inputNodeId == node.id)
        {
            debugModeConns.removeChild(div);
            nRemovedConns++;
        }
    }


    updateDebugModeInfo();

    if (nRemovedConns > 0)
        uiNotify('Deleted ' + nRemovedConns + ' ' + countString(nRemovedConns, 'connection') + ' to \'' + node.id + '\'');
}



function debugModeDeleteConnection(conn)
{
    uiDeleteSavedConnection(
        conn._key,
        conn.outputNodeId,
        conn.outputId,
        conn.outputOrder,
        conn.inputNodeId,
        conn.inputId,
        conn.list);


    for (let i = debugModeConns.children.length-1; i >= 0; i--)
    {
        const div = debugModeConns.children[i];

        if (div.conn._key == conn._key)
        debugModeConns.removeChild(div);
    }


    updateDebugModeInfo();

    uiNotify('Deleted connection  ' + connToString(conn));
}
