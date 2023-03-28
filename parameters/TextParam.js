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

    
    get value() { return this.controls[0].value; }
    

    
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


        this.controls[0].successOnFocusOut = true;
        this.controls[0].div.zIndex        = 0;

        this.controls[0].div.style.display = 'inline-block';
        this.controls[0].div.style.width   = '100%';


        this.div.appendChild(this.controls[0].div);

       
        if (hasInput)  this.initInput(TEXT_TYPES, getParamInputValuesForUndo, this.input_getBackInitValue);
        if (hasOutput) this.initOutput([TEXT_VALUE], this.output_genRequest, getParamOutputValuesForUndo, this.output_backInit);


        this.controls[0].addEventListener('finishedit', e =>
        { 
            if (!e.detail.success)
                return;

            if (   e.detail.value.trim() != ''
                && e.detail.value != e.detail.oldValue)
            {
                this.setValue(new TextValue(e.detail.value), true);
                e.preventSetValue = true;
            }
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



    resetControls()
    {
        //this.controls[0].valueText = '';
    }



    setValue(value, createAction, updateControl = true, dispatchEvents = true) 
    {
        // console.log('TextParam.setValue value =', value);

        console.assert(
               value.type 
            && value.type == TEXT_VALUE, 
            'value.type must be TEXT_VALUE');
           
            
        this.preSetValue(value, createAction, dispatchEvents);

        this.controls[0].value = value.value;

        if (updateControl)
            this.controls[0].setValue(this.controls[0].value, true, false); 


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
        console.log('this.controls[0].value =', this.controls[0].value);


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



    // textboxHasFocus()
    // {
    //     return hasFocus(this.controls[0].textbox);
    // }



    enableControlText(enable)
    {
        enable &= 
               !this.input 
            || !this.input.connected;

        enableElementText(this.controls[0].div, enable);
        
        this.controls[0].readOnly = !enable;
    }
    
    
    
    loadParam(param)
    {
        this.setValue(parseTextValue(param)[0], true, false, false);
    }
}