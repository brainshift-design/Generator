class   UColorParam
extends UParameter
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
                dragScale = 0.01)
    {
        super(name, 'color');

        this._control = document.createElement('div');
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


        this.initInput();
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



    initInput()
    {
        this.input = new UInput('color');
        this.input._param = this;
        this.input.control.style.float     = 'left';
        this.input.control.style.position  = 'absolute';
        this.input.control.style.top       = '50%';
        this.input.control.style.transform = 'translateY(-50%)';
        this.div.appendChild(this.input.control);


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



    initOutput(hasOutput)
    {
        this.output = hasOutput ? new UOutput('color') : null;
        if (!this.output) return;

        this.output._param = this;
        this.output.control.style.float     = 'left';
        this.output.control.style.position  = 'absolute';
        this.output.control.style.top       = '50%';
        this.output.control.style.transform = 'translateY(-50%)';
        this.div.appendChild(this.output.control);
    }



    isDefault()
    {
        return this.value == this.defaultValue;
    }



    setValue(value, fireChangeEvent = true, confirm = true) 
    { 
        //this._control.setValue(value, fireChangeEvent, confirm); 
    }



    save(nTab)
    {
        let pos = ' '.repeat(nTab);
        return pos + '"' + this.name  + '": "' + this.value + '"';
    }
}