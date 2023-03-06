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

    this.parentGraph.view.updateWires(wires);
}



Operator.prototype.updateNode = function() 
{
    this.      paramBack.style.backgroundColor = darkMode ? '#363636' : 'white';
    this.hiddenParamBack.style.backgroundColor = darkMode ? '#363636' : 'white';

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
        graphView.zoom >= 1
        ? 3
        : 3 * (((1 / graphView.zoom - 1) / 2) + 1);

    this.div.style.boxShadow = 
        this._selected
        ? '0 0 0 ' + scale + 'px var(--figma-color-bg-brand)'
        : 'none';
}



Operator.prototype.updateHeader = function()
{
    //console.log(this.id + '.Operator.updateHeader()');
    
    const height = Math.max(25, this.updateHeaderInputsAndOutputs());

    this.header.style.height = height;
    this.updateParamBack(height);

    this.updateHeaderLabel();
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

    this.divDisabled.style.display   = this.enabled ? 'none' : 'inline-block';
    this.divDisabled.style.zIndex    = 1000;
    this.divDisabled.style.transform = 'rotate(45deg)';
    this.divDisabled.style.height    = Math.min(this.measureData.divOffset.width, this.measureData.divOffset.height) + 70;
    this.divDisabled.style.left      = (this.measureData.divOffset.width  - this.measureData.disabledOffset.width ) / 2;
    this.divDisabled.style.top       = (this.measureData.divOffset.height - this.measureData.disabledOffset.height) / 2;
}



Operator.prototype.updateSubscribe = function()
{
    if (!this.measureData)
        return;

    this.subscribeCover.style.top    = this.measureData.headerOffset.height;
    this.subscribeCover.style.height = this.measureData.divOffset.height - this.measureData.headerOffset.height;
}



Operator.prototype.updateSubscribeStatus = function(subbed)
{
    const sub = 
            subbed
        || !this.subscription;


    this.subscribeCover.style.display = !sub ? 'block' : 'none';
    this.subscribeLabel.style.display = !sub ? 'block' : 'none';

    this.inner.style.opacity = !sub ? '50%' : '100%';


    if (!sub)
        this.updateSubscribe();
}



Operator.prototype.updateParamBack = function(headerHeight)
{
    this.      paramBack.style.height =
    this.hiddenParamBack.style.height = this.measureData.innerOffset.height - headerHeight;

    this.      paramBack.style.top    =
    this.hiddenParamBack.style.top    = headerHeight;
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
        .filter(p => p.control)
        .forEach(p => 
            {
                p.control.updateMeasureData();

                if (p. input) p. input.updateMeasureData();
                if (p.output) p.output.updateMeasureData();
            });
}



Operator.prototype.updateHeaderLabel = function()
{
    this.updateHeaderLabelText();

    
    this.label.style.top = 
          (  Math.floor(this.measureData.labelWrapperOffset.height/2 - this.measureData.labelOffset.height/2)
           + Math.min(Math.max(1, 1/graphView.zoom) - 1, 2))
        + 'px';


    this.updateHeaderLabelOffsetX();


    const colors = this.getHeaderColors();

    
    let fontSize = 11;

    // compensate for bold active header names look THINNER when zoomed out
         if (graphView.zoom < 0.5 ) fontSize = 17;
    else if (graphView.zoom < 0.75) fontSize = 15;
    else if (graphView.zoom < 1   ) fontSize = 13;
    else if (graphView.zoom < 1.5 ) fontSize = 12;

    this.label.style.color      = rgba2style(colors.text);
    this.label.style.fontSize   = this.active ? fontSize : 11;
    this.label.style.height     = this.active ? fontSize * 14 / 11 : 14;

    this.label.style.fontWeight = graphView.zoom < 1.2 ? '600' : 'normal';
}



Operator.prototype.updateHeaderLabelText = function()
{
    this.labelText.innerHTML = 
          (settings.showNodeId ? 'ID: ' + this.id : this.name)
        + (this.active && this.showActiveArrow ? '  ‣' : '');
}



Operator.prototype.updateHeaderInputsAndOutputs = function()
{
    const inputs  = this.headerInputs;
    const outputs = this.headerOutputs;

    const padding = this.header.connectionPadding;
        
    const [ inputY,  inputHeight] = getHeaderConnY(inputs,  padding, 5);
    const [outputY, outputHeight] = getHeaderConnY(outputs, padding, 2);

         if ( inputHeight > outputHeight) for (let i = 0; i < outputs.length; i++) outputY[i] += (inputHeight - outputHeight)/2;
    else if (outputHeight >  inputHeight) for (let i = 0; i < inputs .length; i++)  inputY[i] += (outputHeight - inputHeight)/2;


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


    return Math.max(inputHeight, outputHeight) 
         + this.header.connectionPadding * 2;
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