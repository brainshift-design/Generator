class   OpLine
extends OpShape
{
    static { operatorTypes[LINE] = this; }



    paramX;
    paramY;
    paramWidth;

    
    constructor()
    {
        super(LINE, 'line', 'line', iconLine);

        this.canDisable = true;

        this.addInput (this.createInputForObjects([LINE_VALUE], getNodeInputValuesForUndo));
        this.addOutput(new Output([LINE_VALUE], this.output_genRequest));

        this.addParam(this.paramX     = new NumberParam('x',     'X',     true, true, true,   0));
        this.addParam(this.paramY     = new NumberParam('y',     'Y',     true, true, true,   0));
        this.addParam(this.paramWidth = new NumberParam('width', 'width', true, true, true, 100));

        this.addBaseParamsAfter();
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        const x     = values[paramIds.findIndex(id => id == 'x'    )];
        const y     = values[paramIds.findIndex(id => id == 'y'    )];
        const width = values[paramIds.findIndex(id => id == 'width')];

        this.paramX    .setValue(x,     false, true, false);
        this.paramY    .setValue(y,     false, true, false);
        this.paramWidth.setValue(width, false, true, false);
    }
}