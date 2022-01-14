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


    
    constructor(name, 
                hasInput,
                hasOutput,
                options,
                value = 0)
    {
        super(name, 'number');

        this._control       = document.createElement('div');
        this.control.param  = this;
        this.control.zIndex = 0;

        this.options        = options;
        this.defaultValue   = value;

        initSelectSlider(
            this.control,
            120, // width
             20, // height
            this.name,  
            this.options,
            value); // default


        this.div.appendChild(this.control);


        this.initInput (hasInput,  'number');
        this.initOutput(hasOutput, 'number');

            
        this.control.addEventListener('change',  () => { this.setValue(this.value, false, false); });
        this.control.addEventListener('confirm', () => { this.setValue(this.value, true,  false); });
    }


    
    isDefault()
    {
        return this.value == this.defaultValue;
    }



    update(dispatchEvents)
    {
        if (   this.input
            && this.input.isConnected)
            this.setValue(this.input.data.value, false, true, dispatchEvents); // assuming the data types match
    }



    setOutputData()
    {
        if (this.output)
            this.output._data = dataFromNumber(this._control.value);
    }



    setValue(value, confirm, updateControl = true, dispatchEvents = true, forceChange = false) 
    { 
        if (updateControl)
            this._control.setValue(value, false, false, forceChange); 

        if (this.output)
            this.output._data = dataFromNumber(value);
            
        super.setValue(value, confirm, updateControl, dispatchEvents);
    }    



    save(nTab)
    {
        let pos = ' '.repeat(nTab);
        return pos + '"' + this.name  + '": "' + this.value + '"';
    }
}