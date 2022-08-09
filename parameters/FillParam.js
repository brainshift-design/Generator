class   FillParam
extends Parameter
{
    defaultValue;

    oldValue = null;
    


    
    
    get valueText() { return this.control.valueText; }
    set valueText(text) 
    {
        this.control.valueText = text;
        this.control.update();
    }

    
    get fills   () { return this.control.fills; }
    get value   () { return this.control.fills; }

    get genValue() { return new GColorFillValue(this.control.fills); }
    

    
    constructor(id,
                name, 
                showName,
                hasInput,
                hasOutput,
                value,
                dragScale = 0.05)
    {
        super(id, name, NUMBER);

        this._control       = createDiv();
        
        this.control.param  = this;
        this.control.zIndex = 0;
   
        this.defaultValue   = value;


        initFillSlider(
            this,
            this.control,
            120,        // width
            20,         // height
            this.id,
            this.name, 
            showName,
            value,      // default
            dragScale); // drag scale

        // this.control.successOnFocusOut = true;

        this.div.appendChild(this.control);

       
        if (hasInput)  this.initInput (FILL_VALUES);
        if (hasOutput) this.initOutput(COLOR_FILL, this.output_genRequest);


        // this.control.addEventListener('confirm', () => 
        // {
        //     this.setValue(new GNumberValue(this.control.value, this.control.displayDec), true,  false); 
        // });


        this.control.addEventListener('finishedit', e =>
        { 
            // let   dec    = decCount(e.detail.value);
            // const oldDec = decCount(e.detail.oldValue);

            
            // if (!e.detail.success)
            //     return;


            // if (   Math.abs(e.detail.value - e.detail.oldValue) > Number.EPSILON
            //     && dec >= oldDec)
            // {
            //     this.setValue(new GNumberValue(e.detail.value, dec), true);
            //     e.preventSetValue = true;
            // }
            // else if (this.allowEditDecimals)
            // {
            //     if (Math.abs(e.detail.value - e.detail.oldValue) <= Number.EPSILON)
            //         dec += Math.log10(this.control.valueScale);
            //     else 
            //         dec = oldDec;

            //         this.setValue(new GNumberValue(e.detail.value, dec), true);
            //     e.preventSetValue = true;
            // }
        });
    }



    setName(name, dispatchEvents = true)
    {
        super.setName(name, dispatchEvents);
        this.control.setName(name);
    }



    isDefault()
    {
        return this.genValue.equals(this.defaultValue);
    }



    addFill(fill)
    {
        this.control.fills.push(fill);
    }



    setValue(fill, createAction, updateControl = true, dispatchEvents = true, forceChange = false) 
    {
        this.preSetValue(fill, createAction, dispatchEvents);

        if (updateControl)
            this.control.setFills(fill, false, false, forceChange); 

        super.setValue(fill, createAction, updateControl, dispatchEvents);

        this.oldValue = this.genValue;
    }    



    // valuesEqual(val1, val2)
    // {
    //     return val1
    //         && val2
    //         && val1.value    == val2.value
    //         && val1.decimals == val2.decimals;
    // }



    setValue(fills, createAction, updateControl = true, dispatchEvents = true, forceChange = false) 
    {
        console.log('fills =', fills);
        console.assert(fills.type && fills.type == COLOR_VALUE);

        this.preSetValue(fills, createAction, dispatchEvents);

        if (updateControl)
            this.control.setFills(fills, false, false, forceChange); 

        super.setValue(fills, createAction, updateControl, dispatchEvents);

        this.oldValue = this.genValue;
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

        else 
        {
            request.push( 
                COLOR_VALUE, 
                this.value.toString());
        }


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
        console.log('param =', param);

        this.control.fills = parseGFillValue(param);
        // const parts = param.split(' ');

        // for (let i = 1; i < parts.length; i++)
        // {
        //     this.fills.push(parseGColorValue(parts, i), true, true, false);
        //     i += 4;
        // }
    }
}