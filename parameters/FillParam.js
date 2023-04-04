class   FillParam
extends Parameter
{
    defaultValue;

    oldValue = null;
    

    _warningOverlay;
    
    forceShowWarning = false;
    warningStyle;


    checkers;
    controlWrapper;

   
    
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
        super(FILL_VALUE, id, name);

        this.checkers       = createDiv();
        this.controlWrapper = createDiv();


        this.controls.push(new ColorControl(
            null,
            this,
            this.id,
            'color', 
            showName,
            defaultValue.color,   
            dragScale)); 

        this.controls[0].showColor = false;


        this.controls.push(new NumberControl(
            null,
            this,
            this.id,
            'opacity', 
            false,
            defaultValue.opacity.value,
            0,
            100,
            0));
        
        this.controls[1].setSuffix('%', true);


        this.controls[0].div.zIndex                 = 0;
        this.controls[1].div.zIndex                 = 0;
                   
        this.defaultValue                           = defaultValue;
        this.value                                  = defaultValue;

        
        this._warningOverlay                        = createDiv('colorWarningOverlay');
        this._warningOverlay.style.zIndex           = 21;

        this.div.appendChild(this._warningOverlay);


        this.checkers.style.position                = 'absolute';
        this.checkers.style.width                   = '100%';
        this.checkers.style.height                  = '20px';


        this.controlWrapper.style.position          = 'relative';
        this.controlWrapper.style.display           = 'inline-block';
        this.controlWrapper.style.width             = '100%';
        this.controlWrapper.style.height            = '20px';
        this.controlWrapper.style.zIndex            = 1;


        this.controls[0].successOnFocusOut          = true;
        this.controls[0].div.style.display          = 'inline';
        this.controls[0].div.style.width            = '60%';
        this.controls[0].div.style.position         = 'absolute';
        this.controls[0].div.style.left             = 0;

    
        this.controls[1].successOnFocusOut          = true;
        this.controls[1].div.style.display          = 'inline';
        this.controls[1].div.style.width            = '40%';
        this.controls[1].div.style.position         = 'absolute';
        this.controls[1].div.style.right            = 0;


        this.controls[0].text.style.transform       = 'translateX(-41%)';

        this.controls[1].text.style.transform       = 'translateX(-68%) \
                                                       translateY(-50%)';


        this.controls[0].textbox.style.position     = 'absolute';
        this.controls[0].textbox.style.left         =  0;
        this.controls[0].textbox.style.width        = '60%';
        this.controls[0].textbox.style.transform    = 'translateX(0)';
        this.controls[0].textbox.style.textAlign    = 'right';
        this.controls[0].textbox.style.paddingLeft  =  11;
        
        this.controls[1].textbox.style.position     = 'absolute';
        this.controls[1].textbox.style.right        =  0;
        this.controls[1].textbox.style.width        = '40%';
        this.controls[1].textbox.style.transform    = 'translateX(25%)';
        this.controls[1].textbox.style.textAlign    = 'left';
        this.controls[1].textbox.style.paddingRight =  10;


        this.controlWrapper.appendChild(this.controls[0].div);
        this.controlWrapper.appendChild(this.controls[1].div);
        
        this.div.appendChild(this.checkers);
        this.div.appendChild(this.controlWrapper);

       
        if (hasInput)  this.initInput([...FILL_TYPES, ...COLOR_TYPES]);
        if (hasOutput) this.initOutput([FILL_VALUE], this.output_genRequest);



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
            // if (this.input.connectedOutput.supportsTypes(COLOR_TYPES))
            // {
            //     request.push(
            //         FILL_VALUE,
            //         FillValue.fromRgb(
            //             scaleRgb(dataColor2rgb(this.input.connectedOutput.node._color)), 0xff)
            //             .toString());
            // }
            // else if (this.input.connectedOutput.supportsTypes(FILL_TYPES))
                
            if (   this.input.connectedOutput.supportsTypes(COLOR_TYPES)
                || this.input.connectedOutput.supportsTypes(FILL_TYPES ))
                request.push(...pushInputOrParam(this.input, gen));
            else
                console.assert(false, 'invalid input for FillParam');
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
        checkControlVisible(this, this.controls[0]);
        checkControlVisible(this, this.controls[1]);


        const noColor = 
            darkMode
            ? rgbNoColorDark
            : rgbNoColorLight;

        const rgbaVal  = this.value.toRgba();
        const rgbaText = getTextColorFromBackColor(rgbaVal, 1);//rgbaVal[3]);


        const fillStyle = rgba2style(rgb_a(rgbaVal, this.controls[1].value/100));

        this.controlWrapper.style.background = 
              !rgbaIsNaN(rgbaVal) 
            && this.value.opacity.isValid()
            ?  fillStyle 
            : 'transparent'; 


        this.updateWarningOverlay();


        if (!rgbaIsNaN(rgbaVal))
            this.div.style.background = 'transparent';
        else
        {
            this.div.style.background =
                darkMode
                ? 'rgba(56, 56, 56, 0.95)'
                : 'rgba(255, 255, 255, 0.95)';

        }


        if (this.input)
        {
            this.input.colorLight  = 
            this.input.colorDark   = rgb_a(rgbaText, 0.2);
            this.input.wireColor   = !rgbaIsNaN(rgbaVal) ? rgbaVal : noColor;
        }

        if (this.output)
        {
            this.output.colorLight =
            this.output.colorDark  = rgb_a(rgbaText, 0.2);
            this.output.wireColor  = !rgbaIsNaN(rgbaVal) ? rgbaVal : noColor;
        }


        this.checkers.style.background = 
            darkMode
            ?   'linear-gradient(45deg, #222 25%, transparent 25%, transparent 75%, #222 75%), '
              + 'linear-gradient(45deg, #222 25%, transparent 25%, transparent 75%, #222 75%)'
            :   'linear-gradient(45deg, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%), '
              + 'linear-gradient(45deg, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%)';

        this.checkers.style.display            = this.value.isValid() ? 'inline-block' : 'none';
        this.checkers.style.backgroundColor    = darkMode ? '#444' : '#fff';

        this.checkers.style.backgroundSize     = '20px 20px';
        this.checkers.style.backgroundPosition = '0 0, 10px 10px';

        
        this.controls[0]. backStyleLight   = 
        this.controls[0]. backStyleDark    = 
        this.controls[0].valueStyleLight   = 
        this.controls[0].valueStyleDark    = 'transparent';

        this.controls[0].textStyleLight    = 
        this.controls[0].textStyleDark     = rgba2style(rgbaText);


        this.controls[1]. backStyleLight = 
        this.controls[1]. backStyleDark  = 
        this.controls[1].valueStyleLight = 
        this.controls[1].valueStyleDark  = 'transparent';

        this.controls[1].textbox.style.color      = rgba2style(rgbaText);
        this.controls[1].textbox.style.background = 'transparent';


        this.controls[1].textStyleLight  = 
        this.controls[1].textStyleDark   = rgba2style(rgbaText);

        this.controls[0].update();
        this.controls[1].update();


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
    
    
    
    loadParam(_param)
    {
        this.setValue(parseFillValue(_param[2])[0], true, true, false);
    }
}