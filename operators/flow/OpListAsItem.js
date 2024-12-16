class   OpListAsItem
extends OperatorBase
{
    static { operatorTypes[LIST_AS_ITEM] = this; }



    constructor()
    {
        super(LIST_AS_ITEM, 'listAsItem', 'list as item', iconListAsItem);

        this.outputValueType  = LIST_VALUE;
        this.canDisable = true;
        

        this.addInput (new Input (LIST_VALUES));
        this.addOutput(new Output([LIST_VALUE], this.output_genRequest));
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

        const type = values[paramIds.findIndex(id => id == 'type')];
        consoleAssert(isListValueType(type.value));

        this.headerOutputs[0].types = [type.value];
    }






    getHeaderColors(options = {})
    {
        const colors = super.getHeaderColors(options);

        colors.text = isDark(colors.back) ? [1, 1, 1, 1] : [0, 0, 0, 1]; 

        return colors;
    }
}