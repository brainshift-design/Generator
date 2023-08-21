class   ColorParam
extends Parameter
{
    defaultValue;

    oldValue = null;

    
    _warningOverlay;
    
    forceShowWarning = false;
    warningStyle;


    showColorBack = true;


    checkers;
    

    
    get valueText() { return this.controls[0].valueText; }
    set valueText(text) 
    {
        this.controls[0].valueText = text;
        this.controls[0].update();
    }

    
    get value() { return this.controls[0].value; }
    

    
    constructor(id,
                name, 
                showName,
                hasInput,
                hasOutput,
                defaultValue = ColorValue.fromRgb([0x80, 0x80, 0x80]),
                dragScale    = 0.05)
    {
        super(COLOR_VALUE, id, name, showName);

        this.defaultValue = defaultValue;


        this.controls.push(new ColorControl(
            this,
            this.id,
            this.name, 
            defaultValue,   
            dragScale)); 

        this.controls[0].successOnFocusOut = true;
        //this.controls[0].div.style.position        = '100';
        //this.controls[0].div.style.zIndex        = 100;

        this.controls[0].div.style.display = 'inline-block';
        this.controls[0].div.style.width   = '100%';

        
        this._warningOverlay = createDiv('colorValueWarningOverlay');
        this._warningOverlay.style.zIndex  = 21;

        
        this.controls[0].backStyleLight    = 
        this.controls[0].backStyleDark     = 'transparent';
        
        
        this.checkers                      = createDiv();
        
        this.checkers.style.position       = 'absolute';
        this.checkers.style.width          = '100%';
        this.checkers.style.height         = '20px';
        this.checkers.style.display        = 'none';
        this.checkers.style.pointerEvents  = 'none';
        
        
        this.div.appendChild(this._warningOverlay);
        this.div.appendChild(this.checkers);

        this.divControls.appendChild(this.controls[0].div);

       
        if (hasInput)  this.initInput ([COLOR_VALUE], getParamInputValuesForUndo, this.input_getBackInitValue);
        if (hasOutput) this.initOutput([COLOR_VALUE], this.output_genRequest, getParamOutputValuesForUndo, this.output_backInit);


        this.controls[0].addEventListener('confirm', () => 
        {
            this.setValue(this.controls[0].value, true, false); 
        });


        this.controls[0].addEventListener('finishedit', e =>
        { 
            if (!e.detail.success)
                return;

            
            let rgb;

            if (   e.detail.value.trim() != ''
                && e.detail.value != e.detail.oldValue)
            {
                const colorName = e.detail.value.toLowerCase();

                if (   colorName == 'rnd'
                    || colorName == 'random'
                    || getEditDistance(colorName, 'random') <= 2)
                {
                    skipRandom(Date.now() % 10);  const r = Math.random();
                    skipRandom(Date.now() % 10);  const g = Math.random();
                    skipRandom(Date.now() % 10);  const b = Math.random();

                    rgb = [r, g, b];
                }
                else
                {
                               let webColor = webColors.find(wc => wc.name.toLowerCase() == colorName);
                    if (!webColor) webColor = webColors.find(wc => getEditDistance(wc.name.toLowerCase(), colorName) <= 2);
                    
                    if (webColor) e.detail.value = webColor.color;

                    rgb = validHex2rgb(e.detail.value);
                }


                const val = ColorValue.fromRgb(scaleRgb(rgb));

                this.setValue(val, true);
                e.preventSetValue = true;
            }
        });
    }



    input_getBackInitValue()
    {
        // 'this' is the input

        return this.param.value;
    }



    output_backInit(value)
    {
        // 'this' is the output

        if (value.type == FILL_VALUE)
            value = value.color;

        this.param.setValue(value, false, true, false);
    }



    setName(name, dispatchEvents = true)
    {
        super.setName(name, dispatchEvents);
        this.controls[0].setName(name);
    }



    isDefault = () => this.value.equals(this.defaultValue);



    isVisible()
    {
        return this.controls[0].div.style.display != 'none';
    }



    resetControls()
    {
        this.controls[0].valueText = '';
    }



    setValue(value, createAction, updateControl = true, dispatchEvents = true) 
    {
        consoleAssert(
               value.type 
            && value.type == COLOR_VALUE, 
            'value.type must be COLOR_VALUE');
            
        this.preSetValue(value, createAction, dispatchEvents);

        this.controls[0].value = value.copy();

        if (updateControl)
            this.controls[0].setValue(this.controls[0].value, true, false); 


        super.setValue(value, createAction, updateControl, dispatchEvents);


        this.oldValue = this.value.copy();
    }    



    genRequest(gen)
    {
        // this function exists because a parameter without an output
        // should still be able to generate a request
        
        // 'this' is the param

        if (    this.output
            && !isEmpty(this.output.cache)
            &&  gen.passedNodes.includes(this.node))
            return this.output.cache;


        const request = [];


        if (   this.input
            && this.input.connected)
            request.push(...pushInputOrParam(this.input, gen));

        else request.push( 
            COLOR_VALUE, 
            this.value.toString());


        return request;
    }



    output_genRequest(gen)
    {
        return this.param.genRequest(gen);
    }



    updateControls()
    {
        this.updateWarningOverlay();


        const showColorBack = 
                this.showColorBack
            && !this.isUnknown() 
            && !this.node.isUnknown();


        const noColor = 
            darkMode
            ? rgbNoColorDark
            : rgbNoColorLight;


        const rgb       = this.value.toRgb();

        const rgbStripe = getStripeBackColor(rgb);
        const rgbBack   = rgbStripe;
        const rgbText   = getTextColorFromBackColor(rgbStripe);


        this.controls[0].textStyleLight = 
        this.controls[0].textStyleDark  = 
            showColorBack
            ? rgba2style(rgbText)
            : darkMode
              ? this.textStyleDark
              : this.textStyleLight;


        super.updateControls(false);


        if (this.input)
        {
            this.input.colorLight  = 
            this.input.colorDark   =  rgb_a(rgbText, 0.2);
            this.input.wireColor   = !rgbIsNaN(rgbStripe) ? rgbStripe : noColor;
        }

        if (this.output)
        {
            this.output.colorLight =
            this.output.colorDark  =  rgb_a(rgbText, 0.2);
            this.output.wireColor  = !rgbIsNaN(rgbStripe) ? rgbStripe : noColor;
        }


        this.div.style.background = 
            showColorBack
            ? (!rgbIsNaN(rgbBack)
               ? rgb2style(rgbBack)
               : rgb2style(rgbDocumentBody))
            : darkMode
              ? this.backStyleDark
              : this.backStyleLight;
    }



    textboxHasFocus()
    {
        return hasFocus(this.controls[0].textbox);
    }



    enableControlText(enable, unknown = false)
    {
        enable &= 
               !this.input 
            || !this.input.connected;

        //enableElementText(this.divName, enable, false);
        enableElementText(this.controls[0].div, enable);
        
        this.controls[0].readOnly = !enable;

        this.updateValueText();


        this.controls[0].valueText = 
               unknown
            ||    this.input 
               && this.input.isUncached()
               && this.node.hasMultipliedOutputs()
               //&& this.output && this.output.isMultiplied()
            ? UNKNOWN_DISPLAY
            : '';
    }
    
    
    
    updateValueText()
    {
        let unknown = false;

        if (   this.input
            && this.input.connected)
        {
            if (   this.input.isUncached()
                && this.node.hasMultipliedOutputs())
                unknown = true;
        }


        if (unknown)
            this.controls[0].valueText = UNKNOWN_DISPLAY;

        this.controls[0].showBar = !unknown;
    }



    updateWarningOverlay() 
    {
        //console.log(this.id + '.updateWarningOverlay()');

        const rgb = this.value.toRgb();

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
            ? defParamHeight //this.div.offsetHeight
            : height;


        const [warnStyle1, warnStyle2] = getWarningStyles(colBack);

        this._warningOverlay.style.background =
                rgbIsOk(colBack)
            && !this.forceShowWarning
            ? 'transparent'
            : getWarningGradient(7.8, warnStyle1, warnStyle2);


        this._warningOverlay.style.backgroundPosition = '-3px 0';
        this._warningOverlay.style.backgroundSize     = 'calc(100% + 8px) 100%';
        this._warningOverlay.style.display            = 'block';
    }
    
    
    
    loadParam(_param)
    {
        this.setValue(parseColorValue(_param[2])[0], true, false, false);
    }
}