class   OpListAsItem
extends OperatorBase
{
    constructor()
    {
        super(LIST_AS_ITEM, 'listAsItem', 'list as item', iconListAsItem);

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

        
        const type = this.outputs[0].types[0];


        // const back = rgb_a(rgbFromType(type, this.active), 0.95);

        // colors.back = back;


        colors.text   = isDark(colors.back) ? [1, 1, 1, 1] : [0, 0, 0, 1]; 

        const gray =
               this.active
            && this.outputs[0].types[0] == LIST_VALUE;

        colors.output  = gray ? rgb_a(colors.text, 0.35) : rgb_a(rgbSaturateHsv(rgbFromType(type, true), 0.5), 0.7);
        colors.outWire = rgbFromType(type, true);

        return colors;
    }
}