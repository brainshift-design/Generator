class OpColorBase
extends Operator
{
    _color = ['rgb', 0.5, 0.5, 0.5];

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


        this.updateWarningOverlay();


        // for (const output of this.outputs)
        //     for (const input of output.connectedInputs)
        //         if (input.connection)
        //             input.connection.wire.updateStyle(input.connection.wire.getColor());
    }



    updateHeader()
    {
        const colBack  = dataColor2rgb(this._color);
        const darkText = rgb2hclokl(colBack)[2] > 0.71;
        const satBias  = Math.min(Math.max(0, ((rgb2hsv(invalid2validRgb(colBack))[1] - 0.7) / 0.3), 1));
        
        const colText = 
            darkText 
            ? [0, 0, 0, 0.24 * (1 + satBias)] 
            : [1, 1, 1, 0.4  * (1 + satBias)];


        // this.inputs [0].wireColor    = colBack;
        // this.outputs[0].wireColor    = colBack;
           
        // this.inputs [0].color        = colText;
        // this.outputs[0].color        = colText;
        
        // this.paramSpace.input .color = colText;
        // this.paramSpace.output.color = colText;


        for (const input of this.inputs.filter(i => !i.param))
        {
            input.wireColor = colBack;
            input.color     = colText;
            
            //input.updateControl();
        }


        for (const output of this.outputs.filter(i => !i.param))
        {
            output.wireColor = colBack;
            output.color     = colText;

            //output.updateControl();
        }


        if (   this.inputs[0].isConnected 
            || this.inputs[1].isConnected)
        {
            const colText   = darkText 
                              ? [0, 0, 0, (isValidRgb(colBack) ? 0.12 : 0.4 ) * (1 + satBias)] 
                              : [1, 1, 1, (isValidRgb(colBack) ? 0.14 : 0.35) * (1 + satBias)];
            
            const textStyle = colorStyleRgba(colText);
    
            this.label .style.color      = textStyle;
            this.header.style.background = colorStyleRgb(colBack);

            this.inputs [0].color        = colText;
            this.inputs [1].color        = colText;
            this.outputs[0].color        = colText;
            this.outputs[0].wireColor    = colBack;
        }
        else 
        {
            this.label .style.color      = 'black';
            this.header.style.background = '#ead8eaee';
        }


        super.updateHeader();
    }



    updateWarningOverlay() 
    { 
        if (!isDataColorNaN(this._color))
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



    updateWarningOverlayStyle(colBack, warningStyle, height = 38)
    {
        // log(this.name + '.OpColorBase.updateWarningOverlayStyle()');
        // log('colBack =', colBack);

        log(height);
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