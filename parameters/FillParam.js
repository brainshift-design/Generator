class   FillParam
extends Parameter
{
    defaultValue;

    oldValue = null;
    

    controlWrapper;

    colorControl;
    opacityControl;
    
    
    get valueText() { return this.colorControl.valueText; }
    set valueText(text) 
    {
        this.colorControl.valueText = text;
        this.colorControl.update();
    }

    
    get value() 
    { 
        return new GColorFillValue(
            this.colorControl.value,
            new GNumberValue(this.opacityControl.value)); 
    }
    
    get genValue() { return this.value.copy();  }
    

    
    constructor(id,
                name, 
                showName,
                hasInput,
                hasOutput,
                defaultValue = GColorFillValue.NaN,
                dragScale    = 0.05)
    {
        super(COLOR_FILL, id, name);

        this.controlWrapper        = createDiv();

        this.colorControl          = createDiv();
        this.opacityControl        = createDiv();
        
        this.colorControl.param    = this;
        this.colorControl.zIndex   = 0;

        this.opacityControl.param  = this;
        this.opacityControl.zIndex = 0;
   
        this.defaultValue          = defaultValue;
console.log('defaultValue =', defaultValue);

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
            defaultValue.opacity, // default
            0);

        this.opacityControl.setSuffix('%', true);


        this.controlWrapper.style.display     = 'inline-block';
        this.controlWrapper.style.width       = '100%';

        this.  colorControl.successOnFocusOut = true;
        this.  colorControl.style.display     = 'inline';
        this.  colorControl.style.width       = '70%';

        this.opacityControl.successOnFocusOut = true;
        this.opacityControl.style.display     = 'inline';
        this.opacityControl.style.width       = '30%';


        this.controlWrapper.appendChild(this.  colorControl);
        this.controlWrapper.appendChild(this.opacityControl);
        
        this.div.appendChild(this.controlWrapper);

       
        if (hasInput)  this.initInput(COLOR_FILL_TYPES);
        if (hasOutput) this.initOutput(COLOR_FILL_VALUE, this.output_genRequest);


        this.colorControl.addEventListener('confirm', () => 
        {
            this.setValue(this.colorControl.value, true, false); 
        });


        this.colorControl.addEventListener('finishedit', e =>
        { 
            if (!e.detail.success)
                return;


            if (e.detail.value != e.detail.oldValue)
            {
                const  rgb = validHex2rgb(e.detail.value);
                const _rgb = scaleColor(rgb, 'rgb');

                this.setValue(GColorFillValue.createFromRgb(1, _rgb[0], _rgb[1], _rgb[2], this.opacityControl.value), true);
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
        return this.genValue == this.defaultValue;
    }



    setValue(value, createAction, updateControl = true, dispatchEvents = true, forceChange = false) 
    {
        console.assert(value.type && value.type == COLOR_FILL_VALUE);
        this.preSetValue(value, createAction, dispatchEvents);

        if (updateControl)
        {
            this.  colorControl.setValue(value.color,   false, false, forceChange); 
            this.opacityControl.setValue(value.opacity, false, false, forceChange); 
        }

        super.setValue(value, createAction, updateControl, dispatchEvents);

        this.oldValue = this.genValue;
    }    



    updateControls()
    {
        const rgb = dataColor2rgb(this.value.color.toDataColor());

        const col = 
            isValidRgb(rgb)
            ? (isDark(rgb)
               ? [1, 1, 1]
               : [0, 0, 0])
            : (isDarkMode()
               ? [1, 1, 1]
               : [0, 0, 0]);


        this.input.wireColor   = rgb;
        this.input.colorLight  = 
        this.input.colorDark   = rgb_a(col, 0.12);

        this.output.wireColor  = rgb;
        this.output.colorLight =
        this.output.colorDark  = rgb_a(col, 0.12);


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

        console.log('this.value =', this.value);

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
        this.setValue(parseGColorFillValue(param), true, true, false);
    }
}