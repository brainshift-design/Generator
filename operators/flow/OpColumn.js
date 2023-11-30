class   OpColumn
extends OperatorBase
{
    paramIndex;

    columnLength;



    constructor()
    {
        super(COLUMN, 'column', 'column', iconColumn);

        this.iconOffsetY       = 1;
        this.showHeaderTooltip = true;
        

        this.addInput (new Input (LIST_VALUES));
        this.addOutput(new Output([LIST_VALUE], this.output_genRequest));

        this.addParam(this.paramIndex = new NumberParam('index', 'index', true, true, true, 0, 0));

        this.paramIndex.divider                       = 0.54;
        this.paramIndex.controls[0].allowEditDecimals = false;
    }



    isOrPrecededByUncached()
    {
        return false;
    }



    isOrPrecededByMultiplier()
    {
        return false;
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

        request.push(...this.node.paramIndex.genRequest(gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        super.updateValues(requestId, actionId, updateParamId, paramIds, values);


        const type = values[paramIds.findIndex(id => id == 'type')];

        if (type)
            this.outputs[0].types = [type.value];

            
        const length  = values[paramIds.findIndex(id => id == 'length' )];
        const columns = values[paramIds.findIndex(id => id == 'columns')];


        this.columnLength = length ? length.value : 0;

        if (columns.value > 1)
            this.paramIndex.controls[0].setMax(columns.value-1, columns.value-1);
        else if (columns.value == 1)
            this.paramIndex.controls[0].setMax(0, 0);
        else
            this.paramIndex.controls[0].setMax();
    }



    updateParams()
    {
        this.paramIndex.enableControlText(true);

        this.updateParamControls();
    }
}