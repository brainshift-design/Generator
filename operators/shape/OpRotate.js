class   OpRotate
extends OpAffine
{
    paramAngle;



    constructor()
    {
        super(ROTATE, 'rotate', 'rotate', iconRotate);

        this.iconOffsetY = -3;


        this.addParam(this.paramAngle = new NumberParam('angle', 'angle', true, true, true, 0));

        this.paramAngle.controls[0].suffix        = '°';
        this.paramAngle.controls[0].suffixOffsetY = -4;
        this.paramAngle.controls[0].dragReverse   = true;
        this.paramAngle.divider                   = 0.55;


        this.addBaseParams('rotate');
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

        request.push(...this.node.paramAngle      .genRequest(gen));
        request.push(...this.node.paramShowCenter .genRequest(gen));
        request.push(...this.node.paramAffectSpace.genRequest(gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);


        return request;
    }



    updateParams()
    {
        super.updateParams();

        updateParamConditionText(this.paramAffectSpace, this.paramAffectSpace.isUnknown(), true,  1);
        updateParamConditionText(this.paramShowCenter,  this.paramShowCenter .isUnknown(), false, 1);

        this.updateParamControls();
    }
}