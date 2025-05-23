class OpShapeBoolean
extends OpShape
{
    static { Operator.types[SHAPE_BOOLEAN] = this; }



    paramChildren;
    paramOperation;


    
    constructor()
    {
        super(SHAPE_BOOLEAN, 'boolean', 'boolean', iconBoolUnion);


        this.beta        = true;
        this.canDisable  = true;
        this.iconOffsetY = -1;


        this.addInput (this.createInputForObjects([SHAPE_BOOLEAN_VALUE], getNodeInputValuesForUndo));
        this.addOutput(new Output([SHAPE_BOOLEAN_VALUE], this.output_genRequest));


        this.addParam(this.paramChildren  = new ListParam  ('children',  'objects',   false,  true,  true));
        this.addParam(this.paramOperation = new OptionParam('operation', 'operation', false, true,  true,  ['union', 'subtract', 'intersect', 'exclude'], 0));

        
        this.paramChildren.input.types.push(SHAPE_LIST_VALUE, ...SHAPE_VALUES);
        this.paramChildren.listTypes    = SHAPE_VALUES;
        this.paramChildren.itemName     = [];
        this.paramChildren.showZero     = false;
        this.paramChildren.getItemCount = () => 0;


        this.addBaseParamsAfter();
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        const nChildren = values[paramIds.findIndex(id => id == 'nChildren')];

        this.paramChildren.getItemCount = () => nChildren.value;

        super.updateValues(requestId, actionId, updateParamId, paramIds, values);
    }



    updateParams()
    {
        super.updateParams();

        this.paramOperation.enableControlText(true, this.paramOperation.isUnknown());

        this.updateParamControls();
    }
}