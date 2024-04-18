class   OpBuckleList
extends OperatorBase
{
    paramAmount;

    length;



    constructor()
    {
        super(BUCKLE_LIST, 'blendEdges', 'blend edges', iconBuckleList);

        this.canDisable        = true;
        this.showHeaderTooltip = true;
        
        this.addParam(this.paramAmount = new NumberParam('amount', 'amount', true, true, true, 0, 0));

        this.addInput (new Input ([NUMBER_LIST_VALUE]));
        this.addOutput(new Output([NUMBER_LIST_VALUE], this.output_genRequest));

        this.paramAmount.controls[0].allowEditDecimals = false;
        this.paramAmount.divider                       = 0.6;
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

        request.push(...this.node.paramAmount.genRequest(gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        super.updateValues(requestId, actionId, updateParamId, paramIds, values);

        
        const length = values[paramIds.findIndex(id => id == 'length')];

        this.length = length.value;


        if (this.length > 0) this.paramAmount.controls[0].setMax(this.length, this.length);
        else                 this.paramAmount.controls[0].setMax();


        // const type = values[paramIds.findIndex(id => id == 'type')];

        // if (type)
        //     this.headerOutputs[0].types = [type.value];
    }



    // getHeaderColors(options = {})
    // {
    //     const colors = super.getHeaderColors(options);
    //     const type   = this.outputs[0].types[0];

    //     colors.text  = isDark(colors.back) ? [1, 1, 1, 1] : [0, 0, 0, 1]; 

    //     const gray =
    //            this.active
    //         && this.outputs[0].types[0] == LIST_VALUE;

    //     colors.output  = gray ? rgb_a(colors.text, 0.35) : rgb_a(rgbSaturateHsv(rgbFromType(type, true), 0.5), 0.7);
    //     colors.outWire = rgbFromType(type, true);

    //     return colors;
    // }
}