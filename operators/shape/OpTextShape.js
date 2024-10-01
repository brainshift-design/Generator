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
    paramAlignX;
    paramAlignY;
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

      
        this.addParam(this.paramText          = new   TextParam('text',          '',         false, true, true));
        this.addParam(this.paramX             = new NumberParam('x',             'X',        true,  true, true, 0));
        this.addParam(this.paramY             = new NumberParam('y',             'Y',        true,  true, true, 0));
        this.addParam(this.paramWidth         = new NumberParam('width',         'width',    true,  true, true, 0));
        this.addParam(this.paramHeight        = new NumberParam('height',        'height',   true,  true, true, 0));
        this.addParam(this.paramFont          = new SelectParam('font',          'font',     false, true, true, figUniqueFontNames, interIndex));
        this.addParam(this.paramSize          = new NumberParam('size',          'size',     true,  true, true,  12, 1));
        this.addParam(this.paramStyle         = new SelectParam('style',         'style',    false, true, true, [''], 0));
        this.addParam(this.paramAlignX        = new SelectParam('alignX',        'align X',  true,  true, true, TextAlignX, 0));
        this.addParam(this.paramAlignY        = new SelectParam('alignY',        'align Y',  true,  true, true, TextAlignY, 1));
        this.addParam(this.paramLineHeight    = new NumberParam('lineHeight',    'line ↕',   true,  true, true, 100));
        this.addParam(this.paramLetterSpacing = new NumberParam('letterSpacing', 'letter ↔', true,  true, true, 0));


        this.paramText.controls[0].textbox.style.textAlign = 'center';

        this.paramLineHeight   .controls[0].setSuffix('%', true);
        this.paramLetterSpacing.controls[0].setSuffix('%', true);
     
        this.paramFont .saveAsText = true;
        this.paramStyle.saveAsText = true;

        this.paramFont.divider = 0.3;
        
        this.addBaseParamsAfter();
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        const text          = values[paramIds.findIndex(id => id == 'text'         )];
        const x             = values[paramIds.findIndex(id => id == 'x'            )];
        const y             = values[paramIds.findIndex(id => id == 'y'            )];
        const width         = values[paramIds.findIndex(id => id == 'width'        )];
        const height        = values[paramIds.findIndex(id => id == 'height'       )];
        const font          = values[paramIds.findIndex(id => id == 'font'         )];
        const size          = values[paramIds.findIndex(id => id == 'size'         )];
        const style         = values[paramIds.findIndex(id => id == 'style'        )];
        const alignX        = values[paramIds.findIndex(id => id == 'alignX'       )];
        const alignY        = values[paramIds.findIndex(id => id == 'alignY'       )];
        const lineHeight    = values[paramIds.findIndex(id => id == 'lineHeight'   )];
        const letterSpacing = values[paramIds.findIndex(id => id == 'letterSpacing')];

        if (text.type == TEXT_VALUE) this.paramText         .setValue(text,          false, true, false);
                                     this.paramX            .setValue(x,             false, true, false);
                                     this.paramY            .setValue(y,             false, true, false);
                                     this.paramWidth        .setValue(width,         false, true, false);
                                     this.paramHeight       .setValue(height,        false, true, false);
                                     this.paramFont         .setValue(font,          false, true, false);
                                     this.paramSize         .setValue(size,          false, true, false);
                                     this.paramStyle        .setValue(style,         false, true, false);
                                     this.paramAlignX       .setValue(alignX,        false, true, false);
                                     this.paramAlignY       .setValue(alignY,        false, true, false);
                                     this.paramLineHeight   .setValue(lineHeight,    false, true, false);
                                     this.paramLetterSpacing.setValue(letterSpacing, false, true, false);
    }



    updateParams()
    {
        super.updateParams();


        this.paramText         .enableControlText(true, this.paramText         .isUnknown());
        this.paramX            .enableControlText(true, this.paramX            .isUnknown());
        this.paramY            .enableControlText(true, this.paramY            .isUnknown());
        this.paramWidth        .enableControlText(true, this.paramWidth        .isUnknown());
        this.paramHeight       .enableControlText(true, this.paramHeight       .isUnknown());
        this.paramFont         .enableControlText(true, this.paramFont         .isUnknown());
        this.paramSize         .enableControlText(true, this.paramSize         .isUnknown());
        this.paramStyle        .enableControlText(true, this.paramStyle        .isUnknown());
        this.paramAlignX       .enableControlText(true, this.paramAlignX       .isUnknown());
        this.paramAlignY       .enableControlText(true, this.paramAlignY       .isUnknown());
        this.paramLineHeight   .enableControlText(true, this.paramLineHeight   .isUnknown());
        this.paramLetterSpacing.enableControlText(true, this.paramLetterSpacing.isUnknown());


        this.updateStyleParam();

        this.updateParamControls();
    }



    updateStyleParam()
    {
        const fontName   = figUniqueFontNames[this.paramFont.value.toNumber()];
        const fontStyles = getFontStyles(fontName);
        
        this.paramStyle.setOptions(fontStyles);
        this.paramStyle.controls[0].setMax(this.paramStyle.options.length-1);
    }



    loadParams(_node, pasting)
    {
        if (!_node.params)
            return;
        
            
        //console.log('_node.params =', _node.params);
        for (const _param of _node.params)
        {
            let index = this.params.findIndex(p => p.id == _param[1]);

            if (index < 0)
            {
                this.createAndAddParamByType(_param[0], _param[1], true, false, true, true);
                index = this.params.length-1;
            }
        }


        const _fontParam = _node.params.find(p => p[1] == 'font');

        if (_fontParam)
            this.paramFont.loadParam(_fontParam);


        this.updateStyleParam();


        for (const _param of _node.params)
        {
            let index = this.params.findIndex(p => p.id == _param[1]);

            if (_param.id != 'font')
                this.params[index].loadParam(_param);
        }
    }
}