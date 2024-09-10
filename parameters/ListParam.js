class   ListParam
extends Parameter
{
    defaultValue;

    oldValue     = null;
    

    itemName;
    showZero     = false;
    showCount    = false;

    getItemCount = null;

    
    value;


    listTypes   = []; // the only types to consider, unless it's empty, then it's all types
    outputTypes = []; // overrides the value types for UI purposes
    

    
    constructor(id,
                name, 
                showName,
                hasInput,
                hasOutput,
                defaultValue = new ListValue())
    {
        super(LIST_VALUE, id, name, showName);

        this.defaultValue = defaultValue;
        this.value        = defaultValue;

        this.itemName     = ['item'];


        this.controls.push(new TextControl(
            this,
            this.id,
            this.name,
            ''));

        this.controls[0].textbox.style.textAlign = 'center';
        this.controls[0].readOnly                =  true;
        this.controls[0].highlightText           =  false;
   
        
        this.divControls.appendChild(this.controls[0].div);

       
        if (hasInput)  this.initInput ([LIST_VALUE], getParamInputValuesForUndo, this.input_getBackInitValue);
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

        consoleAssert(isListValueType(value.type), 'expected LIST_VALUE in backInit()');
        
        this.param.setValue(value, false, true, false);
    }



    setValue(value, createAction, updateControl = true, dispatchEvents = true) 
    {
        if (!(value instanceof ListValue))
        {
            //console.log('value =', value);
            consoleError('ListParam.setValue(): value is ' + typeof value + ', must be a ListValue');
        }

        consoleAssert(
               value.type 
            && isListValueType(value.type), 
            'ListParam value.type must be LIST_VALUE');


        this.preSetValue(value, createAction, dispatchEvents);


        this.value = value.copy();


        super.setValue(this.value, createAction, updateControl, dispatchEvents);

        if (this.output)
            this.output.types = [finalListTypeFromValues(this.value.items)];


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
            // if (this.input.supportsTypes(this.input.connectedOutput.types))
            // {
                request.push(...pushInputOrParam(this.input, gen));
            // }
            // else
            //     consoleError('invalid input for ListParam (' + this.node.id + ')');
        }

        else request.push( 
            LIST_VALUE, 
            (new ListValue()).toString());

        return request;
    }



    output_genRequest(gen)
    {
        return this.param.genRequest(gen);
    }



    updateControls()
    {
        setEnabledTextStyle(this.controls[0].div, false);


        this.controls[0].readOnly = true;
        
        this.controls[0].textbox.style.fontStyle  = 'italic';
        this.controls[0].textbox.style.fontWeight = '500';

       
        const nItems = 
            this.getItemCount
            ? this.getItemCount()
            : this.value.items
                  .filter(i => 
                         isEmpty(this.listTypes) 
                      || this.listTypes.includes(i.type))
                  .length;

        let value =
                this.itemName.length > 0
            && !this.isUnknown()
            ? ((nItems != 0 || this.showZero) ? (nItems + ' ') : '')
              +  countString(nItems, ...this.itemName)
            : this.name;

        if (this.showCount)
            value += /*'  */ ' [ ' + nItems + ' ]';


        this.controls[0].textbox.value = value;


        if (this.input)
        {
            this.input.types = 
                isEmpty(this.listTypes)
                ? [LIST_VALUE]
                : [...this.listTypes];
        }


        if (this.output)
        {
            this.output.types = 
                isEmpty(this.outputTypes)
                ? [finalListTypeFromValues(this.value.items)]
                : [...this.outputTypes];
        }


        super.updateControls();


        this.controls[0].textbox.style.color = darkMode ? '#fff5' : '#0007';
    }



    isDefault = () => this.value.equals(this.defaultValue);



    loadParam(_param)
    {
        this.setValue(parseListValue(_param[2])[0], true, true, false);
    }
}