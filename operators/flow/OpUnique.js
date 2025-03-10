class   OpUnique
extends OperatorBase
{
    static { Operator.types[UNIQUE] = this; }



    paramCounts;
    paramIndices;

    length;



    constructor()
    {
        super(UNIQUE, 'unique', 'unique', iconUnique);

        this.outputValueType   = LIST_VALUE;        
        this.canDisable        = true;
        this.showHeaderTooltip = true;
        

        this.addInput (new Input (LIST_VALUES));
        this.addOutput(new Output([LIST_VALUE], this.output_genRequest));

        this.addParam(this.paramCounts  = new ListParam('counts',  'counts',  false, false, true));
        this.addParam(this.paramIndices = new ListParam('indices', 'indices', false, false, true));

        this.paramCounts .itemName  = [];
        this.paramIndices.itemName  = [];

        this.paramCounts.outputTypes = [NUMBER_LIST_VALUE];
    }



    // isOrPrecededByUncached()
    // {
    //     return false;
    // }



    // isOrPrecededByMultiplier()
    // {
    //     return false;
    // }



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

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        super.updateValues(requestId, actionId, updateParamId, paramIds, values);


        const length = values[paramIds.findIndex(id => id == 'length')];

        this.length = length.value;


        const sep = settings.showNodeId ? ' ' : '  ';

        this.paramCounts .setName('counts'  + sep + '[ ' + this.length + ' ]');
        this.paramIndices.setName('indices' + sep + '[ ' + this.length + ' ]');


        const type = values[paramIds.findIndex(id => id == 'type')];
        
        if (type) 
            this.headerOutputs[0].types = [type.value];
    }



    updateParams()
    {
        this.paramCounts .enableControlText(false, this.isUnknown());
        this.paramIndices.enableControlText(false, this.isUnknown());

        this.updateParamControls();
    }
}