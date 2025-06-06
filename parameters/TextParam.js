class TextParam
extends Parameter
{
    defaultValue;

    oldValue = null;
    

    get valueText() { return this.controls[0].valueText; }
    set valueText(text) 
    {
        this.controls[0].valueText = text;
        this.controls[0].update();
    }

    
    get value() 
    { 
        return new TextValue(this.controls[0].value); 
    }
    

    
    constructor(id,
                name, 
                showName,
                hasInput,
                hasOutput,
                defaultValue = '')
    {
        super(TEXT_VALUE, id, name, showName);


        this.defaultValue = new TextValue(defaultValue);
        this.oldValue     = this.defaultValue.copy();


        this.controls[0] = new TextControl(
            this,
            this.id,
            this.name,
            defaultValue);

            
        this.controls[0].successOnFocusOut = true;
        this.controls[0].div.zIndex        = 0;


        this.divControls.appendChild(this.controls[0].div);

       
        if (hasInput ) this.initInput ([TEXT_VALUE, NUMBER_VALUE], getParamInputValuesForUndo, this.input_getBackInitValue);
        if (hasOutput) this.initOutput([TEXT_VALUE], this.output_genRequest, getParamOutputValuesForUndo, this.output_backInit);


        this.controls[0].addEventListener('change', () => 
        { 
            this.setValue(this.value, true, false);
        });
    }



    input_getBackInitValue()
    {
        // 'this' is the input

        return this.param.value;
    }



    output_backInit(value)
    {
        // 'this' is the output

        consoleAssert(value.type == TEXT_VALUE, 'expected TEXT_VALUE in backInit()');
        
        this.param.setValue(value, false, true, false);
    }



    setName(name, dispatchEvents = true)
    {
        super.setName(name, dispatchEvents);
        this.controls[0].setName(name);
    }



    isDefault = () => this.value == this.defaultValue;



    isVisible()
    {
        return this.controls[0].div.style.display != 'none';
    }



    setValue(value, createAction, updateControl = true, dispatchEvents = true) 
    {
        // console.log('TextParam.setValue value =', value);

        if (   !value.type 
            || !value.type == TEXT_VALUE)
        { 
            consoleError('value.type must be TEXT_VALUE');
            console.trace();
        }


        if (   value.value === null
            || (typeof value.value) !== 'string')
        {
            consoleError('value.value (' + value.value + ') has type \'' + (typeof value.value) + '\', must be string');
            console.trace();
        }


        this.preSetValue(value, createAction, dispatchEvents);


        this.controls[0].value = value.value;

        if (updateControl)
            this.controls[0].setValue(value.value, false);


        super.setValue(value, createAction, updateControl, dispatchEvents);


        this.oldValue = value;
    }    



    updateSetting(setting, value)
    {
        if (setting == 'align')
        {
            this.controls[0].textbox   .style.textAlign = value;
            this.controls[0].textBehind.style.textAlign = value;
        }
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

        else request.push( 
            TEXT_VALUE, 
            encodeURIComponent(this.controls[0].value.toString()));


        return request;
    }



    output_genRequest(gen)
    {
        return this.param.genRequest(gen);
    }



    updateControls()
    {
        super.updateControls();

        setTimeout(() =>
        {
            if (   this.controls[0].textbox
                && this.controls[0].textBehind)
            {
                syncTextScroll(this.controls[0].textbox, this.controls[0].textBehind);
            }
        });
    }



    enableControlText(enable, unknown = false)
    {
        enable &= 
               !this.input 
            || !this.input.connected;

        setEnabledTextStyle(this.controls[0].textbox, enable, this.noItalic);
        
        //this.controls[0].textbox.disabled = !enable;
        this.controls[0].readOnly = !enable;


        this.controls[0].valueText = 
               unknown
            ||    this.input  && this.input .isUncached()
               && this.output && this.output.isMultiplied()
            ? UNKNOWN_DISPLAY
            : '';
    }
    
    
    
    toJson(nTab = 0, id = '')
    {
        let pos = ' '.repeat(nTab);
        
        if (id == '')
            id = this.id;

        const value = encodeURIComponent(this.value.toString());


        return pos 
            + '["' 
                + this.type + '", "' 
                + id        + '", "' 
                + value     + '", "' 
                + this.controls[0].getTextAlignment()
            + '"]';
    }



    loadParam(_param)
    {
        const val = _param[2];

        this.setValue(TextValue.parse(val)[0], true, false, false);

        if (_param.length >= 4)
        {
            switch (_param[3])
            {
            case '':
            case 'start':
            case 'left':    this.controls[0].textbox.style.textAlign = 'left';    break;
            case 'center':  this.controls[0].textbox.style.textAlign = 'center';  break;
            case 'right':   this.controls[0].textbox.style.textAlign = 'right';   break; 
            case 'justify': this.controls[0].textbox.style.textAlign = 'justify'; break;
            }
        }
    }



    static getPromptFormat()
    {
        return `${Parameter.getPromptFormat()} | default`;
    }



    toPrompt()
    {
        const def = this.defaultValue.toString();

        return `${super.toPrompt()} | ${def}`;
    }
}