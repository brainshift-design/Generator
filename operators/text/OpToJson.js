class   OpToJson
extends OperatorBase
{
    paramQuoteValues;

    menuQuoteValues;



    constructor()
    {
        super(TO_JSON, 'toJson', 'to JSON', iconToJson);


        this.outputValueType = ANY_VALUE;
        this.iconOffsetY     = 1;


        this.addInput (new Input([ANY_VALUE]));
        this.addOutput(new Output([TEXT_VALUE], this.output_genRequest));


        this.addParam(this.paramQuoteValues = new NumberParam('quoteValues', 'quote values', true, true, true, 0, 0, 1));

        this.paramQuoteValues.divider = 0.695;
        this.paramQuoteValues.controls[0].allowEditDecimals = false;

        this.menuQuoteValues = createBoolMenu(this.paramQuoteValues);
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

        request.push(...this.node.paramQuoteValues.genRequest(gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateParams()
    {
        this.paramQuoteValues.enableControlText(true);

        updateParamConditionText(this.paramQuoteValues, this.paramQuoteValues.isUnknown(), false, 1);

        this.updateParamControls();
    }
}
