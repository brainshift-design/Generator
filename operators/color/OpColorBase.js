class OpColorBase
extends Operator
{
    _color = dataColor_NaN;

    _warningOverlay;
    
    forceShowWarning = false;
    warningStyle;
    


    constructor(nodeType, shortType, defWidth = 100, progressBar = false)
    {
        super(nodeType, shortType, defWidth, progressBar);


        this._warningOverlay = createDiv('colorWarningOverlay');
        this._warningOverlay.style.zIndex = 1;
        this.inner.appendChild(this._warningOverlay);


        this.header.addEventListener('pointerenter', () => { this.header.over = true;  this.updateHeader(); });
        this.header.addEventListener('pointerleave', () => { this.header.over = false; this.updateHeader(); });
    }



    invalidate()
    {
        super.invalidate();

        //this._color = dataColor_NaN;
    }



    // updateValues(requestId, actionId, updateParamId, paramIds, values)
    // {
    //     //logFunction('OpColorBase.updateValues()');

    //     super.updateValues(requestId, actionId, updateParamId, paramIds, values);
        
    //     //this.updateHeader();
    // }



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
            !rgbIsNaN(colors.stripeBack) //  rgbIsOk(colors.back)
            ? rgb2style(colors.stripeBack)
            : rgba2style(rgb_a(rgbDocumentBody, 0.95));
            //: 'transparent';

        // this.colorBack.style.backgroundImage = 
        //     this.isUnknown()
        //     ? 'url(\'data:image/svg+xml;utf8,<svg width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 8.65341V8.54545C3.00758 7.84091 3.07765 7.2803 3.21023 6.86364C3.34659 6.44697 3.53977 6.10985 3.78977 5.85227C4.03977 5.5947 4.34091 5.35985 4.69318 5.14773C4.92045 5.00379 5.125 4.8428 5.30682 4.66477C5.48864 4.48674 5.63258 4.2822 5.73864 4.05114C5.8447 3.82008 5.89773 3.56439 5.89773 3.28409C5.89773 2.94697 5.81818 2.6553 5.65909 2.40909C5.5 2.16288 5.28788 1.97348 5.02273 1.84091C4.76136 1.70455 4.4697 1.63636 4.14773 1.63636C3.85606 1.63636 3.57765 1.69697 3.3125 1.81818C3.04735 1.93939 2.82765 2.12879 2.65341 2.38636C2.47917 2.64015 2.37879 2.9678 2.35227 3.36932H0.625C0.651515 2.6875 0.823864 2.11174 1.14205 1.64205C1.46023 1.16856 1.88068 0.810606 2.40341 0.568181C2.92992 0.325757 3.51136 0.204545 4.14773 0.204545C4.8447 0.204545 5.45455 0.335227 5.97727 0.596591C6.5 0.854166 6.9053 1.21591 7.19318 1.68182C7.48485 2.14394 7.63068 2.68371 7.63068 3.30114C7.63068 3.72538 7.56439 4.10795 7.43182 4.44886C7.29924 4.78598 7.10985 5.08712 6.86364 5.35227C6.62121 5.61742 6.32955 5.85227 5.98864 6.05682C5.66667 6.25758 5.4053 6.46591 5.20455 6.68182C5.00758 6.89773 4.86364 7.15341 4.77273 7.44886C4.68182 7.74432 4.63258 8.10985 4.625 8.54545V8.65341H3ZM3.85795 12.108C3.54735 12.108 3.2803 11.9981 3.05682 11.7784C2.83333 11.5549 2.72159 11.286 2.72159 10.9716C2.72159 10.661 2.83333 10.3958 3.05682 10.1761C3.2803 9.95265 3.54735 9.84091 3.85795 9.84091C4.16477 9.84091 4.42992 9.95265 4.65341 10.1761C4.88068 10.3958 4.99432 10.661 4.99432 10.9716C4.99432 11.1799 4.94129 11.3712 4.83523 11.5455C4.73295 11.7159 4.59659 11.8523 4.42614 11.9545C4.25568 12.0568 4.06629 12.108 3.85795 12.108Z" fill="white"/></svg>\')'
        //     : 'none';


        // this.colorBack.style.boxShadow =
        //     this.isUnknown()
        //     ? '0 0 0 1px ' + rgb2style(colors.border) + ' inset'
        //     : 'none';


        for (const input of this.headerInputs)
        {
            input.colorLight =
            input.colorDark  = colors.input;

            input.wireColor  = colors.wire;
        }


        for (const output of this.headerOutputs)
        {
            output.colorLight = 
            output.colorDark  = colors.output;

            output.wireColor  = colors.wire;
        }


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
        const noColor = 
            isDarkMode()
            ? rgbNoColorDark
            : rgbNoColorLight;


        const rgbBack = 
            dataColorIsNaN(this._color)
            ? rgb_NaN
            : dataColor2rgb(this._color);

            
        let rgbStripeBack = [...rgbBack];
        
        const factor = this.getWarningFactor(rgbBack);

        if (factor > 0)
        {
            const hcl = rgb2hsv(clipRgb(rgbBack));
            hcl[1] /= 3;

            rgbStripeBack = rgbLerp(rgbBack, hsv2rgb(hcl), factor);
        }


        const rgbaBorder = rgb_a(rgbHeaderFromType(this.type, this.active), 0.95);

        const rgbText  = getTextColorFromBackColor(rgbStripeBack);
        //const rgbLabel = getTextColorFromBackColor(clipRgb(rgbBack));

        const rgbaWire = 
            !rgbIsNaN(rgbStripeBack)   
            ? rgbStripeBack 
            : noColor;

        return {
            back:       rgb_a(rgbBack, 1), 
            stripeBack: rgb_a(rgbStripeBack, 1),
            border:     rgbaBorder,
            text:       rgb_a(rgbText, 0.9),
            //label:    rgb_a(rgbLabel, 0.9),
            input:      rgb_a(rgbText, 0.2),
            output:     rgb_a(rgbText, 0.2),
            wire:       rgbaWire };
    }



    updateWarningOverlay() 
    {
        //console.log(this.id + '.updateWarningOverlay()');

        const colors = this.getHeaderColors();
        

        if (!rgbIsNaN(colors.back))
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
            //rgb = rgbDocumentBody;//this.getDefaultBackColor();

            this.warningStyle = getDefaultWarningStyle(colors.back);
            this.updateWarningOverlayStyle(colors.back);
        }
    }



    updateWarningOverlayStyle(colBack, height = -1)
    {
        this._warningOverlay.style.height = 
            height < 0
            ? this.header.offsetHeight
            : height;


        const hclBack = rgb2hclokl(colBack);

        const hclBack1 = [...hclBack];
        const hclBack2 = [...hclBack];

        hclBack1[0] += 1/12;  if (hclBack1[0] > 1) hclBack1[0] -= 1;
        hclBack2[0] -= 1/12;  if (hclBack2[0] < 0) hclBack2[0] += 1;


        const altBack1   = rgb_a(clipRgb(hclokl2rgb(hclBack1)), 0.35);
        const altBack2   = rgb_a(clipRgb(hclokl2rgb(hclBack2)), 0.35);

        const colWarning = getDefaultWarningRgba(colBack);
        const factor     = this.getWarningFactor(colBack);

        const colWarn1   = rgbaLerp(colWarning, altBack1, factor);
        const colWarn2   = rgbaLerp(colWarning, altBack2, factor);
        
        const warnStyle1 = rgba2style(colWarn1);
        const warnStyle2 = rgba2style(colWarn2);

        
        this._warningOverlay.style.background =
                rgbIsOk(colBack)
            && !this.forceShowWarning
            ? 'transparent'
            : 'repeating-linear-gradient('
               + '-45deg, '
               + 'transparent 0 7px,'
               +  warnStyle1 + ' 7px 14px,'
               + 'transparent 14px 21px,'
               +  warnStyle2 + ' 21px 28px)';

        this._warningOverlay.style.display = 'block';
    }



    getWarningFactor(colBack)
    {
        let dr, dg, db;

        if (colBack[0] < 0) dr = -colBack[0]; else if (colBack[0] > 1) dr = colBack[0] - 1; else dr = 0;
        if (colBack[1] < 0) dg = -colBack[1]; else if (colBack[1] > 1) dg = colBack[1] - 1; else dg = 0;
        if (colBack[2] < 0) db = -colBack[2]; else if (colBack[2] > 1) db = colBack[2] - 1; else db = 0;
        
        const d   = [dr, dg, db].sort()[1];
        const avg = (dr + dg + db) / 3;

        const factor = Math.min((d + avg) / 2, 1);

        // if (this.id == 'color')
        // {
        //     console.log('colBack =', colBack);
        //     console.log('dr     =', dr);
        //     console.log('dg     =', dg);
        //     console.log('db     =', db);
        //     console.log('d      =', d);
        //     console.log('avg    =', avg);
        //     console.log('factor =', factor);
        //     console.log('');
        // }

        return factor;
    }
}