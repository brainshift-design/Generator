class   OpSelect
extends ResizableBase
{
    static { Operator.types[SELECT] = this; }



    paramIndex;

    value;
    length;



    constructor()
    {
        super(SELECT, 'select', 'select', iconSelect);


        this.outputValueType  = ANY_VALUE;
        this.variableInputs   = true;
        this.alwaysLoadParams = true;


        this.addNewInput();
        this.addOutput(new Output([ANY_VALUE], this.output_genRequest));


        this.addParam(this.paramIndex = new NumberParam('index', 'index', true, true, true, 0));

        this.paramIndex.divider                       = 0.54;
        this.paramIndex.controls[0].allowEditDecimals = false;


        this.value  = new NullValue();
        this.length = new NumberValue(0);
    }
    
    
    
    addNewInput()
    {
        const newInput = new Input([ANY_VALUE]);
        newInput.isNew = true;


        newInput.addEventListener('connect', e => 
        {
            onVariableConnectInput(e.detail.input); 
            e.detail.input.isNew = false; 
        });
        
        
        newInput.addEventListener('disconnect', e => 
        {
            onVariableDisconnectInput(e.detail.input);
        });


        this.addInput(newInput);


        return newInput;
    }



    setRect(x, y, w, h, updateTransform = true)
    {
        const height = this.headerHeight + defParamHeight;
        
        ResizableBase.prototype.setRect.call(this, 
            x, 
            y, 
            w, 
            height, 
            updateTransform);
    }



    output_genRequest(gen)
    {
        // 'this' is the output        

        return this.node.genRequest(gen);
    }



    genRequest(gen)
    {
        // 'this' is the node

        gen.scope.push({
            nodeId:  this.id, 
            paramId: NULL });


        const [request, ignore] = this.genRequestStart(gen);
        if (ignore) return request;


        const connectedInputs = this.inputs.filter(i => i.connected && !i.param);


        request.push(connectedInputs.length); // utility values like param count are stored as numbers
        
        for (const input of connectedInputs)
            request.push(...pushInputOrParam(input, gen));

            
        request.push(...this.paramIndex.genRequest(gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this);

        return request;
    }



    getHeaderOutputColor()
    {
        if (!this.value)
            return super.getHeaderOutputColor();


        switch (this.value.type)
        {
            case COLOR_VALUE: return this.value.toRgb();
            case FILL_VALUE:  return this.value.color.toRgb();
            default:          return super.getHeaderOutputColor();
        }
    }



    getOutputWireColor()
    {
        if (!this.value)
            return super.getOutputWireColor();


        switch (this.value.type)
        {
            case COLOR_VALUE: return this.value.toRgb();
            case FILL_VALUE:  return this.value.color.toRgb();
            default:          return super.getOutputWireColor();
        }
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        super.updateValues(requestId, actionId, updateParamId, paramIds, values);
        
        this.value  = values[paramIds.findIndex(id => id == 'value' )];
        this.length = values[paramIds.findIndex(id => id == 'length')];
        const type  = values[paramIds.findIndex(id => id == 'type'  )];

        if (type)
            this.headerOutputs[0].types = [type.value];
    }



    updateParams()
    {
        this.paramIndex.enableControlText(true, this.paramIndex.isUnknown());


        const min = this.length.value > 0 ? Math.min(0, -this.length.value  ) : Number.MIN_SAFE_INTEGER;
        const max = this.length.value > 0 ? Math.max(0,  this.length.value-1) : Number.MAX_SAFE_INTEGER;

        this.paramIndex.controls[0].setMin(0,   min);
        this.paramIndex.controls[0].setMax(max, max);


        this.updateParamControls();
    }
}
