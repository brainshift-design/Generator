class   OpCharacterToCode
extends OperatorBase
{
    constructor()
    {
        super(TEXT_UNICODE, 'charToCode', 'to code', iconCharacterToCode);

        this.iconOffsetY = 1;

        this.addInput (new Input([TEXT_VALUE, TEXT_LIST_VALUE, LIST_VALUE]));
        this.addOutput(new Output([TEXT_VALUE], this.output_genRequest));
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
        const type = values[paramIds.findIndex(id => id == 'type')];

        if (type) 
            this.outputs[0].types = [type.value];
        
        super.updateValues(requestId, actionId, updateParamId, paramIds, values);
    }

    

    getHeaderColors(options = {})
    {
        const colors  = super.getHeaderColors(options);
        const type    = this.outputs[0].types[0];

        colors.output = rgb_a(rgbSaturateHsv(rgbFromType(type, true), 0.5), 0.7);
        colors.wire   = rgbFromType(type, true);

        return colors;
    }}