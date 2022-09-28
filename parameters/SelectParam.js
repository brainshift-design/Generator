class   SelectParam
extends NumberParamBase
{
    options = [];
    

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
        
        this.defaultValue   = new NumberValue(defaultValue);


        initNumberControl(
            this,
            this.control,
            120, // width
            20,  // height
            this.id,
            this.name, 
            showName,
            defaultValue,
            0,
            options.length-1,
            0,   // decimals
            0.02);


        this.control.options           = [...options];
        this.control.successOnFocusOut = true;
        this.control.barTop            = 0.8;

        this.control.style.display     = 'inline-block';
        this.control.style.width       = '100%';

        this.div.appendChild(this.control);


        if (hasInput)  this.initInput(NUMBER_TYPES);
        if (hasOutput) this.initOutput([NUMBER_VALUE], this.output_genRequest);

            
        this.control.addEventListener('confirm', () => { this.setValue(this.value, true, true); });
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