class   StrokeParam
extends Parameter
{
    defaultValue;

    oldValue = null;
    

    _warningOverlay;
    
    forceShowWarning = false;
    warningStyle;


    checkers;

    textControl;
    control;

    
    // get valueText() { return this.colorControl.valueText; }

    
    value;
    

    
    constructor(id,
                name, 
                hasInput,
                hasOutput,
                defaultValue = StrokeValue.NaN)
    {
        super(STROKE_VALUE, id, name);


        this.checkers                     = createDiv();

        this.textControl                  = createDiv('colorControlText');

        this.controls.push(new NumberControl(
            createDiv(),
            this,
            this.id,
            'stroke', 
            true,
            defaultValue.weight.value,
            0));


        this.controls[0].setWidth(100);

        
        this.defaultValue                 = defaultValue;
        this.value                        = defaultValue;

        
        this.checkers.style.position      = 'absolute';
        this.checkers.style.width         = '100%';
        this.checkers.style.height        = '20px';

        this.textControl.style.width      = '100%';
        this.textControl.style.textAlign  = 'center';

        this._warningOverlay = createDiv('colorWarningOverlay');
        this._warningOverlay.style.zIndex = 21;
        this.div.appendChild(this._warningOverlay);


        this.controls[0].style.position       = 'absolute';
        this.controls[0].style.display        = 'block';
        this.controls[0].style.width          = '100%';
        this.controls[0].style.height         = '20px';


        this.div.appendChild(this.checkers);

        this.div.appendChild(this.textControl);
        this.div.appendChild(this.controls[0].div);

       
        if (hasInput)  this.initInput([...STROKE_TYPES, ...FILL_TYPES, ...COLOR_TYPES]);
        if (hasOutput) this.initOutput([STROKE_VALUE], this.output_genRequest);


        this.controls[0].addEventListener('confirm', () => 
        { 
            const value = this.value.copy();

            value.weight = new NumberValue(
                this.controls[0].value, 
                this.controls[0].dec);

            this.setValue(value, true, false);
        });
    }



    // setName(name, dispatchEvents = true)
    // {
    //     super.setName(name, dispatchEvents);
    //     this.colorControl.setName(name);
    // }



    isDefault = () => this.value.equals(this.defaultValue);



    setValue(value, createAction, updateControl = true, dispatchEvents = true) 
    {
        //console.log('value =', value);
        
        if (!(value instanceof StrokeValue))
            console.assert(false, 'StrokeParam.setValue(value) is ' + typeof value + ', must be a StrokeValue');


        console.assert(
               value.type 
            && value.type == STROKE_VALUE, 
            'StrokeParam value.type must be STROKE_VALUE');

        this.preSetValue(value, createAction, dispatchEvents);


        this.value = value.copy();


        if (updateControl)
        {
            this.controls[0].setDecimals(
                this.value.weight.decimals, 
                this.value.weight.decimals);
                
            this.controls[0].setValue(this.value.weight.value, false, false); 
        }


        super.setValue(this.value, createAction, updateControl, dispatchEvents);


        this.oldValue = this.value;
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
        {
            request.push(...pushInputOrParam(this.input, gen));

            if (   this.input.connectedOutput.support( FILL_TYPES)
                || this.input.connectedOutput.support(COLOR_TYPES))
            {
                const val = noNaN(this.controls[0].value,      1);
                const dec = noNaN(this.controls[0].displayDec, 0);
                
                request.push(
                    NUMBER_VALUE, 
                    new NumberValue(val, dec).toString());
            }
        }

        else request.push( 
            STROKE_VALUE, 
            this.value.toString());

        return request;
    }



    output_genRequest(gen)
    {
        return this.param.genRequest(gen);
    }



    updateControls()
    {
        if (   this.input.connected
            && this.value.isValid())
        {
            const noColor = 
                darkMode
                ? rgbNoColorDark
                : rgbNoColorLight;

            const rgbaVal = this.value.fill.toRgba();
            const rgbaText = getTextColorFromBackColor(rgbaVal, rgbaVal[3]);


            //this.input.wireColor   = !rgbIsNaN(rgbaVal) ? rgbaVal : noColor;
            this.input.colorLight  = 
            this.input.colorDark   = rgb_a(rgbaText, 0.2);

            //this.output.wireColor  = !rgbIsNaN(rgbaVal) ? rgbaVal : noColor;
            this.output.colorLight =
            this.output.colorDark  = rgb_a(rgbaText, 0.2);


            this.checkers.style.background =
                darkMode
                ?   'linear-gradient(45deg, #222 25%, transparent 25%, transparent 75%, #222 75%), '
                  + 'linear-gradient(45deg, #222 25%, transparent 25%, transparent 75%, #222 75%)'
                :   'linear-gradient(45deg, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%), '
                  + 'linear-gradient(45deg, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%)';

            this.checkers.style.display            = 'inline-block';
            this.checkers.style.backgroundColor    = darkMode ? '#444' : '#fff';

            this.checkers.style.backgroundSize     = '20px 20px';
            this.checkers.style.backgroundPosition = '0 0, 10px 10px';

            
            this.controls[0].style.display     = 'inline-block';
            
            this.controls[0]. backStyleLight   = 
            this.controls[0]. backStyleDark    = 
            this.controls[0].valueStyleLight   = 
            this.controls[0].valueStyleDark    = rgba2style(rgbaVal);

            this.controls[0].textStyleLight    = 
            this.controls[0].textStyleDark     = rgba2style(rgbaText);

            this.controls[0].update();
            

            this.textControl.style.display = 'none';

            this.updateWarningOverlay();
        }
        else
        {
            const noColor  = darkMode ? rgbNoColorDark      : rgbNoColorLight;
            const rgbaText = darkMode ? rgbaNoColorTextDark : rgbaNoColorTextLight;


            //this.input.wireColor           = noColor;
            this.input.colorLight          = 
            this.input.colorDark           = rgb_a(rgbaText, 0.12);
        
            //this.output.wireColor          = noColor;
            this.output.colorLight         =
            this.output.colorDark          = rgb_a(rgbaText, 0.12);


            this.checkers.style.display    = 'none';
            this.controls[0].style.display = 'none';
            
            this.textControl.style.display = 'inline-block';
            this.textControl.style.color   = rgba2style(rgbaText);

            this.textControl.innerHTML     = 'no stroke';
            
            this.div.style.background =
                darkMode
                ? 'rgba(56, 56, 56, 0.95)'
                : 'rgba(255, 255, 255, 0.95)';
        }


        this.div.style.height = '20px';


        if (this.input ) this.input .updateControl();
        if (this.output) this.output.updateControl();
    }



    // textboxHasFocus()
    // {
    //     return hasFocus(this.weightControl.textbox)
    //         || hasFocus(this.   fitControl.textbox)
    //         || hasFocus(this.  joinControl.textbox);
    // }



    enableControlText(enable)
    {
        enable &= !this.input || !this.input.connected;

        const opEnable = 
                enable 
            || !this.input 
            || !this.input.connected 
            ||  this.input.connectedOutput.support( FILL_TYPES)
            ||  this.input.connectedOutput.support(COLOR_TYPES);

        enableElementText(this.textControl, enable);
        enableElementText(this.controls[0].div, opEnable);

        this.controls[0].readOnly = !enable;
        this.controls[1].readOnly = !opEnable;
    }
    
    
    
    updateWarningOverlay() 
    {
        //console.log(this.id + '.updateWarningOverlay()');

        const rgba = this.value.fill.toRgba();

        if (!rgbIsNaN(rgba))
        {
            if (  !rgbIsValid(rgba)
                || this.forceShowWarning)
            {
                if (!this.forceShowWarning)
                    this.warningStyle = getDefaultWarningStyle(rgba);

                this.updateWarningOverlayStyle(rgba);
            }
            else
                this._warningOverlay.style.display = 'none';
        }
        else
        {
            this.warningStyle = getDefaultWarningStyle(rgba);
            this.updateWarningOverlayStyle(rgba);
        }
    }



    updateWarningOverlayStyle(colBack, height = -1)
    {
        //console.log('colBack =', colBack);
        
        this._warningOverlay.style.height = 
            height < 0
            ? this.div.offsetHeight
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
    
    

    loadParam(param)
    {
        this.setValue(parseStrokeValue(param)[0], true, true, false);
    }
}