class   OpFrame
extends OpShape
{
    paramX;
    paramY;
    paramWidth;
    paramHeight;
    paramAngle;
    paramRound;
    paramChildren;



    constructor()
    {
        super(FRAME, 'frame', 'frame');

        this.canDisable     = true;
        this.variableInputs = true;


        this.addInput(this.createInputForObjects([FRAME_VALUE], getNodeInputValuesForUndo));
        this.addOutput(new Output([FRAME_VALUE], this.output_genRequest));


        this.addParam(this.paramX        = new NumberParam('x',        'x',       true, true, true,   0));
        this.addParam(this.paramY        = new NumberParam('y',        'y',       true, true, true,   0));
        this.addParam(this.paramWidth    = new NumberParam('width',    'width',   true, true, true, 100,    0.01));
        this.addParam(this.paramHeight   = new NumberParam('height',   'height',  true, true, true, 100,    0.01));
        this.addParam(this.paramAngle    = new NumberParam('angle',    'angle',   true, true, true,   0, -180,   180));
        this.addParam(this.paramRound    = new NumberParam('round',    'round',   true, true, true,   0,    0));
        this.addParam(this.paramChildren = new ListParam  ('children', 'objects', true, true, true));


        this.paramWidth .addEventListener('change', () => this.updateRound());
        this.paramHeight.addEventListener('change', () => this.updateRound());

        this.paramAngle.controls[0].setSuffix('°', true);
        this.paramAngle.controls[0].wrapValue   = true;
        this.paramAngle.controls[0].dragReverse = true;


        this.paramChildren.input.types.push(SHAPE_LIST_VALUE, ...SHAPE_VALUES);
        this.paramChildren.listTypes    = SHAPE_VALUES;
        this.paramChildren.itemName     = 'object';
        this.paramChildren.showZero     = false;
        this.paramChildren.getItemCount = () => 0;


        this.addBaseParams();
    }
    
    
    
    updateRound()
    {
        const min = Math.min(
            this.paramWidth .value.value, 
            this.paramHeight.value.value);

        this.paramRound.controls[0].displayMin = 0;
        this.paramRound.controls[0].displayMax = min/2;

        this.paramRound.controls[0].update();
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        console.log('OpFrame updateValues paramIds = ', [...paramIds]);
        console.log('OpFrame updateValues values = ', [...values]);
        super.updateValues(requestId, actionId, updateParamId, paramIds, values);
        
        const children = values[paramIds.findIndex(id => id == 'children')];
        const nObjects = values[paramIds.findIndex(id => id == 'nObjects')];

        this.paramChildren.getItemCount = () => nObjects.value;
        this.paramChildren.output.types = [finalListTypeFromItems(children.items)];
    }
}
