class   ColorStopParam
extends Parameter
{
    defaultValue;

    oldValue     = null;
    

    //itemName;
    //showZero     = false;

    //getItemCount = null;

    
    value;


    //listTypes = []; // the only types to consider, unless it's empty, then it's all types
    

    
    constructor(id,
                name, 
                showName,
                hasInput,
                hasOutput,
                defaultValue = new ColorStopValue())
    {
        super(COLOR_STOP_VALUE, id, name);

        this.defaultValue = defaultValue;
        this.value        = defaultValue;

        //this.itemName     = 'item';


        this.controls.push(new TextControl(
            this,
            this.id,
            this.name,
            showName,
            ''));

        this.controls[0].textbox.style.textAlign  = 'center';
   
        this.div.appendChild(this.controls[0].div);

       
        if (hasInput)  this.initInput([COLOR_STOP_VALUE], getParamInputValuesForUndo, this.input_getBackInitValue);
        if (hasOutput) this.initOutput([COLOR_STOP_VALUE], this.output_genRequest, getParamOutputValuesForUndo, this.output_backInit);
    }



    input_getBackInitValue()
    {
        // 'this' is the input

        return this.param.value;
    }



    output_backInit(value)
    {
        // 'this' is the output

        console.assert(COLOR_STOP_VALUES.includes(value.type), 'expected COLOR_STOP_VALUE in backInit()');
        
        this.param.setValue(value, false, true, false);
    }



    setValue(value, createAction, updateControl = true, dispatchEvents = true) 
    {
        if (!(value instanceof ColorStopValue))
        {
            //console.log('value =', value);
            console.assert(false, 'ColorStopParam.setValue(): value is ' + typeof value + ', must be a ColorStopValue');
        }

        console.assert(
               value.type 
            && value.type == COLOR_STOP_VALUE, 
            'ColorStopParam value.type must be COLOR_STOP_VALUE');


        this.preSetValue(value, createAction, dispatchEvents);


        this.value = value.copy();


        super.setValue(this.value, createAction, updateControl, dispatchEvents);

        // if (this.output)
        //     this.output.types = [finalListTypeFromItems(this.value.items)];


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
                console.assert(false, 'invalid input for ColorStopParam (' + this.node.id + ')');
        }

        else request.push( 
            COLOR_STOP_VALUE, 
            (new ColorStopValue()).toString());

        return request;
    }



    output_genRequest(gen)
    {
        return this.param.genRequest(gen);
    }



    updateControls()
    {
        checkControlVisible(this, this.controls[0]);
        

        this.div.style.background = 
            darkMode 
            ? this.backStyleDark 
            : this.backStyleLight;


        enableElementText(this.controls[0].div, false);

        this.controls[0].readOnly = true;
        
        this.controls[0].textbox.style.fontStyle  = 'italic';
        this.controls[0].textbox.style.fontWeight = '500';

 
        this.controls[0].textbox.value =
                    rgb2hex(this.value.fill.color.toRgb())
            + ' ' + this.value.fill.opacity.toNumber() + '%'
            + ' ' + this.value.position.toNumber() + '%';

        // const nItems = 
        //     this.getItemCount
        //     ? this.getItemCount()
        //     : this.value.items
        //           .filter(i => 
        //                  isEmpty(this.listTypes) 
        //               || this.listTypes.includes(i.type))
        //           .length;

        // this.controls[0].textbox.value = 
        //       (nItems != 0 || this.showZero ? nItems + ' ' : '') 
        //     + countString(nItems, this.itemName);


        if (this.input ) this.input .updateControl();
        if (this.output) this.output.updateControl();
    }



    isDefault = () => this.value.equals(this.defaultValue);



    loadParam(_param)
    {
        this.setValue(parseColorStopValue(_param[2])[0], true, true, false);
    }
}