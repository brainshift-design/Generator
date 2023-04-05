GraphView.prototype.updateNodes = function(nodes = null, updateNodes = true)
{
    if (!nodes)
        nodes = this.graph.nodes;
        
    
    documentBodyClient = clientRect(document.body);


    this.updateNodeTransforms(nodes, false);
    this.updateNodeTransforms(nodes); // this has to be done twice //because getAllNodeBounds() forces a reflow

    nodes.forEach(n => n.updateMeasureData());

    if (updateNodes)
    {
        nodes.forEach(n =>
        {
            n.updateHeader(); 
            n.updateHeaderLabel();
            n.updateBorder();
            n.updateDisabled();

            if (n.updateSizers)
                n.updateSizers();
        });
    }


    const x = this.measureData.clientRect.left;
    const w = this.measureData.clientRect.width;
    const h = this.measureData.clientRect.height;
    
    const bounds = this.getAllNodeBounds();

    this.updateScroll(x, w, h, bounds, menuBarHeight);
};



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



GraphView.prototype.deselectAllNodes = function()
{
    const lastSelected = [...this.selectedNodes];

    this.selectedNodes = [];
        
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



class GenJS
{
    nodes;
    terminals;

    nTab = 0;
    
    get tab() { return TAB.repeat(this.nTab); }
    get NL () { return '\n' + this.tab; }


    constructor(nodes, terminals)
    {
        this.nodes     = nodes;
        this.terminals = terminals;
    }


    connectedOut(node)
    {
        return node.inputs.find(i => 
                      i.connected 
                   && !this.nodes.includes(i.connectedOutput.node));
    }
};



GraphView.prototype.copySelectedNodesAsJavascript = function()
{
    const terminals = getTerminalsInNodes(this.selectedNodes);

    const gen = new GenJS(this.selectedNodes, terminals);


    let js = '';

    for (const terminal of terminals)
    {
        js += '\n';
        js += terminal.toJavascript(gen);
    }


    console.log(js);
    writeTextToClipboard(js);
};



GraphView.prototype.pasteCopiedNodes = function(pasteConnected, clientX = Number.NaN, clientY = Number.NaN)
{
    readTextFromClipboard().then(text =>
    {
        if (text == '')
            return;

        const x = (clientX - this.pan.x) / this.zoom;
        const y = (clientY - this.pan.y) / this.zoom;
            
        actionManager.do(new PasteNodesAction(this.graph, text, pasteConnected, false, x, y));
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



GraphView.prototype.deleteSelectedNodes = function(cut = false)
{
    const nodeIds = this.selectedNodes.map(n => n.id);

    if (!isEmpty(nodeIds))
    {
        actionManager.do(new DeleteNodesAction(this.graph, nodeIds, cut));
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



GraphView.prototype.getTopNodeIndex = function()
{
    let max = 0;
    
    for (const node of this.graph.nodes)
        max = Math.max(max, node.div.style.zIndex);

    return max;
};