class   OpTextContains
extends OperatorBase
{
    paramFirst;
    paramLast;
    paramAll;



    constructor()
    {
        super(TEXT_CONTAINS, 'contains', 'contains', iconTextContains);


        this.iconOffsetY = 1;
        

        this.addInput (new Input ([TEXT_VALUE, TEXT_LIST_VALUE, NUMBER_VALUE, NUMBER_LIST_VALUE, LIST_VALUE]));
        this.addInput (new Input ([TEXT_VALUE, NUMBER_VALUE]));
        this.addOutput(new Output([NUMBER_VALUE], this.output_genRequest));

        this.addParam(this.paramFirst = new NumberParam('first', 'first index', true,  false, true));
        this.addParam(this.paramLast  = new NumberParam('last',  'last index',  true,  false, true));
        this.addParam(this.paramAll   = new   ListParam('all',   'all indices', false, false, true));

        this.paramAll.itemName = [];

        this.paramFirst.divider = 0.62;
        this.paramLast .divider = 0.62;
    }



    output_genRequest(gen)
    {
        // 'this' is the output

        gen.scope.push({
            nodeId:  this.node.id, 
            paramId: NULL });

        const [request, ignore] = this.node.genRequestStart(gen);
        if (ignore) return request;

        
        const input0 = this.node.inputs[0];
        const input1 = this.node.inputs[1];

        
        if (   input0.connected
            && input1.connected)   request.push(2,
                                       ...pushInputOrParam(input0, gen),
                                       ...pushInputOrParam(input1, gen));

        else if (input0.connected) request.push(1, ...pushInputOrParam(input0, gen));
        else if (input1.connected) request.push(1, ...pushInputOrParam(input1, gen));
            
        else                       request.push(0);


        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        super.updateValues(requestId, actionId, updateParamId, paramIds, values);

        const value = values[paramIds.findIndex(id => id == 'value')];
        const type  = values[paramIds.findIndex(id => id == 'type' )];

        if (type) 
            this.headerOutputs[0].types = [type.value];

        this.paramAll.showCount = value.isValid();
    }



    updateParams()
    {
        this.paramFirst.enableControlText(false, this.isUnknown());
        this.paramLast .enableControlText(false, this.isUnknown());
        this.paramAll  .enableControlText(false, this.isUnknown());

        this.updateParamControls();
    }



    getHeaderColors(options = {})
    {
        const colors   = super.getHeaderColors(options);
        const type     = this.outputs[0].types[0];

        colors.output  = rgb_a(rgbSaturateHsv(rgbFromType(type, true), 0.5), 0.7);
        colors.outWire = rgbFromType(type, true);

        return colors;
    }
}