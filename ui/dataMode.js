function loadNodesAndConnsData(_nodes, _conns)
{
    for (const _node of _nodes) dataViewNodes.appendChild(createNodeDataDiv(_node));
    for (const _conn of _conns) dataViewConns.appendChild(createConnDataDiv(_conn));
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
            div.innerHTML       = formatSavedNodeJson(_node);
            div.style.textAlign = 'left';
        }
        else
        {
            div.innerHTML       = node.id;
            div.style.textAlign = 'center';
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

    return div;
}