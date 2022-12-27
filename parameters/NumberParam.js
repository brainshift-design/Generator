class   NumberParam
extends NumberParamBase
{
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
        super(NUMBER_VALUE, id, name);

        
        this.control        = createDiv('numberControl');
        
        this.control.param  = this;
        this.control.zIndex = 0;
   
        this.defaultValue   = new NumberValue(defaultValue, decimals);


        initNumberControl(
            this,
            this.control,
            120, // width
            20,  // height
            this.id,
            this.name, 
            showName,
            defaultValue,
            min,
            max,
            decimals,   
            dragScale); 

        this.control.successOnFocusOut = true;

        this.control.style.display = 'inline-block';
        this.control.style.width   = '100%';

        this.div.appendChild(this.control);

       
        if (hasInput)  this.initInput(NUMBER_TYPES);
        if (hasOutput) this.initOutput([NUMBER_VALUE], this.output_genRequest);


        this.control.addEventListener('confirm', () => { this.setValue(this.value, true, false, true); });


        this.control.addEventListener('finishedit', e =>
        { 
            let   dec    = decCount(e.detail.value); 
            const oldDec = decCount(e.detail.oldValue);

            
            if (!e.detail.success)
                return;


            if (   Math.abs(e.detail.value - e.detail.oldValue) > Number.EPSILON
                && dec >= oldDec)
            {
                this.setValue(new NumberValue(parseFloat(e.detail.value), dec), true);
                e.preventSetValue = true;
            }
            else if (this.control.allowEditDecimals)
            {
                if (Math.abs(parseFloat(e.detail.value) - parseFloat(e.detail.oldValue)) <= Number.EPSILON)
                    dec += Math.log10(this.control.valueScale);
                else 
                    dec = oldDec;

                this.setValue(new NumberValue(parseFloat(e.detail.value), dec), true);
                e.preventSetValue = true;
            }
        });



        createTooltipSrc(this.control, this.control, () => 
        {
            this.control.addEventListener('change', () => 
            {
                const tooltip = this.getTooltip();
                if (tooltip) hideTooltip(tooltip);
            });
            
            return this.getTooltip();
        });
    }



    getTooltip = () => null;


    
    setName(name, dispatchEvents = true)
    {
        super.setName(name, dispatchEvents);
        this.control.setName(name);
    }
}