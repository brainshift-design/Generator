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
        super.updateValues(updateParamId, paramIds, values);
        
        this.updateHeader();
    }



    updateHeader()
    {
        //console.log(this.id + '.OpColorBase.updateHeader()');


        const colors = this.getHeaderColors();

        this.header.style.background = 
            this.canShowColor()//isValidDataColor(this._color)//this.canShowColor()
            ? colorStyleRgb(colors.back)
            : '#ead8eaee';


        const noColor = [0.7, 0.7, 0.7];

        for (const input of this.inputs.filter(i => !i.param))
        {
            input.wireColor = this.canShowColor() ? colors.back : noColor;
            input.color     = colors.input;
        }


        for (const output of this.outputs.filter(i => !i.param))
        {
            output.wireColor = this.canShowColor() ? colors.back : noColor;
            output.color     = colors.output;
        }


        this.updateWarningOverlay();


        super.updateHeader();
    }



    // updateHeaderLabel()
    // {
    //     this.label.style.color = this.getHeaderColors().textStyle;
    // }



    getHeaderColors()
    {
        const colBack = 
            dataColorIsNaN(this._color)
            ? color_NaN
            : dataColor2rgb(this._color);

        const darkText = 
              !this.canShowColor()
            || rgb2hclokl(colBack)[2] > 0.71;

            
        const ba = Math.min((this.header.over ? 14 : 1) * (isValidRgb(colBack) ? 0.03 : 0.22), 0.5);
        const wa = Math.min((this.header.over ? 14 : 1) * (isValidRgb(colBack) ? 0.03 : 0.14), 0.5);

        const colText = 
            this.canShowColor()
            ? (darkText 
               ? [0, 0, 0, ba] 
               : [1, 1, 1, wa])
            : [0, 0, 0, 1];

        const textStyle = colorStyleRgba(colText);

        
        const colInput  = this.canShowColor() ? colText : [0, 0, 0, 0.12];
        const colOutput = this.canShowColor() ? colText : [0, 0, 0, 0.1 ];


        return {
            back:      colBack, 
            text:      colText,
            darkText:  darkText,
            textStyle: textStyle,
            input:     colInput,
            output:    colOutput };
    }



    updateWarningOverlay() 
    {
        //console.log(this.id + '.updateWarningOverlay()');

        if (this.canShowColor())
        {
            const rgb = dataColor2rgb(this._color);

            if (   !isValidRgb(rgb)
                || this.forceShowWarning)
            {
                if (!this.forceShowWarning)
                    this.warningStyle = this.getDefaultWarningStyle(rgb);

                this.updateWarningOverlayStyle(rgb);
            }
            else
                this._warningOverlay.style.display = 'none';
        }
        else
        {
            this.resetWarningStyle();
            this.updateWarningOverlayStyle(color_NaN);
        }
    }



    getDefaultWarningStyle(colBack)
    {
        return colorStyleRgba(
            isDark(colBack) 
            ? [0, 0, 0, 0.12]  
            : [1, 1, 1, 0.2 ]);
    }



    resetWarningStyle()
    {
        this.warningStyle = colorStyleRgba([0.5, 1, 0.5, 0.2]);        
    }



    canShowColor()
    {
        return isValidDataColor(this._color);
    }



    updateWarningOverlayStyle(colBack, height = -1)
    {
        //console.log('colBack =', colBack);
        
        this._warningOverlay.style.height = 
            height < 0
            ? this.header.offsetHeight
            : height;

        this._warningOverlay.style.background =
               isValidRgb(colBack)
            && !this.forceShowWarning
            ? 'transparent'
            : 'repeating-linear-gradient('
              + '-45deg, '
              + 'transparent 0 7px,'
              +  this.warningStyle + ' 7px 14px)';

        this._warningOverlay.style.display = 'block';
    }
}