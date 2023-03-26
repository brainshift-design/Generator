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

        
        this.controls[0] = new NumberControl(
            createDiv('numberControl'),
            this,
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

            
        this.controls[0].div.zIndex = 0;

        this.controls[0].div.style.display = 'inline-block';
        this.controls[0].div.style.width   = '100%';

   
        this.defaultValue = new NumberValue(defaultValue, decimals);


        this.controls[0].successOnFocusOut = true;

        this.div.appendChild(this.controls[0].div);

       
        if (hasInput)  this.initInput(NUMBER_TYPES, getParamInputValuesForUndo, this.input_getBackInitValue);
        if (hasOutput) this.initOutput([NUMBER_VALUE], this.output_genRequest, getParamOutputValuesForUndo, this.output_backInit);


        this.controls[0].addEventListener('change', () => 
        { 
            this.setValue(this.value, true, false);
            this.changing = true;
        });


        this.controls[0].addEventListener('confirm', () => 
        { 
            this.changing = false;
        });


        this.controls[0].addEventListener('finishedit', e =>
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
            else if (this.controls[0].allowEditDecimals)
            {
                if (Math.abs(parseFloat(e.detail.value) - parseFloat(e.detail.oldValue)) <= Number.EPSILON)
                    dec += Math.log10(this.controls[0].valueScale);
                else
                    dec = oldDec;

                this.setValue(new NumberValue(parseFloat(e.detail.value), dec), true);
                e.preventSetValue = true;
            }
        });



        createTooltipSrc(this.controls[0].div, this.controls[0].div, () => 
        {
            this.controls[0].addEventListener('change', () => 
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
        this.controls[0].setName(name);
    }



    input_getBackInitValue()
    {
        // 'this' is the input

        return this.param.value;
    }



    output_backInit(value)
    {
        // 'this' is the output

        crashAssert(value.type == NUMBER_VALUE, 'expected NUMBER_VALUE in backInit()');
        
        this.param.setValue(value, false, true, false);
    }
}