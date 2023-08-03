class   OpSort
extends OperatorBase
{
    paramColumn;
    paramReverse;

    tableLength;

    menuBoolReverse;



    constructor()
    {
        super(SORT, 'sort', 'sort', iconSort);

        //this.iconOffsetY = 1;
        

        this.addInput (new Input (LIST_VALUES));
        this.addOutput(new Output([LIST_VALUE], this.output_genRequest));

        this.addParam(this.paramColumn  = new NumberParam('column',  'column',  true, true, true, 0, 0));
        this.addParam(this.paramReverse = new NumberParam('reverse', 'reverse', true, true, true, 0, 0, 1));

        this.paramColumn.controls[0].allowEditDecimals = false;
        
        this.paramColumn.divider  = 0.59;
        this.paramReverse.divider = 0.59;

        this.menuBoolReverse = createBoolMenu(this.paramReverse);
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

        request.push(...this.node.paramColumn .genRequest(gen));
        request.push(...this.node.paramReverse.genRequest(gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        super.updateValues(requestId, actionId, updateParamId, paramIds, values);


        //const column  = values[paramIds.findIndex(id => id == 'column')];

        const columns = values[paramIds.findIndex(id => id == 'columns')];
        const length  = values[paramIds.findIndex(id => id == 'length' )];

        this.tableLength = length.value;

        if (columns.value > 0)
            this.paramColumn.controls[0].setMax(columns.value-1);
        else
            this.paramColumn.controls[0].setMax();
    }



    updateParams()
    {
        this.paramColumn .enableControlText(true);
        this.paramReverse.enableControlText(true);

        updateParamConditionText(this.paramReverse, this.paramReverse.isUnknown(), false, 1);

        this.updateParamControls();
    }
}