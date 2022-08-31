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


        const colors = this.getHeaderColors();

        this.header.style.background = 
            this.canShowColor()
            ? rgb2style(colors.back)
            : 'transparent';//isDarkMode()
            //   ? '#888088ee'
            //   : '#ead8eaee';


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



    getHeaderColors()
    {
        const colBack = 
            dataColorIsNaN(this._color)
            ? rgb_NaN
            : dataColor2rgb(this._color);

        const darkBack = 
              !this.canShowColor()
            || isDark(colBack);

            
        const colText = 
            this.canShowColor()
            ? (darkBack 
               ? [1, 1, 1, 0.7] 
               : [0, 0, 0, 0.6])
            : (isDarkMode()
               ? [1, 1, 1, 0.7]
               : [0, 0, 0, 0.6]);

        const textStyle = rgba2style(colText);

        
        const colInput  = colText;
        const colOutput = colText;


        return {
            back:      colBack, 
            text:      colText,
            darkBack:  darkBack,
            textStyle: textStyle,
            input:     colInput,
            output:    colOutput };
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
                    this.warningStyle = this.getDefaultWarningStyle(rgb);

                this.updateWarningOverlayStyle(rgb);
            }
            else
                this._warningOverlay.style.display = 'none';
        }
        else
        {
            this.resetWarningStyle();
            this.updateWarningOverlayStyle(rgb_NaN);
        }
    }



    getDefaultWarningStyle(colBack)
    {
        return rgba2style(
            isDark(colBack) 
            ? [1, 1, 1, 0.2 ]
            : [0, 0, 0, 0.12]); 
    }



    resetWarningStyle()
    {
        this.warningStyle = 
            isDarkMode()
            ? '#ffffff08' //rgba2style([0.3, 0.55, 0.3, 0.2])
            : '#00000006';//rgba2style([0.5, 1, 0.5, 0.2]);        
    }



    canShowColor()
    {
        return dataColorIsValid(this._color);
    }



    updateWarningOverlayStyle(colBack, height = -1)
    {
        //console.log('colBack =', colBack);
        
        this._warningOverlay.style.height = 
            height < 0
            ? this.header.offsetHeight
            : height;

        this._warningOverlay.style.background =
               !rgbIsNaN  (colBack)
            &&  rgbIsValid(colBack)
            && !this.forceShowWarning
            ? 'transparent'
            : 'repeating-linear-gradient('
               + '-45deg, '
               + 'transparent 0 7px,'
               +  this.warningStyle + ' 7px 14px)';

        this._warningOverlay.style.display = 'block';
    }
}