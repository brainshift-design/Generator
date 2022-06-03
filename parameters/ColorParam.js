class   ColorParam
extends Parameter
{
    defaultValue;
    
    
    get value()      { return this._control.value;    }
    set value(value) { this._control.setValue(value); }
    
    get oldValue()   { return this._control.oldValue; }


    
    input;
    output;

    

    get valueText() { return this.control.valueText; }
    set valueText(text) 
    {
        this.control.valueText = text;
        this.control.update();
    }


    
    constructor(name, 
                hasOutput,
                value     = [0, 0, 0],
                dragScale = 0.05)
    {
        super(name, 'color');

        this._control = createDiv();
        
        this.control.param  = this;
        this.control.zIndex = 0;

        this.defaultValue = value;

        this.control.style.height = 20;


        initColorSlider(
            this.control,
            120,       // width
            20,        // height
            this.name, 
            value,     // default
            dragScale, // drag scale
            1,         // wheel step
            0,         // decimals
            0,         // acceleration
            '');       // suffix



        this.div.appendChild(this.control);


                       this.initInput([COLOR]);
        if (hasOutput) this.initOutput(COLOR);



        this.control.addEventListener('change', e =>
        {
            this.node.valid = false;
            uiSetParam(this, this.value);
        });


        this.control.addEventListener('confirm', e =>
        {
            this.node.valid = false;
            //actionManager.do(new SetParamValueAction(this, this.value));
        });
    }



    isDefault()
    {
        return this.value == this.defaultValue;
    }



    setValue(value, fireChangeEvent = true, confirm = true) 
    { 
        //this._control.setValue(value, fireChangeEvent, confirm); 
    }



    toString()
    {
        // this function exists because a parameter without an output
        // should still provide a value
        
        // return this.input
        //     && this.input.connected 

        //     ? [ ...this.input.connectedOutput.genRequest(createGenObject()) ]

        //     : [ COLOR, 
        //         this.value.toString(), 
        //         this.control.displayDec.toString() ];
    }



    output_genRequest(gen)
    {
        //return output.param.genRequest();
    }
}