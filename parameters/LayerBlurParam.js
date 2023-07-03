class   LayerBlurParam
extends Parameter
{
    defaultValue;

    oldValue = null;
    
    value;


    
    constructor(id,
                name, 
                showName,
                hasInput,
                hasOutput,
                defaultValue = new LayerBlurValue())
    {
        super(LAYER_BLUR_VALUE, id, name, showName);

        this.defaultValue = defaultValue;
        this.value        = defaultValue;


        this.controls.push(new TextControl(
            this,
            this.id,
            this.name,
            ''));

        this.controls[0].textbox.style.textAlign  = 'center';
   
        this.divControls.appendChild(this.controls[0].div);

       
        if (hasInput)  this.initInput ([LAYER_BLUR_VALUE], getParamInputValuesForUndo, this.input_getBackInitValue);
        if (hasOutput) this.initOutput([LAYER_BLUR_VALUE], this.output_genRequest, getParamOutputValuesForUndo, this.output_backInit);
    }



    input_getBackInitValue()
    {
        // 'this' is the input

        return this.param.value;
    }



    output_backInit(value)
    {
        // 'this' is the output

        consoleAssert(LAYER_BLUR_VALUES.includes(value.type), 'expected LAYER_BLUR_VALUE in backInit()');
        
        this.param.setValue(value, false, true, false);
    }



    setValue(value, createAction, updateControl = true, dispatchEvents = true) 
    {
        if (!(value instanceof LayerBlurValue))
        {
            //console.log('value =', value);
            consoleError('LayerBlurParam.setValue(): value is ' + typeof value + ', must be a LayerBlurValue');
        }

        consoleAssert(
               value.type 
            && value.type == LAYER_BLUR_VALUE, 
            'LayerBlurParam value.type must be LAYER_BLUR_VALUE');


        this.preSetValue(value, createAction, dispatchEvents);


        this.value = value.copy();


        super.setValue(this.value, createAction, updateControl, dispatchEvents);


        this.oldValue = this.value;
    }    



    isVisible()
    {
        return this.controls[0].div.style.display != 'none';
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
        {
            if (this.input.supportsTypes(this.input.connectedOutput.types))
                request.push(...pushInputOrParam(this.input, gen));
            else
                consoleError('invalid input for LayerBlurParam (' + this.node.id + ')');
        }

        else request.push( 
            LAYER_BLUR_VALUE, 
            (new LayerBlurValue()).toString());

        return request;
    }



    output_genRequest(gen)
    {
        return this.param.genRequest(gen);
    }



    updateControls()
    {
        // this.div.style.background = 
        //     darkMode 
        //     ? this.backStyleDark 
        //     : this.backStyleLight;


        enableElementText(this.controls[0].div, false);

        this.controls[0].readOnly = true;
        
        this.controls[0].textbox.style.fontStyle  = 'italic';
        this.controls[0].textbox.style.fontWeight = '500';

 
        this.controls[0].textbox.value = 'layer blur';
            //   'drop ' 
            // +  printNum(this.value.x.value)  
            // + ', ' 
            // +  printNum(this.value.y.value)
            // + 'B: ' + printNum(this.value.blur.value)
            // + 'S: ' + printNum(this.value.spread.value);


        super.updateControls();
    }



    isDefault = () => this.value.equals(this.defaultValue);



    loadParam(_param)
    {
        this.setValue(parseLayerBlurValue(_param[2])[0], true, true, false);
    }
}