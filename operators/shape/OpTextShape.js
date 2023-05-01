class   OpTextShape
extends OpShape
{
    paramText;
    paramX;
    paramY;
    paramWidth;
    paramHeight;
    paramAngle;
    paramFont;
    paramStyle;
    paramSize;
    paramAlignH;
    paramAlignV;
    paramLineHeight;
    paramLetterSpacing;


    
    constructor()
    {
        super(TEXTSHAPE, 'text', 'text');

        this.canDisable = true;
        

        this.addInput (this.createInputForObjects([TEXTSHAPE_VALUE], getNodeInputValuesForUndo));
        this.addOutput(new Output([TEXTSHAPE_VALUE], this.output_genRequest));


        const interIndex = figUniqueFontNames.findIndex(f => f == 'Inter');

      
        this.addParam(this.paramText          = new   TextParam('text',          '',       true,  true));
        this.addParam(this.paramX             = new NumberParam('x',             'x',      true,  true, true,   0));
        this.addParam(this.paramY             = new NumberParam('y',             'y',      true,  true, true,   0));
        this.addParam(this.paramWidth         = new NumberParam('width',         'width',  true,  true, true, 100,    0.01));
        this.addParam(this.paramHeight        = new NumberParam('height',        'height', true,  true, true, 100,    0.01));
        this.addParam(this.paramAngle         = new NumberParam('angle',         'angle',  true,  true, true,   0, -180,   180));
        this.addParam(this.paramFont          = new SelectParam('font',          'font',   false, true, true, figUniqueFontNames, interIndex));
        this.addParam(this.paramStyle         = new SelectParam('style',         'style',  false, true, true, [''], 0));
        this.addParam(this.paramSize          = new NumberParam('size',          'size',   true,  true, true,  12, 1));
        this.addParam(this.paramAlignH        = new SelectParam('alignH',        'align',  true,  true, true, ['left', 'center', 'right', 'justify'], 0));
        this.addParam(this.paramAlignV        = new SelectParam('alignV',        'align',  true,  true, true, ['bottom', 'middle', 'top'], 1));
        this.addParam(this.paramLineHeight    = new NumberParam('lineHeight',    'line',   true,  true, true, 100));
        this.addParam(this.paramLetterSpacing = new NumberParam('letterSpacing', 'letter', true,  true, true, 0));


        this.paramText.controls[0].textbox.style.textAlign = 'center';

        this.paramAngle.controls[0].setSuffix('°', true);
        this.paramAngle.controls[0].wrapValue   = true;
        this.paramAngle.controls[0].dragReverse = true;

        this.paramLineHeight   .controls[0].setSuffix('%', true);
        this.paramLetterSpacing.controls[0].setSuffix('%', true);

        this.addBaseParams();
    }



    updateParams()
    {
        const fontName = figUniqueFontNames[this.paramFont.value.toNumber()];
        
        this.paramStyle.setOptions(
            figFonts
                .filter(f => f.fontName.family == fontName)
                .map(f => f.fontName.style));

        this.paramStyle.controls[0].setMax(this.paramStyle.options.length-1);

        super.updateParamControls();
    }
}