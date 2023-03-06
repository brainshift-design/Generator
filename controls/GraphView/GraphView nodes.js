GraphView.prototype.setNodePositions = function(nodes, dx, dy, updateTransform = true)
{
    //console.log('GraphView.setNodePositions()');

    for (const node of nodes)
    {
        node.div.style.left = node.slx + dx + 'px';
        node.div.style.top  = node.sly + dy + 'px';
    }

    if (updateTransform)
        this.updateNodeTransforms(nodes);
};



GraphView.prototype.selectAllNodes = function(invert)
{
    const lastSelected = [...this.selectedNodes];

    this.selectedNodes = 
        invert
        ? this.graph.nodes.filter(n => !lastSelected.includes(n))
        : this.graph.nodes;
        
    actionManager.do(new SelectNodesAction(
        this.graph,
        this.selectedNodes.map(n => n.id), 
        lastSelected      .map(n => n.id)));
};



GraphView.prototype.copySelectedNodes = function()
{
    pasteOffset     = point(0, 0);
    copiedNodesJson = uiCopyNodes(this.graph, this.selectedNodes.map(n => n.id));

    writeTextToClipboard(copiedNodesJson);
};



GraphView.prototype.pasteCopiedNodes = function(pasteConnected, clientX = Number.NaN, clientY = Number.NaN)
{
    readTextFromClipboard().then(clipboardText =>
    {
        if (clipboardText == '')//if (copiedNodesJson == '')
            return;

        const x = (clientX - this.pan.x) / this.zoom;
        const y = (clientY - this.pan.y) / this.zoom;
            
        actionManager.do(new PasteNodesAction(this.graph, clipboardText, pasteConnected, false, x, y));
    });
};



GraphView.prototype.duplicateSelectedNodes = function(pasteConnected)
{
    if (!isEmpty(this.selectedNodes))
    {
        pasteOffset = point(0, 0);
        actionManager.do(new PasteNodesAction(this.graph, uiCopyNodes(this.graph, this.selectedNodes.map(n => n.id)), pasteConnected, true));
    }
};



GraphView.prototype.deleteSelectedNodes = function()
{
    const nodeIds = this.selectedNodes.map(n => n.id);

    if (!isEmpty(nodeIds))
    {
        actionManager.do(new DeleteNodesAction(this.graph, nodeIds));
        this._selected = [];
    }
};



GraphView.prototype.removeSelectedNodes = function()
{
    const nodeIds = this.selectedNodes.map(n => n.id);

    if (!isEmpty(nodeIds))
    {
        actionManager.do(new RemoveNodesAction(this.graph, nodeIds));
        this._selected = [];
    }
};



GraphView.prototype.layoutSelectedNodes = function()
{
    
};



GraphView.prototype.renameSelectedNode = function()
{
    if (this.selectedNodes.length == 1)
        this.selectedNodes[0].showLabelTextbox();
};



GraphView.prototype.editSelectedCustomNode = function()
{
    actionManager.do(new SetCurrentGraphAction(this.selectedNodes[0].graph));
};