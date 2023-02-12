graphView._selectedNodes     = [];
graphView._prevSelectedNodes = [];
graphView.lastSelectedNodes  = [];


Object.defineProperty(graphView, 'selectedNodes',
{
    get: () => graphView._selectedNodes,
    set: selectedNodes =>
    {
        graphView.deselectAll();

        graphView._selectedNodes = [...selectedNodes];
    
        for (const node of graphView._selectedNodes)
            node.setSelected(true);
    }
});



graphView.deselectAll = () =>
{
    for (const node of graphView._selectedNodes)            
        node.setSelected(false);

    graphView._selectedNodes = [];
};



graphView.selectByIds = (nodeIds) =>
{
    graphView.selectedNodes = nodeIds.map(id => nodeFromId(id));
    // graphView.deselectAll();

    // for (const id of nodeIds)
    // {
    //     const node = nodeFromId(id);
    //     graphView._selectedNodes.push(node);
    //     node.setSelected(true);
    // }
};



graphView.startSelection = (pointerId, x, y, shiftKey, ctrlKey) =>
{
    graphView.setPointerCapture(pointerId);

    graphView.selecting = true;

    graphView.selectionRect = new Rect(x, y, 0, 0);
    graphView._prevSelectedNodes = [];
   
    selectBox.style.visibility = 'visible';

    graphView.updateSelectBox(shiftKey, ctrlKey);
};



graphView.updateSelection = (x, y, shiftKey, ctrlKey) =>
{
    if (!graphView.selecting) return;

    graphView.selectionRect.w = x - graphView.selectionRect.x;
    graphView.selectionRect.h = y - graphView.selectionRect.y;

    graphView.updateSelectBox(shiftKey, ctrlKey);
};



graphView.updateSelectBox = function(shiftKey, ctrlKey)
{
    const wndRect = new Rect(
        1,
        menuBarHeight + 1,
        graphViewClient.width  - 2,
        graphViewClient.height - 5);

    
    let selection = validateRect(graphView.selectionRect);
    
    selection = clipRect(selection, wndRect);


    selectBox.style.left   = selection.x;
    selectBox.style.top    = selection.y;
    selectBox.style.width  = selection.width;
    selectBox.style.height = selection.height;


    const selected = [];

    for (const node of graph.nodes)
    {
        if (rectsIntersect(
                node.measureData.divBounds,
                selection))
            selected.push(node);
    }


    if (ctrlKey)
        graphView.selectedNodes = graphView.lastSelectedNodes.concat(selected);
    else if (shiftKey)
        graphView.selectedNodes = graphView.lastSelectedNodes
                                      .filter(node => !selected.includes(node))
                                      .concat(selected.filter(node => !graphView.lastSelectedNodes.includes(node)));
    else
        graphView.selectedNodes = selected;
    
        
    selectBox.style.zIndex = MAX_INT32-3;
        
        
    [...selected,                    
     ...graphView._prevSelectedNodes,
     ...graphView.lastSelectedNodes]
        .forEach(n => n.updateBorder());


    graphView._prevSelectedNodes = selected;
};



graphView.endSelection = pointerId =>
{
    if (   !isEmpty(graphView.selectedNodes    )
        || !isEmpty(graphView.lastSelectedNodes))
    {
        actionManager.do(new SelectNodesAction(
            graphView.selectedNodes    .map(n => n.id), 
            graphView.lastSelectedNodes.map(n => n.id)));
    }


    graphView.releasePointerCapture(pointerId);

    graphView.selecting     = false;
    graphView.selectionRect = Rect.NaN;
    graphView._prevSelectedNodes = [];

    selectBox.style.visibility = 'hidden';
};