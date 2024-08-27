class   OpSelectFromList
extends OperatorBase
{
    paramIndex;

    value;
    length;



    constructor()
    {
        super(SELECT_FROM_LIST, 'select', 'select', iconSelectFromList);

        this.alwaysSaveParams  = true;
        this.showHeaderTooltip = true;
        this.iconOffsetY       = -2.5;


        this.addInput (new Input (LIST_VALUES, getNodeInputValuesForUndo));
        this.addOutput(new Output([ANY_VALUE], this.output_genRequest));

        this.addParam(this.paramIndex = new NumberParam('index', 'index', true, true, true, 0));

        this.paramIndex.divider                       = 0.55;
        this.paramIndex.controls[0].allowEditDecimals = false;


        this.value  = new NullValue();
        this.length = 0;
    }



    output_genRequest(gen)
    {
        // 'this' is the output        

        return this.node.genRequest(gen);
    }



    genRequest(gen)
    {
        // 'this' is the node

        gen.scope.push({
            nodeId:  this.id, 
            paramId: NULL });


        const [request, ignore] = this.genRequestStart(gen);
        if (ignore) return request;


        const input = this.inputs[0];


        request.push(input.connected ? 1 : 0);

        if (input.connected) 
            request.push(...pushInputOrParam(input, gen));

        request.push(...this.paramIndex.genRequest(gen));

            
        gen.scope.pop();
        pushUnique(gen.passedNodes, this);

        return request;
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        super.updateValues(requestId, actionId, updateParamId, paramIds, values);

        const type  = values[paramIds.findIndex(id => id == 'type'  )];
        this.value  = values[paramIds.findIndex(id => id == 'value' )];
        this.length = values[paramIds.findIndex(id => id == 'length')].value;

        if (type)
            this.headerOutputs[0].types = [type.value];
    }



    updateParams()
    {
        this.paramIndex.enableControlText(true, this.paramIndex.isUnknown());


        const min = this.length > 0 ? Math.min(0, -this.length  ) : Number.MIN_SAFE_INTEGER;
        const max = this.length > 0 ? Math.max(0,  this.length-1) : Number.MAX_SAFE_INTEGER;

        this.paramIndex.controls[0].setMin(0,   min);
        this.paramIndex.controls[0].setMax(max, max);


        this.updateParamControls();
    }
}