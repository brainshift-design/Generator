class   NumberParam
extends Parameter
{
    defaultValue;
    
    allowEditDecimals = true;
    

    get value()      { return this.control.value;    }
    set value(value) { this.control.setValue(value); }

    get oldValue()   { return this.control.oldValue; }


    
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
        super(id, name, NUMBER);

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

       
        if (hasInput)  this.initInput([NUMBER]);
        if (hasOutput) this.initOutput(NUMBER, this.output_genRequest);


        //this.control.addEventListener('change',  () => { pushUpdateFromParam([this.node], this);  /*this.setValue(this.value, false, false);*/ });
        this.control.addEventListener('confirm', () => { this.setValue(this.value, true,  false); });

        // this.control.addEventListener('finishedit', e =>
        // { 
        //     const dec    = getDecimalCount(e.detail.value);
        //     const oldDec = getDecimalCount(e.detail.oldValue);

        //     if (   e.detail.success
        //         && (   Math.abs(e.detail.value - e.detail.oldValue) <= Number.EPSILON
        //             || dec >= oldDec)
        //         && this.allowEditDecimals)
        //     {
        //         const _dec = Math.log10(this.control.valueScale);

        //         actionManager.do(new SetParamDecimalsAction(this,
        //             dec    + _dec, 
        //             oldDec + _dec,
        //             dec, 
        //             oldDec
        //         ), true);
        //     }
        // });
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
        //pushUpdate([this.node]);
    }



    isDefault()
    {
        return this.value == this.defaultValue;
    }



    update(dispatchEvents)
    {
        super.update();

        if (   this.input
            && this.input.connected)
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
                && this.input.connected
                ? this.input.data.decimals
                : this.control.dec);
        }
    }



    setValue(strValue, confirm, updateControl = true, dispatchEvents = true, forceChange = false) 
    {
        const val = parseFloat(strValue);
        const dec = getDecimalCount(strValue);

        this.preSetValue(val, confirm, dispatchEvents);

        if (updateControl)
        {
            this.control.setDecimals(dec, dec);
            this.control.setValue(val, false, false, forceChange); 
        }

        super.setValue(val, confirm, updateControl, dispatchEvents);
    }    



    genRequest()
    {
        // this function exists because a parameter without an output
        // should still provide a value
        
        return this.input
            && this.input.connected 

            ? [ ...this.input.connectedOutput.genRequest() ]

            : [ NUMBER, 
                this.control.value.toString(), 
                this.control.displayDec.toString() ];
    }



    output_genRequest(output)
    {
        return output.param.genRequest();
    }



    toString()
    {
        return getNumberString(
            this.control.value, 
            this.control.displayDec); 
    }



    toJson(nTab = 0, id = '')
    {
        let pos = ' '.repeat(nTab);
        
        if (id == '')
            id = this.id;

        return pos + '["' + id  + '", "' + this.toString() + '"]';
    }
}