class   OpNaNisNumber
extends OperatorBase
{
    paramValue;



    constructor()
    {
        super(NUMBER_NAN, 'nanIsNum', 'NaN ⟶ number', iconNaNisNumber);

        this.canDisable       = true;
        //this.alwaysLoadParams = true;

        
        this.addInput(new Input([NUMBER_VALUE, NUMBER_LIST_VALUE, LIST_VALUE]));
        this.addOutput(new Output([NUMBER_VALUE], this.output_genRequest));

        this.addParam(this.paramValue = new NumberParam('value', 'value', false, true, true, 0));
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


        request.push(...this.node.paramValue.genRequest(gen));


        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        const type = values[paramIds.findIndex(id => id == 'type' )];

        if (type) 
            this.headerOutputs[0].types = [type.value];

        super.updateValues(requestId, actionId, updateParamId, paramIds, values);
    }

    

    // getHeaderColors(options = {})
    // {
    //     const colors = super.getHeaderColors(options);
    //     const type   = this.outputs[0].types[0];

    //     colors.output = rgb_a(rgbSaturateHsv(rgbFromType(type, true), 0.5), 0.7);
    //     colors.wire   = rgbFromType(type, true);

    //     return colors;
    // }
}