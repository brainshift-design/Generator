class   USelectParam
extends UParameter
{
    defaultValue;

    options = [];
    

    
    get value()      { return this._control.value;    }
    set value(value) { this._control.setValue(value); }
    
    get oldValue()   { return this._control.oldValue; }

    
    setValue(value, fireChangeEvent = true, confirm = true) 
    { 
        this._control.setValue(value, fireChangeEvent, confirm); 
    }



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
                options,
                value     = 0, 
                dragScale = 0.01)
    {
        super(name, 'number');

        this._control = document.createElement('div');
        this.control.param  = this;
        this.control.zIndex = 0;

        this.options      = options;
        this.defaultValue = value;


        initSelectSlider(
            this.control,
            120,        // width
            20,         // height
            this.name,  
            value,      // default
            dragScale); // suffix


        this.div.appendChild(this.control);


        this.input = new UInput('number');
        this.input._param = this;
        this.input.control.style.float     = 'left';
        this.input.control.style.position  = 'absolute';
        this.input.control.style.top       = '50%';
        this.input.control.style.transform = 'translateY(-50%)';
        this.div.appendChild(this.input.control);


        if (hasOutput)
        {
            this.output = new UOutput('number');
            this.output._param = this;
            this.output.control.style.float     = 'right';
            this.output.control.style.position  = 'absolute';
            this.output.control.style.top       = '50%';
            this.output.control.style.transform = 'translateY(-50%)';
            this.div.appendChild(this.output.control);
        }
        else
            this.output = null;


            
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



        this.input.addEventListener('connect', e =>
        {
            this.control.style.fontStyle = 'italic';
            this.control.inputConnected  = true;
        });


        
        this.input.addEventListener('disconnect', e =>
        {
            this.control.style.fontStyle = 'normal';
            this.control.inputConnected  = false;
        });
    }



    isDefault()
    {
        return this.value == this.defaultValue;
    }



    save(nTab)
    {
        let pos = ' '.repeat(nTab);
        return pos + '"' + this.name  + '": "' + this.value + '"';
    }
}