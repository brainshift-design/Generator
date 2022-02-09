class   NumberParam
extends Parameter
{
    defaultValue;
    
    allowEditDecimals = false;
    

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
                value     = 0, 
                min       = Number.MIN_SAFE_INTEGER, 
                max       = Number.MAX_SAFE_INTEGER,
                decimals  = 0,
                dragScale = 0.05)
    {
        super(id, name, 'number');

        this._control       = createDiv();
        
        this.control.param  = this;
        this.control.zIndex = 0;
   
        this.defaultValue   = value;


        initNumberSlider(
            this,
            this.control,
            120,        // width
            20,         // height
            this.id,
            this.name, 
            showName,
            min,
            max,
            value,      // default
            decimals,   // decimals
            dragScale); // drag scale

        this.control.successOnFocusOut = true;


        this.div.appendChild(this.control);

       
        this.initInput (hasInput,  'number');
        this.initOutput(hasOutput, 'number');


        this.control.addEventListener('change',  () => { this.setValue(this.value, false, false); });
        this.control.addEventListener('confirm', () => { this.setValue(this.value, true,  false); });

        this.control.addEventListener('finishedit', e =>
        { 
            if (   e.detail.success
                && this.allowEditDecimals)
            {
                const _dec = Math.log10(this.control.valueScale);

                const dec    = getDecimalCount(e.detail.value);
                const oldDec = getDecimalCount(e.detail.oldValue);

                actionManager.do(new SetParamDecimalsAction(this,
                    dec    + _dec, 
                    oldDec + _dec,
                    dec, 
                    oldDec
                ), true);
            }
        });
    }



    setName(name, dispatchEvents = true)
    {
        super.setName(name, dispatchEvents);
        this.control.setName(name);
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
        {
            this.setDecimals(this.input.data.decimals);

            this.setValue(
                this.input.data.value, 
                false, 
                true, 
                dispatchEvents);
        }
    }



    setOutputData()
    {
        if (this.output)
        {
            this.output._data = dataFromNumber(
                this.control.value,
                   this.input
                && this.input.isConnected
                ? this.input.data.decimals
                : this.control.dec);
        }
    }



    setValue(value, confirm, updateControl = true, dispatchEvents = true, forceChange = false) 
    {
        this.preSetValue(value, confirm, dispatchEvents);

        if (updateControl)
            this._control.setValue(value, false, false, forceChange); 

        super.setValue(value, confirm, updateControl, dispatchEvents);
    }    



    toJson(nTab = 0, id = '')
    {
        let pos = ' '.repeat(nTab);
        
        if (id == '')
            id = this.id;

        return pos + '["' + id  + '", "' + getNumberString(this.value, this._control.dec) + '"]';
    }
}