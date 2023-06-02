class   OpMove
extends OperatorBase
{
    paramX;
    paramY;
    paramAffectSpace;


    menuBoolAffectSpace;



    constructor()
    {
        super(MOVE, 'move', 'move', iconMove);

        this.canDisable  = true;
        this.iconOffsetY = -2;

        
        this.addInput (new Input (SHAPE_VALUES));
        this.addOutput(new Output([SHAPE_VALUE], this.output_genRequest));


        this.addParam(this.paramX           = new NumberParam('x',           'X',            true, true, true));
        this.addParam(this.paramY           = new NumberParam('y',           'Y',            true, true, true));
        this.addParam(this.paramAffectSpace = new NumberParam('affectSpace', 'affect space', true, true, true,   0, 0,   1));


        this.paramX.controls[0].divider = 0.45;
        this.paramY.controls[0].divider = 0.45;

        this.paramAffectSpace.controls[0].allowEditDecimals = false;
        this.paramAffectSpace.controls[0].divider           = 0.72;

        this.menuBoolAffectSpace = createBoolMenu(this.paramAffectSpace);


        this.inputs[0].addEventListener('connect',    e => this.outputs[0].types = [...this.inputs[0].connectedOutput.types]);
        this.inputs[0].addEventListener('disconnect', e => this.outputs[0].types = [SHAPE_VALUE]);
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

        request.push(...this.node.paramX          .genRequest(gen));
        request.push(...this.node.paramY          .genRequest(gen));
        request.push(...this.node.paramAffectSpace.genRequest(gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);


        return request;
    }



    updateParams()
    {
        super.updateParams();

        updateParamConditionText(this.paramAffectSpace, false /*this.isUnknown()*/, 1);

        this.updateParamControls();
    }
}
