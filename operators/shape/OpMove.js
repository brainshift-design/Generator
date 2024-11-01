class   OpMove
extends OperatorBase
{
    paramMoveType;
    paramX;
    paramY;
    paramAffectSpace;



    constructor()
    {
        super(MOVE, 'move', 'move', iconMove);

        this.canDisable  = true;
        this.iconOffsetY = -2;

        
        this.addInput (new Input ([...SHAPE_VALUES, SHAPE_LIST_VALUE, LIST_VALUE]));
        this.addOutput(new Output([SHAPE_VALUE], this.output_genRequest));


        this.addParam(this.paramMoveType    = new OptionParam('moveType',    'type',        false, true, true, ['position', 'vector'], 0));
        this.addParam(this.paramX           = new NumberParam('x',           'X',           true,  true, true));
        this.addParam(this.paramY           = new NumberParam('y',           'Y',           true,  true, true));
        this.addParam(this.paramAffectSpace = new OptionParam('affectSpace', 'move space',  false, true, true, ['space', 'object', 'object & space'], 1));


        this.paramAffectSpace.controls[0].allowEditDecimals = false;
        this.paramAffectSpace.reverseMenu = true;
       
        this.paramMoveType.divider = 0.4;
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


        const isVector = this.paramMoveType.value.value == 1;
       
        this.paramX.setName(isVector ? 'distance' : 'X');
        this.paramX.divider = isVector ? 0.55 : 0.43;

        this.paramY.setName(isVector ? 'angle' : 'Y');
        this.paramY.divider = isVector ? 0.55 : 0.43;

        this.paramY.controls[0].suffix        = isVector ? '°' : '';
        this.paramY.controls[0].suffixOffsetY = isVector ? -4  : 0;
        this.paramY.controls[0].wrapValue     = isVector;

        this.paramY.controls[0].setMin(isVector ?   0 : Number.MIN_SAFE_INTEGER);
        this.paramY.controls[0].setMax(isVector ? 360 : Number.MAX_SAFE_INTEGER);


        this.updateParamControls();
    }
}
