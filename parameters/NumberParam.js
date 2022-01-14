class   NumberParam
extends Parameter
{
    defaultValue;
    
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

       
        this.initInput (hasInput,  'number');
        this.initOutput(hasOutput, 'number');


        if (this.input)
            this.input.addEventListener('connect', () => this.op.pushUpdate());

        this.control.addEventListener('change',  () => { this.setValue(this.value, false, false); });
        this.control.addEventListener('confirm', () => { this.setValue(this.value, true,  false); });
    }



    setName(name, dispatchEvents = true)
    {
        super.setName(name, dispatchEvents);
        this.control.setName(name);
    }



    isDefault()
    {
        return this.value == this.defaultValue;
    }



    update(dispatchEvents)
    {
        console.log('this.input', this.input);
        if (   this.input
            && this.input.isConnected)
            this.setValue(this.input.data.value, false, true, dispatchEvents); // assuming the data types match
    }



    setValue(value, confirm, updateControl = true, dispatchEvents = true, forceChange = false) 
    {
        if (updateControl)
            this._control.setValue(value, false, false, forceChange); 

        super.setValue(value, confirm, updateControl, dispatchEvents);
    }    



    save(nTab)
    {
        let pos = ' '.repeat(nTab);
        return pos + '"' + this.name  + '": "' + this.value + '"';
    }
}