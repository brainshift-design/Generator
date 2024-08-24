Operator.prototype.updateTransform = function()
{
    const nodeLeft = this.div.offsetLeft;
    const nodeTop  = this.div.offsetTop;
    const nodeRect = this.getOffsetRect();
    
    this.setTransform(nodeLeft, nodeTop, nodeRect);
    this.updateWireTransform();
};



Operator.prototype.updateWireTransform = function()
{
    const wires = [];

    for (const input of this.inputs)
        if (   input.connected
            && input.connection)
            wires.push(input.connection.wire);

    for (const output of this.outputs)
        for (const connInput of output.connectedInputs)
            if (connInput.connection)
                wires.push(connInput.connection.wire);

    graphView.updateWires(wires);
};



Operator.prototype.updateNode = function(_updateHeader = true) 
{
    // console.log('\'' + this.nodeId + '\'.updateNode()');
    // console.trace();


    if (_updateHeader)
        this.updateHeader();

    this.updateBorder();
    this.updateParams();
    this.updateDisabled();
    this.updateSubscribe();


    const visibleParams = this.params.filter(p => 
            p.isVisible()
        && !p.isResult);

    
    if (  !isEmpty(visibleParams)
        || this.sharpBottomCorners)
    {
        this.div   .style.borderBottomLeftRadius  = '0px';        
        this.inner .style.borderBottomLeftRadius  = '0px';        
        this.header.style.borderBottomLeftRadius  = '0px';        

        this.div   .style.borderBottomRightRadius = '0px';        
        this.inner .style.borderBottomRightRadius = '0px';        
        this.header.style.borderBottomRightRadius = '0px';        
    }
    else
    {
        this.div   .style.borderRadius = '4px';        
        this.inner .style.borderRadius = '4px';        
        this.header.style.borderRadius = '4px';        
    }
};



Operator.prototype.updateBorder = function()
{
    //console.log('\'' + this.nodeId + '\'.updateBorder()');
    //console.trace();

    const scale = 
        graph.currentPage.zoom >= 1
        ? 3
        : 3 * (((1 / graph.currentPage.zoom - 1) / 2) + 1);

    const highlightScale = 
        graph.currentPage.zoom >= 1
        ? 7
        : 7 * (((1 / graph.currentPage.zoom - 1) / 3.5) + 1);


    let highlight = 'transparent';

    if (this.type != PANEL)
    {
        switch (this.highlight)
        {
            case 1: highlight = darkMode ? '#fff8' : '#0007'; break;
            case 2: highlight = darkMode ? '#f33a' : '#f006'; break;
            case 3: highlight = darkMode ? '#f809' : '#f808'; break;
            case 4: highlight = darkMode ? '#ff08' : '#dd0f'; break;
            case 5: highlight = darkMode ? '#1e18' : '#0d09'; break;
            case 6: highlight = darkMode ? '#27fd' : '#03f7'; break;
            case 7: highlight = darkMode ? '#f2f9' : '#f0f7'; break;
        }
    }


    this.div.style.boxShadow = 
          (this._selected
           ? '0 0 0 ' + scale + 'px var(--figma-color-bg-brand), '
           : '')
        + '0 0 0 ' + highlightScale + 'px ' + highlight;


    this.div.style.outline = 
           !darkMode 
        && !this._selected
        ? '1px solid #0001'
        : 'none';
};



Operator.prototype.updateHeader = function()
{
    // console.log('\'' + this.nodeId + '\'.updateHeader()');
    // console.trace();

    const height = this.updateHeaderInputsAndOutputs();

    this.header.style.height = height;

    
    this.updateHeaderLabel();
    this.updateReorderArrows();


    const colors = this.getHeaderColors();


    if (this.progressBar)
    {
        this.progressBar.style.background = 
            !rgbIsNaN(colors.back) 
            ? rgb2style_a(colors.text, 0.5) 
            : 'var(--figma-color-bg-brand)';
    }
};



Operator.prototype.updateParams = function()
{
    for (const param of this.params)
        param.enableControlText(true, param.isUnknown());

    this.updateParamControls();
};



Operator.prototype.updateParamControls = function()
{
    for (const param of this.params)
        param.updateControls();
};



