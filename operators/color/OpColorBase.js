class OpColorBase
extends Operator
{
    _color = dataColor_NaN;

    _warningOverlay;
    
    forceShowWarning = false;
    warningStyle;
    


    constructor(nodeType, shortType, type, defWidth = 80)
    {
        super(nodeType, shortType, type, defWidth);


        this._warningOverlay = createDiv('colorWarningOverlay');
        this._warningOverlay.style.zIndex = 1;
        this.inner.appendChild(this._warningOverlay);


        this.header.addEventListener('pointerenter', () => { this.header.over = true;  this.updateHeader(); });
        this.header.addEventListener('pointerleave', () => { this.header.over = false; this.updateHeader(); });
    }



    updateValues(updateParamId, paramIds, values)
    {
        //logFunction('OpColorBase.updateValues()');

        super.updateValues(updateParamId, paramIds, values);
        
        this.updateHeader();
    }



    updateHeader()
    {
        //console.log(this.id + '.OpColorBase.updateHeader()');

        super.updateHeader();


        const colors = this.getHeaderColors();


        this.header.style.background = 
              rgbIsOk(colors.back)
            ? rgb2style(colors.back)
            : 'transparent';


        for (const input of this.inputs.filter(i => !i.param))
        {
            input.colorLight =
            input.colorDark  = colors.input;

            input.wireColor  = colors.wire;
        }


        for (const output of this.outputs.filter(o => !o.param))
        {
            output.colorLight = 
            output.colorDark  = colors.output;

            output.wireColor  = colors.wire;
        }


        this.updateWarningOverlay();
    }



    getHeaderColors()
    {
        const noColor = 
            isDarkMode()
            ? rgbNoColorDark
            : rgbNoColorLight;

        const rgbBack = 
            dataColorIsNaN(this._color)
            ? rgb_NaN
            : dataColor2rgb(this._color);
            
        const rgbText = getTextColorFromBackColor(rgbBack);

        const rgbaWire = 
            !rgbIsNaN(rgbBack)   
            ? rgbBack 
            : noColor;

        return {
            back:   rgb_a(rgbBack, 1  ), 
            text:   rgb_a(rgbText, 0.9),
            input:  rgb_a(rgbText, 0.2),
            output: rgb_a(rgbText, 0.2),
            wire:   rgbaWire };
    }



    updateWarningOverlay() 
    {
        //console.log(this.id + '.updateWarningOverlay()');

        const rgb = dataColor2rgb(this._color);

        if (!rgbIsNaN(rgb))
        {
            if (  !rgbIsValid(rgb)
                || this.forceShowWarning)
            {
                if (!this.forceShowWarning)
                    this.warningStyle = getDefaultWarningStyle(rgb);

                this.updateWarningOverlayStyle(rgb);
            }
            else
                this._warningOverlay.style.display = 'none';
        }
        else
        {
            this.warningStyle = getDefaultWarningStyle(rgb);
            this.updateWarningOverlayStyle(rgb);
        }
    }



    updateWarningOverlayStyle(colBack, height = -1)
    {
        //console.log('colBack =', colBack);
        
        this._warningOverlay.style.height = 
            height < 0
            ? this.header.offsetHeight
            : height;

        this._warningOverlay.style.background =
                rgbIsOk(colBack)
            && !this.forceShowWarning
            ? 'transparent'
            : 'repeating-linear-gradient('
               + '-45deg, '
               + 'transparent 0 7px,'
               +  this.warningStyle + ' 7px 14px)';

        this._warningOverlay.style.display = 'block';
    }
}