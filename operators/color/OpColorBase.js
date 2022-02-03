class OpColorBase
extends Operator
{
    _color = dataColor_NaN;

    _warningOverlay;
    


    constructor(opType, shortType, dataType, defWidth = 80)
    {
        super(opType, shortType, dataType, defWidth);


        this._warningOverlay = createDiv('colorWarningOverlay');
        this._warningOverlay.style.zIndex = 1;
        this.inner.appendChild(this._warningOverlay);
    }



    updateNode()
    {
        super.updateNode();


        // for (const output of this.outputs)
        //     for (const input of output.connectedInputs)
        //         if (input.connection)
        //             input.connection.wire.updateStyle(input.connection.wire.getColor());
    }



    updateHeader()
    {
        log(this.name + '.OpColorBase.updateHeader()');

        const [colBack, , colText, textStyle] = this.getHeaderColors();

        log('colText', colText);

        for (const input of this.inputs.filter(i => !i.param))
        {
            input.wireColor = colBack;
            input.color     = colText;
        }


        for (const output of this.outputs.filter(i => !i.param))
        {
            output.wireColor = colBack;
            output.color     = colText;
        }


        this.header.style.background = 
            this.canShowColor()
            ? colorStyleRgb(colBack)
            : '#ead8eaee';


        this.updateHeaderLabel();
        this.updateWarningOverlay();


        super.updateHeader();
    }



    updateHeaderLabel()
    {
        const [ , , , textStyle] = this.getHeaderColors();
        this.label.style.color = textStyle;
    }



    getHeaderColors()
    {
        const colBack  = dataColor2rgb(this._color);
        const darkText = rgb2hclokl(colBack)[2] > 0.71;

        const satBias  = Math.min(Math.max(0, ((rgb2hclokl(invalid2validRgb(colBack))[1] - 0.8) / 0.2), 1));

        const colText = 
            this.canShowColor()
            ? (darkText 
               ? [0, 0, 0, (isValidRgb(colBack) ? 0.06 : 0.22) * (1 + 0*satBias)] 
               : [1, 1, 1, (isValidRgb(colBack) ? 0.06 : 0.14 ) * (1 + 2*satBias)])
            : [0, 0, 0];
        
        const textStyle = colorStyleRgba(colText);

        return [
            colBack, 
            darkText, 
            colText,
            textStyle ];
    }



    updateWarningOverlay() 
    { 
        if (this.canShowColor())
        {
            const colBack = dataColor2rgb(this._color);
            
            if (!isValidRgb(colBack))
            {
                const colWarning = 
                    isDark(colBack) 
                    ? [0, 0, 0, 0.12]  
                    : [1, 1, 1, 0.2 ];

                this.updateWarningOverlayStyle(colBack, colorStyleRgba(colWarning));
            }
            else
                this._warningOverlay.style.display = 'none';
        }
        else
            this.updateWarningOverlayStyle(color_NaN, colorStyleRgba([0.5, 1, 0.5, 0.2]));
    }



    canShowColor()
    {
        return !isDataColorNaN(this._color);
    }



    updateWarningOverlayStyle(colBack, warningStyle, height = 38)
    {
        this._warningOverlay.style.height = height;

        this._warningOverlay.style.background =
            isValidRgb(colBack)
            ? 'transparent'
            : 'repeating-linear-gradient('
              + '-45deg, '
              + 'transparent 0 7px,'
              +  warningStyle + ' 7px 14px)';

        this._warningOverlay.style.display = 'block';
    }
}