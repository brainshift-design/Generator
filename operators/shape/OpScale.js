class   OpScale
extends OpAffine
{
    paramScaleX;
    paramScaleY;

    paramAffectCorners;
    paramAffectStyle;

    menuBoolAffectCorners;
    menuBoolAffectStyle;



    constructor()
    {
        super(SCALE, 'scale', 'scale', iconScale);


        this.addParam(this.paramScaleX = new NumberParam('scaleX', 'width',  true, true, true, 100));
        this.addParam(this.paramScaleY = new NumberParam('scaleY', 'height', true, true, true, 100));


        this.paramScaleX.controls[0].suffix = '%';
        this.paramScaleY.controls[0].suffix = '%';

        this.paramScaleX.divider            = 0.55;
        this.paramScaleY.divider            = 0.55;

        this.paramScaleX.controls[0].setMin(0);
        this.paramScaleY.controls[0].setMin(0);


        this.addBaseParams();

    
        this.addParam(this.paramAffectCorners = new NumberParam('affectCorners', 'affect corners', true, true, true, 1, 0, 1));
        this.addParam(this.paramAffectStyle   = new NumberParam('affectStyle',   'affect style',   true, true, true, 1, 0, 1));

        this.paramAffectCorners.divider = 0.72;
        this.paramAffectStyle  .divider = 0.72;
    
        this.menuBoolAffectCorners = createBoolMenu(this.paramAffectCorners);
        this.menuBoolAffectStyle   = createBoolMenu(this.paramAffectStyle  );
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

        request.push(...this.node.paramScaleX       .genRequest(gen));
        request.push(...this.node.paramScaleY       .genRequest(gen));
        request.push(...this.node.paramCenterX      .genRequest(gen));
        request.push(...this.node.paramCenterY      .genRequest(gen));
        request.push(...this.node.paramShowCenter   .genRequest(gen));
        request.push(...this.node.paramAffectSpace  .genRequest(gen));
        request.push(...this.node.paramAffectCorners.genRequest(gen));
        request.push(...this.node.paramAffectStyle  .genRequest(gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);


        return request;
    }



    updateParams()
    {
        super.updateParams();

        updateParamConditionText(this.paramShowCenter,    this.isUnknown(), false, 1);
        updateParamConditionText(this.paramAffectSpace,   this.isUnknown(), true,  1);
        updateParamConditionText(this.paramAffectCorners, this.isUnknown(), false, 1);
        updateParamConditionText(this.paramAffectStyle,   this.isUnknown(), false, 1);

        this.updateParamControls();
    }
}
