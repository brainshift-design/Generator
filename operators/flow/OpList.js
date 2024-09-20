class   OpList
extends ResizableBase
{
    length;



    constructor()
    {
        super(LIST, 'list', 'list', iconData);

        this.outputValueType   = LIST_VALUE;
        this.variableInputs    = true;
        this.showHeaderTooltip = true;
        this.iconOffsetY       = 1;


        this.addNewInput();
        this.addOutput(new Output([LIST_VALUE], this.output_genRequest));


        this.getDescription = () => `combines all inputs into a list, including for closing many nodes into one loop`;
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
            console.log('type =', type);
            consoleAssert(isListValueType(type.value));
            this.headerOutputs[0].types = [type.value];
        }
    }



    getHeaderColors(options = {})
    {
        const colors = super.getHeaderColors(options);

        colors.text = isDark(colors.back) ? [1, 1, 1, 1] : [0, 0, 0, 1]; 

        return colors;
    }
}

