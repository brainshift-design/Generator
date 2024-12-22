class   OpSetObjectName
extends OperatorBase
{
    static { Operator.types[SET_OBJECT_NAME] = this; }



    paramName;

    value;
    


    constructor()
    {
        super(SET_OBJECT_NAME, 'setObjectName', 'set object name', iconSetObjectName);

        this.outputValueType = SHAPE_VALUE;
        this.subscription    = true;
        this.canDisable      = true;


        this.addInput (new Input(SHAPE_VALUES));
        this.addOutput(new Output([SHAPE_VALUE], this.output_genRequest));

        this.headerOutputs[0].forceOutputColor = true;

        
        this.addParam(this.paramName = new TextParam('name',    'name',  false, true, true));
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
        const type = values[paramIds.findIndex(id => id == 'type')];
        
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
