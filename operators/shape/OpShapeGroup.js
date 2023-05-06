class   OpShapeGroup
extends OpShape
{
    paramX;
    paramY;
    paramWidth;
    paramHeight;
    paramAngle;
    paramObjects;


    
    constructor()
    {
        super(SHAPE_GROUP, 'group', 'group');

        this.canDisable = true;


        this.addInput(this.createInputForObjects(SHAPE_VALUES, getNodeInputValuesForUndo));
        this.addOutput(new Output([SHAPE_GROUP_VALUE], this.output_genRequest));


        this.addParam(this.paramX       = new NumberParam('x',       'x',       true, true, true,   0));
        this.addParam(this.paramY       = new NumberParam('y',       'y',       true, true, true,   0));
        this.addParam(this.paramWidth   = new NumberParam('width',   'width',   true, true, true, 100,    0.01));
        this.addParam(this.paramHeight  = new NumberParam('height',  'height',  true, true, true, 100,    0.01));
        this.addParam(this.paramAngle   = new NumberParam('angle',   'angle',   true, true, true,   0, -180,   180));
        this.addParam(this.paramObjects = new ListParam  ('objects', 'objects', true, true, true));

        
        this.paramObjects.input.types.push(SHAPE_LIST_VALUE);
        this.paramObjects.listTypes = SHAPE_VALUES;

        this.paramPoints.itemName    = 'point';
        this.paramPoints.showZero    =  false;

        this.paramDegree.reverseMenu =  true;


        this.addBaseParams();
    }
}