class OpColorBase
extends Operator
{
    _color = dataColor_NaN;

    _warningOverlay;

    
    forceShowWarning = false;
    warningStyle;
    


    constructor(opType, shortType, dataType, defWidth = 80)
    {
        super(opType, shortType, dataType, defWidth);


        this._warningOverlay = createDiv('colorWarningOverlay');
        this._warningOverlay.style.zIndex = 1;
        this.inner.appendChild(this._warningOverlay);


        this.header.addEventListener('pointerenter', () => { this.header.over = true;  this.updateHeader(); });
        this.header.addEventListener('pointerleave', () => { this.header.over = false; this.updateHeader(); });
    }



    updateHeader()
    {
        //log(this.idName + '.OpColorBase.updateHeader()');


        const [colBack,, colInput, colOutput,,] = this.getHeaderColors();

        this.header.style.background = 
            this.canShowColor()
            ? colorStyleRgb(colBack)
            : '#ead8eaee';


        const noColor = [0.7, 0.7, 0.7];

        for (const input of this.inputs.filter(i => !i.param))
        {
            input.wireColor = this.canShowColor() ? colBack : noColor;
            input.color     = colInput;
        }


        for (const output of this.outputs.filter(i => !i.param))
        {
            output.wireColor = this.canShowColor() ? colBack : noColor;
            output.color     = colOutput;
        }


        this.updateHeaderLabel();
        this.updateWarningOverlay();


        super.updateHeader();
    }



    updateHeaderLabel()
    {
        const [,,,,, textStyle] = this.getHeaderColors();
        
        this.label.style.color = textStyle;
    }



    getHeaderColors()
    {
        const colBack = 
            dataColorIsNaN(this._color)
            ? color_NaN
            : dataColor2rgb(this._color);

        const darkText = 
               !this.canShowColor()
            || rgb2hclokl(colBack)[2] > 0.71;

        const satBias = Math.min(Math.max(0, ((rgb2hclokl(invalid2validRgb(colBack))[1] - 0.8) / 0.2), 1));

        const ba = Math.min((this.header.over ? 6   : 1) * (isValidRgb(colBack) ? 0.06 : 0.22) * (1 + 0*satBias), 0.5);
        const wa = Math.min((this.header.over ? 3.5 : 1) * (isValidRgb(colBack) ? 0.06 : 0.14) * (1 + 2*satBias), 0.5);

        const colText = 
            this.canShowColor()
            ? (darkText 
               ? [0, 0, 0, ba] 
               : [1, 1, 1, wa])
            : [0, 0, 0, 1];

        const colInput  = this.canShowColor() ? colText : [0, 0, 0, 0.12];
        const colOutput = this.canShowColor() ? colText : [0, 0, 0, 0.1 ];

        const textStyle = colorStyleRgba(colText);

        return [
            colBack, 
            darkText,
            colInput,
            colOutput, 
            colText,
            textStyle ];
    }



    updateWarningOverlay() 
    {
        //log(this.idName + '.updateWarningOverlay()');
        
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
        return !isDataColorNaN(this._color);
    }



    updateWarningOverlayStyle(colBack, height = -1)
    {
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