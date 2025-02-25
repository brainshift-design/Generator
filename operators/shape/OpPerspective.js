class OpPerspective
extends OperatorBase 
{
    static { Operator.types[PERSPECTIVE] = this; }



    paramZ;
    paramFov;
    paramRotateX;
    paramRotateY;
    paramRotateZ;
    paramOrder;



    constructor() 
    {
        super(PERSPECTIVE, 'perspective', 'perspective', iconPerspective);
    

        this.canDisable = true;
    

        this.addInput (new Input ([POINT3_VALUE, POINT_VALUE, VECTOR_VERTEX_VALUE]));
        this.addOutput(new Output([POINT3_VALUE], this.output_genRequest));
        
        
        this.addParam(this.paramFov     = new NumberParam('fov',     'field of view', true, true, true, 45));
        this.addParam(this.paramRotateX = new NumberParam('rotateX', '<span style="position: absolute; right: 18px; top: -3px; overflow: visible;">' + iconRotateX + '</span> X', true, true, true, 0));
        this.addParam(this.paramRotateY = new NumberParam('rotateY', '<span style="position: absolute; right: 13px; top:  3px; overflow: visible;">' + iconRotateY + '</span> Y', true, true, true, 0));
        this.addParam(this.paramRotateZ = new NumberParam('rotateZ', '<span style="position: absolute; right: 15px; top: -2px; overflow: visible;">' + iconRotateZ + '</span> Z', true, true, true, 0));
        this.addParam(this.paramOrder   = new OptionParam('order',   'order',         true, true, true, ['X, Y, Z', 'X, Z, Y', 'Y, X, Z', 'Y, Z, X', 'Z, X, Y', 'Z, Y, X'], 4));


        this.paramFov.controls[0].setMin(0, 0);
        this.paramFov.controls[0].setMax(180, 180);
        this.paramFov.controls[0].setSuffix('°');
        this.paramFov.controls[0].suffixOffsetY = degreeOffsetY;

        this.paramRotateX.controls[0].setMin(-180);
        this.paramRotateX.controls[0].setMax( 180);
        this.paramRotateX.controls[0].wrapValue = true;
        this.paramRotateX.controls[0].setSuffix('°');
        this.paramRotateX.controls[0].suffixOffsetY = degreeOffsetY;
        this.paramRotateX.divName.style.overflow = 'visible';
        this.paramRotateX.modifyName = (name) => name.replaceAll('white', darkMode ? '#fff4' : '#0006');
        
        this.paramRotateY.controls[0].setMin(-180);
        this.paramRotateY.controls[0].setMax( 180);
        this.paramRotateY.controls[0].wrapValue = true;
        this.paramRotateY.controls[0].setSuffix('°');
        this.paramRotateY.controls[0].suffixOffsetY = degreeOffsetY;
        this.paramRotateY.divName.style.overflow = 'visible';
        this.paramRotateY.modifyName = (name) => name.replaceAll('white', darkMode ? '#fff4' : '#0006');

        this.paramRotateZ.controls[0].setMin(-180);
        this.paramRotateZ.controls[0].setMax( 180);
        this.paramRotateZ.controls[0].wrapValue = true;
        this.paramRotateZ.controls[0].setSuffix('°');
        this.paramRotateZ.controls[0].suffixOffsetY = degreeOffsetY;
        this.paramRotateZ.divName.style.overflow = 'visible';
        this.paramRotateZ.modifyName = (name) => name.replaceAll('white', darkMode ? '#fff4' : '#0006');


        this.paramFov    .divider = 0.65;
        this.paramRotateX.divider = 0.52;
        this.paramRotateY.divider = 0.52;
        this.paramRotateZ.divider = 0.52;
        this.paramOrder  .divider = 0.45;
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
        
        request.push(...this.node.paramFov    .genRequest(gen));
        request.push(...this.node.paramRotateX.genRequest(gen));
        request.push(...this.node.paramRotateY.genRequest(gen));
        request.push(...this.node.paramRotateZ.genRequest(gen));
        request.push(...this.node.paramOrder  .genRequest(gen));


        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);


        return request;
    }
}