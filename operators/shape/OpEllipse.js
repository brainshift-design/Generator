class   OpEllipse
extends OpShape
{
    paramPosition;
    paramX;
    paramY;
    paramWidth;
    paramHeight;
    paramRound;
    paramStart;
    paramSweep;
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
        this.addParam(this.paramRound    = new NumberParam('round',    'round',    true,  true, true,   0, 0));
        this.addParam(this.paramInner    = new NumberParam('inner',    'inner',    true,  true, true,   0, 0, 100));
        this.addParam(this.paramStart    = new NumberParam('start',    'start',    true,  true, true,   0));
        this.addParam(this.paramSweep    = new NumberParam('sweep',    'sweep',    true,  true, true, 100, 0, 100));
        

        this.paramPosition.divider = 0.4;

        this.paramStart.controls[0].setSuffix('°', true);
        this.paramSweep.controls[0].setSuffix('°', true);
        this.paramInner.controls[0].setSuffix('%', true);
        this.paramSweep.controls[0].setSuffix('%', true);

        this.paramStart.controls[0].wrapValue     = true;
        this.paramStart.controls[0].suffixOffsetY = -4;


        this.addBaseParams();
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        const pos    = values[paramIds.findIndex(id => id == 'position')];
        const x      = values[paramIds.findIndex(id => id == 'x'       )];
        const y      = values[paramIds.findIndex(id => id == 'y'       )];
        const width  = values[paramIds.findIndex(id => id == 'width'   )];
        const height = values[paramIds.findIndex(id => id == 'height'  )];
        const round  = values[paramIds.findIndex(id => id == 'round'   )];
        const start  = values[paramIds.findIndex(id => id == 'start'   )];
        const sweep  = values[paramIds.findIndex(id => id == 'sweep'   )];
        const inner  = values[paramIds.findIndex(id => id == 'inner'   )];

        this.paramPosition.setValue(pos,    false, true, false);
        this.paramX       .setValue(x,      false, true, false);
        this.paramY       .setValue(y,      false, true, false);
        this.paramWidth   .setValue(width,  false, true, false);
        this.paramHeight  .setValue(height, false, true, false);
        this.paramRound   .setValue(round,  false, true, false);
        this.paramStart   .setValue(start,  false, true, false);
        this.paramSweep   .setValue(sweep,  false, true, false);
        this.paramInner   .setValue(inner,  false, true, false);
    }



    updateParams()
    {
        const center = this.paramPosition.value.value == 1;
        
        this.paramWidth .setName(center ? 'radius W' : 'width' );
        this.paramHeight.setName(center ? 'radius H' : 'height');
        
        // this.params.forEach(p => p.isNodeValue = this.headerInputs[0].connected);
        
        super.updateParams();

        //this.updateParamControls();
    }
}