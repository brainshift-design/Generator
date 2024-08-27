class   OpSetObjectName
extends OperatorBase
{
    paramName;
    // paramLogo;



    constructor()
    {
        super(SET_OBJECT_NAME, 'setObjectName', 'set object name', iconSetObjectName);


        this.subscription = true;
        this.canDisable   = true;


        this.addInput (new Input(SHAPE_VALUES));
        this.addOutput(new Output([ANY_VALUE], this.output_genRequest));

        // this.addParam(this.paramLogo = new NumberParam('addLogo', 'prefix&nbsp;&nbsp;' + PLUGIN_LOGO + '&nbsp;', true,  true, true, 1, 0, 1));
        this.addParam(this.paramName = new   TextParam('name',    'name',  false, true, true));

        //this.paramLogo.divider = 0.67;
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

        request.push(...this.node.paramName.genRequest(gen));
        // request.push(...this.node.paramLogo.genRequest(gen));

        
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



    // updateParams()
    // {
    //     this.paramName.enableControlText(true, this.paramName.isUnknown());
    //     // this.paramLogo.enableControlText(true);

    //     // updateParamConditionText(this.paramLogo, this.paramLogo.isUnknown(), false, 1);

    //     this.updateParamControls();
    // }
}
