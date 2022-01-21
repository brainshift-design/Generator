class   NumberParam
extends Parameter
{
    defaultValue;
    
    allowEditDecimals;
    

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
                showName,
                hasInput,
                hasOutput,
                value     = 0, 
                min       = Number.MIN_SAFE_INTEGER, 
                max       = Number.MAX_SAFE_INTEGER,
                decimals  = 0,
                dragScale = 0.05)
    {
        super(name, 'number');

        this._control = document.createElement('div');
        this.control.param  = this;
        this.control.zIndex = 0;

        this.defaultValue = value;

        this.allowEditDecimals = false;


        initNumberSlider(
            this.control,
            120,       // width
            20,        // height
            this.name, 
            showName,
            min,
            max,
            value,     // default
            dragScale, // drag scale
            1,         // wheel step
            decimals,  // decimals
            0);        // acceleration


        this.div.appendChild(this.control);

       
        this.initInput (hasInput,  'number');
        this.initOutput(hasOutput, 'number');

        if (this.input)
            this.input.addEventListener('connect', () => this.op.pushUpdate());


        this.control.addEventListener('change',  () => { this.setValue(this.value, false, false); });
        this.control.addEventListener('confirm', () => { this.setValue(this.value, true,  false); });

        this.control.addEventListener('finishedit', e =>
        { 
            if (   e.detail.success
                && this.allowEditDecimals)
                this.setDecimals(e.detail.value);
        });
    }



    setName(name, dispatchEvents = true)
    {
        super.setName(name, dispatchEvents);
        this.control.setName(name);
    }



    setDecimals(strValue)
    {
        const decIndex = strValue.indexOf(getUserDecimalSeparator());

        const nDec =
            decIndex >= 0
            ? strValue.length-1 - decIndex
            : 0;

        this.control.dec     = nDec;
        this.control.editDec = nDec;
        this.control.update();

        setTimeout(() => this.op.pushUpdate());
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

        super.setValue(value, confirm, updateControl, dispatchEvents);
    }    



    toJson(nTab = 0, name = '')
    {
        let pos = ' '.repeat(nTab);
        
        if (name == '')
            name = this.name;

        return pos + '["' + name  + '", "' + getNumberString(this.value, this._control.dec) + '"]';
    }
}