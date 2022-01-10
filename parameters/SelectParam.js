class   SelectParam
extends Parameter
{
    defaultValue;

    options = [];
    

    
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
                hasInput,
                hasOutput,
                options,
                value = 0)
    {
        super(name, 'number');

        this._control = document.createElement('div');
        this.control.param  = this;
        this.control.zIndex = 0;

        this.options      = options;
        this.defaultValue = value;

        initSelectSlider(
            this.control,
            120, // width
             20, // height
            this.name,  
            this.options,
            value); // default


        this.div.appendChild(this.control);


        this.initInput (hasInput);
        this.initOutput(hasOutput);

            
        this.control.addEventListener('change', e =>
        {
            this.op.valid = false;
            uiSetParam(this, this.value);
        });


        this.control.addEventListener('confirm', e =>
        {
            this.op.valid = false;
            actionManager.do(new SetValueAction(this, this.value));
        });
    }



    initInput(hasInput)
    {
        this.input = hasInput ? new Input ('number') : null;
        if (!this.input) return;

        this.input._param = this;
        this.input.control.style.float     = 'left';
        this.input.control.style.position  = 'absolute';
        this.input.control.style.top       = '50%';
        this.input.control.style.transform = 'translateY(-50%)';
        this.div.appendChild(this.input.control);


        this.input.addEventListener('connect', e =>
        {
            this.control.style.fontStyle = 'italic';
            this.control.pointerEvents   = false;
        });

        
        this.input.addEventListener('disconnect', e =>
        {
            this.control.style.fontStyle = 'normal';
            this.control.pointerEvents   = true;
        });
    }

    

    initOutput(hasOutput)
    {
        this.output = hasOutput ? new Output('number') : null;
        if (!this.output) return;

        this.output._param = this;
        this.output.control.style.float     = 'right';
        this.output.control.style.position  = 'absolute';
        this.output.control.style.top       = '50%';
        this.output.control.style.transform = 'translateY(-50%)';
        this.div.appendChild(this.output.control);
    }



    isDefault()
    {
        return this.value == this.defaultValue;
    }



    // setValue(value, fireChangeEvent = true, confirm = true) 
    // { 
    //     this._control.setValue(value, fireChangeEvent, confirm); 
    // }



    save(nTab)
    {
        let pos = ' '.repeat(nTab);
        return pos + '"' + this.name  + '": "' + this.value + '"';
    }
}