Operator.prototype.updateDisabled = function()
{
    if (!this.measureData)
        return;

    const zoom = graph.currentPage.zoom;

    const ax      = 2;
    const bx      = 0.15;
    const fx      = 1 - Math.pow(1 - Math.min(zoom, 1), ax) / Math.pow(ax, bx);

    const ay      = 2;
    const by      = 1;
    const fy      = 1 - Math.pow(1 - Math.min(zoom, 1), ay) / Math.pow(ay, by);

    const width   = 8;
    const height  = Math.min(this.measureData.divOffset.width, this.measureData.divOffset.height) + 100;

    const _width  = width /fx;
    const _height = height/fy;

    this.divDisabled.style.display   =  this.enabled ? 'none' : 'inline-block';
    this.divDisabled.style.zIndex    =  10000;
    this.divDisabled.style.width     =  _width;
    this.divDisabled.style.height    =  _height;
    this.divDisabled.style.transform = 'rotate(45deg)';
    this.divDisabled.style.left      =  (this.measureData.divOffset.width  - this.measureData.disabledOffset.width ) / 2;
    this.divDisabled.style.top       =  (this.measureData.divOffset.height - _height) / 2;
};



Operator.prototype.updateSubscribe = function()
{
    if (   !this.measureData
        || !this.measureData.headerOffset
        || !this.measureData.divOffset)
        return;

    this.proCover.style.top    = this.measureData.headerOffset.height;
    this.proCover.style.height = this.measureData.divOffset.height - this.measureData.headerOffset.height;
};



Operator.prototype.updateSubscribeStatus = function(pro)
{
    pro = pro && this.subscription;


    this.proCover.style.display = pro ? 'block' : 'none';
    this.proLabel.style.display = pro ? 'block' : 'none';

    this.inner   .style.opacity = pro ? '50%' : '100%';

    if (pro)
        this.updateSubscribe();
};



Operator.prototype.initMeasureData = function()
{
    this.measureData = 
    {
        divBounds:          new Rect(0, 0, 0, 0),
        divOffset:          new Rect(0, 0, 0, 0),
        innerOffset:        new Rect(0, 0, 0, 0),
        paramOffset:        new Rect(0, 0, 0, 0),
        headerOffset:       new Rect(0, 0, 0, 0),
        labelWrapperBounds: new Rect(0, 0, 0, 0),
        labelWrapperOffset: new Rect(0, 0, 0, 0),
        labelBounds:        new Rect(0, 0, 0, 0),
        labelOffset:        new Rect(0, 0, 0, 0),
        disabledOffset:     new Rect(0, 0, 0, 0),
        subscribeOffset:    new Rect(0, 0, 0, 0)
    };
};



Operator.prototype.updateMeasureData = function()
{
    // console.log('');
    // console.log('\'' + this.nodeId + '\'.updateMeasureData()');
    // console.trace();

    this.measureData = 
    {
        divBounds:          boundingRect(this.div         ),
        divOffset:          offsetRect  (this.div         ),
        innerOffset:        offsetRect  (this.inner       ),
        paramOffset:        offsetRect  (this.paramHolder ),
        headerOffset:       offsetRect  (this.header      ),
        labelWrapperBounds: boundingRect(this.labelWrapper),
        labelWrapperOffset: offsetRect  (this.labelWrapper),
        labelBounds:        boundingRect(this.label       ),
        labelOffset:        offsetRect  (this.label       ),
        disabledOffset:     offsetRect  (this.divDisabled ),
        subscribeOffset:    offsetRect  (this.proLabel    )
    };


    this.params
        .forEach(p =>
        {
            for (const control of p.controls)
                control.updateMeasureData();

            if (p. input) p. input.updateMeasureData();
            if (p.output) p.output.updateMeasureData();
        });
};



Operator.prototype.updateIcon = function()
{
    const colors = this.getHeaderColors();

    this.divIcon.innerHTML     = this.icon.replaceAll('white', rgba2style(colors.text));
    this.divIcon.style.top     = (this.iconOffsetY + (1 - 1 / Math.min(graph.currentPage.zoom, 1))).toString() + 'px';
    this.divIcon.style.display = 
           this.icon != '' 
        && this.showIcon
        && (   settings.showNodeIcons
            || this.alwaysShowIcon)
        ? 'inline' 
        : 'none';
};



