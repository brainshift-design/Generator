class   OpAddText
extends OperatorBase
{
    paramText;
    paramPrefix;

    menuPrefix;



    constructor()
    {
        super(TEXT_ADD, 'addText', 'add text', iconAddText);

        this.iconOffsetY      = -1;
        this.alwaysLoadParams = true;
        this.canDisable       = true;
        

        this.addInput (new Input ([...NUMBER_TYPES, ...TEXT_TYPES]));
        this.addOutput(new Output([NUMBER_VALUE], this.output_genRequest));

        this.addParam(this.paramText   = new   TextParam('text',   'text',   false, true, true));
        this.addParam(this.paramPrefix = new NumberParam('prefix', 'prefix', true,  true, true, 0, 0, 1));


        this.paramPrefix.divider = 0.55;

        this.menuPrefix = createBoolMenu(this.paramPrefix);


        this.promptName = 'add text';
        
        this.getDescription = () => `adds text to the input`;

        this.paramText  .getDescription = () => `text value to add`;
        this.paramPrefix.getDescription = () => `prefixes the added text`;
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

        
        request.push(...this.node.paramText  .genRequest(gen));
        request.push(...this.node.paramPrefix.genRequest(gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        const type = values[paramIds.findIndex(id => id == 'type')];

        if (type)
            this.headerOutputs[0].types = [type.value];

        super.updateValues(requestId, actionId, updateParamId, paramIds, values);
    }



    updateParams()
    {
        this.paramText  .enableControlText(true, this.paramText  .isUnknown());
        this.paramPrefix.enableControlText(true);

        updateParamConditionText(this.paramPrefix, this.paramPrefix.isUnknown(), false, 1);

        this.updateParamControls();
    }
}