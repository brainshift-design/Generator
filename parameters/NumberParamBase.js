class   NumberParamBase
extends Parameter
{
    showFullPrecision = false;

    
    
    get value() 
    { 
        return new NumberValue(
            this.controls[0].value, 
            this.controls[0].displayDec);
    }

    oldValue = null;


    defaultValue;
    alwaysSaveValue = false;


    get valueText() { return this.controls[0].valueText; }
    set valueText(text) 
    {
        this.controls[0].valueText = text;
        this.controls[0].update();
    }



    setValue(value, createAction, updateControl = true, dispatchEvents = true) 
    {
        if (!value)
            return;

        
        if (   this.markMenuPro
            && this.markMenuPro.includes(value.value))
        {
            while (value.value >= 1
                && this.markMenuPro.includes(value.value))
                value.value--;
        }


        if (!(value instanceof NumberValue))
            console.trace(); 

        consoleAssert(
            value instanceof NumberValue,
            'value is a ' + value.constructor.name + ', must be a NumberValue');


        if (  !isNaN(value.value)
            && isNaN(value.decimals))
            value.decimals = decDigits(value.value);

            
        this.preSetValue(value, createAction, dispatchEvents);

        
        if (updateControl)
        {
            this.controls[0].setDecimals(value.decimals, value.decimals);
            this.controls[0].setValue(value.value, value.decimals, false, false); 
        }


        super.setValue(value, createAction, updateControl, dispatchEvents);


        if (value.meta)
        {
            if (!isNaN(value.meta.min))            this.controls[0].min        = value.meta.min;
            if (!isNaN(value.meta.minDisplay))     this.controls[0].minDisplay = value.meta.minDisplay;

            if (!isNaN(value.meta.max))            this.controls[0].max        = value.meta.max;
            if (!isNaN(value.meta.maxDisplay))     this.controls[0].maxDisplay = value.meta.maxDisplay;

            if (!isNaN(value.meta.decimals))       this.controls[0].setDecimals(value.meta.decimals);

            if (value.meta.wrapValue != undefined) this.controls[0].wrapValue  = value.meta.wrapValue;
            if (value.meta.ranges)                 this.controls[0].ranges     = value.meta.ranges.map(r => r.copy());
            
            this.controls[0].setSuffix(value.meta.suffix);
            this.controls[0].displayAbsolute = value.meta.displayAbsolute;

            this.updateTooltipFromMeta(value.meta);
        }
        
        
        this.oldValue = this.value.copy();
    }    



    isVisible()
    {
        return this.controls[0].div.style.display != 'none';
    }



    resetControls()
    {
        this.controls[0].valueText = '';
    }



    getValueForUndo()
    {
        return {
            paramId:    this.id, 
            value:      this.value,
            min:        this.controls[0].min,
            max:        this.controls[0].max,
            minDisplay: this.controls[0].minDisplay,
            maxDisplay: this.controls[0].maxDisplay
        };
    }



    genRequest(gen)
    {
        // this function exists because a parameter without an output
        // should still be able to generate a request
        
        // 'this' is the param

        if (    this.output
            && !isEmpty(this.output.cache)
            &&  gen.passedNodes.includes(this.node))
            return this.output.cache;

            
        const request = [];


        if (   this.input
            && this.input.connected)
            request.push(...pushInputOrParam(this.input, gen));

        else if (this.output
              && this.output.paramNode
              && this.output.paramNode.inputs[0].connected)
            request.push(...pushInputOrParam(this.output.paramNode.inputs[0], gen));

        else 
        {
            if (this.isBoolean === true)
                request.push(
                    NUMBER_VALUE, 
                    new BooleanValue(this.controls[0].value > 0).toString());
            else
                request.push(
                    NUMBER_VALUE, 
                    new NumberValue(
                        this.controls[0].value, 
                        this.controls[0].displayDec).toString());
        }


        return request;
    }



    output_genRequest(gen)
    {
        return this.param.genRequest(gen);
    }



    textboxHasFocus()
    {
        return hasFocus(this.controls[0].textbox);
    }



    enableControlText(enable, unknown = false)
    {
        enable &= 
               !this.input 
            || !this.input.connected;

        setEnabledTextStyle(this.divName,         enable, this.noItalic, false);
        setEnabledTextStyle(this.controls[0].div, enable, this.noItalic);

        this.controls[0].readOnly = !enable;

        this.updateValueText();


        this.controls[0].valueText = 
               unknown
            ||    this.input  
               && this.input.isUncached()
               && this.node.hasMultipliedOutputs()
               //&& this.output && this.output.isMultiplied()
            ? UNKNOWN_DISPLAY
            : '';
    }
    
    
    
    // updateControls()
    // {
    //     this.controls[0].div.style.width = '100%';
        
    //     // this.div.style.background = 
    //     //     darkMode 
    //     //     ? this.backStyleDark 
    //     //     : this.backStyleLight;

    //     super.updateControls();
    // }



    updateTooltipFromMeta(meta)
    {
        if (!meta.tooltipId)
            return;


        const tooltip = document.getElementById(meta.tooltipId);

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
                () => 
                {
                    return settings.showTooltipParams
                        ||    settings.showTooltipColorContrast
                           && (   tooltip.id == 'ttWcag2'
                               || tooltip.id == 'ttWcag3')
                        ||    settings.showTooltipAscii
                           && tooltip.id == 'ttAscii'
                        ||    settings.showTooltipColorNames
                           && tooltip.id == 'ttColorNames'
                        ||    settings.showTooltipColorInterpolation
                           && tooltip.id == 'ttInterpolationSpace'
                        ||    settings.showTooltipValidateMethod
                           && tooltip.id == 'ttValidateMethod'
                        ||    settings.showTooltipColorBlindness
                           && tooltip.id == 'ttColorblind';
                });
        }
        else
            this.getTooltip = null;
    }



    updateValueText()
    {
        let unknown = false;

        if (   this.input
            && this.input.connected)
        {
            if (   this.input.isUncached()
                && this.node.hasMultipliedOutputs())
                unknown = true;
        }


        if (unknown)
            this.controls[0].valueText = UNKNOWN_DISPLAY;

        this.controls[0].showBar = !unknown;
    }



    isDefault = () => 
           !this.alwaysSaveValue
         && this.value.value    == this.defaultValue.value
         && this.value.decimals == this.defaultValue.decimals;



    loadParam(_param)
    {
        this.setValue(NumberValue.parse(_param[2])[0], true, true, false);
    }



    toJsCode(gen)
    {
        return this.input.connected
            ? '(' + this.input.connectedOutput.toJsCode(gen) + ')'
            :  this.value.toJsCode(gen);
    }


    static getPromptFormat()
    {
        return `${Parameter.getPromptFormat()} | default | min | max`;
    }



    toPrompt()
    {
        const def = this.defaultValue.toString();
        const min = this.controls[0].min;
        const max = this.controls[0].max;

        return `${super.toPrompt()} | ${def} | ${min} | ${max}`;
    }
}