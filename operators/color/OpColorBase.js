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
    }



    // updateNode()
    // {
    //     super.updateNode();


    //     // for (const output of this.outputs)
    //     //     for (const input of output.connectedInputs)
    //     //         if (input.connection)
    //     //             input.connection.wire.updateStyle(input.connection.wire.getColor());
    // }



    updateHeader()
    {
        //log(this.name + '.OpColorBase.updateHeader()');

        const [colBack,, colInput, colOutput,,] = this.getHeaderColors();


        for (const input of this.inputs.filter(i => !i.param))
        {
            input.wireColor = colBack;
            input.color     = colInput;
        }


        for (const output of this.outputs.filter(i => !i.param))
        {
            output.wireColor = colBack;
            output.color     = colOutput;
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
        const [,,,,, textStyle] = this.getHeaderColors();
        
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
               : [1, 1, 1, (isValidRgb(colBack) ? 0.06 : 0.14) * (1 + 2*satBias)])
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
        //log(this.name + '.OpColorBase.updateWarningOverlay()');
        
        if (this.canShowColor())
        {
            const colBack = dataColor2rgb(this._color);
            
            if (  !isValidRgb(colBack)
                || this.forceShowWarning)
            {
                if (!this.forceShowWarning)
                    this.warningStyle = colorStyleRgba(
                        isDark(colBack) 
                        ? [0, 0, 0, 0.12]  
                        : [1, 1, 1, 0.2 ]);

                this.updateWarningOverlayStyle(colBack);
            }
            else
                this._warningOverlay.style.display = 'none';
        }
        else
        {
            this.warningStyle = colorStyleRgba([0.5, 1, 0.5, 0.2]);
            this.updateWarningOverlayStyle(color_NaN);
        }
    }



    canShowColor()
    {
        return !isDataColorNaN(this._color);
    }



    updateWarningOverlayStyle(colBack, height = 38)
    {
        this._warningOverlay.style.height = height;

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