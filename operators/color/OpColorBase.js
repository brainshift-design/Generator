class OpColorBase
extends Operator
{
    _color = dataColor_NaN;

    _warningOverlay;
    
    rgbaBack;

    forceShowWarning = false;
    warningStyle;
    


    constructor(type, id, name, icon, progressBar = false, defWidth = defNodeWidth)
    {
        super(type, id, name, icon, defWidth, progressBar);

        this.showActiveArrow = true;
        

        this._warningOverlay = createDiv('colorWarningOverlay');
        //this._warningOverlay.style.zIndex = 1;
        
        this.inner.appendChild(this._warningOverlay);


        this.header.addEventListener('pointerenter', () => { this.header.over = true;  });
        this.header.addEventListener('pointerleave', () => { this.header.over = false; });
    }



    canAutoConnectFrom(output)
    {
        return this.inputs[0].canConnectFrom(output);
    }



    updateHeader()
    {
        //console.log(this.id + '.OpColorBase.updateHeader()');

        super.updateHeader();


        const colors = this.getHeaderColors();

        this.header.style.background = 
            !rgbIsNaN(colors.colorBack)
            ? rgb2style(colors.colorBack)
            : rgba2style(rgb_a(rgbDocumentBody, 0.95));

            
        this.updateWarningOverlay();
    }



    updateHeaderLabel()
    {
        super.updateHeaderLabel();
        
        const colors = this.getHeaderColors();
        this.label.style.color = rgba2style(colors.text);
    }



    getHeaderColors(options = {})
    {
        let rgbBack = 
            dataColorIsNaN(this._color)
            ? rgb_NaN
            : dataColor2rgb(this._color);

            
        if (   this.outputs.length > 0
            && isListValueType(this.outputs[0].types[0]))
            rgbBack = darkMode ? hex2rgb('888f') : hex2rgb('aaaf');
            
        let rgbStripeBack = getStripeBackColor(rgbBack);
        

        const rgbaBorder = rgb_a(rgbFromType(this.type, this.active), 0.95);
        const rgbText    = getTextColorFromBackColor(rgbStripeBack);

        return {
            back:      rgb_a(rgbBack), 
            colorBack: rgb_a(rgbStripeBack),
            border:    rgbaBorder,
            text:      rgb_a(rgbText, 0.9) };
    }



    getHeaderInputColor()
    {
        if (    this.rgbaBack
            && !rgbaIsNaN(this.rgbaBack))
        {
            if (this.rgbaBack[3] < getTransparentThreshold())
            {
                return darkMode
                     ? [1, 1, 1, 0.25]
                     : [0, 0, 0, 0.2 ];
            }
            else
                return rgb_a(this.rgbaBack);
        }
        else
            return darkMode
                 ? rgbNoColorDark
                 : rgbNoColorLight;
    }



    getHeaderOutputColor()
    {
        if (    this.rgbaBack
            && !rgbaIsNaN(this.rgbaBack))
        {
            if (this.rgbaBack[3] < getTransparentThreshold())
            {
                return darkMode
                     ? [1, 1, 1, 0.2]
                     : [0, 0, 0, 0.2];
            }
            else
                return rgb_a(this.rgbaBack);
        }
        else
            return darkMode
                 ? rgbNoColorDark
                 : rgbNoColorLight;
    }



    getInputWireColor()
    {
        if (    this.rgbaBack
            && !rgbaIsNaN(this.rgbaBack))
            return rgb_a(this.rgbaBack);

        else
            return darkMode
                 ? rgbNoColorDark
                 : rgbNoColorLight;
    }



    getOutputWireColor()
    {
        if (    this.rgbaBack
            && !rgbaIsNaN(this.rgbaBack)
            && !this.isUnknown())
            return rgb_a(this.rgbaBack);
        else
            return darkMode
                 ? rgbNoColorDark
                 : rgbNoColorLight;
    }



    updateWarningOverlay() 
    {
        //console.log(this.id + '.updateWarningOverlay()');

        const colors = this.getHeaderColors();
        

        if (!rgbaIsNaN(colors.back))
        {
            if (  !rgbIsValid(colors.back)
                || this.forceShowWarning)
            {
                if (!this.forceShowWarning)
                    this.warningStyle = getDefaultWarningStyle(colors.back);

                this.updateWarningOverlayStyle(colors.back);
            }
            else
                this._warningOverlay.style.display = 'none';
        }
        else
        {
            this.warningStyle = getDefaultWarningStyle(colors.back);
            this.updateWarningOverlayStyle(colors.back);
        }
    }



    updateWarningOverlayStyle(colBack, height = -1)
    {
        this._warningOverlay.style.height = 
            (height < 0
             ? this.measureData.headerOffset.height
             : height)
            + 'px';

            
        const [warnStyle1, warnStyle2] = getWarningStyles(colBack);

        this._warningOverlay.style.background =
                rgbaIsOk(colBack)
            && !this.forceShowWarning
            ? 'transparent'
            : getWarningGradient(7.8, warnStyle1, warnStyle2);

            this._warningOverlay.style.backgroundPosition = '-6px 0';
            this._warningOverlay.style.backgroundSize     = 'calc(100% + 11px) 100%';
            this._warningOverlay.style.display            = 'block';
    }
}