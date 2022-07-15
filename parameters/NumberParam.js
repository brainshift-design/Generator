class   NumberParam
extends Parameter
{
    defaultValue;
    oldValue = null;
    
    allowEditDecimals = true;
    

    
    get value() { return this.control.value; }
    // set value(value) 
    // {
    //     this.control.setDecimals(decCount(value));
    //     this.control.setValue(parseFloat(value)); 
    // }
        
        
    get genValue() { return new GNumber(this.control.value, this.control.displayDec); }

    
    get valueText() { return this.control.valueText; }
    set valueText(text) 
    {
        this.control.valueText = text;
        this.control.update();
    }


    
    constructor(id,
                name, 
                showName,
                hasInput,
                hasOutput,
                value     = 0, 
                min       = Number.MIN_SAFE_INTEGER, 
                max       = Number.MAX_SAFE_INTEGER,
                decimals  = 0,
                dragScale = 0.05)
    {
        super(id, name, NUMBER);

        this._control       = createDiv();
        
        this.control.param  = this;
        this.control.zIndex = 0;
   
        this.defaultValue   = shallowCopy(value);


        initNumberSlider(
            this,
            this.control,
            120,         // width
            20,          // height
            this.id,
            this.name, 
            showName,
            min,
            max,
            value,       // default
            decimals,    // decimals
            dragScale);  // drag scale

        this.control.successOnFocusOut = true;

        this.div.appendChild(this.control);

       
        if (hasInput)  this.initInput([NUMBER]);
        if (hasOutput) this.initOutput(NUMBER, this.output_genRequest);


        this.control.addEventListener('confirm', () => this.setValue(new GNumber(this.control.value, this.control.displayDec), true,  false));


        this.control.addEventListener('finishedit', e =>
        { 
            const dec    = decCount(e.detail.value);
            const oldDec = decCount(e.detail.oldValue);

            if (   e.detail.success
                && (   Math.abs(e.detail.value - e.detail.oldValue) > Number.EPSILON
                    ||    dec != oldDec
                       && this.allowEditDecimals))
            {
                const _dec = Math.log10(this.control.valueScale);
                this.setValue(new GNumber(e.detail.value, dec + _dec), true);
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



    // update(dispatchEvents)
    // {
    //     super.update();

    //     // if (   this.input
    //     //     && this.input.connected)
    //     // {
    //     //     this.setDecimals(this.input.data.decimals);

    //     //     this.setValue(
    //     //         this.input.data.value, 
    //     //         false, 
    //     //         true, 
    //     //         dispatchEvents);
    //     // }
    // }



    setValue(value, createAction, updateControl = true, dispatchEvents = true, forceChange = false) 
    {
        this.preSetValue(value, createAction, dispatchEvents);

        if (updateControl)
        {
            this.control.setDecimals(value.decimals, value.decimals);
            this.control.setValue(value.value, false, false, forceChange); 
        }

        super.setValue(value, createAction, updateControl, dispatchEvents);

        this.oldValue = this.genValue;
    }    



    valuesEqual(val1, val2)
    {
        return val1.value    == val2.value
            && val1.decimals == val2.decimals;
    }



    genRequest(gen)
    {
        // this function exists because a parameter without an output
        // should still provide a value
        
        if (    this.output
            && !isEmpty(this.output.cache)
            &&  gen.passedNodes.includes(this.node))
            return this.output.cache;


        const req = [];


        if (   this.input
            && this.input.connected)
        {
            if (    gen.markParams
                &&  lastOf(gen.scope).nodeId != this.node.id
                && !this.node.valid)
            {
                req.push(
                    PARAM,
                    this.node.id,
                    this.id);
                
                pushUnique(gen.paramNodes, this.node);
            }

            req.push(...this.input.connectedOutput.genRequest(gen));
        }        
        else if (this.output
              && this.output.connected
              && this.node.headerConnected)
        {
            if (    gen.markParams
                &&  lastOf(gen.scope).nodeId != this.node.id
                && !this.node.valid)
            {
                req.push(
                    PARAM,
                    this.node.id,
                    this.id);
                
                pushUnique(gen.paramNodes, this.node);
            }

            //req.push(...this.node.inputs[0].connectedOutput.genRequest(gen));
        }
        else
        {
            req.push( 
                NUMBER_VALUE, 
                new GNumber(
                    this.control.value, 
                    this.control.displayDec).toString());
        }


        return req;
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
}