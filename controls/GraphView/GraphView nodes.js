GraphView.prototype.updateNodes = function(nodes = null, updateNodes = true)
{
    if (!nodes)
        nodes = graph.pageNodes;
        
    
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

    this.updateScroll(x, w, h, bounds, getTopHeight());
};



GraphView.prototype.updateNodeTransforms = function(nodes, _updateWires = true)
{
    const nodeLeft = nodes.map(n => n.div.offsetLeft);
    const nodeTop  = nodes.map(n => n.div.offsetTop);
    const nodeRect = nodes.map(n => n.getOffsetRect());

    for (let i = 0; i < nodes.length; i++)
        nodes[i].setTransform(nodeLeft[i], nodeTop[i], nodeRect[i]);

    if (_updateWires)
        this.updateNodeWireTransforms(nodes);
};



GraphView.prototype.updateNodeWireTransforms = function(nodes)
{
    const wires = [];

    
    for (const node of nodes)
    {
        for (const input of node.inputs)
            if (   input.connected
                && input.connection
                && !wires.includes(input.connection.wire))
                wires.push(input.connection.wire);        

        for (const output of node.outputs)
            for (const connInput of output.connectedInputs)
                if (    connInput.connection
                    && !wires.includes(connInput.connection.wire))
                    wires.push(connInput.connection.wire);
    }


    this.updateWires(wires);
};



GraphView.prototype.soloNode = function(node)
{
    this._soloNode = node;

    graph.pageNodes.forEach(n => 
        n.div.style.opacity = 
                n == this._soloNode
            || n.isConnectedTo(this._soloNode)
            ? 1 
            : 0.12);

    graph.connections.forEach(c =>
    { 
        c.wire.svg.style.opacity = 
               c.input  && this._soloNode == c.input .node
            || c.output && this._soloNode == c.output.node
            ? 1 
            : 0.09;
    });


    this.updateWires(graph.connections.map(c => c.wire));
};



GraphView.prototype.unsoloNode = function()
{
    this._soloNode = null;

    graph.pageNodes  .forEach(n => n.div     .style.opacity = 1);
    graph.connections.forEach(c => c.wire.svg.style.opacity = 1);

    this.updateWires(graph.connections.map(c => c.wire));
};



GraphView.prototype.updateShowWires = function(updateNodes = true)
{
    graph.connections.forEach(c => showElement(c.wire.svg, true));

    if (updateNodes) 
        graph.pageNodes.forEach(n => n.updateNode());
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
        ? graph.pageNodes.filter(n => !lastSelected.includes(n))
        : graph.pageNodes;
        
    actionManager.do(new SelectNodesAction(
        this.selectedNodes.map(n => n.id), 
        lastSelected      .map(n => n.id)));
};



GraphView.prototype.deselectAllNodes = function()
{
    const lastSelected = [...this.selectedNodes];

    this.selectedNodes = [];
        
    actionManager.do(new SelectNodesAction(
        this.selectedNodes.map(n => n.id), 
        lastSelected      .map(n => n.id)));
};



GraphView.prototype.copySelectedNodes = function()
{
    pasteOffset     = point(0, 0);
    copiedNodesJson = uiCopyNodes(this.selectedNodes.map(n => n.id));

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

        const x = (clientX - graph.currentPage.pan.x) / graph.currentPage.zoom;
        const y = (clientY - graph.currentPage.pan.y) / graph.currentPage.zoom;
            
        actionManager.do(new PasteNodesAction(text, pasteConnected, false, false, x, y));
    });
};



GraphView.prototype.duplicateSelectedNodes = function(pasteConnected)
{
    if (!isEmpty(this.selectedNodes))
    {
        pasteOffset = point(0, 0);
        actionManager.do(new PasteNodesAction(uiCopyNodes(this.selectedNodes.map(n => n.id)), pasteConnected, true));
    }
};



GraphView.prototype.deleteSelectedNodes = function(cut = false)
{
    const nodeIds = this.selectedNodes.map(n => n.id);

    if (!isEmpty(nodeIds))
    {
        actionManager.do(new DeleteNodesAction(nodeIds, cut));
        this._selected = [];
    }
};



GraphView.prototype.removeSelectedNodes = function()
{
    const nodeIds = this.selectedNodes.map(n => n.id);

    if (!isEmpty(nodeIds))
    {
        actionManager.do(new RemoveNodesAction(nodeIds));
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
    
    for (const node of graph.pageNodes)
        max = Math.max(max, node.div.style.zIndex);

    return max;
};