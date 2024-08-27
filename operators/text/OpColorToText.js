class   OpColorToText
extends OperatorBase
{
    paramFormat;



    constructor()
    {
        super(COLOR_TO_TEXT, 'colToText', 'color → text', iconColorToText);


        this.addInput (new Input([COLOR_VALUE, FILL_VALUE, LIST_VALUE]));
        this.addOutput(new Output([TEXT_VALUE], this.output_genRequest));

        this.addParam(this.paramFormat = new SelectParam('format', 'format', false, true,  true, ['Hex', 'RGB 0.0 – 1.0', 'RGB 0 – 255', 'CSS # hex', 'CSS rgb ()', 'CSS hsl ()', 'CSS oklch ()', 'CSS lch ()', 'CSS oklab()', 'CSS lab()', 'CSS color ()', 'name']));
        this.paramFormat.separatorsBefore.push(3, 6, 8, 10, 11);
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
}