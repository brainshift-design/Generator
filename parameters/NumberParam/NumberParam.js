class   NumberParam
extends Parameter
{
    defaultValue;
    
    input;
    output;


    
    get value()      { return this._control.value;    }
    set value(value) { this._control.setValue(value); }
    
    get oldValue()   { return this._control.oldValue; }


    
    get valueText() { return this.control.valueText; }
    set valueText(text) 
    {
        this.control.valueText = text;
        this.control.update();
    }


    
    constructor(name, 
                hasInput,
                hasOutput,
                value     = 0, 
                min       = Number.MIN_SAFE_INTEGER, 
                max       = Number.MAX_SAFE_INTEGER,
                decimals  = 0,
                dragScale = 0.01)
    {
        super(name, 'number');

        this._control = document.createElement('div');
        this.control.param  = this;
        this.control.zIndex = 0;

        this.defaultValue = value;


        initNumberSlider(
            this.control,
            120,       // width
            20,        // height
            this.name, 
            min,
            max,
            value,     // default
            dragScale, // drag scale
            1,         // wheel step
            decimals,  // decimals
            0,         // acceleration
            '');       // suffix


        this.div.appendChild(this.control);

       
        this.initInput (hasInput);
        this.initOutput(hasOutput);


        if (this.input)
        {
            this.input.addEventListener('connect', () => 
            {
                this.op.invalidate();
                this.op.update();
            });
        }

        this.control.addEventListener('change',  () => { this.setValue(this.value, false, false); });
        this.control.addEventListener('confirm', () => { this.setValue(this.value, true,  false); });
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


        // this.input.addEventListener('update', () =>
        // {
        //     this.update();
        // });
    
        
        this.input.addEventListener('connect', () =>
        {
            this.control.style.fontStyle = 'italic';
            this.control.inputConnected  = true;
        });
    
        
        this.input.addEventListener('disconnect', () =>
        {
            this.control.style.fontStyle = 'normal';
            this.control.inputConnected  = false;
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



    update(dispatchEvents)
    {
        if (this.input.isConnected)
            this.setValue(this.input.data.value, false, true, dispatchEvents); // assuming the data types match
    }



    setValue(value, confirm, updateControl = true, dispatchEvents = true) 
    { 
        if (updateControl)
            this._control.setValue(value, false, false); 

        super.setValue(value, confirm, updateControl, dispatchEvents);
    }    



    save(nTab)
    {
        let pos = ' '.repeat(nTab);
        return pos + '"' + this.name  + '": "' + this.value + '"';
    }
}