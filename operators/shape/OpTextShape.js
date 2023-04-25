class   OpTextShape
extends OpShapeBase
{
    paramText;
    paramX;
    paramY;
    paramWidth;
    paramHeight;
    paramAngle;
    paramFont;
    paramSize;


    
    constructor()
    {
        super(TEXTSHAPE, 'text', 'text');

        this.canDisable = true;
        

        this.addInput (this.createInputForObjects([TEXTSHAPE_VALUE], getNodeInputValuesForUndo));
        this.addOutput(new Output([TEXTSHAPE_VALUE], this.output_genRequest));


        const fonts      = figFonts.map(f => f.fontName.family);
        const interIndex = fonts.findIndex(f => f == 'Inter');


        this.addParam(this.paramText   = new   TextParam('text',   '',       true,  true));
        this.addParam(this.paramX      = new NumberParam('x',      'x',      true,  true, true,   0));
        this.addParam(this.paramY      = new NumberParam('y',      'y',      true,  true, true,   0));
        this.addParam(this.paramWidth  = new NumberParam('width',  'width',  true,  true, true, 100,    0.01));
        this.addParam(this.paramHeight = new NumberParam('height', 'height', true,  true, true, 100,    0.01));
        this.addParam(this.paramAngle  = new NumberParam('angle',  'angle',  true,  true, true,   0, -180,   180));
        this.addParam(this.paramFont   = new SelectParam('font',   'font',   false, true, true, fonts, interIndex));
        this.addParam(this.paramSize   = new NumberParam('size',   'size',   true,  true, true,  12,    0));


        this.paramText.controls[0].textbox.style.textAlign = 'center';

        this.paramAngle.controls[0].setSuffix('°', true);
        this.paramAngle.controls[0].wrapValue   = true;
        this.paramAngle.controls[0].dragReverse = true;


        this.addBaseParams();
    }
}