class   OpShapeGroup
extends OpShapeBase
{
    paramX;
    paramY;
    paramWidth;
    paramHeight;
    paramAngle;
    paramChildren;


    
    constructor()
    {
        super(SHAPE_GROUP, 'group', 'group');

        this.canDisable = true;


        this.addInput(this.createInputForObjects(SHAPE_VALUES, getNodeInputValuesForUndo));
        this.addOutput(new Output([SHAPE_GROUP_VALUE], this.output_genRequest));


        this.addParam(this.paramX        = new NumberParam('x',        'x',       true, true,  true,   0));
        this.addParam(this.paramY        = new NumberParam('y',        'y',       true, true,  true,   0));
        this.addParam(this.paramWidth    = new NumberParam('width',    'width',   true, false, true, 100,    0.01));
        this.addParam(this.paramHeight   = new NumberParam('height',   'height',  true, false, true, 100,    0.01));
        this.addParam(this.paramAngle    = new NumberParam('angle',    'angle',   true, true,  true,   0, -180,   180));
        this.addParam(this.paramChildren = new ListParam  ('children', 'objects', true, true,  true));

        
        this.paramChildren.input.types.push(SHAPE_LIST_VALUE);
        this.paramChildren.listTypes = SHAPE_VALUES;
        this.paramChildren.itemName  = 'object';
        this.paramChildren.showZero  =  false;


        this.addBaseParams();
    }



    updateParams()
    {
        super.updateParams();

        this.paramWidth .enableControlText(false);
        this.paramHeight.enableControlText(false);

        //this.updateParamControls();
    }
}