class   OpVectorRegion
extends OpShapeBase
{
    paramLoops;
    paramWinding;
    paramProps;



    constructor()
    {
        super(VECTOR_REGION, 'region', 'region', iconVectorRegion);

        //this.canDisable  = true;
        //this.iconOffsetY = -1;


        this.addInput (new Input ([VECTOR_REGION_VALUE], getNodeInputValuesForUndo));//, this.input_getBackInitValue));
        this.addOutput(new Output([VECTOR_REGION_VALUE], this.output_genRequest, getNodeOutputValuesForUndo));//, this.output_backInit));

        this.addParam(this.paramLoops   = new   ListParam('loops',   'loops',   false,  true, true, 0));
        this.addParam(this.paramWinding = new SelectParam('winding', 'winding', false, true, true, ['even-odd', 'non-zero']));
        this.addParam(this.paramProps   = new   ListParam('props',   'styles',  false, true, true));


        this.paramLoops.itemName  = 'loop';
        this.paramLoops.showZero  = false;
        this.paramLoops.listTypes = [TEXT_VALUE];
        this.paramLoops.input.types.push(...this.paramLoops.listTypes);


        this.paramProps.controls[0].valueText = 'style';
        
        this.paramProps.itemName  = 'style';
        this.paramProps.showZero  = false;
        this.paramProps.listTypes = [...STYLE_VALUES];
        this.paramProps.input.types.push(...this.paramProps.listTypes);


        this.setAllParamDividers(0.45);
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

        this.paramLoops  .setValue(value.loops,   false, true, false);
        this.paramWinding.setValue(value.winding, false, true, false);
        this.paramProps  .setValue(value.props,   false, true, false);
    }
}