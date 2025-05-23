GraphView.prototype.updateNodes = function(nodes = null, updateNodes = true)
{
    //console.log('GraphView.updateNodes()');
    

    if (!nodes)
        nodes = graph.pageNodes;
        
    
    this.updateNodeTransforms(nodes);//, false);
    this.updateNodeTransforms(nodes); // this has to be done twice //because getAllNodeBounds() forces a reflow

    nodes.forEach(n => n.updateMeasureData());

    this.updateNodeWireTransforms(nodes);


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


    if (this.measureData.clientRect)
    {
        const x = this.measureData.clientRect.left;
        const w = this.measureData.clientRect.width;
        const h = this.measureData.clientRect.height;
        
        const bounds = this.getAllNodeBounds();

        this.updateScroll(x, w, h, bounds, getTopHeight());
    }
};



GraphView.prototype.updateNodeTransforms = function(nodes)//, _updateWires = true)
{
    const nodeLeft = nodes.map(n => n.div.offsetLeft);
    const nodeTop  = nodes.map(n => n.div.offsetTop);
    const nodeRect = nodes.map(n => n.getOffsetRect());

    for (let i = 0; i < nodes.length; i++)
        nodes[i].setTransform(nodeLeft[i], nodeTop[i], nodeRect[i]);

    // if (_updateWires)
    //     this.updateNodeWireTransforms(nodes);
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



GraphView.prototype.updatePanels = function()
{
    const panels = graph.nodes.filter(n => n.type == PANEL);
        
    panels.sort((a, b) => 
          b.measureData.divBounds.width * b.measureData.divBounds.height
        - a.measureData.divBounds.width * a.measureData.divBounds.height);

    for (let i = 0; i < panels.length; i++)
        panels[i].div.style.zIndex = i;
};



GraphView.prototype.soloNode = function(node)
{
    this._soloNode = node;

    graph.pageNodes.forEach(n => 
        n.div.style.opacity = 
                n == this._soloNode
            || n.isConnectedTo(this._soloNode)
            ? 1 
            : 0.2);

    graph.connections.forEach(c =>
    { 
        const opacity = 
               c.input  && this._soloNode == c.input .node
            || c.output && this._soloNode == c.output.node
            ? 1 
            : 0.15;

        c.wire.svg    .style.opacity = opacity;
        c.wire.inBall .style.opacity = opacity;
        c.wire.outBall.style.opacity = opacity;
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



GraphView.prototype.updateNodeDimensions = function(nodes)
{
    this.setNodePositions(nodes, 0, 0);

    for (const node of nodes)
        if (node instanceof ResizableBase)
            node.setRect(node.x, node.y, node.width, node.height);
};



GraphView.prototype.setNodePositions = function(nodes, dx, dy, updateTransform = true)
{
    //console.log('GraphView.setNodePositions()');

    for (const node of nodes)
    {
        node.setPosition(
            node.slx + dx, 
            node.sly + dy,
            false);
    }

    if (updateTransform)
    {
        this.updateNodeTransforms(nodes);
        this.updateNodeWireTransforms(nodes);
    }
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
    
    get tab() { return CTAB.repeat(this.nTab); }
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

    
    writeTextToClipboard(js);
};



GraphView.prototype.pasteCopiedNodes = function(pasteConnected, clientX = Number.NaN, clientY = Number.NaN)
{
    readTextFromClipboard().then(text =>
    {
        if (text == '') return;

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

        actionManager.do(new PasteNodesAction(
            uiCopyNodes(this.selectedNodes.map(n => n.id), false), 
            pasteConnected, 
            true));
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



GraphView.prototype.nudgeSelected = function(x, y)
{
    const positions = 
        graphView.selectedNodes.map(n => 
            point(
                n.div.offsetLeft + x / graph.currentPage.zoom,
                n.div.offsetTop  + y / graph.currentPage.zoom));

    actionManager.do(new MoveNodesAction(
        graphView.selectedNodes.map(n => n.nodeId), 
        positions));
};



GraphView.prototype.randomizeSelectedSeeds = function()
{
    const randoms = graphView.selectedNodes.filter(n => 
           (   n.type == NUMBER_RANDOM
            || n.type == NUMBER_NOISE
            || n.type == PROBABILITY)
        && !n.paramSeed.controls[0].readOnly);
     
    if (randoms.length == 0)
        return;


    const [params, values] = this.getRandomizedSeedValues(randoms);

    actionManager.do(new SetMultipleValuesAction(params, values, true));
};



GraphView.prototype.randomizeSelectedColors = function()
{
    const colors = graphView.selectedNodes.filter(n => 
            n.type == COLOR
        && !n.param1.controls[0].readOnly
        && !n.param2.controls[0].readOnly
        && !n.param3.controls[0].readOnly);
        
    if (colors.length == 0)
        return;


    const [params, values] = this.getRandomizedColorValues(colors);

    actionManager.do(new SetMultipleValuesAction(params, values, true));
};



GraphView.prototype.randomizeSelectedNumbers = function()
{
    const numbers = graphView.selectedNodes.filter(n => 
           (   n.type == NUMBER
            || n.type == BOUNDED_NUMBER)
        && !n.paramValue.controls[0].readOnly);
       
    if (numbers.length == 0)
        return;


    const [params, values] = this.getRandomizedNumberValues(numbers);

    actionManager.do(new SetMultipleValuesAction(params, values, true));
};



GraphView.prototype.randomizeSelectedNodes = function()
{
    const params = [];
    const values = [];


    const randoms = graphView.selectedNodes.filter(n => 
           (   n.type == NUMBER_RANDOM
            || n.type == NUMBER_NOISE
            || n.type == PROBABILITY
            || n.type == INDEX_LIST)
        && !n.paramSeed.controls[0].readOnly);

    const colors = graphView.selectedNodes.filter(n => 
            n.type == COLOR
        && !n.param1.controls[0].readOnly
        && !n.param2.controls[0].readOnly
        && !n.param3.controls[0].readOnly);

    const numbers = graphView.selectedNodes.filter(n => 
           (   n.type == NUMBER
            || n.type == BOOLEAN_NUMBER
            || n.type == BOUNDED_NUMBER)
        && !n.paramValue.controls[0].readOnly);


    if (   randoms.length > 0
        && (   settings.randomShiftR
            ||    colors .length == 0
               && numbers.length == 0))
    {
        const [_params, _values] = this.getRandomizedSeedValues(randoms);

        params.push(..._params);
        values.push(..._values);
    }


    if (   colors.length > 0
        && (   settings.colorShiftR
            ||    randoms.length == 0
               && numbers.length == 0))
    {
        const [_params, _values] = this.getRandomizedColorValues(colors);

        params.push(..._params);
        values.push(..._values);
    }


    if (   numbers.length > 0
        && (   settings.numberShiftR
            ||    colors .length == 0
               && randoms.length == 0))
    {
        const [_params, _values] = this.getRandomizedNumberValues(numbers);

        params.push(..._params);
        values.push(..._values);
    }
    

    actionManager.do(new SetMultipleValuesAction(params, values, true));
};



GraphView.prototype.toggleShowValueNames = function()
{
    const nodes     =  graphView.selectedNodes.filter(node =>  node.type == ITEMS);
    const showNames = !graphView.selectedNodes.some  (node => !node.showValueNames);

    actionManager.do(new SetShowValueNamesAction(nodes, !showNames));
};



GraphView.prototype.getRandomizedSeedValues = function(randoms)
{
    const params = randoms.map(n => n.paramFromId('seed'));

    const values = Array.from(
        {length: randoms.length},
        (_, index) => new NumberValue(Math.floor(Math.random() * 10000)));

    return [params, values];
};



GraphView.prototype.getRandomizedColorValues = function(colors)
{
    const params = 
    [ 
        ...colors.map(n => n.paramFromId('c1')),
        ...colors.map(n => n.paramFromId('c2')),
        ...colors.map(n => n.paramFromId('c3'))
    ];

    const values = params.map(p => new NumberValue(Math.floor(p.controls[0].minDisplay + Math.random() * (p.controls[0].maxDisplay - p.controls[0].minDisplay))));

    return [params, values];
};



GraphView.prototype.getRandomizedNumberValues = function(numbers)
{
    const params = [...numbers.map(n => n.paramFromId('value'))];

    const values = params.map(p => 
    {
        const ctrl = p.controls[0];

        const connectedMin = p.getConnectedMin();
        const connectedMax = p.getConnectedMax();
        
        const min = 
            !isNaN(connectedMin)
                ? connectedMin
                : ctrl.minDisplay != Number.MIN_SAFE_INTEGER
                    ? ctrl.minDisplay
                    : 0;
            
        if (settings.normalizeRandomNumbers)
        {
            return new NumberValue(Math.random());
        }
        else
        {
            let _max = Math.random();

            const m1 = 0.4;
            const m2 = 0.8;
            const m3 = 0.97;

                 if (_max <  m1              ) _max = 100;
            else if (_max >= m1 && _max <  m2) _max = 1000;
            else if (_max >= m2 && _max <  m3) _max = 10000;
            else if (              _max >= m3) _max = 100000;

            const max = 
                !isNaN(connectedMax)
                    ? connectedMax
                    : ctrl.maxDisplay != Number.MAX_SAFE_INTEGER
                        ? ctrl.maxDisplay
                        : _max;

            return new NumberValue(
                Math.round(min + Math.random() * (max - min)));
        }
    });

    return [params, values];
};



GraphView.prototype.connectSelectedSeeds = function()
{
    const list = graphView.selectedNodes.find(n => n.type == ITEMS);

    const randoms = graphView.selectedNodes.filter(n => 
           n.type == NUMBER_RANDOM
        || n.type == NUMBER_NOISE
        || n.type == PROBABILITY);


    for (let i = 0, j = 0; i < list.params.length && j < randoms.length; i++, j++)
    {
        const param     = list.params[i];

        const node      = randoms[j];
        const paramSeed = node.paramFromId('seed');

        actionManager.do(new ConnectAction(
            param.output, 
            paramSeed.input),
            i > 0);
    }
};