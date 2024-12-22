class   OpBuckleList
extends OperatorBase
{
    static { Operator.types[BUCKLE_LIST] = this; }



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

        this.length = Math.floor(length.value / 2);


        if (    this.length > 0
            && !this.isUnknown())
            this.paramAmount.controls[0].setMax(this.length, this.length);
        else   
            this.paramAmount.controls[0].setMax();
    }



    updateParams()
    {
        this.paramAmount.enableControlText(true, this.paramAmount.isUnknown());

        this.updateParamControls();
    }
}