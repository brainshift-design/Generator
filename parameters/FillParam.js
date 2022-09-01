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

    colorControl;
    opacityControl;
    
    
    get valueText() { return this.colorControl.valueText; }
    set valueText(text) 
    {
        this.colorControl.valueText = text;
        this.colorControl.update();
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
        super(FILL, id, name);

        this.checkers              = createDiv();
        this.controlWrapper        = createDiv();

        this.colorControl          = createDiv();
        this.opacityControl        = createDiv();
        
        this.  colorControl.param  = this;
        this.opacityControl.param  = this;

        this.  colorControl.zIndex = 0;
        this.opacityControl.zIndex = 0;
   
        this.defaultValue          = defaultValue;
        this.value                 = defaultValue;

        
        this._warningOverlay = createDiv('colorWarningOverlay');
        this._warningOverlay.style.zIndex = 21;
        this.div.appendChild(this._warningOverlay);


        initColorControl(
            this,
            this.colorControl,
            120, // width
            20,  // height
            this.id,
            'color', 
            showName,
            defaultValue.color,   
            dragScale); 

        this.colorControl.showColor = false;


        initNumberControl(
            this,
            this.opacityControl,
            120, // width
            20,  // height
            this.id,
            'opacity', 
            false,
            0,
            100,
            defaultValue.opacity.value,
            0);

        this.opacityControl.setSuffix('%', true);


        this.checkers.style.position                   = 'absolute';
        this.checkers.style.width                      = '100%';
        this.checkers.style.height                     = '20px';


        this.controlWrapper.style.position             = 'relative';
        this.controlWrapper.style.display              = 'inline-block';
        this.controlWrapper.style.width                = '100%';
        this.controlWrapper.style.height               = '20px';
        this.controlWrapper.style.zIndex               = 1;


        this.  colorControl.successOnFocusOut          = true;
        this.  colorControl.style.display              = 'inline';
        this.  colorControl.style.width                = '60%';
        this.  colorControl.style.position             = 'absolute';
        this.  colorControl.style.left                 = 0;

    
        this.opacityControl.successOnFocusOut          = true;
        this.opacityControl.style.display              = 'inline';
        this.opacityControl.style.width                = '40%';
        this.opacityControl.style.position             = 'absolute';
        this.opacityControl.style.right                = 0;


        this.  colorControl.text.style.transform       = 'translateX(-40%)';
        this.opacityControl.text.style.transform       = 'translateX(-70%)';


        this.  colorControl.textbox.style.position     = 'absolute';
        this.  colorControl.textbox.style.left         =  0;
        this.  colorControl.textbox.style.width        = '60%';
        this.  colorControl.textbox.style.transform    = 'translateX(0)';
        this.  colorControl.textbox.style.textAlign    = 'right';
        this.  colorControl.textbox.style.paddingLeft  =  11;
        
        this.opacityControl.textbox.style.position     = 'absolute';
        this.opacityControl.textbox.style.right        =  0;
        this.opacityControl.textbox.style.width        = '40%';
        this.opacityControl.textbox.style.transform    = 'translateX(25%)';
        this.opacityControl.textbox.style.textAlign    = 'left';
        this.opacityControl.textbox.style.paddingRight =  10;


        this.controlWrapper.appendChild(this.  colorControl);
        this.controlWrapper.appendChild(this.opacityControl);
        
        this.div.appendChild(this.checkers);
        this.div.appendChild(this.controlWrapper);

       
        if (hasInput)  this.initInput(FILL_TYPES);
        if (hasOutput) this.initOutput(FILL_VALUE, this.output_genRequest);


        this.colorControl.addEventListener('confirm', () =>
        { 
            this.setValue(new FillValue(
                this.colorControl.value, 
                new NumberValue(this.opacityControl.value, this.opacityControl.dec)), 
                true, false);
        });


        this.opacityControl.addEventListener('confirm', () =>
        {
            this.setValue(new FillValue(
                this.colorControl.value, 
                new NumberValue(this.opacityControl.value, this.opacityControl.dec)), 
                true, false);
        });


        this.colorControl.addEventListener('finishedit', e =>
        { 
            if (!e.detail.success)
                return;

            if (e.detail.value != e.detail.oldValue)
            {
                const  rgb = validHex2rgb(e.detail.value);
                const _rgb = scaleRgb(rgb);

                this.setValue(FillValue.fromRgb(_rgb, this.opacityControl.value), true);
                
                e.preventSetValue = true;
            }
        });
    }



    setName(name, dispatchEvents = true)
    {
        super.setName(name, dispatchEvents);
        this.colorControl.setName(name);
    }



    isDefault()
    {
        return this.value.equals(this.defaultValue);
    }



    setValue(value, createAction, updateControl = true, dispatchEvents = true) 
    {
        if (!(value instanceof FillValue))
            console.assert(false, 'FillParam.setValue(value) is ' + typeof value + ', must be a FillValue');

        console.assert(
               value.type 
            && value.type == FILL_VALUE, 
            'FillParam value.type must be FILL_VALUE');


        this.preSetValue(value, createAction, dispatchEvents);


        this.value = value;

        if (updateControl)
        {
            this.  colorControl.setValue(value.color,         false, false); 
            this.opacityControl.setValue(value.opacity.value, false, false, false); 
        }


        super.setValue(value, createAction, updateControl, dispatchEvents);


        this.oldValue = this.value;
    }    



    updateControls()
    {
        const rgbVal = this.value.color.toRgb();


        const rgbaText = 
              !rgbIsNaN(rgbVal)
            && this.value.opacity.isValid()
            && this.opacityControl.value >= 50
            ? (isDark(rgbVal) 
               ? [1, 1, 1, 0.666]
               : [0, 0, 0, 0.5  ]) 
            : (isDarkMode()
               ? [1, 1, 1, 0.666]
               : [0, 0, 0, 0.5  ]);


        this.input.wireColor   = rgbVal;
        this.input.colorLight  = 
        this.input.colorDark   = rgb_a(rgbaText, 0.2);//isDark(rgbText) ? 0.12 : 0.44);

        this.output.wireColor  = rgbVal;
        this.output.colorLight =
        this.output.colorDark  = rgb_a(rgbaText, 0.2);//isDark(rgbText) ? 0.12 : 0.44);


        this.checkers.style.background = 
            isDarkMode()
            ?   'linear-gradient(45deg, #222 25%, transparent 25%, transparent 75%, #222 75%), '
              + 'linear-gradient(45deg, #222 25%, transparent 25%, transparent 75%, #222 75%)'
            :   'linear-gradient(45deg, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%), '
              + 'linear-gradient(45deg, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%)';

        this.checkers.style.display            = this.value.isValid() ? 'inline-block' : 'none';
        this.checkers.style.backgroundColor    = isDarkMode() ? '#444' : '#fff';

        this.checkers.style.backgroundSize     = '20px 20px';
        this.checkers.style.backgroundPosition = '0 0, 10px 10px';

        
        const fillStyle = rgba2style(rgb_a(rgbVal, this.opacityControl.value/100));

        this.controlWrapper.style.background = 
              !rgbIsNaN(rgbVal) 
            && this.value.opacity.isValid()
            ? fillStyle 
            : 'transparent'; 


        this.updateWarningOverlay();


        this.  colorControl. backStyleLight  = 
        this.  colorControl. backStyleDark   = 
        this.  colorControl.valueStyleLight  = 
        this.  colorControl.valueStyleDark   = 'transparent';

        this.opacityControl. backStyleLight  = 
        this.opacityControl. backStyleDark   = 
        this.opacityControl.valueStyleLight  = 
        this.opacityControl.valueStyleDark   = 'transparent';

        this.  colorControl.textStyleLight   = 
        this.  colorControl.textStyleDark    = rgba2style(rgbaText);

        this.opacityControl.textStyleLight   = 
        this.opacityControl.textStyleDark    = rgba2style(rgbaText);

        this.  colorControl.update();
        this.opacityControl.update();


        if (this.input ) this.input .updateControl();
        if (this.output) this.output.updateControl();
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
            FILL_VALUE, 
            this.value.toString());

        return request;
    }



    output_genRequest(gen)
    {
        return this.param.genRequest(gen);
    }



    // textboxHasFocus()
    // {
    //     return hasFocus(this.  colorControl.textbox)
    //         || hasFocus(this.opacityControl.textbox);
    // }



    enableControlText(enable)
    {
        enableElementText(this.  colorControl, enable);
        enableElementText(this.opacityControl, enable);
        
        this.  colorControl.readOnly = !enable;
        this.opacityControl.readOnly = !enable;
    }
    
    
    
    updateWarningOverlay() 
    {
        //console.log(this.id + '.updateWarningOverlay()');

        const rgba = this.value.toRgba();

        if (!rgbIsNaN(rgba))
        {
            if (  !rgbIsValid(rgba)
                || this.forceShowWarning)
            {
                if (!this.forceShowWarning)
                    this.warningStyle = this.getDefaultWarningStyle(rgba);

                this.updateWarningOverlayStyle(rgba);
            }
            else
                this._warningOverlay.style.display = 'none';
        }
        else
        {
            this.resetWarningStyle();
            this.updateWarningOverlayStyle(rgb_NaN);
        }
    }



    getDefaultWarningStyle(colBack)
    {
        return rgba2style(
            isDark(colBack) 
            ? [1, 1, 1, 0.2 ]
            : [0, 0, 0, 0.12]); 
    }



    resetWarningStyle()
    {
        this.warningStyle = 
            isDarkMode()
            ? '#ffffff08' //rgba2style([0.3, 0.55, 0.3, 0.2])
            : '#00000006';//rgba2style([0.5, 1, 0.5, 0.2]);        
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
    
    
    
    toString()
    {
        return this.value.toString();
    }



    toJson(nTab = 0, id = '')
    {
        let pos = ' '.repeat(nTab);
        
        if (id == '')
            id = this.id;

        return pos + '["' + id  + '", "' + this.value.toString() + '"]';
    }


    
    loadParam(param)
    {
        this.setValue(parseFillValue(param)[0], true, true, false);
    }
}