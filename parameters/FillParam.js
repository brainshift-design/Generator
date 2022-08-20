class   FillParam
extends Parameter
{
    defaultValue;

    oldValue = null;
    

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
    get genValue() { return this.value.copy();  }
    

    
    constructor(id,
                name, 
                showName,
                hasInput,
                hasOutput,
                defaultValue = ColorFillValue.NaN,
                dragScale    = 0.05)
    {
        super(COLOR_FILL, id, name);

        this.checkers              = createDiv();
        this.controlWrapper        = createDiv();

        this.colorControl          = createDiv();
        this.opacityControl        = createDiv();
        
        this.colorControl.param    = this;
        this.colorControl.zIndex   = 0;

        this.opacityControl.param  = this;
        this.opacityControl.zIndex = 0;
   
        this.defaultValue          = defaultValue;
        this.value                 = defaultValue;

        
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
            defaultValue.opacity,
            0);

        this.opacityControl.setSuffix('%', true);


        this.checkers.style.width             = '100%';
        this.checkers.style.height            = '20px';
        this.checkers.style.backgroundSize     = '26px 26px';
        this.checkers.style.backgroundPosition = '0 0, 13px 13px';


        this.controlWrapper.style.display           = 'inline-block';
        this.controlWrapper.style.width             = '100%';
        this.controlWrapper.style.height            = '20px';


        this.  colorControl.successOnFocusOut       = true;
        this.  colorControl.style.display           = 'inline';
        this.  colorControl.style.width             = '60%';
        this.  colorControl.style.position          = 'absolute';
        this.  colorControl.style.left              = 0;

    
        this.opacityControl.successOnFocusOut       = true;
        this.opacityControl.style.display           = 'inline';
        this.opacityControl.style.width             = '40%';
        this.opacityControl.style.position          = 'absolute';
        this.opacityControl.style.right             = 0;
        this.opacityControl.barTop                  = 0.8;
        this.opacityControl.barBottom               = 1;


        this.  colorControl.text.style.transform    = 'translateX(-40%)';
        this.opacityControl.text.style.transform    = 'translateX(-70%)';


        this.  colorControl.textbox.style.position  = 'absolute';
        this.  colorControl.textbox.style.left      = '0';
        this.  colorControl.textbox.style.width     = '60%';
        this.  colorControl.textbox.style.transform = 'translateX(0)';
        this.  colorControl.textbox.style.textAlign = 'right';
        
        this.opacityControl.textbox.style.position  = 'absolute';
        this.opacityControl.textbox.style.right     = '0';
        this.opacityControl.textbox.style.width     = '40%';
        this.opacityControl.textbox.style.transform = 'translateX(25%)';
        this.opacityControl.textbox.style.textAlign = 'left';


        this.controlWrapper.appendChild(this.  colorControl);
        this.controlWrapper.appendChild(this.opacityControl);
        
        this.div.appendChild(this.controlWrapper);

       
        if (hasInput)  this.initInput(COLOR_FILL_TYPES);
        if (hasOutput) this.initOutput(COLOR_FILL_VALUE, this.output_genRequest);


        this.colorControl.addEventListener('confirm', () =>
        { 
            this.setValue(this.value, true, false);
        });

        this.opacityControl.addEventListener('confirm', () =>
        {
            this.setValue(this.value, true, false);
        });


        this.colorControl.addEventListener('finishedit', e =>
        { 
            if (!e.detail.success)
                return;


            if (e.detail.value != e.detail.oldValue)
            {
                const  rgb = validHex2rgb(e.detail.value);
                const _rgb = scaleColor(rgb, 'rgb');

                this.setValue(ColorFillValue.createFromRgb(_rgb, this.opacityControl.value), true);
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
        return this.genValue.equals(this.defaultValue);
    }



    setValue(value, createAction, updateControl = true, dispatchEvents = true, forceChange = false) 
    {
        console.assert(
               value.type 
            && value.type == COLOR_FILL_VALUE, 
            'FillParam value.type must be COLOR_FILL_VALUE');

        this.preSetValue(value, createAction, dispatchEvents);

        this.value = value;

        if (updateControl)
        {
            this.  colorControl.setValue(value.color,   false, false, forceChange); 
            this.opacityControl.setValue(value.opacity, false, true, false, forceChange); 
        }

        super.setValue(value, createAction, updateControl, dispatchEvents);

        this.oldValue = this.genValue;
    }    



    updateControls()
    {
        const rgbVal = dataColor2rgb(this.value.color.toDataColor());

        const rgbText = 
            isValidRgb(rgbVal)
            ? (isDark(rgbVal)
               ? [1, 1, 1]
               : [0, 0, 0])
            : (isDarkMode()
               ? [1, 1, 1]
               : [0, 0, 0]);


        this.input.wireColor   = rgbVal;
        this.input.colorLight  = 
        this.input.colorDark   = rgb_a(rgbText, 0.12);

        this.output.wireColor  = rgbVal;
        this.output.colorLight =
        this.output.colorDark  = rgb_a(rgbText, 0.12);


        this.checkers.style.display         = 'inline-block';//this.canShowColor() ? 'inline-block' : 'none';
        this.checkers.style.backgroundColor = isDarkMode() ? '#444' : '#fff';

        this.checkers.style.background =
            isDarkMode()
            ?   'linear-gradient(45deg, #222 25%, transparent 25%, transparent 75%, #222 75%), '
              + 'linear-gradient(45deg, #222 25%, transparent 25%, transparent 75%, #222 75%)'
            :   'linear-gradient(45deg, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%), '
              + 'linear-gradient(45deg, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%)';

        this.controlWrapper.style.background = rgba2style(rgb_a(rgbVal, this.opacityControl.value/100));


        this.  colorControl.backColorLight  = 
        this.  colorControl.backColorDark   = 'transparent';//rgba2style(rgb_a(rgbVal, 0.6));

        this.opacityControl.backColorLight  = 
        this.opacityControl.backColorDark   = 'transparent';//rgba2style(rgb_a(rgbVal, 0.6));

        this.opacityControl.valueColorLight = 
        this.opacityControl.valueColorDark  = rgba2style(rgb_a(rgbText, 0.12));

        this.opacityControl.textColorLight  = 
        this.opacityControl.textColorDark   = rgba2style(rgb_a(rgbText, 0.6));


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
            COLOR_FILL_VALUE, 
            this.value.toString());

        return request;
    }



    output_genRequest(gen)
    {
        return this.param.genRequest(gen);
    }



    textboxHasFocus()
    {
        return hasFocus(this.  colorControl.textbox)
            || hasFocus(this.opacityControl.textbox);
    }



    enableControlText(enable)
    {
        enableElementText(this.  colorControl, enable);
        enableElementText(this.opacityControl, enable);
        
        this.  colorControl.readOnly = !enable;
        this.opacityControl.readOnly = !enable;
    }
    
    
    
    toString()
    {
        return this.genValue.toString();
    }



    toJson(nTab = 0, id = '')
    {
        let pos = ' '.repeat(nTab);
        
        if (id == '')
            id = this.id;

        return pos + '["' + id  + '", "' + this.genValue.toString() + '"]';
    }


    
    loadParam(param)
    {
        this.setValue(parseColorFillValue(param)[0], true, true, false);
    }
}