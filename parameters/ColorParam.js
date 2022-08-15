class   ColorParam
extends Parameter
{
    defaultValue;

    oldValue = null;
    

    control;
    
    
    get valueText() { return this.control.valueText; }
    set valueText(text) 
    {
        this.control.valueText = text;
        this.control.update();
    }

    
    get value   () { return this.control.value; }
    get genValue() { return this.value.copy();  }
    

    
    constructor(id,
                name, 
                showName,
                hasInput,
                hasOutput,
                defaultValue = GColorValue.NaN,
                dragScale    = 0.05)
    {
        super(COLOR, id, name);

        this.control        = createDiv();
        
        this.control.param  = this;
        this.control.zIndex = 0;
   
        this.defaultValue   = defaultValue;


        initColorControl(
            this,
            this.control,
            120, // width
            20,  // height
            this.id,
            this.name, 
            showName,
            defaultValue,   
            dragScale); 

        // this.control.successOnFocusOut = true;

        this.control.style.display = 'inline-block';
        this.control.style.width   = '100%';

        this.div.appendChild(this.control);

       
        if (hasInput)  this.initInput(COLOR_TYPES);
        if (hasOutput) this.initOutput(COLOR, this.output_genRequest);


        // this.control.addEventListener('confirm', () => 
        // {
        //     this.setValue(new GNumberValue(this.control.value, this.control.displayDec), true,  false); 
        // });


        this.control.addEventListener('finishedit', e =>
        { 
            if (!e.detail.success)
                return;


            if (e.detail.value != e.detail.oldValue)
            {
                const rgb = validHex2rgb(e.detail.value);

                this.setValue(GColorValue.createFromRgb(scaleColor(rgb, 'rgb')), true);
                e.preventSetValue = true;
            }
        });
    }



    setName(name, dispatchEvents = true)
    {
        super.setName(name, dispatchEvents);
        this.control.setName(name);
    }



    isDefault()
    {
        return this.genValue == this.defaultValue;
    }



    setValue(value, createAction, updateControl = true, dispatchEvents = true, forceChange = false) 
    {
        console.assert(value.type && value.type == COLOR_VALUE);
        this.preSetValue(value, createAction, dispatchEvents);

        if (updateControl)
            this.control.setValue(value, false, false, forceChange); 

        super.setValue(value, createAction, updateControl, dispatchEvents);

        this.oldValue = this.genValue;
    }    



    updateControls()
    {
        const rgb = dataColor2rgb(this.value.toDataColor());

        const col = 
            isValidRgb(rgb)
            ? (isDark(rgb)
               ? [1, 1, 1]
               : [0, 0, 0])
            : (isDarkMode()
               ? [1, 1, 1]
               : [0, 0, 0]);

        this.input.wireColor  = rgb;
        this.input.colorLight = 
        this.input.colorDark  = rgb_a(col, 0.12);

        this.output.wireColor  = rgb;
        this.output.colorLight =
        this.output.colorDark  = rgb_a(col, 0.12);


        super.updateControls();
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
        this.setValue(parseGColorValue(param), true, true, false);
    }
}