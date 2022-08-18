class   NumberParam
extends NumberParamBase
{
    allowEditDecimals = true;
    
    
    control;


    
    constructor(id,
                name, 
                showName,
                hasInput,
                hasOutput,
                defaultValue = 0, 
                min          = Number.MIN_SAFE_INTEGER, 
                max          = Number.MAX_SAFE_INTEGER,
                decimals     = 0,
                dragScale    = 0.05)
    {
        super(NUMBER, id, name);

        this.control        = createDiv('numberControl');
        
        this.control.param  = this;
        this.control.zIndex = 0;
   
        this.defaultValue   = new GNumberValue(defaultValue); // this way the default contains the decimals


        initNumberControl(
            this,
            this.control,
            120, // width
            20,  // height
            this.id,
            this.name, 
            showName,
            min,
            max,
            defaultValue,
            decimals,   
            dragScale); 

        this.control.successOnFocusOut = true;

        this.control.style.display = 'inline-block';
        this.control.style.width   = '100%';

        this.div.appendChild(this.control);

       
        if (hasInput)  this.initInput(NUMBER_TYPES);
        if (hasOutput) this.initOutput(NUMBER_VALUE, this.output_genRequest);


        this.control.addEventListener('confirm', () => 
        {
            this.setValue(new GNumberValue(this.control.value, this.control.displayDec), true,  false); 
        });


        this.control.addEventListener('finishedit', e =>
        { 
            let   dec    = decCount(e.detail.value); 
            const oldDec = decCount(e.detail.oldValue);

            
            if (!e.detail.success)
                return;


            if (   Math.abs(e.detail.value - e.detail.oldValue) > Number.EPSILON
                && dec >= oldDec)
            {
                this.setValue(new GNumberValue(e.detail.value, dec), true);
                e.preventSetValue = true;
            }
            else if (this.allowEditDecimals)
            {
                if (Math.abs(e.detail.value - e.detail.oldValue) <= Number.EPSILON)
                    dec += Math.log10(this.control.valueScale);
                else 
                    dec = oldDec;

                    this.setValue(new GNumberValue(e.detail.value, dec), true);
                e.preventSetValue = true;
            }
        });
    }



    setName(name, dispatchEvents = true)
    {
        super.setName(name, dispatchEvents);
        this.control.setName(name);
    }



    setValue(value, createAction, updateControl = true, dispatchEvents = true, forceChange = false) 
    {
        this.preSetValue(value, createAction, dispatchEvents);

        if (updateControl)
        {
            this.control.setDecimals(value.decimals, value.decimals);
            this.control.setValue(value.value, false, false, forceChange); 
        }

        super.setValue(value, createAction, updateControl, dispatchEvents);

        this.oldValue = this.genValue;
    }    



    valuesEqual(val1, val2)
    {
        return val1
            && val2
            && val1.value    == val2.value
            && val1.decimals == val2.decimals;
    }



    toString()
    {
        return this.genValue.toString();
    }
}