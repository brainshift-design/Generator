class   OpFrame
extends OpShape
{
    paramChildren;
    paramPosition;
    paramX;
    paramY;
    paramWidth;
    paramHeight;
    paramRound;
    paramClip;

    menuClip;



    constructor()
    {
        super(FRAME, 'frame', 'frame', iconFrame);


        this.canDisable     = true;
        this.iconOffsetY    = -1;


        this.addInput(this.createInputForObjects([FRAME_VALUE], getNodeInputValuesForUndo));
        this.addOutput(new Output([FRAME_VALUE], this.output_genRequest));


        this.addParam(this.paramChildren = new ListParam  ('children', 'objects',  false, true, true));
        this.addParam(this.paramPosition = new OptionParam('position', 'position', true,  true, true, FramePositions, 0));
        this.addParam(this.paramX        = new NumberParam('x',        'X',        true,  true, true, 0));
        this.addParam(this.paramY        = new NumberParam('y',        'Y',        true,  true, true, 0));
        this.addParam(this.paramWidth    = new NumberParam('width',    'width',    true,  true, true, 100, 0.01));
        this.addParam(this.paramHeight   = new NumberParam('height',   'height',   true,  true, true, 100, 0.01));
        this.addParam(this.paramRound    = new NumberParam('round',    'round',    true,  true, true, 0, 0));
        this.addParam(this.paramClip     = new NumberParam('clip',     'clip',     true,  true, true, 1, 0, 1));


        this.paramWidth .addEventListener('change', () => this.updateRound());
        this.paramHeight.addEventListener('change', () => this.updateRound());


        this.paramChildren.input.types.push(SHAPE_LIST_VALUE, ...SHAPE_VALUES);
        this.paramChildren.listTypes    = [...SHAPE_VALUES, SHAPE_LIST_VALUE];
        this.paramChildren.itemName     = [];
        this.paramChildren.showZero     = false;
        this.paramChildren.getItemCount = () => 0;

        this.setAllParamDividers(0.47);

        
        this.menuClip = createBoolMenu(this.paramClip);

        
        this.addBaseParamsAfter();
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
        // const children = values[paramIds.findIndex(id => id == 'children')];
        const position  = values[paramIds.findIndex(id => id == 'position')];
        const x         = values[paramIds.findIndex(id => id == 'x'       )];
        const y         = values[paramIds.findIndex(id => id == 'y'       )];
        const width     = values[paramIds.findIndex(id => id == 'width'   )];
        const height    = values[paramIds.findIndex(id => id == 'height'  )];
        const round     = values[paramIds.findIndex(id => id == 'round'   )];
        const clip      = values[paramIds.findIndex(id => id == 'clip'    )];

        const childType = values[paramIds.findIndex(id => id == 'childType')];

        this.paramChildren.output.types = [childType.value];

        this.paramPosition.setValue(position, false, true, false);
        this.paramX       .setValue(x,        false, true, false);
        this.paramY       .setValue(y,        false, true, false);
        this.paramWidth   .setValue(width,    false, true, false);
        this.paramHeight  .setValue(height,   false, true, false);
        this.paramRound   .setValue(round,    false, true, false);
        this.paramClip    .setValue(clip,     false, true, false);
    }



    updateParams()
    {
        super.updateParams();
        
        this.paramClip.enableControlText(true);

        updateParamConditionText(this.paramClip, this.paramClip.isUnknown(), false, 1);

        super.updateParamControls();
    }
}
