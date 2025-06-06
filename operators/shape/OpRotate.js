class   OpRotate
extends OpAffine
{
    static { Operator.types[ROTATE] = this; }



    paramAngle;



    constructor()
    {
        super(ROTATE, 'rotate', 'rotate', iconRotate);

        this.iconOffsetY = -3;


        this.addParam(this.paramAngle = new NumberParam('angle', 'angle', true, true, true, 0));

        this.paramAngle.controls[0].suffix        = '°';
        this.paramAngle.controls[0].suffixOffsetY = degreeOffsetY;
        this.paramAngle.controls[0].dragReverse   = true;
        this.paramAngle.divider                   = 0.52;


        this.addBaseParamsAfter('rotate');
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
        request.push(...this.node.paramAffectSpace.genRequest(gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);


        return request;
    }
}