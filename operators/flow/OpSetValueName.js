class   OpSetValueName
extends OperatorBase
{
    paramName;

    value = null;



    constructor()
    {
        super(SET_VALUE_NAME, 'setValueName', 'set value name', iconSetValueName);

        this.valueType    = ANY_VALUE;
        this.subscription = true;
        this.canDisable   = true;
        this.iconOffsetY  = -1;


        this.addInput (new Input([ANY_VALUE]));
        this.addOutput(new Output([ANY_VALUE], this.output_genRequest));

        this.headerOutputs[0].forceNodeOutputColor = true;
        

        this.addParam(this.paramName = new TextParam('name', 'name', false, true, true));


        //this.inputs[0].addEventListener('connect',    () => OpValueName_onConnectInput(this));
        //this.inputs[0].addEventListener('disconnect', () => OpValueName_onDisconnectInput(this));
    }



    canAutoConnectFrom(output)
    {
        return true;
    }

    

    output_genRequest(gen)
    {
        // 'this' is the output

        gen.scope.push({
            nodeId:  this.node.id, 
            paramId: NULL });

        const [request, ignore] = this.node.genRequestStart(gen);
        if (ignore) return request;


        const input = this.node.inputs[0];


        request.push(input.connected ? 1 : 0);

        if (input.connected)
            request.push(...pushInputOrParam(input, gen));

        request.push(...this.node.paramName.genRequest(gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        super.updateValues(requestId, actionId, updateParamId, paramIds, values);
        
        this.value = values[paramIds.findIndex(id => id == 'value')];
        const type = values[paramIds.findIndex(id => id == 'type' )];

        if (type)
            this.headerOutputs[0].types = [type.value];
    }



    getOutputWireColor()
    {
        if (this.value) 
        {
            if (    this.value.type == COLOR_VALUE 
                && !rgbIsNaN(this.value.toRgb())) 
                return this.value.toRgb();

            else if (    this.value.type == FILL_VALUE 
                     && !rgbIsNaN(this.value.color.toRgb())) 
                return this.value.color.toRgb();

            else if (    this.value.type == STROKE_VALUE 
                     &&  this.value.fills.items.length > 0
                     && !rgbIsNaN(this.value.fills.items.at(-1).color.toRgb())) 
                return this.value.fills.items.at(-1).color.toRgb();

            else if (    this.value.type == GRADIENT_VALUE 
                     && !rgbaIsNaN(this.value.toRgba())) 
                return rgb_a(this.value.toRgba());

            else if (    this.value.type == COLOR_STOP_VALUE 
                     && !rgbIsNaN(this.value.fill.color.toRgb())) 
                return rgb_a(this.value.fill.color.toRgb());

            else
                return super.getOutputWireColor();
        }
        else
            return super.getOutputWireColor();
    }
}
