class   ListParam
extends Parameter
{
    defaultValue;

    oldValue = null;
    

    itemName;
    showZero = false;

    
    value;


    listTypes = []; // the only types to consider, unless it's empty, then it's all types
    

    
    constructor(id,
                name, 
                showName,
                hasInput,
                hasOutput,
                defaultValue = new ListValue())
    {
        super(LIST_VALUE, id, name);

        this.defaultValue = defaultValue;
        this.value        = defaultValue;

        this.itemName     = 'item';


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

        console.assert(LIST_VALUES.includes(value.type), 'expected LIST_VALUE in backInit()');
        
        this.param.setValue(value, false, true, false);
    }



    setValue(value, createAction, updateControl = true, dispatchEvents = true) 
    {
        if (!(value instanceof ListValue))
            console.assert(false, 'ListParam.setValue(value) is ' + typeof value + ', must be a ListValue');

        console.assert(
               value.type 
            && LIST_VALUES.includes(value.type), 
            'ListParam value.type must be LIST_VALUE');


        this.preSetValue(value, createAction, dispatchEvents);


        this.value = value.copy();


        super.setValue(this.value, createAction, updateControl, dispatchEvents);

        if (this.output)
            this.output.types = [finalListTypeFromItems(this.value.items)];


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
            console.log('this.input.connectedOutput.node.id =', this.input.connectedOutput.node.id);
            console.log('this.input.connectedOutput.types =', [...this.input.connectedOutput.types]);
            if (this.input.supportsTypes(this.input.connectedOutput.types))
                request.push(...pushInputOrParam(this.input, gen));
            // if (this.input.connectedOutput.supportsTypes([LIST_VALUE]))
            //     request.push(...pushInputOrParam(this.input, gen));
            // else if (this.input.connectedOutput.supportsTypes(this.input.types))
            //     request.push(
            //         LIST_VALUE, 1,
            //         ...pushInputOrParam(this.input, gen));
            else
                console.assert(false, 'invalid input for ListParam (' + this.node.id + ')');
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
        checkControlVisible(this, this.controls[0]);
        

        enableElementText(this.controls[0].div, false);

        this.controls[0].readOnly = true;
        
        this.controls[0].textbox.style.fontStyle  = 'italic';
        this.controls[0].textbox.style.fontWeight = '500';

        const nItems = this.value.items
            .filter(i => isEmpty(this.listTypes) || this.listTypes.includes(i.type))
            .length;

        this.controls[0].textbox.value = 
              (nItems != 0 || this.showZero ? nItems + ' ' : '') 
            + countString(this.itemName, nItems);


        if (this.input ) this.input .updateControl();
        if (this.output) this.output.updateControl();
    }



    isDefault = () => this.value.equals(this.defaultValue);



    loadParam(_param)
    {
        this.setValue(parseListValue(_param[2])[0], true, true, false);
    }
}