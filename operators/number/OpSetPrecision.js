class   OpSetPrecision
extends OperatorBase
{
    paramDecimals;


    value;



    constructor()
    {
        super(NUMBER_PRECISION, 'precision', 'precision', iconNumberPrecision);

        //this.outputValueType = NUMBER_VALUE;
        this.canDisable = true;
        

        this.addInput(new Input([
            NUMBER_VALUE, 
            NUMBER_LIST_VALUE, 
            TEXT_VALUE, 
            TEXT_LIST_VALUE, 
            COLOR_VALUE, 
            FILL_VALUE, 
            LIST_VALUE]));

        this.addOutput(new Output([NUMBER_VALUE], this.output_genRequest));

        this.addParam(this.paramDecimals = new NumberParam('decimals', 'decimals', false, true, true, 0, 0, 10));
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

        
        request.push(...this.node.paramDecimals.genRequest(gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

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
        this.value = values[paramIds.findIndex(id => id == 'value')];
        const type = values[paramIds.findIndex(id => id == 'type' )];

        if (type)
            this.headerOutputs[0].types = [type.value];

        super.updateValues(requestId, actionId, updateParamId, paramIds, values);
    }



    updateParams()
    {
        this.paramDecimals.enableControlText(true, this.paramDecimals.isUnknown());

        this.updateParamControls();
    }
}