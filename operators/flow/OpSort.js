class   OpSort
extends OperatorBase
{
    paramIndices;
    paramCondition;
    paramReverse;

    length;


    menuBoolReverse;



    constructor()
    {
        super(SORT, 'sort', 'sort', iconSort);

        this.outputValueType   = LIST_VALUE;
        this.canDisable        = true;
        this.showHeaderTooltip = true;
        

        this.addInput (new Input (LIST_VALUES));
        this.addOutput(new Output([LIST_VALUE], this.output_genRequest));

        this.addParam(this.paramIndices   = new   ListParam('indices',   'indices',   false, false, true));
        this.addParam(this.paramCondition = new NumberParam('condition', 'condition', false, true,  true, 0, 0));
        this.addParam(this.paramReverse   = new NumberParam('reverse',   'reverse',   true,  true,  true, 0, 0, 1));

        this.paramCondition.controls[0].allowEditDecimals = false;
        
        this.paramCondition.divider = 0.59;
        this.paramReverse  .divider = 0.59;

        this.paramCondition.valueText = 'condition';
        //this.paramCondition.input.types.unshift(ANY_VALUE);
        //this.paramCondition.forceInputColorType = NUMBER_VALUE;

        this.menuBoolReverse = createBoolMenu(this.paramReverse);

        this.paramIndices.itemName    = [];
        this.paramIndices.outputTypes = [NUMBER_LIST_VALUE];
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

        request.push(this.node.paramCondition.input.connected ? 1 : 0);

        if (this.node.paramCondition.input.connected)
            request.push(...this.node.paramCondition.genRequest(gen));

        request.push(...this.node.paramReverse.genRequest(gen));

        
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
        
        this.paramIndices.setName('indices' + sep + '[ ' + this.length + ' ]');


        const type = values[paramIds.findIndex(id => id == 'type')];
        
        if (type) 
            this.headerOutputs[0].types = [type.value];
    }



    updateParams()
    {
        this.paramIndices  .enableControlText(false, this.isUnknown());
        this.paramCondition.enableControlText(false);
        this.paramReverse  .enableControlText(true);

        updateParamConditionText(this.paramReverse, this.paramReverse.isUnknown(), false, 1);

        this.updateParamControls();

        this.paramCondition.valueText = 'condition';
    }

}