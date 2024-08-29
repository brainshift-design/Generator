class   OpSetValueName
extends OperatorBase
{
    paramName;

    value;



    constructor()
    {
        super(SET_VALUE_NAME, 'setValueName', 'set value name', iconSetValueName);

        this.valueType    = ANY_VALUE;
        this.subscription = true;
        this.canDisable   = true;
        this.iconOffsetY  = -1;


        this.addInput (new Input([ANY_VALUE]));
        this.addOutput(new Output([ANY_VALUE], this.output_genRequest));

        this.headerOutputs[0].forceOutputColor = true;


        this.addParam(this.paramName = new TextParam('name', 'name', false, true, true));
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
        this.value = values[paramIds.findIndex(id => id == 'value')];
        const type = values[paramIds.findIndex(id => id == 'type' )];

        if (type)
            this.headerOutputs[0].types = [type.value];

        super.updateValues(requestId, actionId, updateParamId, paramIds, values);
    }



    getOutputWireColor()
    {
        if (this.value) 
        {
            const rgb = rgbFromColorValue(this.value);

            return !rgbIsNaN(rgb)
                 ? rgb
                 : super.getOutputWireColor();
        }
        else
            return super.getOutputWireColor();
    }
}
