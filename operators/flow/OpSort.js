class   OpSort
extends OperatorBase
{
    paramCondition;
    paramReverse;


    menuBoolReverse;



    constructor()
    {
        super(SORT, 'sort', 'sort', iconSort);


        this.canDisable = true;
        this.showHeaderTooltip = true;
        

        this.addInput (new Input (LIST_VALUES));
        this.addOutput(new Output([LIST_VALUE], this.output_genRequest));

        this.addParam(this.paramCondition = new NumberParam('condition', 'condition', false, true, true, 0, 0));
        this.addParam(this.paramReverse   = new NumberParam('reverse',   'reverse',   true,  true, true, 0, 0, 1));

        this.paramCondition.controls[0].allowEditDecimals = false;
        
        this.paramCondition  .divider = 0.59;
        this.paramReverse.divider = 0.59;

        this.paramCondition.valueText = 'condition';

        this.menuBoolReverse = createBoolMenu(this.paramReverse);
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

        request.push(...this.node.paramCondition.genRequest(gen));
        request.push(...this.node.paramReverse  .genRequest(gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        super.updateValues(requestId, actionId, updateParamId, paramIds, values);

        const type = values[paramIds.findIndex(id => id == 'type')];
        if (type) this.headerOutputs[0].types = [type.value];
    }



    updateParams()
    {
        this.paramCondition  .enableControlText(false);
        this.paramReverse.enableControlText(true);

        updateParamConditionText(this.paramReverse, this.paramReverse.isUnknown(), false, 1);

        this.updateParamControls();

        this.paramCondition.valueText = 'condition';
    }



    getHeaderColors(options = {})
    {
        const colors = super.getHeaderColors(options);
        const type   = this.outputs[0].types[0];

        colors.text = isDark(colors.back) ? [1, 1, 1, 1] : [0, 0, 0, 1]; 

        const gray =
               this.active
            && this.outputs[0].types[0] == LIST_VALUE;

        colors.output  = gray ? rgb_a(colors.text, 0.35) : rgb_a(rgbSaturateHsv(rgbFromType(type, true), 0.5), 0.7);
        colors.outWire = rgbFromType(type, true);

        return colors;
    }
}