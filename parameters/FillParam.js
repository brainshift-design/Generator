class   FillParam
extends Parameter
{
    defaultValue;

    oldValue = null;
    

    _warningOverlay;
    
    forceShowWarning = false;
    warningStyle;


    checkersHolder;
    checkers;


        
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
                defaultValue = FillValue.NaN,
                dragScale    = 0.05)
    {
        super(FILL_VALUE, id, name, showName);

        this.checkersHolder = createDiv();
        this.checkers       = createDiv();


        this.controls.push(new ColorControl(
            this,
            this.id,
            'color', 
            defaultValue.color,   
            dragScale)); 


        this.controls.push(new NumberControl(
            this,
            this.id,
            'opacity', 
            defaultValue.opacity.value,
            0,
            100,
            0));
        
        this.controls[1].setSuffix('%', true);


        this.defaultValue                  = defaultValue;
        this.value                         = defaultValue;

        
        this._warningOverlay               = createDiv('colorValueWarningOverlay');
        this._warningOverlay.style.zIndex  = 11;

        this.checkersHolder.style.position = 'absolute';
        this.checkersHolder.style.width    = '100%';
        this.checkersHolder.style.height   = defParamHeight;
        this.checkersHolder.style.overflow = 'hidden';

        this.checkers.style.position       = 'absolute';
        this.checkers.style.width          = '100%';
        this.checkers.style.height         = defParamHeight;


        this.controls[1].showBar                    = false;


        this.divControls   .appendChild(this.controls[0].div);
        this.divControls   .appendChild(this.controls[1].div);
        
        this.checkersHolder.appendChild(this.checkers);

        this.div           .insertBefore(this.checkersHolder,  this.divName);
        this.div           .insertBefore(this._warningOverlay, this.divName);

       
        if (hasInput)  this.initInput ([FILL_VALUE, COLOR_VALUE], getParamInputValuesForUndo, this.input_getBackInitValue);
        if (hasOutput) this.initOutput([FILL_VALUE], this.output_genRequest, getParamOutputValuesForUndo, this.output_backInit);



        this.controls[0].addEventListener('change', () =>
        { 
            this.setValue(new FillValue(
                this.controls[0].value, 
                new NumberValue(this.controls[1].value, this.controls[1].dec)), 
                true, false);

            this.changing = true;
        });



        this.controls[0].addEventListener('confirm', () =>
        { 
            this.changing = false;
        });



        this.controls[0].addEventListener('finishedit', e =>
        { 
            if (!e.detail.success)
                return;

            if (   e.detail.value.trim() != ''
                && e.detail.value != e.detail.oldValue)
            {
                const webColor = webColors.find(wc => wc.name.toLowerCase() == e.detail.value.toLowerCase());
                if (webColor) e.detail.value = webColor.color;

                const  rgb = validHex2rgb(e.detail.value);
                const _rgb = scaleRgb(rgb);

                this.setValue(FillValue.fromRgb(_rgb, this.controls[1].value), true);
                
                e.preventSetValue = true;
            }
        });



        this.controls[1].addEventListener('change', () =>
        {
            this.setValue(new FillValue(
                this.controls[0].value, 
                new NumberValue(this.controls[1].value, this.controls[1].dec)), 
                true, false);

            this.changing = true;
        });



        this.controls[1].addEventListener('confirm', () =>
        { 
            this.changing = false;
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

        console.assert(value.type == FILL_VALUE, 'expected FILL_VALUE in backInit()');
        
        this.param.setValue(value, false, true, false);
    }



    setValue(value, createAction, updateControl = true, dispatchEvents = true) 
    {
        //console.log('FillParam.setValue value =', value);
        if (!(value instanceof FillValue))
            console.assert(false, 'FillParam.setValue(value) is ' + typeof value + ', must be a FillValue');

        console.assert(
               value.type 
            && value.type == FILL_VALUE, 
            'FillParam value.type must be FILL_VALUE');


        this.preSetValue(value, createAction, dispatchEvents);


        this.value = value.copy();


        if (updateControl)
        {
            this.controls[0].setValue(this.value.color,         false, false); 
            this.controls[1].setValue(this.value.opacity.value, false, false, false); 
        }


        super.setValue(this.value, createAction, updateControl, dispatchEvents);


        this.oldValue = this.value;
    }    



    isVisible()
    {
        return this.controls[0].div.style.display != 'none'
            || this.controls[1].div.style.display != 'none';
    }



    resetControls()
    {
        this.controls[0].valueText = '';
        this.controls[1].valueText = '';
    }



    genRequest(gen)
    {
        super.updateControls(false);


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
            if (this.input.connectedOutput.supportsTypes([FILL_VALUE, COLOR_VALUE]))
                request.push(...pushInputOrParam(this.input, gen));
            else
                console.assert(false, 'invalid input for FillParam (' + this.node.id + ')');
        }

        else request.push( 
            FILL_VALUE, 
            this.value.toString());


        return request;
    }



    output_genRequest(gen)
    {
        return this.param.genRequest(gen);
    }



    updateControls()
    {
        super.updateControls();


        checkParamVisible(this);


        const noColor = 
            darkMode
            ? rgbNoColorDark
            : rgbNoColorLight;


        const rgba       = this.value.toRgba();

        const rgbaStripe = rgb_a(getStripeBackColor(rgba), rgba[3]);
        const rgbaBack   = rgbaStripe;
        const rgbaText   = getTextColorFromBackColor(rgbaStripe, rgba[3]);


        this.updateWarningOverlay();


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


        this.checkers.style.display               = this.value.isValid() ? 'inline-block' : 'none';
        this.checkers.style.backgroundColor       = darkMode ? '#444' : '#fff';
         
        this.checkers.style.backgroundSize        = '22px 22px';
        this.checkers.style.backgroundPosition    = '0 0, 11px 11px';
         
        this.checkers.style.left                  = '-3.5px';
        this.checkers.style.width                 = 'calc(100% + 3.5px)';
              
              
        this.controls[0].backStyleLight           = 
        this.controls[0].backStyleDark            = 'transparent';
               
        this.controls[0].textStyleLight           = 
        this.controls[0].textStyleDark            = rgba2style(rgbaText);
      
      
        this.controls[1].backStyleLight           = 
        this.controls[1].backStyleDark            = 'transparent';
   
   
        this.controls[1].textStyleLight           = 
        this.controls[1].textStyleDark            = rgba2style(rgbaText);
   
        this.controls[0].div.style.position       = 'absolute';
        this.controls[1].div.style.position       = 'absolute';
   
        this.controls[0].div.style.left           = '0';
        this.controls[1].div.style.left           = '55%';
   
        this.controls[0].div.style.width          = '55%';
        this.controls[1].div.style.width          = '45%';

        this.controls[0].textbox.style.background = 'transparent';
        this.controls[1].textbox.style.background = 'transparent';


        this.div.style.background                 = rgb2style(rgbaBack);
        this.checkers.style.opacity               = 1 - rgbaBack[3];
    }



    setName(name, dispatchEvents = true)
    {
        super.setName(name, dispatchEvents);
        this.controls[0].setName(name);
    }



    isDefault = () => 
    {
        this.value.equals(this.defaultValue);
    };



    // textboxHasFocus()
    // {
    //     return hasFocus(this.controls[0].textbox)
    //         || hasFocus(this.controls[1].textbox);
    // }



    enableControlText(enable)
    {
        enable &= !this.input || !this.input.connected;

        // const opEnable = 
        //         enable 
        //     || !this.input 
        //     || !this.input.connected;
            //||  this.input.connectedOutput.supportsTypes(COLOR_TYPES);

        enableElementText(this.controls[0].div, enable);
        enableElementText(this.controls[1].div, enable);//opEnable);
        
        this.controls[0].readOnly = !enable;
        this.controls[1].readOnly = !enable;//opEnable;
    }
    
    
    
    updateWarningOverlay() 
    {
        //console.log(this.id + '.updateWarningOverlay()');

        const rgba = this.value.toRgba();

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
    
    
    
    formatControlTextbox(control)
    {
        control.textbox.style.left = 
            control == this.controls[0]
            ? this.divControls.offsetLeft
            : this.divControls.offsetLeft + this.controls[0].div.offsetWidth;
     
        
        control.textbox.style.top       = this.div        .offsetTop;

        control.textbox.style.width     = control.div.offsetWidth;
        control.textbox.style.height    = defParamHeight;
        
        control.textbox.style.textAlign = 'center';
    }



    loadParam(_param)
    {
        this.setValue(parseFillValue(_param[2])[0], true, true, false);
    }
}