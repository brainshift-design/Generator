class   OpMove
extends OperatorBase
{
    paramX;
    paramY;
    paramMoveType;
    paramAffectSpace;
    paramShowCenter;


    menuBoolAffectSpace;
    menuBoolShowCenter;



    constructor()
    {
        super(MOVE, 'move', 'move', iconMove);

        this.canDisable  = true;
        this.iconOffsetY = -2;

        
        this.addInput (new Input ([...SHAPE_VALUES, SHAPE_LIST_VALUE, LIST_VALUE]));
        this.addOutput(new Output([SHAPE_VALUE], this.output_genRequest));


        this.addParam(this.paramMoveType    = new SelectParam('moveType',    'type',        false, true, true, ['position', 'vector'], 0));
        this.addParam(this.paramX           = new NumberParam('x',           'X',           true,  true, true));
        this.addParam(this.paramY           = new NumberParam('y',           'Y',           true,  true, true));
        this.addParam(this.paramAffectSpace = new NumberParam('affectSpace', 'move space',  true,  true, true, 1, 0, 1));
        this.addParam(this.paramShowCenter  = new NumberParam('showCenter',  'show center', true,  true, true, 0, 0, 1));


        this.paramShowCenter .controls[0].allowEditDecimals = false;
        this.paramAffectSpace.controls[0].allowEditDecimals = false;
        
        this.paramMoveType   .divider = 0.4;
        this.paramShowCenter .divider = 0.68;
        this.paramAffectSpace.divider = 0.68;


        this.menuBoolShowCenter  = createBoolMenu(this.paramShowCenter );
        this.menuBoolAffectSpace = createBoolMenu(this.paramAffectSpace);
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

        request.push(...this.node.paramMoveType   .genRequest(gen));
        request.push(...this.node.paramX          .genRequest(gen));
        request.push(...this.node.paramY          .genRequest(gen));
        request.push(...this.node.paramAffectSpace.genRequest(gen));
        request.push(...this.node.paramShowCenter .genRequest(gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);


        return request;
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        super.updateValues(requestId, actionId, updateParamId, paramIds, values);

        const type  = values[paramIds.findIndex(id => id == 'type')];
        if (type) this.headerOutputs[0].types = [type.value];
    }



    updateParams()
    {
        super.updateParams();

        updateParamConditionText(this.paramShowCenter,  this.paramShowCenter .isUnknown(), false, 1);
        updateParamConditionText(this.paramAffectSpace, this.paramAffectSpace.isUnknown(), true,  1);


        const vector = this.paramMoveType.value.value == 1;
       
        this.paramX.setName(vector ? 'distance' : 'X');
        this.paramX.divider = vector ? 0.55 : 0.45;

        this.paramY.setName(vector ? 'angle' : 'Y');
        this.paramY.divider = vector ? 0.55 : 0.45;

        this.paramY.controls[0].suffix        = vector ? '°' : '';
        this.paramY.controls[0].suffixOffsetY = vector ? -4  : 0;
        this.paramY.controls[0].wrapValue     = vector;

        this.paramY.controls[0].setMin(vector ?   0 : Number.MIN_SAFE_INTEGER);
        this.paramY.controls[0].setMax(vector ? 360 : Number.MAX_SAFE_INTEGER);


        this.updateParamControls();
    }
}
