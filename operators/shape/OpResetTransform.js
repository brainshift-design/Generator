class   OpResetTransform
extends OperatorBase
{
    paramShowCenter;


    menuBoolShowCenter;



    constructor()
    {
        super(RESET_XFORM, 'reset', 'reset transform', iconResetXform);

        this.canDisable  = true;
        this.iconOffsetY = -2;


        this.addInput (new Input([...SHAPE_VALUES, LIST_VALUE]));
        this.addOutput(new Output([SHAPE_VALUE], this.output_genRequest));

        this.addParam(this.paramShowCenter = new NumberParam('showCenter', 'show center', true, true, true, 0, 0, 1));


        this.paramShowCenter.controls[0].allowEditDecimals = false;
        this.paramShowCenter.divider = 0.68;

        this.menuBoolShowCenter = createBoolMenu(this.paramShowCenter);
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

        request.push(...this.node.paramShowCenter.genRequest(gen));

        
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
        updateParamConditionText(this.paramShowCenter,  this.paramShowCenter.isUnknown(), false, 1);

        this.updateParamControls();
    }
}