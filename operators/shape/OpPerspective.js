class OpPerspective
extends OperatorBase 
{
    static { Operator.types[PERSPECTIVE] = this; }



    paramZ;
    paramYaw;
    paramPitch;
    paramRoll;
    paramOrder;
    paramDistance;
    paramZoom;



    constructor() 
    {
        super(PERSPECTIVE, 'perspective', 'perspective', iconPerspective);
    

        this.canDisable = true;
    

        this.addInput (new Input ([...SHAPE_VALUES, NUMBER_VALUE]));
        this.addOutput(new Output([SHAPE_VALUE], this.output_genRequest));
        
        this.addParam(this.paramZ        = new NumberParam('z',        'Z',        true,  true, true, 0));
        this.addParam(this.paramYaw      = new NumberParam('yaw',      'yaw',      true,  true, true, 0));
        this.addParam(this.paramPitch    = new NumberParam('pitch',    'pitch',    true,  true, true, 0));
        this.addParam(this.paramRoll     = new NumberParam('roll',     'roll',     true,  true, true, 0));
        this.addParam(this.paramOrder    = new OptionParam('order',    '',         false, true, true, ['Y, P, R', 'Y, R, P', 'P, Y, R', 'P, R, Y', 'R, P, Y', 'R, Y, P'], 5));
        this.addParam(this.paramDistance = new NumberParam('distance', 'distance', true,  true, true, 400));
        this.addParam(this.paramZoom     = new NumberParam('zoom',     'zoom',     true,  true, true, 1));


        this.paramYaw.controls[0].setMin(0);
        this.paramYaw.controls[0].setMax(360);
        this.paramYaw.controls[0].wrapValue = true;
        this.paramYaw.controls[0].setSuffix('°');

        this.paramPitch.controls[0].setMin(0);
        this.paramPitch.controls[0].setMax(360);
        this.paramPitch.controls[0].wrapValue = true;
        this.paramPitch.controls[0].setSuffix('°');

        this.paramRoll.controls[0].setMin(0);
        this.paramRoll.controls[0].setMax(360);
        this.paramRoll.controls[0].wrapValue = true;
        this.paramRoll.controls[0].setSuffix('°');

        this.paramZoom.controls[0].setDecimals(1);


        this.setAllParamDividers(0.52);
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
        
        request.push(...this.node.paramZ       .genRequest(gen));
        request.push(...this.node.paramYaw     .genRequest(gen));
        request.push(...this.node.paramPitch   .genRequest(gen));
        request.push(...this.node.paramRoll    .genRequest(gen));
        request.push(...this.node.paramOrder   .genRequest(gen));
        request.push(...this.node.paramDistance.genRequest(gen));
        request.push(...this.node.paramZoom    .genRequest(gen));



        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);


        return request;
    }
}