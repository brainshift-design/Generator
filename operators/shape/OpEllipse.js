class   OpEllipse
extends OpShape
{
    paramPosition;
    paramX;
    paramY;
    paramWidth;
    paramHeight;
    paramFrom;
    paramTo;
    paramInner;


    
    constructor()
    {
        super(ELLIPSE, 'ellipse', 'ellipse', iconEllipse);

        this.canDisable  = true;
        this.iconOffsetY = -1;
        

        this.addInput (this.createInputForObjects([ELLIPSE_VALUE], getNodeInputValuesForUndo));
        this.addOutput(new Output([ELLIPSE_VALUE], this.output_genRequest));


        this.addParam(this.paramPosition = new SelectParam('position', 'position', false, true, true, ['top-left', 'center'], 0));
        this.addParam(this.paramX        = new NumberParam('x',        'X',        true,  true, true,   0));
        this.addParam(this.paramY        = new NumberParam('y',        'Y',        true,  true, true,   0));
        this.addParam(this.paramWidth    = new NumberParam('width',    'width',    true,  true, true, 100));
        this.addParam(this.paramHeight   = new NumberParam('height',   'height',   true,  true, true, 100));
        this.addParam(this.paramInner    = new NumberParam('inner',    'inner',    true,  true, true,   0, 0, 100));
        this.addParam(this.paramFrom     = new NumberParam('from',     'from',     true,  true, true,   0));
        this.addParam(this.paramTo       = new NumberParam('to',       'to',       true,  true, true, 360));
        

        this.paramPosition.divider       = 0.4;
        this.paramPosition.alwaysRequest = true;

        this.paramFrom .controls[0].setSuffix('°', true);
        this.paramTo   .controls[0].setSuffix('°', true);
        this.paramInner.controls[0].setSuffix('%', true);

        this.paramFrom .controls[0].wrapValue     = true;
        this.paramTo   .controls[0].wrapValue     = true;

        this.paramFrom .controls[0].suffixOffsetY = -4;
        this.paramTo   .controls[0].suffixOffsetY = -4;


        this.addBaseParams();
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        const pos    = values[paramIds.findIndex(id => id == 'position')];
        const x      = values[paramIds.findIndex(id => id == 'x'       )];
        const y      = values[paramIds.findIndex(id => id == 'y'       )];
        const width  = values[paramIds.findIndex(id => id == 'width'   )];
        const height = values[paramIds.findIndex(id => id == 'height'  )];
        const value  = values[paramIds.findIndex(id => id == 'value'   )];

        this.paramPosition.setValue(pos,         false, true, false);
        this.paramX       .setValue(x,           false, true, false);
        this.paramY       .setValue(y,           false, true, false);
        this.paramWidth   .setValue(width,       false, true, false);
        this.paramHeight  .setValue(height,      false, true, false);
        this.paramFrom    .setValue(value.from,  false, true, false);
        this.paramTo      .setValue(value.to,    false, true, false);
        this.paramInner   .setValue(value.inner, false, true, false);
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
}