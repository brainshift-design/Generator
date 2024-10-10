class   OpColorToText
extends OperatorBase
{
    paramFormat;
    paramTrim;


    menuTrim;



    constructor()
    {
        super(COLOR_TO_TEXT, 'colToText', 'color → text', iconColorToText);

        this.outputValueType = COLOR_VALUE;


        this.addInput (new Input([COLOR_VALUE, FILL_VALUE, COLOR_LIST_VALUE, FILL_LIST_VALUE, LIST_VALUE]));
        this.addOutput(new Output([TEXT_VALUE], this.output_genRequest));

        this.addParam(this.paramFormat = new SelectParam('format', 'format', false, true,  true, ['Hex', 'RGB 0 – 1', 'RGB 0 – 255', 'CSS # hex', 'CSS rgb ()', 'CSS hsl ()', 'CSS oklch ()', 'CSS lch ()', 'CSS oklab()', 'CSS lab()', 'CSS color ()', 'HTML name', 'structured name']));
        this.addParam(this.paramTrim   = new NumberParam('trim',   'trim zeroes',   true,  true, true, 0, 0, 1));

        this.paramFormat.separatorsBefore.push(3, 6, 8, 10, 11);

        this.paramTrim.divider = 0.66;

        this.menutrim = createBoolMenu(this.paramTrim);
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
        request.push(...this.node.paramTrim  .genRequest(gen));

        
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



    updateParams()
    {
        this.paramFormat.enableControlText(true, this.paramFormat.isUnknown());
        this.paramTrim  .enableControlText(true);

        updateParamConditionText(this.paramTrim, this.paramTrim.isUnknown(), false, 1);

        this.updateParamControls();
    }
}