class   OpVectorVertex
extends OpShapeBase
{
    static { operatorTypes[VECTOR_VERTEX] = this; }



    paramX;
    paramY;
    paramJoin;
    paramCap;
    paramRound;

    zoom = 1;



    constructor()
    {
        super(VECTOR_VERTEX, 'vertex', 'vertex', iconVectorVertex);

        //this.canDisable  = true;
        this.subscription = true;
        this.beta         = true;
        this.iconOffsetY  = -1;


        this.addInput (new Input ([VECTOR_VERTEX_VALUE, POINT_VALUE], getNodeInputValuesForUndo));//, this.input_getBackInitValue));
        this.addOutput(new Output([VECTOR_VERTEX_VALUE], this.output_genRequest, getNodeOutputValuesForUndo));//, this.output_backInit));

        this.addParam(this.paramX     = new NumberParam('x',     'X',     true, true, true, 0));
        this.addParam(this.paramY     = new NumberParam('y',     'Y',     true, true, true, 0));
        this.addParam(this.paramJoin  = new OptionParam('join',  'join',  true, true, true, ['miter', 'bevel', 'round'], 0));
        this.addParam(this.paramCap   = new OptionParam('cap',   'cap',   true, true, true, ['none', 'square', 'round'], 0));
        this.addParam(this.paramRound = new NumberParam('round', 'round', true, true, true, 0, 0));


        this.paramX    .divider = 0.45;
        this.paramY    .divider = 0.45;
        this.paramRound.divider = 0.55;
    }



    // input_getBackInitValue()
    // {
    //     // 'this' is the input

    //     return new PointValue(
    //         this.nodeId,
    //         this.node.paramX.value,
    //         this.node.paramY.value);
    // }



    // output_backInit(value)
    // {
    //     // 'this' is the output

    //     consoleAssert(value.type == POINT_VALUE, 'expected POINT_VALUE in backInit()');
        
    //     this.node.paramX.setValue(value.x, false, true, false);
    //     this.node.paramY.setValue(value.y, false, true, false);
    // }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        const value = values[paramIds.findIndex(id => id == 'value')];

        this.paramX    .setValue(value.x,     false, true, false);
        this.paramY    .setValue(value.y,     false, true, false);
        this.paramJoin .setValue(value.join,  false, true, false);
        this.paramCap  .setValue(value.cap,   false, true, false);
        this.paramRound.setValue(value.round, false, true, false);
    }
}