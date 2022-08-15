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
                defaultValue = 0)
    {
        super(NUMBER, id, name);

        this.control        = createDiv();
        
        this.control.param  = this;
        this.control.zIndex = 0;

        this.options        = options;
        
        this.defaultValue   = defaultValue;


        initNumberControl(
            this,
            this.control,
            120, // width
            20,  // height
            this.id,
            this.name, 
            showName,
            0,
            options.length-1,
            defaultValue,
            0,   // decimals
            0.02);


        this.control.options           = [...options];
        this.control.successOnFocusOut = true;
        this.control.barTop            = 0.8;

        this.control.style.display     = 'inline-block';
        this.control.style.width       = '100%';

        this.div.appendChild(this.control);


        if (hasInput)  this.initInput(NUMBER_TYPES);
        if (hasOutput) this.initOutput(NUMBER_VALUE, this.output_genRequest);

            
        //this.control.addEventListener('change',  () => { pushUpdateFromParam([this.node], this); /*this.setValue(this.value, false, false);*/ });
        this.control.addEventListener('confirm', () => { this.setValue(this.value, true,  false); });
    }



    isDefault()
    {
        return this.value == this.defaultValue;
    }



    setValue(value, createAction, updateControl = true, dispatchEvents = true, forceChange = false) 
    { 
        this.preSetValue(value, createAction, dispatchEvents);

        if (updateControl)
            this.control.setValue(value, false, false, forceChange); 

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