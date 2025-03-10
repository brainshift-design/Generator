class   NumberParam
extends NumberParamBase
{
    isBoolean;


    constructor(id,
                name, 
                showName,
                hasInput,
                hasOutput,
                defaultValue = 0, 
                min          = Number.MIN_SAFE_INTEGER, 
                max          = Number.MAX_SAFE_INTEGER,
                decimals     = 0,
                dragScale    = 0.05)
    {
        super(NUMBER_VALUE, id, name, showName);

        
        this.controls.push(new NumberControl(
            this,
            this.id,
            this.name, 
            defaultValue,
            min,
            max,
            decimals,   
            dragScale)); 

            
        this.defaultValue = new NumberValue(defaultValue, decimals);
        this.isBoolean    = false;
        
        this.controls[0].successOnFocusOut = true;
        
        this.controls[0].div.zIndex = 0;
        this.divControls.appendChild(this.controls[0].div);

       
        if (hasInput)  this.initInput ([NUMBER_VALUE, TEXT_VALUE], getParamInputValuesForUndo, this.input_getBackInitValue);
        if (hasOutput) this.initOutput([NUMBER_VALUE], this.output_genRequest, getParamOutputValuesForUndo, this.output_backInit);


        this.controls[0].addEventListener('change', () => 
        { 
            this.setValue(this.value, true, false);
            this.changing = true;
        });


        this.controls[0].addEventListener('confirm', () => 
        { 
            this.changing = false;
        });


        this.controls[0].addEventListener('finishedit', e =>
        { 
            if (!e.detail.success)
                return;
            
            
            let dec = this.value.decimals;

            if (this.controls[0].allowEditDecimals)
                dec = decCount(e.detail.valueString);

            this.setValue(new NumberValue(e.detail.value, dec), true);
            e.preventSetValue = true;
        });
    }



    initInputAndOutput()
    {

    }



    setName(name, dispatchEvents = true)
    {
        super.setName(name, dispatchEvents);
        this.controls[0].setName(name);
    }



    // setValue(value, createAction, updateControl = true, dispatchEvents = true)
    // {
    //     super.setValue(value, createAction, updateControl, dispatchEvents);


    // }



    input_getBackInitValue()
    {
        // 'this' is the input

        return this.param.value;
    }



    output_backInit(value)
    {
        // 'this' is the output

        consoleAssert(value.type == NUMBER_VALUE, 'expected NUMBER_VALUE in backInit()');
        
        this.param.setValue(value, false, true, false);
    }


    toJson(nTab = 0, id = '')
    {
        let pos = ' '.repeat(nTab);
        
        if (id == '')
            id = this.id;

        const val = 
            this.isBoolean
            ? (this.value.value > 0 ? 'true' : 'false')
            : this.value.toJson();

        return pos + '["' + this.type  + '", "' + id  + '", "' + val + '"]';
    }



    loadParam(_param)
    {
        const value = NumberValue.parse(_param[2])[0];

        this.setValue(value, true, true, false);
        this.isBoolean = value.isBoolean;
    }
}