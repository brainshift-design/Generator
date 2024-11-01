class   OpTrig
extends OperatorBase
{
    paramFunction;



    constructor()
    {
        super(NUMBER_TRIG, 'trig', 'trigonometric', iconSine);

        this.canDisable       = true;
        this.alwaysLoadParams = true;

        
        this.addInput(new Input([NUMBER_VALUE, NUMBER_LIST_VALUE, TEXT_VALUE, TEXT_LIST_VALUE, LIST_VALUE]));
        this.addOutput(new Output([NUMBER_VALUE], this.output_genRequest));

        this.addParam(this.paramFunction = new OptionParam('function', '', false, true, true, TRIG_OPS.map(s => s[1]), 0));
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


        request.push(...this.node.paramFunction.genRequest(gen));


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
        this.paramFunction.enableControlText(true, this.paramFunction.isUnknown());


        switch (this.paramFunction.value.value)
        {
            case 0: this.icon = iconSine;       break;
            case 1: this.icon = iconCosine;     break;
            case 2: this.icon = iconTangent;    break;
            case 3: this.icon = iconArcSine;    break;
            case 4: this.icon = iconArcCosine;  break;
            case 5: this.icon = iconArcTangent; break;
        }

        this.updateIcon();


        this.updateParamControls();
    }
}