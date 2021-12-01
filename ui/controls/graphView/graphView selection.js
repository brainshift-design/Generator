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
        var node = uiGraph.nodes.find(n => n.id == id);
        console.log('id = ' + id);
        console.log('node = ' + node);
        
        graphView._selected.push(node);
        node.setSelected(true);
    }
};



graphView.getValidSelection = () =>
{
    return new Rect(
        graphView.selectBox.x + Math.min(graphView.selectBox.w, 0),
        graphView.selectBox.y + Math.min(graphView.selectBox.h, 0),
        Math.abs(graphView.selectBox.w),
        Math.abs(graphView.selectBox.h));
};



graphView.startSelection = (x, y) =>
{
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
    var selection = graphView.getValidSelection();

    selectBox.style.left   = selection.x + Math.min(selection.w, 0);
    selectBox.style.top    = selection.y + Math.min(selection.h, 0);
    selectBox.style.width  = Math.abs(selection.w);
    selectBox.style.height = Math.abs(selection.h);

    const selected = [];

    for (const node of uiGraph.nodes)
    {
        if (rectsIntersect(
                Rect.fromTypical(node.div.getBoundingClientRect()), 
                graphView.getValidSelection()))
            selected.push(node);
    }

    graphView.selected = selected;

    selectBox.style.zIndex = MAX_INT-3;
};



graphView.endSelection = () =>
{
    graphView.selecting = false;
    graphView.selectBox = Rect.NaN;

    selectBox.style.visibility = 'hidden';

    actionManager.do(new SelectNodesAction(
        graphView.selected     .map(n => n.id), 
        graphView._prevSelected.map(n => n.id)));
};