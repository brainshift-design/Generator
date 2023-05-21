class OpShapeBoolean
extends OpShapeBase
{
    paramOperation;
    paramX;
    paramY;
    paramWidth;
    paramHeight;
    paramChildren;


    
    constructor()
    {
        super(BOOLEAN, 'boolean', 'boolean');

        this.canDisable = true;


        this.addInput (this.createInputForObjects([BOOLEAN_VALUE], getNodeInputValuesForUndo));
        this.addOutput(new Output([BOOLEAN_VALUE], this.output_genRequest));


        this.addParam(this.paramOperation = new SelectParam('operation', '',        false, true,  true,  ['union', 'subtract', 'intersect', 'exclude'], 0));
        this.addParam(this.paramX         = new NumberParam('x',         'x',       true,  false, false,   0));
        this.addParam(this.paramY         = new NumberParam('y',         'y',       true,  false, false,   0));
        this.addParam(this.paramWidth     = new NumberParam('width',     'width',   true,  false, false, 100, 0.01));
        this.addParam(this.paramHeight    = new NumberParam('height',    'height',  true,  false, false, 100, 0.01));
        this.addParam(this.paramChildren  = new ListParam  ('children',  'objects', true,  true,  true));

        
        this.paramChildren.input.types.push(SHAPE_LIST_VALUE, ...SHAPE_VALUES);
        this.paramChildren.listTypes    = SHAPE_VALUES;
        this.paramChildren.itemName     = 'object';
        this.paramChildren.showZero     = false;
        this.paramChildren.getItemCount = () => 0;


        this.addBaseParams();
    }



    updateParams()
    {
        super.updateParams();

        this.paramOperation.enableControlText(true);
        this.paramX        .enableControlText(false);
        this.paramY        .enableControlText(false);
        this.paramWidth    .enableControlText(false);
        this.paramHeight   .enableControlText(false);

        this.updateParamControls();
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        const nObjects = values[paramIds.findIndex(id => id == 'nObjects')];

        this.paramChildren.getItemCount = () => nObjects.value;

        super.updateValues(requestId, actionId, updateParamId, paramIds, values);
    }
}