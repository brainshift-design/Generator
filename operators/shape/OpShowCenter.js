class   OpShowCenter
extends OperatorBase
{
    paramShow;

    menuShow;



    constructor()
    {
        super(SHOW_CENTER, 'showCenter', 'show center', iconShowCenter);

        this.canDisable  = true;
        this.iconOffsetY = -2;


        this.addInput (new Input([...SHAPE_VALUES, LIST_VALUE]));
        this.addOutput(new Output([SHAPE_VALUE], this.output_genRequest));

        this.addParam(this.paramShow = new NumberParam('show', '', false, true, true, 1, 0, 1));


        //this.paramShow.divider = 0.62;

        this.menuShow = createBoolMenu(this.paramShow);
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

        request.push(...this.node.paramShow.genRequest(gen));

        
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



    updateParams()
    {
        this.paramShow.enableControlText(true);

        updateParamConditionText(this.paramShow, this.paramShow.isUnknown(), false, 1);

        this.updateParamControls();
    }
}