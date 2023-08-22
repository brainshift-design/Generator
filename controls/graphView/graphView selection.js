GraphView.prototype.deselectAll = function()
{
    for (const node of this._selectedNodes)            
        node.setSelected(false);

    this._selectedNodes = [];
};



GraphView.prototype.selectByIds = function(nodeIds)
{
    this.selectedNodes = nodeIds.map(id => nodeFromId(id));
};



GraphView.prototype.startSelection = function(pointerId, x, y, shiftKey, ctrlKey)
{
    try
    {
        this.div.setPointerCapture(pointerId);

        this.selecting = true;

        this.selectionRect = new Rect(x, y, 0, 0);
        this._prevSelectedNodes = [];
    
        selectBox.style.visibility = 'visible';

        this.updateSelectBox(shiftKey, ctrlKey);
    }
    catch {}
};



GraphView.prototype.updateSelection = function(x, y, shiftKey, ctrlKey)
{
    if (!this.selecting) return;

    this.selectionRect.w = x - this.selectionRect.x;
    this.selectionRect.h = y - this.selectionRect.y;

    setTimeout(() => this.updateSelectBox(shiftKey, ctrlKey));
};

 

GraphView.prototype.updateSelectBox = function(shiftKey, ctrlKey)
{
    if (   isNaN(this.selectionRect.w)
        || isNaN(this.selectionRect.h))
        return;


    const wndRect = new Rect(
        1,
        getTopHeight() + 1,
        this.measureData.clientRect.width  - 2,
        this.measureData.clientRect.height - 5);


    let selection = clipRect(
        validateRect(this.selectionRect), 
        wndRect);
    

    if (!selection.isNaN)
    {
        selectBox.style.left    = selection.x;
        selectBox.style.top     = selection.y;
        selectBox.style.width   = selection.width;
        selectBox.style.height  = selection.height;

        selectBox.style.display = 'block';
        selectBox.style.zIndex  = MAX_INT32-3;


        const selected = [];

        for (const node of graph.pageNodes)
        {
            if (   (    node.type != PANEL
                    || !graphView.startedInPanel)
                && rectsIntersect(
                       node.measureData.divBounds,
                       selection))
                selected.push(node);
        }


        if (shiftKey)
            this.selectedNodes = this.lastSelectedNodes
                .filter(n => !selected.includes(n))
                .concat(selected.filter(n => !this.lastSelectedNodes.includes(n)));
        else
            this.selectedNodes = selected;
        
            
        selectBox.style.zIndex = MAX_INT32-3;
            
            
        const nodes = [
            ...selected,                    
            ...this._prevSelectedNodes,
            ...this.lastSelectedNodes];

        nodes.forEach(n => n.updateBorder());
        updateComments(nodes.map(n => n.id));

        this._prevSelectedNodes = selected;
    }
    else
    {
        selectBox.style.display = 'none';
    }
};



GraphView.prototype.endSelection = function(pointerId)
{
    if (   !isEmpty(this.selectedNodes    )
        || !isEmpty(this.lastSelectedNodes))
    {
        actionManager.do(new SelectNodesAction(
            this.selectedNodes    .map(n => n.id), 
            this.lastSelectedNodes.map(n => n.id)));
    }


    this.div.releasePointerCapture(pointerId);

    this.selecting     = false;
    this.selectionRect = Rect.NaN;
    this._prevSelectedNodes = [];

    selectBox.style.visibility = 'hidden';


    this.selectionRect.w = Number.NaN;
    this.selectionRect.h = Number.NaN;


    graphView.startedInPanel = false;
};



GraphView.prototype.selectFromClick = function(node, ctrl, shift, alt)
{
    node.div.moved = false;


    //if (   ctrl
    //    && shift
    //    && alt)
    //{
    //    this.selectedNodes = getAllNodesFromNode(node);
    //}
    //else if (shift
    //      && alt)
    //{
    //    if (isMac) this.selectedNodes = [node, ...getNodesBeforeNode(node)];
    //    else       this.selectedNodes = [node, ...getNodesAfterNode (node)];
    //}
    //else if (ctrl
    //      && shift)
    //{
    //    if (isMac) this.selectedNodes = [node, ...getNodesAfterNode (node)];
    //    else       this.selectedNodes = [node, ...getNodesBeforeNode(node)];
    //}
    //else if (ctrl
    //      && alt)
    //    this.selectedNodes = [node, ...getNodesAcrossNode(node)];
//
    //else 
    if (!node.selected)
    {
        if (shift) node.selected      = true;
        else       this.selectedNodes = [node];
    }
    else if (node.selected)
    {
        if (   shift
            && node.deselectTimer < 0) 
        {
            node.deselectTimer = setTimeout(() => 
            {
                node.selected      = false;
                node.deselectTimer = -1;
            }, 300);
        }
    }
}