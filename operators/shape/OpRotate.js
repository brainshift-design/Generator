class   OpRotate
extends OpAffine
{
    paramAngle;



    constructor()
    {
        super(ROTATE, 'rotate', 'rotate', iconRotate);


        this.addParam(this.paramAngle = new NumberParam('angle', 'angle', true, true, true, 0));

        this.paramAngle.controls[0].suffix      = '°';
        this.paramAngle.controls[0].dragReverse = true;


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

        request.push(...this.node.paramAngle      .genRequest(gen));
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

        updateParamConditionText(this.paramShowCenter,  false /*this.isUnknown()*/, 1);
        updateParamConditionText(this.paramAffectSpace, false /*this.isUnknown()*/, 1);

        this.updateParamControls();
    }
}