Operator.prototype.updateTransform = function()
{
    const nodeLeft = this.div.offsetLeft;
    const nodeTop  = this.div.offsetTop;
    const nodeRect = this.getOffsetRect();
    
    this.setTransform(nodeLeft, nodeTop, nodeRect);
    this.updateWireTransform();
}



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
}



Operator.prototype.updateNode = function() 
{
    this.updateHeader();
    this.updateHeaderLabel();
    this.updateBorder();
    this.updateParams();
    this.updateDisabled();
    this.updateSubscribe();


    if (  !isEmpty(this.params.filter(p => p.isVisible()))
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
}



Operator.prototype.updateBorder = function()
{
    const scale = 
        graph.currentPage.zoom >= 1
        ? 3
        : 3 * (((1 / graph.currentPage.zoom - 1) / 2) + 1);

    this.div.style.boxShadow = 
        this._selected
        ? '0 0 0 ' + scale + 'px var(--figma-color-bg-brand)'
        : 'none';
}



Operator.prototype.updateHeader = function()
{
    //console.log(this.id + '.Operator.updateHeader()');
    
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
}



Operator.prototype.updateParams = function()
{
    for (const param of this.params)
        param.enableControlText(true);

    this.updateParamControls();
}



Operator.prototype.updateParamControls = function()
{
    for (const param of this.params)
        param.updateControls();
}



Operator.prototype.updateDisabled = function()
{
    if (!this.measureData)
        return;

    const height = Math.min(this.measureData.divOffset.width, this.measureData.divOffset.height) + 70;

    this.divDisabled.style.display   = this.enabled ? 'none' : 'inline-block';
    this.divDisabled.style.zIndex    = 10000;
    this.divDisabled.style.height    = height;
    this.divDisabled.style.transform = 'rotate(45deg)';
    this.divDisabled.style.left      = (this.measureData.divOffset.width  - this.measureData.disabledOffset.width ) / 2;
    this.divDisabled.style.top       = (this.measureData.divOffset.height - height) / 2;
}



Operator.prototype.updateSubscribe = function()
{
    if (!this.measureData)
        return;

    this.subscribeCover.style.top    = this.measureData.headerOffset.height;
    this.subscribeCover.style.height = this.measureData.divOffset.height - this.measureData.headerOffset.height;
}



Operator.prototype.updateSubscribeStatus = function(subscribed)
{
    const sub = 
            subscribed
        || !this.subscription;


    this.subscribeCover.style.display = !sub ? 'block' : 'none';
    this.subscribeLabel.style.display = !sub ? 'block' : 'none';

    this.inner.style.opacity = !sub ? '50%' : '100%';


    if (!sub)
        this.updateSubscribe();
}



Operator.prototype.updateMeasureData = function()
{
    this.measureData = 
    {
        divBounds:          boundingRect(this.div),
        divOffset:          offsetRect  (this.div),
        innerOffset:        offsetRect  (this.inner),
        headerOffset:       offsetRect  (this.header),
        labelWrapperBounds: boundingRect(this.labelWrapper),
        labelWrapperOffset: offsetRect  (this.labelWrapper),
        labelBounds:        boundingRect(this.label),
        labelOffset:        offsetRect  (this.label),
        disabledOffset:     offsetRect  (this.divDisabled),
        subscribeOffset:    offsetRect  (this.subscribeLabel)
    };

    this.params
        .forEach(p =>
        {
            for (const control of p.controls)
                control.updateMeasureData();

            if (p. input) p. input.updateMeasureData();
            if (p.output) p.output.updateMeasureData();
        });
}



Operator.prototype.updateHeaderLabel = function()
{
    this.updateHeaderLabelText();

    
    this.label.style.top = 
          (  Math.floor(this.measureData.labelWrapperOffset.height/2 - this.measureData.labelOffset.height/2)
           + Math.min(Math.max(1, 1/graph.currentPage.zoom), 2)
           - (settings.showNodeId ? 1 : 0))
        + 'px';


    this.updateHeaderLabelOffsetX();


    const colors = this.getHeaderColors();

    
    let fontSize = 11;

    // compensate for bold active header names look THINNER when zoomed out
         if (graph.currentPage.zoom < 0.5 ) fontSize = 17;
    else if (graph.currentPage.zoom < 0.75) fontSize = 15;
    else if (graph.currentPage.zoom < 1   ) fontSize = 13;
    else if (graph.currentPage.zoom < 1.5 ) fontSize = 12;

    this.label.style.color      = rgba2style(colors.text);
    this.label.style.fontSize   = this.active ? fontSize : 11;
    this.label.style.height     = this.active ? fontSize * 15 / 11 : 15;
    this.label.style.fontWeight = graph.currentPage.zoom < 1.2 ? '600' : 'normal';


    this.updateIcon();
}



Operator.prototype.updateIcon = function()
{
    const colors = this.getHeaderColors();

    this.divIcon.innerHTML     = this.icon.replaceAll('white', rgba2style(colors.text));
    this.divIcon.style.top     = (this.iconOffsetY * Math.pow(Math.min(graph.currentPage.zoom, 1), 3)).toString() + 'px';
    this.divIcon.style.display = 
           this.icon != '' 
        && settings.showNodeIcons
        ? 'inline' 
        : 'none';
}



Operator.prototype.updateHeaderLabelText = function()
{
    const prefix = this.type == REPEAT ? '...' : '';
    const suffix = this.cached         ? ''    : '...';

    this.labelText.innerHTML = 
          (settings.showNodeId ? this.id : prefix + this.name + suffix)
        + (this.active && this.showActiveArrow ? (settings.showNodeId ? ' ' : '  ') + '‣' : '');

    this.labelText.style.fontFamily = 
        settings.showNodeId 
        ? 'Roboto Mono' 
        : 'Inter';
}



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


    for (let i = 0; i < inputs.length; i++)
    {
        inputs[i].div.style.top = inputY[i];
        inputs[i].updateControl();
    }

    for (let i = 0; i < outputs.length; i++) 
    {
        outputs[i].div.style.top = outputY[i];
        outputs[i].updateControl();
    }


    return height;
}



Operator.prototype.updateValues = function(requestId, actionId, updateParamId, paramIds, values) // virtual
{
    for (let i = 0; i < paramIds.length; i++)
    {
        const index = this.params.findIndex(p => p.id == paramIds[i]);

        if (   paramIds[index] != updateParamId
            && index > -1)
            this.params[index].setValue(values[i], false, true, false);
    }
}