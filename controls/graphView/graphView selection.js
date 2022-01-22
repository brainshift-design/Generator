graphView._selected     = []; // these are
graphView._prevSelected = []; // nodes,
graphView.lastSelected  = []; // not IDs


Object.defineProperty(graphView, 'selected',
{
    get: () => graphView._selected,
    set: selected =>
    {
        graphView.deselectAll();

        graphView._selected = [...selected];
    
        for (const node of graphView._selected)
            node.setSelected(true);
    }
});



graphView.deselectAll = () =>
{
    for (const node of graphView._selected)            
        node.setSelected(false);

    graphView._selected = [];
};



graphView.selectFromIds = (nodeIds) =>
{
    graphView.deselectAll();

    console.log('graphView.selectFromIds');
    console.log(nodeIds);

    for (const id of nodeIds)
    {
        const node = graph.nodes.find(n => n.id == id);
        console.log('id = ' + id);
        console.log('node = ' + node);
        
        graphView._selected.push(node);
        node.setSelected(true);
    }
};



graphView.startSelection = (pointerId, x, y, shiftKey, ctrlKey) =>
{
    graphView.setPointerCapture(pointerId);

    graphView.selecting = true;

    graphView.selectionRect = new Rect(x, y, 0, 0);
    graphView._prevSelected = [];
   
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
        controlBar.offsetHeight + 1,
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
        graphView.selected = graphView.lastSelected.concat(selected);
    else if (shiftKey)
        graphView.selected = graphView.lastSelected
                             .filter(node => !selected.includes(node))
                             .concat(selected.filter(node => !graphView.lastSelected.includes(node)));
    else
        graphView.selected = selected;
    
        
    selectBox.style.zIndex = MAX_INT32-3;
        
        
    updateGraphNodes();

    graphView._prevSelected = selected;
};



graphView.endSelection = pointerId =>
{
    graphView.releasePointerCapture(pointerId);

    graphView.selecting     = false;
    graphView.selectionRect = Rect.NaN;
    graphView._prevSelected = [];

    selectBox.style.visibility = 'hidden';

    actionManager.do(new SelectNodesAction(
        graphView.selected    .map(n => n.id), 
        graphView.lastSelected.map(n => n.id)));
};