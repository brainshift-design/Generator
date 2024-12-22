class   OpFilter
extends OperatorBase
{
    static { Operator.types[FILTER] = this; }



    paramCondition;
    paramIndices;

    length;



    constructor()
    {
        super(FILTER, 'filter', 'filter', iconFilter);

        this.outputValueType   = LIST_VALUE;
        this.canDisable        = true;
        this.showHeaderTooltip = true;
        

        this.addInput (new Input (LIST_VALUES));
        this.addOutput(new Output([LIST_VALUE], this.output_genRequest));

        this.addParam(this.paramIndices   = new ListParam  ('indices',   'indices',   false, false, true));
        this.addParam(this.paramCondition = new NumberParam('condition', 'condition', false, true,  true, 0, 0));

        this.paramCondition.controls[0].allowEditDecimals = false;
        
        this.paramCondition.divider   = 0.59;
        this.paramCondition.valueText = 'condition';

        this.paramIndices.itemName    = [];
        this.paramIndices.outputTypes = [NUMBER_LIST_VALUE];
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

        request.push(...this.node.paramCondition.genRequest(gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        super.updateValues(requestId, actionId, updateParamId, paramIds, values);

        const type = values[paramIds.findIndex(id => id == 'type')];
        if (type) this.headerOutputs[0].types = [type.value];

        const length = values[paramIds.findIndex(id => id == 'length')];

        this.length = length.value;
    
        const sep = settings.showNodeId ? ' ' : '  ';

        this.paramIndices.setName('indices' + sep + '[ ' + this.length + ' ]');
    }



    updateParams()
    {
        this.paramCondition.enableControlText(false);
        
        this.updateParamControls();
        
        this.paramCondition.valueText = 'condition';
    }



    getHeaderColors(options = {})
    {
        const colors = super.getHeaderColors(options);

        colors.text = 
            isDark(colors.back) 
            ? [1, 1, 1, 1] 
            : [0, 0, 0, 1]; 

        return colors;
    }
}