Operator.prototype.getLabelText = function()
{
    return this.name;
};



Operator.prototype.updateReorderArrows = function()
{
    if (this.showReorderArrows)
    {
        const colors     = this.getHeaderColors();
        const arrowStyle = rgba2style(rgb_a(isDark(colors.back) ? [1, 1, 1] : [0, 0, 0], 0.5));

        this.reorderArrows.style.display            = 'inline-block';
        this.reorderArrows.style.background         = 'url(\'data:image/svg+xml;utf8,<svg width="5" height="8" viewBox="0 0 5 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 8L5 5H0L2.5 8Z" fill="'+arrowStyle+'"/><path d="M2.5 0L5 3H0L2.5 0Z" fill="'+arrowStyle+'"/></svg>\')';
        this.reorderArrows.style.backgroundPosition = '50% 50%';
        this.reorderArrows.style.backgroundRepeat   = 'no-repeat';
    }
    else
        this.reorderArrows.style.display            = 'none';    
};



Operator.prototype.updateHeaderInputsAndOutputs = function()
{
    // console.log('');
    // console.log('\'' + this.nodeId + '\'.updateHeaderInputsAndOutputs()');
    // console.trace();

    let height = defHeaderHeight;


    const inputs  = this.headerInputs;
    const outputs = this.headerOutputs;

    let [ inputY,  inputHeight] = getHeaderConnY(inputs);
    let [outputY, outputHeight] = getHeaderConnY(outputs);
    
     inputHeight += this.header.connectionPadding * 2;
    outputHeight += this.header.connectionPadding * 2;


         if ( inputHeight > outputHeight) for (let i = 0; i < outputs.length; i++) outputY[i] += (inputHeight - outputHeight)/2;
    else if (outputHeight >  inputHeight) for (let i = 0; i < inputs .length; i++)  inputY[i] += (outputHeight - inputHeight)/2;     


    const maxHeight = Math.max(inputHeight, outputHeight);

    if (maxHeight > height) 
        height = maxHeight;
    else
    {
        for (let i = 0; i < inputs .length; i++)  inputY[i] += (height - maxHeight)/2;
        for (let i = 0; i < outputs.length; i++) outputY[i] += (height - maxHeight)/2;
    }


    for (let i = 0; i < inputs .length; i++)  inputY[i] += connectionSize/2 + this.header.connectionPadding;
    for (let i = 0; i < outputs.length; i++) outputY[i] += connectionSize/2 + this.header.connectionPadding;


    const colors = this.getHeaderColors();

    if (this.type == SET_VALUE_NAME)
        console.log('Operator.update() colors.output =', colors.output);

    for (let i = 0; i < inputs.length; i++)
    {
        inputs[i].div.style.top = inputY[i];
        
        inputs[i].colorLight =
        inputs[i].colorDark  = colors.input;

        //inputs[i].wireBall.style.background = rgba2style(colors.input);

        inputs[i].updateControl();
    }

    for (let i = 0; i < outputs.length; i++) 
    {
        outputs[i].div.style.top = outputY[i];

        outputs[i].colorLight =
        outputs[i].colorDark  = colors.output;

        outputs[i].updateControl();
    }


    this.headerHeight = height;

    
    return height;
};



Operator.prototype.updateValues = function(requestId, actionId, updateParamId, paramIds, values) // virtual
{
    for (let i = 0; i < paramIds.length; i++)
    {
        const index = this.params.findIndex(p => p.id == paramIds[i]);

        if (   paramIds[index] != updateParamId
            && index > -1
            && this.params[index].type == values[i].type)
        {
            this.params[index].setValue(values[i], false, true, false);
        }
    }


    this.preview = values[paramIds.findIndex(id => id == 'preview')];
};



Operator.prototype.setLayoutIndex = function()
{
    this.layoutIndex++;

    for (const output of this.connectedOutputs)
        for (const input of output.connectedInputs)
            input.node.setLayoutIndex();
};