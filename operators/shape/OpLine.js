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
}