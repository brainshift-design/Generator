class   OpScale
extends OpAffine
{
    paramScaleX;
    paramScaleY;



    constructor()
    {
        super(SCALE, 'scale', 'scale', iconScale);


        this.addParam(this.paramScaleX = new NumberParam('scaleX', 'width',  true, true, true, 100));
        this.addParam(this.paramScaleY = new NumberParam('scaleY', 'height', true, true, true, 100));


        this.paramScaleX.controls[0].suffix  = '%';
        this.paramScaleY.controls[0].suffix  = '%';

        this.paramScaleX.controls[0].divider = 0.55;
        this.paramScaleY.controls[0].divider = 0.55;

        this.paramScaleX.controls[0].setMin(0);
        this.paramScaleY.controls[0].setMin(0);


        this.addBaseParams();
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

        request.push(...this.node.paramScaleX     .genRequest(gen));
        request.push(...this.node.paramScaleY     .genRequest(gen));
        request.push(...this.node.paramCenterX    .genRequest(gen));
        request.push(...this.node.paramCenterY    .genRequest(gen));
        request.push(...this.node.paramShowCenter .genRequest(gen));
        request.push(...this.node.paramAffectSpace.genRequest(gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);


        return request;
    }



    updateParams()
    {
        super.updateParams();

        updateParamConditionText(this.paramShowCenter, false /*this.isUnknown()*/, 1);
        updateParamConditionText(this.paramAffectSpace, false /*this.isUnknown()*/, 1);

        this.updateParamControls();
    }
}
