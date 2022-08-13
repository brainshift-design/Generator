class   FillParam
extends Parameter
{
    defaultValue;

    oldValue = null;
    

    colorControl;
    opacityControl;
    
    
    get valueText() { return this.colorControl.valueText; }
    set valueText(text) 
    {
        this.colorControl.valueText = text;
        this.colorControl.update();
    }

    
    get value   () { return this.colorControl.value; }
    get genValue() { return this.colorControl.value; }
    

    
    constructor(id,
                name, 
                showName,
                hasInput,
                hasOutput,
                defaultValue = GColorFillValue.create(1, 217, 217, 217, 100, 0),
                dragScale = 0.05)
    {
        super(COLOR_FILL, id, name);

        this.colorControl          = createDiv();
        this.opacityControl        = createDiv();
          
        this.colorControl.param    = this;
        this.opacityControl.param  = this;
        
        this.colorControl.zIndex   = 0;
        this.opacityControl.zIndex = 1;
   
        this.defaultValue          = defaultValue;


        initColorControl(
            this,
            this.colorControl,
            85, // width
            20, // height
            this.id,
            this.name, 
            showName,
            defaultValue,
            dragScale);

        initNumberControl(
            this,
            this.opacityControl,
            35, // width
            20, // height
            this.id,
            this.name, 
            showName,
            defaultValue,
            dragScale);

        // this.control.successOnFocusOut = true;

        this.div.appendChild(this.  colorControl);
        this.div.appendChild(this.opacityControl);

       
        if (hasInput)  this.initInput ([COLOR_FILL, COLOR_FILL_VALUE, COLOR, COLOR_VALUE]);
        if (hasOutput) this.initOutput(COLOR_FILL, this.output_genRequest);


        // this.control.addEventListener('confirm', () => 
        // {
        //     this.setValue(new GNumberValue(this.control.value, this.control.displayDec), true,  false); 
        // });


        this.colorControl.addEventListener('finishedit', e =>
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
        this.colorControl.setName(name);
    }



    isDefault()
    {
        return  this.genValue.length != 1
            || !this.genValue[0].equals(GColorFillValue.default);
    }



    addFill(fill)
    {
        this.colorControl.fills.push(fill);
    }



    // setValue(fill, createAction, updateControl = true, dispatchEvents = true, forceChange = false) 
    // {
    //     this.preSetValue(fill, createAction, dispatchEvents);

    //     if (updateControl)
    //         this.control.setFills(fill, false, false, forceChange); 

    //     super.setValue(fill, createAction, updateControl, dispatchEvents);

    //     this.oldValue = this.genValue;
    // }    



    // valuesEqual(val1, val2)
    // {
    //     return val1
    //         && val2
    //         && val1.value    == val2.value
    //         && val1.decimals == val2.decimals;
    // }



    setValue(fills, createAction, updateControl = true, dispatchEvents = true, forceChange = false) 
    {
        // console.log('fills =', fills);
        // console.assert(fills.type && fills.type == COLOR_VALUE);

        this.preSetValue(fills, createAction, dispatchEvents);

        if (updateControl)
            this.colorControl.setFills(fills, false, false, forceChange); 

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
                COLOR_FILL_VALUE, 
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
        this.colorControl.fills = parseGColorFillValue(param);
    }
}