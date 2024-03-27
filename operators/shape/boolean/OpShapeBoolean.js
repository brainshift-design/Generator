class OpShapeBoolean
extends OpShapeBase
{
    paramChildren;
    paramOperation;


    
    constructor()
    {
        super(SHAPE_BOOLEAN, 'boolean', 'boolean', iconBoolUnion);

        this.canDisable = true;


        this.addInput (this.createInputForObjects([SHAPE_BOOLEAN_VALUE], getNodeInputValuesForUndo));
        this.addOutput(new Output([SHAPE_BOOLEAN_VALUE], this.output_genRequest));


        this.addParam(this.paramChildren  = new ListParam  ('children',  'objects', false,  true,  true));
        this.addParam(this.paramOperation = new SelectParam('operation', '',        false, true,  true,  ['union', 'subtract', 'intersect', 'exclude'], 0));

        
        this.paramChildren.input.types.push(SHAPE_LIST_VALUE, ...SHAPE_VALUES);
        this.paramChildren.listTypes    = SHAPE_VALUES;
        this.paramChildren.itemName     = ['object'];
        this.paramChildren.showZero     = false;
        this.paramChildren.getItemCount = () => 0;


        this.addBaseParams();
    }



    updateParams()
    {
        super.updateParams();

        this.paramOperation.enableControlText(true, this.paramOperation.isUnknown());

        this.updateParamControls();
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        const nObjects = values[paramIds.findIndex(id => id == 'nObjects')];

        this.paramChildren.getItemCount = () => nObjects.value;

        super.updateValues(requestId, actionId, updateParamId, paramIds, values);
    }
}