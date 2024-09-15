class   OpColorScheme
extends OperatorBase
{
    paramType;
    paramSpace;



    constructor()
    {
        super(COLOR_SCHEME, 'scheme', 'scheme', iconColorScheme);

        this.subscription = true;
        this.iconOffsetY  = -1;

        
        this.addInput (new Input ([COLOR_VALUE, FILL_VALUE, COLOR_STOP_VALUE]));
        this.addOutput(new Output([LIST_VALUE], this.output_genRequest));

        this.alwaysSaveParams = true;

        
        this.addParam(this.paramType  = new SelectParam('schemeType', '',      false, true, true, ['less similar', 'similar', 'similar with accent', 'opposite', 'opposite -', 'opposite +', 'opposite split', 'triangle', 'double opposite -', 'rectangle -', 'rectangle +', 'double opposite +', 'square', 'hexagon'], 0));
        this.addParam(this.paramSpace = new SelectParam('space',      'space', false, true, true, ['HSL', 'HCL / ok', 'HCL / ab', 'HCL / uv'], 0));
    }



    output_genRequest(gen)
    {
        // 'this' is the output

        gen.scope.push({
            nodeId:  this.node.id, 
            paramId: NULL });


        const [request, ignore] = this.node.genRequestStart(gen, 0);
        if (ignore) return request;


        const input = this.node.inputs[0];


        request.push(input.connected ? 1 : 0);

        if (input.connected)
            request.push(...pushInputOrParam(input, gen));


        request.push(...this.node.paramType .genRequest(gen));
        request.push(...this.node.paramSpace.genRequest(gen));


        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        const type  = values[paramIds.findIndex(id => id == 'type')];

        if (type) 
            this.headerOutputs[0].types = [type.value];

        super.updateValues(requestId, actionId, updateParamId, paramIds, values);
    }



    isConnected()
    {
        return this.inputs[0].connected;
    }
}