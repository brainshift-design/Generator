class   SelectParam
extends NumberParamBase
{
    options = [];
    

    control;

    
    get genValue() { return new GNumberValue(this.control.value, this.control.displayDec); }



    constructor(id,
                name,
                showName,
                hasInput,
                hasOutput,
                options,
                value = 0)
    {
        super(NUMBER, id, name);

        this.control       = createDiv();
        
        this.control.param  = this;
        this.control.zIndex = 0;

        this.options        = options;
        
        this.defaultValue   = value;


        initNumberControl(
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



    // setOutputData()
    // {
    //     if (this.output)
    //         this.output._data = dataFromNumber(this._control.value, 0);
    // }



    setValue(value, createAction, updateControl = true, dispatchEvents = true, forceChange = false) 
    { 
        this.preSetValue(value, createAction, dispatchEvents);

        if (updateControl)
            this._control.setValue(value, false, false, forceChange); 

        super.setValue(value, createAction, updateControl, dispatchEvents);
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