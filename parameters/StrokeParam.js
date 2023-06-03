class   StrokeParam
extends Parameter
{
    defaultValue;

    oldValue = null;
    

    _warningOverlay;
    
    forceShowWarning = false;
    warningStyle;

    
    checkersHolder;
    checkers;

    //controlWrapper;


    text;

   
    
    get valueText() { return this.controls[0].valueText; }
    set valueText(text) 
    {
        this.controls[0].valueText = text;
        this.controls[0].update();
    }

    
    value;
    

    
    constructor(id,
                name, 
                showName,
                hasInput,
                hasOutput,
                defaultValue = StrokeValue.NaN)
    {
        super(STROKE_VALUE, id, name);

        this.checkersHolder = createDiv();
        this.checkers       = createDiv();

        //this.controlWrapper = createDiv();


        this.controls.push(new ColorControl(
            this,
            this.id,
            'color', 
            defaultValue.fill.color)); 

        this.controls[0].showColor = false;


        this.defaultValue                           = defaultValue;
        this.value                                  = defaultValue;


        this.text                                   = createDiv();

        this.text.style.position                    = 'absolute';
        this.text.style.left                        = 0;
        this.text.style.top                         = 0;
        this.text.style.width                       = '100%';
        this.text.style.height                      = defParamHeight - 4;
        this.text.style.background                  = 'transparent';
        this.text.style.fontFamily                  = 'Inter';
        this.text.style.fontSize                    = 11;
        this.text.style.fontWeight                  = '600';
        this.text.style.fontStyle                   = 'italic';
        this.text.style.textAlign                   = 'center';
        this.text.style.paddingTop                  = '4px';

        this.text.addEventListener('pointerdown', e => 
        {
            if (e.button != 1) 
                e.stopPropagation();
        });

        
        this._warningOverlay                        = createDiv('colorValueWarningOverlay');
        this._warningOverlay.style.zIndex           = 11;

        this.div.appendChild(this._warningOverlay);


        this.checkersHolder.style.position          = 'absolute';
        this.checkersHolder.style.width             = '100%';
        this.checkersHolder.style.height            = defParamHeight;
        this.checkersHolder.style.overflow          = 'hidden';

        this.checkers.style.position                = 'absolute';
        this.checkers.style.width                   = '100%';
        this.checkers.style.height                  = defParamHeight;


        // this.controlWrapper.style.position          = 'relative';
        // this.controlWrapper.style.display           = 'inline-block';
        // this.controlWrapper.style.width             = '100%';
        // this.controlWrapper.style.height            = defParamHeight;
        //this.controlWrapper.style.zIndex            = 100;


        this.controls[0].successOnFocusOut          = true;
        this.controls[0].div.style.display          = 'inline';
        this.controls[0].div.style.width            = '100%';
        this.controls[0].div.style.position         = 'absolute';
        this.controls[0].div.style.left             = 0;

   
        this.controls[0].text.style.transform       = 'translateX(-50%)';


        this.controls[0].textbox.style.position     = 'absolute';
        this.controls[0].textbox.style.left         =  0;
        this.controls[0].textbox.style.transform    = 'translateX(0)';
        this.controls[0].textbox.style.textAlign    = 'right';
        this.controls[0].textbox.style.paddingLeft  =  14;


        //this.controlWrapper.appendChild(this.controls[0].div);
        
        this.checkersHolder.appendChild(this.checkers);
        this.div.appendChild(this.checkersHolder);

        //this.div.appendChild(this.controlWrapper);

        this.div.appendChild(this.text);

       
        if (hasInput)  this.initInput([STROKE_VALUE, FILL_VALUE, COLOR_VALUE], getParamInputValuesForUndo, this.input_getBackInitValue);
        if (hasOutput) this.initOutput([STROKE_VALUE], this.output_genRequest, getParamOutputValuesForUndo, this.output_backInit);
    }



    input_getBackInitValue()
    {
        // 'this' is the input

        return this.param.value;
    }



    output_backInit(value)
    {
        // 'this' is the output

        console.assert(value.type == STROKE_VALUE, 'expected STROKE_VALUE in backInit()');
        
        this.param.setValue(value, false, true, false);
    }



    setValue(value, createAction, updateControl = true, dispatchEvents = true) 
    {
        if (!(value instanceof StrokeValue))
            console.assert(false, 'StrokeParam.setValue(value) is ' + typeof value + ', must be a StrokeValue');

        console.assert(
               value.type 
            && value.type == STROKE_VALUE, 
            'StrokeParam value.type must be STROKE_VALUE');


        this.preSetValue(value, createAction, dispatchEvents);


        this.value = value.copy();


        if (updateControl)
            this.controls[0].setValue(this.value.fill.color, false, false); 


        super.setValue(this.value, createAction, updateControl, dispatchEvents);


        this.oldValue = this.value;
    }    



    isVisible()
    {
        return this.controls[0].div.style.display != 'none';
    }



    resetControls()
    {
        this.controls[0].valueText = '';
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
            // request.push(...pushInputOrParam(this.input, gen));

            // if (   this.input.connectedOutput.support( FILL_TYPES)
            //     || this.input.connectedOutput.support(COLOR_TYPES))
            // {
            //     const val = noNaN(this.controls[0].value,      1);
            //     const dec = noNaN(this.controls[0].displayDec, 0);
                
            //     request.push(
            //         NUMBER_VALUE, 
            //         new NumberValue(val, dec).toString());
            // }

            if (this.input.connectedOutput.supportsTypes([STROKE_VALUE, FILL_VALUE, COLOR_VALUE]))
                request.push(...pushInputOrParam(this.input, gen));
            else
                console.assert(false, 'invalid input for StrokeParam (' + this.node.id + ')');
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
        checkControlVisible(this, this.controls[0]);
        //checkControlVisible(this, this.controls[1]);


        const noColor = 
            darkMode
            ? rgbNoColorDark
            : rgbNoColorLight;


        const rgba       = this.value.fill.toRgba();

        const rgbaStripe = rgb_a(getStripeBackColor(rgba), rgba[3]);
        const rgbaBack   = rgbaStripe;
        const rgbaText   = getTextColorFromBackColor(rgbaStripe, rgba[3]);


        //this.controlWrapper.style.background =
        //      !rgbaIsNaN(rgbaBack) 
        //    && this.value.fill.opacity.isValid()
        //    ? rgba2style(rgbaBack)
        //    : noColorStyle(rgbaBack);//'transparent'; 


        this.updateWarningOverlay();


        this.div.style.background = 'transparent';//noColorStyle(rgba);


        this.text.innerHTML = 'stroke ' + this.value.weight.value;

        this.text.style.color = rgba2style(rgbaText);


        if (this.input)
        {
            this.input.colorLight  = 
            this.input.colorDark   = rgb_a(rgbaText, 0.2);
            this.input.wireColor   = !rgbaIsNaN(rgbaBack) ? rgbaBack : noColor;
        }

        if (this.output)
        {
            this.output.colorLight =
            this.output.colorDark  = rgb_a(rgbaText, 0.2);
            this.output.wireColor  = !rgbaIsNaN(rgbaBack) ? rgbaBack : noColor;
        }


        this.checkers.style.background = 
            darkMode
            ?   'linear-gradient(-45deg, #222 25%, transparent 25%, transparent 75%, #222 75%), '
              + 'linear-gradient(-45deg, #222 25%, transparent 25%, transparent 75%, #222 75%)'
            :   'linear-gradient(-45deg, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%), '
              + 'linear-gradient(-45deg, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%)';

        this.checkers.style.display            = this.value.isValid() ? 'inline-block' : 'none';
        this.checkers.style.backgroundColor    = darkMode ? '#444' : '#fff';
   
        this.checkers.style.backgroundSize     = '22px 22px';
        this.checkers.style.backgroundPosition = '0 0, 11px 11px';
   
        this.checkers.style.left               = '-3.5px';
        this.checkers.style.width              = 'calc(100% + 3.5px)';
        
        
        this.controls[0].backStyleLight        = 
        this.controls[0].backStyleDark         = 'transparent';
         
        this.controls[0].textStyleLight        = 
        this.controls[0].textStyleDark         = rgba2style(rgbaText);


        // this.controls[1].backStyleLight        = 
        // this.controls[1].backStyleDark         = 'transparent';


        // this.controls[1].textStyleLight        = 
        // this.controls[1].textStyleDark         = rgba2style(rgbaText);

        this.controls[0].update();
        //this.controls[1].update();


        this.controls[0].text.innerHTML = '';


        if (this.input ) this.input .updateControl();
        if (this.output) this.output.updateControl();
    }



    setName(name, dispatchEvents = true)
    {
        super.setName(name, dispatchEvents);
        this.controls[0].setName(name);
    }



    isDefault = () => this.value.equals(this.defaultValue);



    // textboxHasFocus()
    // {
    //     return hasFocus(this.controls[0].textbox)
    //         || hasFocus(this.controls[1].textbox);
    // }



    enableControlText(enable)
    {
        //enable &= !this.input || !this.input.connected;

        // const opEnable = 
        //         enable 
        //     || !this.input 
        //     || !this.input.connected;
            //||  this.input.connectedOutput.supportsTypes(COLOR_TYPES);

        enableElementText(this.controls[0].div, false);//enable);
        //enableElementText(this.controls[1].div, enable);//opEnable);
        
        this.controls[0].readOnly = true;//!enable;
        //this.controls[1].readOnly = !enable;//opEnable;
    }
    
    
    
    updateWarningOverlay() 
    {
        //console.log(this.id + '.updateWarningOverlay()');

        const rgba = this.value.fill.toRgba();

        if (!rgbaIsNaN(rgba))
        {
            if (  !rgbaIsValid(rgba)
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


        const [warnStyle1, warnStyle2] = getWarningStyles(colBack);

        this._warningOverlay.style.background =
                rgbIsOk(colBack)
            && !this.forceShowWarning
            ? 'transparent'
            : getWarningGradient(7.8, warnStyle2, warnStyle1);

               
        this._warningOverlay.style.backgroundPosition = '0 0';
        this._warningOverlay.style.backgroundSize     = 'calc(100% + 27.6px) 100%';
        this._warningOverlay.style.display            = 'block';
    }
    
    
    
    loadParam(_param)
    {
        this.setValue(parseStrokeValue(_param[2])[0], true, true, false);
    }
}