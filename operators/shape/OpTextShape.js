class   OpTextShape
extends OpShape
{
    paramText;
    paramX;
    paramY;
    paramWidth;
    paramHeight;
    paramFont;
    paramSize;
    paramStyle;
    paramAlignH;
    paramAlignV;
    paramLineHeight;
    paramLetterSpacing;


    
    constructor()
    {
        super(TEXT_SHAPE, 'text', 'text', iconTextShape);

        this.canDisable  = true;
        this.iconOffsetY = -1;
        

        this.addInput (this.createInputForObjects([TEXT_SHAPE_VALUE], getNodeInputValuesForUndo));
        this.addOutput(new Output([TEXT_SHAPE_VALUE], this.output_genRequest));


        const interIndex = figUniqueFontNames.findIndex(f => f == 'Inter');

      
        this.addParam(this.paramText          = new   TextParam('text',          '',       false, true, true));
        this.addParam(this.paramX             = new NumberParam('x',             'X',      true,  true, true, 0));
        this.addParam(this.paramY             = new NumberParam('y',             'Y',      true,  true, true, 0));
        this.addParam(this.paramWidth         = new NumberParam('width',         'width',  true,  true, true, 0));
        this.addParam(this.paramHeight        = new NumberParam('height',        'height', true,  true, true, 0));
        this.addParam(this.paramFont          = new SelectParam('font',          'font',   false, true, true, figUniqueFontNames, interIndex));
        this.addParam(this.paramSize          = new NumberParam('size',          'size',   true,  true, true,  12, 1));
        this.addParam(this.paramStyle         = new SelectParam('style',         'style',  false, true, true, [''], 0));
        this.addParam(this.paramAlignH        = new SelectParam('alignH',        'align',  true,  true, true, ['left', 'center', 'right', 'justify'], 0));
        this.addParam(this.paramAlignV        = new SelectParam('alignV',        'align',  true,  true, true, ['bottom', 'middle', 'top'], 1));
        this.addParam(this.paramLineHeight    = new NumberParam('lineHeight',    'line',   true,  true, true, 100));
        this.addParam(this.paramLetterSpacing = new NumberParam('letterSpacing', 'letter', true,  true, true, 0));


        this.paramText.controls[0].textbox.style.textAlign = 'center';

        this.paramLineHeight   .controls[0].setSuffix('%', true);
        this.paramLetterSpacing.controls[0].setSuffix('%', true);

        this.addBaseParams();
    }



    updateParams()
    {
        super.updateParams();


        this.paramWidth .enableControlText(false);
        this.paramHeight.enableControlText(false);

        if (!this.paramWidth .input.connected) this.paramWidth .setValue(new NumberValue(0), false, true, true);
        if (!this.paramHeight.input.connected) this.paramHeight.setValue(new NumberValue(0), false, true, true);


        this.paramWidth .controls[0].valueText = 
               this.paramWidth .value.value == 0 
            && this.paramHeight.value.value == 0 
            ? UNKNOWN_DISPLAY 
            : '';

        this.paramHeight.controls[0].valueText = 
            this.paramHeight.value.value == 0 
            ? UNKNOWN_DISPLAY 
            : '';


        const fontName   = figUniqueFontNames[this.paramFont.value.toNumber()];
        const fontStyles = getFontStyles(fontName);
        
        this.paramStyle.setOptions(fontStyles);
        this.paramStyle.controls[0].setMax(this.paramStyle.options.length-1);


        this.updateParamControls();
    }
}