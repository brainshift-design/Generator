class OpPerspective
extends OperatorBase 
{
    static { Operator.types[PERSPECTIVE] = this; }



    paramFov;
    paramX;
    paramY;
    paramZ;
    paramOrder;



    constructor() 
    {
        super(PERSPECTIVE, 'perspective', 'perspective', iconPerspective);
    

        this.canDisable = true;
        this.beta       = true;
    

        this.addInput (new Input ([...SHAPE_VALUES, NUMBER_VALUE]));
        this.addOutput(new Output([SHAPE_VALUE], this.output_genRequest));
        
        this.addParam(this.paramFov   = new NumberParam('fov',   'field of view',    true, true, true, 45));
        this.addParam(this.paramX     = new NumberParam('x',     '<span style="position: absolute; right: 18px; top: -3px; overflow: visible;">' + iconRotateX + '</span> X', true, true, true, 0));
        this.addParam(this.paramY     = new NumberParam('y',     '<span style="position: absolute; right: 13px; top:  3px; overflow: visible;">' + iconRotateY + '</span> Y', true, true, true, 0));
        this.addParam(this.paramZ     = new NumberParam('z',     '<span style="position: absolute; right: 15px; top: -3px; overflow: visible;">' + iconRotateZ + '</span> Z', true, true, true, 0));
        this.addParam(this.paramOrder = new OptionParam('order', 'order',            true, true, true, ['X, Y, Z', 'X, Z, Y', 'Y, X, Z', 'Y, Z, X', 'Z, X, Y', 'Z, Y, X'], 4));


        this.paramFov.controls[0].setMin(0, 0);
        this.paramFov.controls[0].setMax(180, 180);
        this.paramFov.controls[0].setSuffix('°');

        this.paramX.controls[0].setMin(0);
        this.paramX.controls[0].setMax(360);
        this.paramX.controls[0].wrapValue = true;
        this.paramX.controls[0].setSuffix('°');
        this.paramX.divName.style.overflow = 'visible';
        
        this.paramY.controls[0].setMin(0);
        this.paramY.controls[0].setMax(360);
        this.paramY.controls[0].wrapValue = true;
        this.paramY.controls[0].setSuffix('°');
        this.paramY.divName.style.overflow = 'visible';

        this.paramZ.controls[0].setMin(0);
        this.paramZ.controls[0].setMax(360);
        this.paramZ.controls[0].wrapValue = true;
        this.paramZ.controls[0].setSuffix('°');
        this.paramZ.divName.style.overflow = 'visible';


        this.paramFov  .divider = 0.65;
        this.paramX    .divider = 0.55;
        this.paramY    .divider = 0.55;
        this.paramZ    .divider = 0.55;
        this.paramOrder.divider = 0.45;
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
        
        request.push(...this.node.paramFov  .genRequest(gen));
        request.push(...this.node.paramX    .genRequest(gen));
        request.push(...this.node.paramY    .genRequest(gen));
        request.push(...this.node.paramZ    .genRequest(gen));
        request.push(...this.node.paramOrder.genRequest(gen));



        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);


        return request;
    }
}