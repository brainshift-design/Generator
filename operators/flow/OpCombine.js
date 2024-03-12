class   OpCombine
extends ResizableBase
{
    length;



    constructor()
    {
        super(COMBINE, 'combine', 'combine', iconCombine);

        //this.canDisable        = true;
        this.variableInputs    = true;
        this.showHeaderTooltip = true;


        this.addNewInput();
        this.addOutput(new Output([LIST_VALUE], this.output_genRequest));
    }
    
    
    
    addNewInput()
    {
        const newInput = new Input([ANY_VALUE]);
        newInput.isNew = true;

        newInput.addEventListener('connect', e => 
        { 
            onVariableListConnectInput(e.detail.input); 
            e.detail.input.isNew = false; 
            //this.updateHeader();
        });

        newInput.addEventListener('disconnect', e => 
        { 
            onVariableListDisconnectInput(e.detail.input); 
            //this.updateHeader();
        });

        this.addInput(newInput);

        return newInput;
    }



    setRect(x, y, w, h, updateTransform = true)
    {
        super.setRect(
            x,
            y,
            w,
            this.headerHeight,
            updateTransform);
    }



    output_genRequest(gen)
    {
        // 'this' is the output

        gen.scope.push({
            nodeId:  this.node.id, 
            paramId: NULL });

        const [request, ignore] = this.node.genRequestStart(gen);
        if (ignore) return request;


        const connectedInputs = this.node.inputs.filter(i => i.connected && !i.param);


        request.push(connectedInputs.length); // utility values like param count are stored as numbers
        
        for (const input of connectedInputs)
            request.push(...pushInputOrParam(input, gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        super.updateValues(requestId, actionId, updateParamId, paramIds, values);
        
        const length = values[paramIds.findIndex(id => id == 'length')];
        const type   = values[paramIds.findIndex(id => id == 'type'  )];

        if (length)
            this.length = length.value;
    
        if (type)
        {
            consoleAssert(isListValueType(type.value));
            this.headerOutputs[0].types = [type.value];
        }
    }



    getHeaderColors(options = {})
    {
        const colors = super.getHeaderColors(options);
        const type   = this.outputs[0].types[0];

        colors.text  = isDark(colors.back) ? [1, 1, 1, 1] : [0, 0, 0, 1]; 

        const gray =
               this.active
            && this.outputs[0].types[0] == LIST_VALUE;

        colors.output  = gray ? rgb_a(colors.text, 0.35) : rgb_a(rgbSaturateHsv(rgbFromType(type, !this.active), 0.5), 0.7);
        colors.outWire = rgbFromType(type, true);

        return colors;
    }
}

