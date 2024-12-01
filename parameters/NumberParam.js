class   NumberParam
extends NumberParamBase
{
    isBoolean;


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
        super(NUMBER_VALUE, id, name, showName);

        
        this.controls.push(new NumberControl(
            this,
            this.id,
            this.name, 
            defaultValue,
            min,
            max,
            decimals,   
            dragScale)); 

            
        this.defaultValue = new NumberValue(defaultValue, decimals);
        this.isBoolean    = false;
        
        this.controls[0].successOnFocusOut = true;
        
        this.controls[0].div.zIndex = 0;
        this.divControls.appendChild(this.controls[0].div);

       
        if (hasInput)  this.initInput ([NUMBER_VALUE, TEXT_VALUE], getParamInputValuesForUndo, this.input_getBackInitValue);
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
            if (!e.detail.success)
                return;
            
            
            let dec = this.value.decimals;

            if (this.controls[0].allowEditDecimals)
                dec = decCount(e.detail.valueString);

            this.setValue(new NumberValue(e.detail.value, dec), true);
            e.preventSetValue = true;
        });
    }



    initInputAndOutput()
    {

    }



    setName(name, dispatchEvents = true)
    {
        super.setName(name, dispatchEvents);
        this.controls[0].setName(name);
    }



    setValue(value, createAction, updateControl = true, dispatchEvents = true)
    {
        super.setValue(value, createAction, updateControl, dispatchEvents);


        if (value.meta)
        {
            if (!isNaN(value.meta.min))        this.controls[0].min        = value.meta.min;
            if (!isNaN(value.meta.minDisplay)) this.controls[0].minDisplay = value.meta.minDisplay;

            if (!isNaN(value.meta.max))        this.controls[0].max        = value.meta.max;
            if (!isNaN(value.meta.maxDisplay)) this.controls[0].maxDisplay = value.meta.maxDisplay;

            if (!isNaN(value.meta.decimals))   this.controls[0].setDecimals(value.meta.decimals);

            this.controls[0].setSuffix(value.meta.suffix);
            
            if (value.meta.ranges)             this.controls[0].ranges     = value.meta.ranges.map(r => r.copy());

            this.controls[0].displayAbsolute = value.meta.displayAbsolute;

            const tooltip = document.getElementById(value.meta.tooltipId);

            if (tooltip)
            {
                this.getTooltip = () => tooltip;

                createTooltipSrc(
                    this.div, 
                    this.div, 
                    () => 
                    {
                        this.controls[0].addEventListener('change', () => 
                        {
                            const tooltip = this.getTooltip();
                            if (tooltip) hideTooltip(tooltip);
                        });

                        return this.getTooltip();
                    },
                    paramTooltipDelay,
                    () => settings.showTooltipParams);
            }
            else
                this.getTooltip = null;
        }
    }



    input_getBackInitValue()
    {
        // 'this' is the input

        return this.param.value;
    }



    output_backInit(value)
    {
        // 'this' is the output

        consoleAssert(value.type == NUMBER_VALUE, 'expected NUMBER_VALUE in backInit()');
        
        this.param.setValue(value, false, true, false);
    }


    toJson(nTab = 0, id = '')
    {
        let pos = ' '.repeat(nTab);
        
        if (id == '')
            id = this.id;

        const val = 
            this.isBoolean
            ? (this.value.value > 0 ? 'true' : 'false')
            : this.value.toJson();

        return pos + '["' + this.type  + '", "' + id  + '", "' + val + '"]';
    }



    loadParam(_param)
    {
        const value = parseNumberValue(_param[2])[0];

        this.setValue(value, true, true, false);
        this.isBoolean = value.isBoolean;
    }
}