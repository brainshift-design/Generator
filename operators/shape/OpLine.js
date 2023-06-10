class   OpLine
extends OpShape
{
    paramX;
    paramY;
    paramWidth;

    
    constructor()
    {
        super(LINE, 'line', 'line', iconLine);

        this.canDisable = true;

        
        this.addInput (this.createInputForObjects([LINE_VALUE], getNodeInputValuesForUndo));
        this.addOutput(new Output([LINE_VALUE], this.output_genRequest));

        this.addParam(this.paramX      = new NumberParam('x',      'X',      true, true, true,   0));
        this.addParam(this.paramY      = new NumberParam('y',      'Y',      true, true, true,   0));
        this.addParam(this.paramWidth  = new NumberParam('width',  'width',  true, true, true, 100));
        

        this.addBaseParams();
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        const value = values[paramIds.findIndex(id => id == 'value')];

        this.paramX    .setValue(value.x,     false, true, false);
        this.paramY    .setValue(value.y,     false, true, false);
        this.paramWidth.setValue(value.width, false, true, false);
    }
}