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


    
    constructor(id,
                name,
                showName,
                hasInput,
                hasOutput,
                options,
                value = 0)
    {
        super(id, name, 'number');

        this._control       = createDiv();
        
        this.control.param  = this;
        this.control.zIndex = 0;

        this.options        = options;
        
        this.defaultValue   = value;


        initNumberSlider(
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


        this.initInput (hasInput,  'number');
        this.initOutput(hasOutput, 'number');

            
        this.control.addEventListener('change',  () => { this.setValue(this.value, false, false); });
        this.control.addEventListener('confirm', () => { this.setValue(this.value, true,  false); });
    }



    setDecimalsFrom(strValue)
    {
        this.setDecimals(getDecimalCount(strValue));
    }



    setDecimals(dec, displayDec)
    {
        this.control.setDecimals(dec, displayDec);
        this.control.update();
        this.op.pushUpdate();
    }



    isDefault()
    {
        return this.value == this.defaultValue;
    }



    update(dispatchEvents)
    {
        super.update();

        if (   this.input
            && this.input.isConnected)
            this.setValue(Math.round(this.input.data.value), false, true, dispatchEvents); // assuming the data types match
    }



    setOutputData()
    {
        if (this.output)
            this.output._data = dataFromNumber(this._control.value, 0);
    }



    setValue(value, confirm, updateControl = true, dispatchEvents = true, forceChange = false) 
    { 
        this.preSetValue(value, confirm, dispatchEvents);

        if (updateControl)
            this._control.setValue(value, false, false, forceChange); 

        // if (this.output)
        //     this.output._data = dataFromNumber(value);
            
        super.setValue(value, confirm, updateControl, dispatchEvents);
    }    
}