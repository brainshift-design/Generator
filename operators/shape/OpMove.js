class   OpMove
extends OperatorBase
{
    paramX;
    paramY;
    paramMoveType;
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
        this.addParam(this.paramMoveType    = new SelectParam('moveType',    'type',         true, true, true, ['position', 'vector'], 0));
        this.addParam(this.paramShowCenter  = new NumberParam('showCenter',  'show center',  true, true, true,   0, 0,   1));
        this.addParam(this.paramAffectSpace = new NumberParam('affectSpace', 'affect space', true, true, true, 1, 0, 1));


        this.paramShowCenter.controls[0].allowEditDecimals = false;
        this.paramShowCenter.divider = 0.72;

        this.paramAffectSpace.controls[0].allowEditDecimals = false;
        this.paramAffectSpace.divider                       = 0.72;

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
        request.push(...this.node.paramMoveType   .genRequest(gen));
        request.push(...this.node.paramShowCenter .genRequest(gen));
        request.push(...this.node.paramAffectSpace.genRequest(gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);


        return request;
    }



    updateParams()
    {
        super.updateParams();

        updateParamConditionText(this.paramShowCenter,  this.paramShowCenter .isUnknown(), false, 1);
        updateParamConditionText(this.paramAffectSpace, this.paramAffectSpace.isUnknown(), true, 1);


        const vector = this.paramMoveType.value.value == 1;
       
        this.paramX.setName(vector ? 'distance' : 'X');
        this.paramX.divider = vector ? 0.55 : 0.45;

        this.paramY.setName(vector ? 'angle' : 'Y');
        this.paramY.divider = vector ? 0.55 : 0.45;

        this.paramY.controls[0].suffix    = vector ? '°' : '';
        this.paramY.controls[0].wrapValue = vector;

        this.paramY.controls[0].setMin(vector ?   0 : Number.MIN_SAFE_INTEGER);
        this.paramY.controls[0].setMax(vector ? 360 : Number.MAX_SAFE_INTEGER);


        this.updateParamControls();
    }
}
