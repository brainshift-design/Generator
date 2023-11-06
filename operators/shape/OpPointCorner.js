class   OpPointCorner
extends OperatorBase
{
    paramSmooth;


    menuBool;



    constructor()
    {
        super(POINT_CORNER, 'corner', 'corner', iconPointCorner);

        this.canDisable  = true;
        this.iconOffsetY = -2;


        this.addInput (new Input ([POINT_VALUE]));
        this.addOutput(new Output([POINT_VALUE], this.output_genRequest));

        this.addParam(this.paramSmooth = new NumberParam('smooth', 'smooth', true, true, true, 1, 0, 1));

        this.setAllParamDividers(0.595);

        this.menuBool = createBoolMenu(this.paramSmooth);
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

        request.push(...this.node.paramSmooth.genRequest(gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);


        return request;
    }



    updateParams()
    {
        this.paramSmooth.enableControlText(true);

        updateParamConditionText(this.paramSmooth, this.paramSmooth.isUnknown(), true, 1);


        this.updateParamControls();
    }
}