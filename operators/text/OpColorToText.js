class   OpColorToText
extends OperatorBase
{
    paramFormat;



    constructor()
    {
        super(COLOR_TO_TEXT, 'colToText', 'color → text', iconColorToText);


        this.addInput (new Input([COLOR_VALUE, LIST_VALUE]));
        this.addOutput(new Output([TEXT_VALUE], this.output_genRequest));

        this.addParam(this.paramFormat = new SelectParam('format', 'format', false, true,  true, ['Hex', 'RGB 0.0 – 1.0', 'RGB 0 – 255', 'CSS # hex', 'CSS rgb ()', 'CSS hsl ()', 'CSS lab()', 'CSS lch ()', 'CSS oklab()', 'CSS oklch ()', 'CSS color ()', 'name']));
        this.paramFormat.separatorsBefore.push(1, 3, 6, 10, 11);

        /*
        CSS hex
        CSS rgb
        CSS hsl
        CSS color()
        */
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

        request.push(...this.node.paramFormat.genRequest(gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        const type = values[paramIds.findIndex(id => id == 'type' )];

        if (type) 
            this.headerOutputs[0].types = [type.value];

            
        if (this.hasConditionOutputs())
            this.headerInputs[0].types = [ANY_VALUE];


        super.updateValues(requestId, actionId, updateParamId, paramIds, values);
    }

    

    getHeaderColors(options = {})
    {
        const colors = super.getHeaderColors(options);
        const type   = this.outputs[0].types[0];

        colors.output  = rgb_a(rgbSaturateHsv(rgbFromType(type, true), 0.5), 0.7);
        colors.outWire = rgbFromType(type, true);

        return colors;
    }
}