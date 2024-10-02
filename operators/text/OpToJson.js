class   OpToJson
extends OperatorBase
{
    paramQuoteValues;
    paramShowNames;
    paramSingleLine;
    paramWhiteSpace;

    menuQuoteValues;
    menuShowNames;
    menuSingleLine;
    menuWhiteSpace;



    constructor()
    {
        super(TO_JSON, 'toJson', 'to JSON', iconToJson);


        this.outputValueType = ANY_VALUE;
        this.subscription    = true;
        this.iconOffsetY     = 1;


        this.addInput (new Input([ANY_VALUE]));
        this.addOutput(new Output([TEXT_VALUE], this.output_genRequest));


        this.addParam(this.paramShowNames   = new NumberParam('showNames',   'object names', true, true, true, 0, 0, 1));
        this.addParam(this.paramSingleLine  = new NumberParam('singleLine',  'single line',  true, true, true, 0, 0, 1));
        this.addParam(this.paramWhiteSpace  = new NumberParam('whiteSpace',  'white space',  true, true, true, 0, 0, 1));
        this.addParam(this.paramQuoteValues = new NumberParam('quoteValues', 'value quotes', true, true, true, 0, 0, 1));


        this.setAllParamDividers(0.695);

        this.paramQuoteValues.controls[0].allowEditDecimals = false;
        this.paramShowNames  .controls[0].allowEditDecimals = false;
        this.paramSingleLine .controls[0].allowEditDecimals = false;
        this.paramWhiteSpace .controls[0].allowEditDecimals = false;

        this.menuQuoteValues = createBoolMenu(this.paramQuoteValues);
        this.menuShowNames   = createBoolMenu(this.paramShowNames  );
        this.menuSingleLine  = createBoolMenu(this.paramSingleLine );
        this.menuWhiteSpace  = createBoolMenu(this.paramWhiteSpace );
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
        request.push(...this.node.paramShowNames  .genRequest(gen));
        request.push(...this.node.paramSingleLine .genRequest(gen));
        request.push(...this.node.paramWhiteSpace .genRequest(gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateParams()
    {
        this.paramQuoteValues.enableControlText(true);
        this.paramShowNames  .enableControlText(true);
        this.paramSingleLine .enableControlText(true);
        this.paramWhiteSpace .enableControlText(true);

        updateParamConditionText(this.paramQuoteValues, this.paramQuoteValues.isUnknown(), false, 1);
        updateParamConditionText(this.paramShowNames,   this.paramShowNames  .isUnknown(), false, 1);
        updateParamConditionText(this.paramSingleLine,  this.paramSingleLine .isUnknown(), false, 1);
        updateParamConditionText(this.paramWhiteSpace,  this.paramWhiteSpace .isUnknown(), false, 1);

        this.updateParamControls();
    }
}
