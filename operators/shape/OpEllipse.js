class   OpEllipse
extends OpShape
{
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


        this.addParam(this.paramX      = new NumberParam('x',      'X',      true, true, true,   0));
        this.addParam(this.paramY      = new NumberParam('y',      'Y',      true, true, true,   0));
        this.addParam(this.paramWidth  = new NumberParam('width',  'width',  true, true, true, 100));
        this.addParam(this.paramHeight = new NumberParam('height', 'height', true, true, true, 100));
        this.addParam(this.paramInner  = new NumberParam('inner',  'inner',  true, true, true,   0, 0, 100));
        this.addParam(this.paramFrom   = new NumberParam('from',   'from',   true, true, true,   0));
        this.addParam(this.paramTo     = new NumberParam('to',     'to',     true, true, true, 360));
        

        this.paramFrom .controls[0].setSuffix('°', true);
        this.paramTo   .controls[0].setSuffix('°', true);
        this.paramInner.controls[0].setSuffix('%', true);

        this.paramFrom .controls[0].wrapValue   = true;
        this.paramTo   .controls[0].wrapValue   = true;


        this.addBaseParams();
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        const value = values[paramIds.findIndex(id => id == 'value')];

        this.paramX     .setValue(value.x,      false, true, false);
        this.paramY     .setValue(value.y,      false, true, false);
        this.paramWidth .setValue(value.width,  false, true, false);
        this.paramHeight.setValue(value.height, false, true, false);
        this.paramFrom  .setValue(value.from,   false, true, false);
        this.paramTo    .setValue(value.to,     false, true, false);
        this.paramInner .setValue(value.inner,  false, true, false);
    }
}