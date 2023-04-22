class   ListParam
extends Parameter
{
    defaultValue;

    oldValue = null;
    

   
    
    // get valueText() { return this.controls[0].valueText; }
    // set valueText(text) 
    // {
    //     this.controls[0].valueText = text;
    //     this.controls[0].update();
    // }

    
    value;
    

    
    constructor(id,
                name, 
                showName,
                hasInput,
                hasOutput,
                defaultValue = new ListValue())
    {
        super(LIST_VALUE, id, name);

        this.defaultValue                           = defaultValue;
        this.value                                  = defaultValue;


        this.controls.push(new TextControl(
            null,
            this,
            this.id,
            this.name,
            ''));

        this.controls[0].textbox.style.textAlign = 'center';
   
        this.div.appendChild(this.controls[0].div);

       
        if (hasInput)  this.initInput([LIST_VALUE], getParamInputValuesForUndo, this.input_getBackInitValue);
        if (hasOutput) this.initOutput([LIST_VALUE], this.output_genRequest, getParamOutputValuesForUndo, this.output_backInit);
    }



    input_getBackInitValue()
    {
        // 'this' is the input

        return this.param.value;
    }



    output_backInit(value)
    {
        // 'this' is the output

        console.assert(value.type == LIST_VALUE, 'expected LIST_VALUE in backInit()');
        
        this.param.setValue(value, false, true, false);
    }



    setValue(value, createAction, updateControl = true, dispatchEvents = true) 
    {
        if (!(value instanceof ListValue))
            console.assert(false, 'ListParam.setValue(value) is ' + typeof value + ', must be a ListValue');

        console.assert(
               value.type 
            && value.type == LIST_VALUE, 
            'ListParam value.type must be LIST_VALUE');


        this.preSetValue(value, createAction, dispatchEvents);


        this.value = value.copy();


        // if (updateControl)
        //     this.controls[0].setValue(this.value.items.length, false, false); 


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
            // request.push(...pushInputOrParam(this.input, gen));

            // if (   this.input.connectedOutput.support( FILL_TYPES)
            //     || this.input.connectedOutput.support(COLOR_TYPES))
            // {
            //     const val = noNaN(this.controls[0].value,      1);
            //     const dec = noNaN(this.controls[0].displayDec, 0);
                
            //     request.push(
            //         NUMBER_VALUE, 
            //         new NumberValue(val, dec).toString());
            // }

            if (this.input.connectedOutput.supportsTypes([LIST_VALUE]))
                request.push(...pushInputOrParam(this.input, gen));
            else
                console.assert(false, 'invalid input for ListParam');
        }

        else request.push( 
            LIST_VALUE, 
            this.value.toString());

        return request;
    }



    output_genRequest(gen)
    {
        return this.param.genRequest(gen);
    }



    updateControls()
    {
        checkControlVisible(this, this.controls[0]);
        

        enableElementText(this.controls[0].div, false);

        this.controls[0].readOnly = true;
        
        this.controls[0].textbox.style.fontStyle  = 'italic';
        this.controls[0].textbox.style.fontWeight = 'bold';

        const nItems = this.value.items.length;

        this.controls[0].textbox.value = nItems + ' ' + countString('item', nItems);


        if (this.input ) this.input .updateControl();
        if (this.output) this.output.updateControl();
    }



    isDefault = () => this.value.equals(this.defaultValue);



   loadParam(_param)
    {
        this.setValue(parseListValue(_param[2])[0], true, true, false);
    }
}