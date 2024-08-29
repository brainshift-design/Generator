class   StrokeParam
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
                defaultValue = new StrokeValue())
    {
        super(STROKE_VALUE, id, name, showName);

        this.defaultValue = defaultValue;
        this.value        = defaultValue;


        this.controls.push(new TextControl(
            this,
            this.id,
            this.name,
            ''));

        this.controls[0].textbox.style.textAlign  = 'center';
   
        this.divControls.appendChild(this.controls[0].div);

       
        if (hasInput)  this.initInput ([STROKE_VALUE], getParamInputValuesForUndo, this.input_getBackInitValue);
        if (hasOutput) this.initOutput([STROKE_VALUE], this.output_genRequest, getParamOutputValuesForUndo, this.output_backInit);
    }



    input_getBackInitValue()
    {
        // 'this' is the input

        return this.param.value;
    }



    output_backInit(value)
    {
        // 'this' is the output

        consoleAssert(STROKE_VALUES.includes(value.type), 'expected STROKE_VALUE in backInit()');
        
        this.param.setValue(value, false, true, false);
    }



    setValue(value, createAction, updateControl = true, dispatchEvents = true) 
    {
        if (!(value instanceof StrokeValue))
        {
            //console.log('value =', value);
            consoleError('StrokeParam.setValue(): value is ' + typeof value + ', must be a StrokeValue');
        }

        consoleAssert(
               value.type 
            && value.type == STROKE_VALUE, 
            'StrokeParam value.type must be STROKE_VALUE');


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
                consoleError('invalid input for StrokeParam (' + this.node.id + ')');
        }

        else request.push( 
            STROKE_VALUE, 
            (new StrokeValue()).toString());

        return request;
    }



    output_genRequest(gen)
    {
        return this.param.genRequest(gen);
    }



    updateControls()
    {
        super.updateControls();


        enableElementText(this.controls[0].div, false);

        this.controls[0].readOnly = true;
        
        this.controls[0].textbox.style.fontStyle  = 'italic';
        this.controls[0].textbox.style.fontWeight = '500';


        const fills = this.value.fills.items;
        
        if (fills.length != 1)
        {
            this.controls[0].textbox.value =
                         fills.length + ' fill' + (fills.length == 1 ? '' : 's')
                + ', ' + this.value.weight.toNumber() + 'px';
        }
        else
        {
            this.controls[0].textbox.value =
                        rgb2hex(fills[0].color.toRgb())
                + ' '  + fills[0].opacity.toNumber() + '%'
                + ', ' + this.value.weight.toNumber() + 'px';
        }
     }



    isDefault = () => this.value.equals(this.defaultValue);



    loadParam(_param)
    {
        this.setValue(parseStrokeValue(_param[2])[0], true, true, false);
    }
}