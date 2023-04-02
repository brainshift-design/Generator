class   TextParam
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

    
    get value() { return new TextValue(this.controls[0].value); }
    

    
    constructor(id,
                name, 
                hasInput,
                hasOutput,
                defaultValue = '')
    {
        super(TEXT_VALUE, id, name);

        this.defaultValue = defaultValue;


        this.controls[0] = new TextControl(
            null,
            this,
            this.id,
            this.name,
            defaultValue);

        if (name != NULL)
            this.controls[0].textarea.defPlaceholder =
            this.controls[0].textarea.placeholder    = name;
        

        this.controls[0].successOnFocusOut = true;
        this.controls[0].div.zIndex        = 0;

        this.controls[0].div.style.display = 'inline-block';
        this.controls[0].div.style.width   = '100%';


        this.div.appendChild(this.controls[0].div);

       
        if (hasInput)  this.initInput(TEXT_TYPES, getParamInputValuesForUndo, this.input_getBackInitValue);
        if (hasOutput) this.initOutput([TEXT_VALUE], this.output_genRequest, getParamOutputValuesForUndo, this.output_backInit);


        this.controls[0].addEventListener('change', () => 
        { 
            this.setValue(this.value, true, false);
            //this.changing = true;
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

        console.assert(value.type == TEXT_VALUE, 'expected TEXT_VALUE in backInit()');
        
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
            console.assert(false, 'value.type must be TEXT_VALUE');
            console.trace();
        }


        this.preSetValue(value, createAction, dispatchEvents);


        this.controls[0].value = value.value;

        if (updateControl)
            this.controls[0].setValue(value.value, false);


        super.setValue(value, createAction, updateControl, dispatchEvents);


        this.oldValue = this.value;
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
            this.controls[0].value.toString());


        return request;
    }



    output_genRequest(gen)
    {
        return this.param.genRequest(gen);
    }



    enableControlText(enable)
    {
        enable &= 
               !this.input 
            || !this.input.connected;

        enableElementText(this.controls[0].textarea, enable);
        
        this.controls[0].textarea.disabled = !enable;
        this.controls[0].readOnly = !enable;
    }
    
    
    
    toJson(nTab = 0, id = '')
    {
        let pos = ' '.repeat(nTab);
        
        if (id == '')
            id = this.id;

        const value = encodeURIComponent(this.value.toString());

        return pos + '["' + this.type  + '", "' + id  + '", "' + value + '"]';
    }



    loadParam(param)
    {
        const value = decodeURIComponent(param);

        this.setValue(parseTextValue(value)[0], true, false, false);
    }
}