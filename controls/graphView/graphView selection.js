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
    graphView.deselectAll();

    for (const id of nodeIds)
    {
        const node = nodeFromId(id);
        graphView._selectedNodes.push(node);
        node.setSelected(true);
    }
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



graphView.updateSelectBox = (shiftKey, ctrlKey) =>
{
    const wndRect = new Rect(
        1,
        menuBar  .offsetHeight + 1,
        graphView.offsetWidth  - 2,
        graphView.offsetHeight - 5);

    
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
                boundingRect(node.div), 
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
        
        
    selected.forEach(n => n.updateNode());
    graphView._prevSelectedNodes.forEach(n => n.updateNode());
    graphView.lastSelectedNodes.forEach(n => n.updateNode());


    graphView._prevSelectedNodes = selected;
};



graphView.endSelection = pointerId =>
{
    if (   graphView.selectedNodes    .length > 0
        || graphView.lastSelectedNodes.length > 0)
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