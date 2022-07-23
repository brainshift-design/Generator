class   SelectParam
extends Parameter
{
    defaultValue;

    options = [];
    

    
    get value()      { return this._control.value;    }
    set value(value) { this._control.setValue(value); }
    
    get oldValue()   { return this._control.oldValue; }



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
                options,
                value = 0)
    {
        super(id, name, NUMBER);

        this._control       = createDiv();
        
        this.control.param  = this;
        this.control.zIndex = 0;

        this.options        = options;
        
        this.defaultValue   = value;


        initNumberSlider(
            this,
            this.control,
            120,       // width
            20,        // height
            this.id,
            this.name, 
            showName,
            0,
            options.length-1,
            value,     // default
            0,         // decimals
            0.02);


        this.control.options           = [...options];
        this.control.successOnFocusOut = true;
        this.control.barTop            = 0.8;

        this.div.appendChild(this.control);


        if (hasInput)  this.initInput([NUMBER]);
        if (hasOutput) this.initOutput(NUMBER, this.output_genRequest);

            
        //this.control.addEventListener('change',  () => { pushUpdateFromParam([this.node], this); /*this.setValue(this.value, false, false);*/ });
        this.control.addEventListener('confirm', () => { this.setValue(this.value, true,  false); });
    }



    // setDecimalsFrom(strValue)
    // {
    //     this.setDecimals(decCount(strValue));
    // }



    // setDecimals(dec, displayDec)
    // {
    //     this.control.setDecimals(dec, displayDec);
    //     this.control.update();
    //     pushUpdate([this.node]);
    // }



    isDefault()
    {
        return this.value == this.defaultValue;
    }



    // update(dispatchEvents)
    // {
    //     super.update();

    //     // if (   this.input
    //     //     && this.input.connected)
    //     //     this.setValue(Math.round(this.input.data.value), false, true, dispatchEvents); // assuming the data types match
    // }



    setOutputData()
    {
        if (this.output)
            this.output._data = dataFromNumber(this._control.value, 0);
    }



    setValue(value, createAction, updateControl = true, dispatchEvents = true, forceChange = false) 
    { 
        console.log('SelectParam.setValue()');
        this.preSetValue(value, createAction, dispatchEvents);

        if (updateControl)
            this._control.setValue(value, false, false, forceChange); 

        // if (this.output)
        //     this.output._data = dataFromNumber(value);
            // console.log('super = ', super);
        // super.setValue(value, createAction, updateControl, dispatchEvents);
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
                // req.push(
                //     PARAM,
                //     this.node.id,
                //     this.index);
                
                // pushUnique(gen.paramNodes, this.node);
            }

            req.push(...this.input.connectedOutput.genRequest(gen));
        }        
        else
        {
            req.push( 
                NUMBER_VALUE, 
                new GNumberValue(
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
        return this.input
            && this.input.connected 

            ? [ ...this.input.connectedOutput.genRequest(createGenObject()) ]

            : [ NUMBER, 
                this.value.toString(), 
                this.control.displayDec.toString() ];
    }
}