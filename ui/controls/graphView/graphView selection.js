graphView._selected     = [];
graphView._prevSelected = [];



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



graphView.selectedIds = () =>
{
    return graphView._selected.map(n => n.id);
};



graphView.selectFromIds = (nodeIds) =>
{
    graphView.deselectAll();

    console.log('graphView.selectFromIds');
    console.log(nodeIds);

    for (const id of nodeIds)
    {
        const node = uiGraph.nodes.find(n => n.id == id);
        console.log('id = ' + id);
        console.log('node = ' + node);
        
        graphView._selected.push(node);
        node.setSelected(true);
    }
};



graphView.startSelection = (pointerId, x, y) =>
{
    graphView.setPointerCapture(pointerId);

    graphView.selecting = true;

    graphView.selectBox = new Rect(x, y, 0, 0);
   
    selectBox.style.visibility = 'visible';

    graphView.updateSelectBox();
};



graphView.updateSelection = (x, y) =>
{
    if (!graphView.selecting) return;

    graphView.selectBox.w = x - graphView.selectBox.x;
    graphView.selectBox.h = y - graphView.selectBox.y;

    graphView.updateSelectBox();
};



graphView.updateSelectBox = () =>
{
    const wndRect = new Rect(
                                  1,
        controlBar.offsetHeight + 1,
        graphView.offsetWidth   - 2,
        graphView.offsetHeight  - 5);

    
    let selection = validateRect(graphView.selectBox);
    
    selection = clipRect(selection, wndRect);


    selectBox.style.left   = selection.x;
    selectBox.style.top    = selection.y;
    selectBox.style.width  = selection.width;
    selectBox.style.height = selection.height;


    const selected = [];

    for (const node of uiGraph.nodes)
    {
        if (intersectRects(
                Rect.fromTypical(node.div.getBoundingClientRect()), 
                selection))
            selected.push(node);
    }

    graphView.selected = selected;


    selectBox.style.zIndex = MAX_INT-3;
};



graphView.endSelection = pointerId =>
{
    graphView.releasePointerCapture(pointerId);

    graphView.selecting = false;
    graphView.selectBox = Rect.NaN;

    selectBox.style.visibility = 'hidden';

    actionManager.do(new SelectNodesAction(
        graphView.selected     .map(n => n.id), 
        graphView._prevSelected.map(n => n.id)));
};