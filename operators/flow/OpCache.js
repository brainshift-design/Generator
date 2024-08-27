class   OpCache
extends OperatorBase
{
    constructor()
    {
        super(CACHE, 'cache', 'cache', iconCache);

        this.valueType   = ANY_VALUE;
        this.canDisable  = true;
        this.iconOffsetY = 2;


        this.addInput (new Input([ANY_VALUE]));
        this.addOutput(new Output([ANY_VALUE], this.output_genRequest));


        this.inputs[0].addEventListener('connect',    () => OpCache_onConnectInput(this));
        this.inputs[0].addEventListener('disconnect', () => OpCache_onDisconnectInput(this));
    }



    canAutoConnectFrom(output)
    {
        return true;
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

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        super.updateValues(requestId, actionId, updateParamId, paramIds, values);
        
        const type = values[paramIds.findIndex(id => id == 'type')];

        if (type)
            this.headerOutputs[0].types = [type.value];
    }



    getHeaderColors(options = {})
    {
        const colors = super.getHeaderColors(options);

        colors.text = isDark(colors.back) ? [1, 1, 1, 1] : [0, 0, 0, 1]; 

        return colors;
    }
}



function OpCache_onConnectInput(node)
{
    node.outputs[0].types = [...node.inputs[0].connectedOutput.types];
}



function OpCache_onDisconnectInput(node)
{
    node.outputs[0].types = [ANY_VALUE];
}