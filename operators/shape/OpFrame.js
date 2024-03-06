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



    constructor()
    {
        super(FRAME, 'frame', 'frame', iconFrame);

        this.canDisable     = true;
        this.iconOffsetY    = -1;


        this.addInput(this.createInputForObjects([FRAME_VALUE], getNodeInputValuesForUndo));
        this.addOutput(new Output([FRAME_VALUE], this.output_genRequest));


        this.addParam(this.paramChildren = new ListParam  ('children', 'objects',  false, true, true));
        this.addParam(this.paramPosition = new SelectParam('position', 'position', true,  true, true, ['relative', 'absolute'], 0));
        this.addParam(this.paramX        = new NumberParam('x',        'X',        true,  true, true, 0));
        this.addParam(this.paramY        = new NumberParam('y',        'Y',        true,  true, true, 0));
        this.addParam(this.paramWidth    = new NumberParam('width',    'width',    true,  true, true, 100, 0.01));
        this.addParam(this.paramHeight   = new NumberParam('height',   'height',   true,  true, true, 100, 0.01));
        this.addParam(this.paramRound    = new NumberParam('round',    'round',    true,  true, true, 0, 0));


        this.paramWidth .addEventListener('change', () => this.updateRound());
        this.paramHeight.addEventListener('change', () => this.updateRound());


        this.paramChildren.input.types.push(SHAPE_LIST_VALUE, ...SHAPE_VALUES);
        this.paramChildren.listTypes    = SHAPE_VALUES;
        this.paramChildren.itemName     = [];//'object'];
        this.paramChildren.showZero     = false;
        this.paramChildren.getItemCount = () => 0;

        this.setAllParamDividers(0.47);

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
        // const children = values[paramIds.findIndex(id => id == 'children')];
        const position  = values[paramIds.findIndex(id => id == 'position')];
        const x         = values[paramIds.findIndex(id => id == 'x'       )];
        const y         = values[paramIds.findIndex(id => id == 'y'       )];
        const width     = values[paramIds.findIndex(id => id == 'width'   )];
        const height    = values[paramIds.findIndex(id => id == 'height'  )];
        const round     = values[paramIds.findIndex(id => id == 'round'   )];

        const childType = values[paramIds.findIndex(id => id == 'childType')];

        this.paramChildren.output.types = [childType.value];//[finalListTypeFromItems(children.items)];

        this.paramPosition.setValue(position, false, true, false);
        this.paramX       .setValue(x,        false, true, false);
        this.paramY       .setValue(y,        false, true, false);
        this.paramWidth   .setValue(width,    false, true, false);
        this.paramHeight  .setValue(height,   false, true, false);
        this.paramRound   .setValue(round,    false, true, false);
    }
}
