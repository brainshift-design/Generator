class   OpPolygon
extends OpShape
{
    paramPosition;
    paramX;
    paramY;
    paramWidth;
    paramHeight;
    paramRound;
    paramCorners;


    
    constructor()
    {
        super(POLYGON, 'poly', 'polygon', iconPolygon);

        this.canDisable  = true;
        this.iconOffsetY = -2;

        
        this.addInput (this.createInputForObjects([POLYGON_VALUE], getNodeInputValuesForUndo));
        this.addOutput(new Output([POLYGON_VALUE], this.output_genRequest));

        this.addParam(this.paramPosition = new OptionParam('position', 'position', false, true, true, EllipsePositions, 0));
        this.addParam(this.paramX        = new NumberParam('x',        'X',        true,  true, true,   0));
        this.addParam(this.paramY        = new NumberParam('y',        'Y',        true,  true, true,   0));
        this.addParam(this.paramWidth    = new NumberParam('width',    'width',    true,  true, true, 100,    0.01));
        this.addParam(this.paramHeight   = new NumberParam('height',   'height',   true,  true, true, 100,    0.01));
        this.addParam(this.paramRound    = new NumberParam('round',    'round',    true,  true, true,   0,    0));
        this.addParam(this.paramCorners  = new NumberParam('corners',  'corners',  true,  true, true,   3,    3));
        

        this.paramPosition.divider = 0.4;


        this.addBaseParamsAfter();


        this.getDescription = () => `defines a polygon value & object`;

        this.paramPosition.getDescription = () => `determines if X,Y are top-left or center`;
        this.paramX       .getDescription = () => `X coord (depends on position)`;
        this.paramY       .getDescription = () => `Y coord (depends on position)`;
        this.paramWidth   .getDescription = () => `width`;
        this.paramHeight  .getDescription = () => `height`;
        this.paramRound   .getDescription = () => `radius of round corners`;
        this.paramCorners .getDescription = () => `number of polygon corners`;
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        const pos     = values[paramIds.findIndex(id => id == 'position')];
        const x       = values[paramIds.findIndex(id => id == 'x'       )];
        const y       = values[paramIds.findIndex(id => id == 'y'       )];
        const width   = values[paramIds.findIndex(id => id == 'width'   )];
        const height  = values[paramIds.findIndex(id => id == 'height'  )];
        const round   = values[paramIds.findIndex(id => id == 'round'   )];
        const corners = values[paramIds.findIndex(id => id == 'corners' )];
        // const vlue  = values[paramIds.findIndex(id => id == 'value'   )];

        this.paramPosition.setValue(pos,     false, true, false);
        this.paramX       .setValue(x,       false, true, false);
        this.paramY       .setValue(y,       false, true, false);
        this.paramWidth   .setValue(width,   false, true, false);
        this.paramHeight  .setValue(height,  false, true, false);
        this.paramRound   .setValue(round,   false, true, false);
        this.paramCorners .setValue(corners, false, true, false);
    }



    updateParams()
    {
        super.updateParams();

        
        this.paramPosition.enableControlText(true, this.paramPosition.isUnknown());


        const center = this.paramPosition.value.value == 1;
       
        this.paramWidth.setName(center ? 'radius W' : 'width');
        this.paramWidth.divider = center ? 0.55 : 0.45;

        this.paramHeight.setName(center ? 'radius H' : 'height');
        this.paramHeight.divider = center ? 0.55 : 0.45;


        this.updateParamControls();
    }



    updateRound()
    {
        const control = this.paramRound.controls[0];
        const min     = Math.min(this.paramWidth.value, this.paramHeight.value);

        control.setMin(0);
        control.setMax(min/2);

        control.update();
    }
}