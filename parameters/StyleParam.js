class   StyleParam
extends Parameter
{
    defaultValue;

    oldValue = null;
    

    textControl;

    
    // get valueText() { return this.colorControl.valueText; }

    
    value;
    

    
    constructor(id,
                name, 
                hasInput,
                hasOutput,
                defaultValue = new ListValue())
    {
        super(LIST_VALUE, id, name);


        this.textControl                  = createDiv('colorControlText');

        this.defaultValue                 = defaultValue.copy();
        this.value                        = defaultValue.copy();

        
        this.textControl.style.width      = '100%';
        this.textControl.style.textAlign  = 'center';


        this.div.appendChild(this.textControl);

       
        if (hasInput)  this.initInput(ALL_TYPES);
        if (hasOutput) this.initOutput([LIST_VALUE], this.output_genRequest);
    }



    isDefault = () => arraysAreEqual(this.value, this.defaultValue);



    setValue(value, createAction, updateControl = true, dispatchEvents = true) 
    {
        //console.log('value =', value);
        
        if (!(value instanceof ListValue))
            console.assert(false, 'StyleParam.setValue(value) is ' + typeof value + ', must be a ListValue');


        console.assert(
               value.type 
            && value.type == LIST_VALUE, 
            'StyleParam value.type must be LIST_VALUE');

        this.preSetValue(value, createAction, dispatchEvents);


        this.value = value.copy();


        super.setValue(this.value, createAction, updateControl, dispatchEvents);


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
        {
            request.push(...pushInputOrParam(this.input, gen));

            // if (this.input.connectedOutput.supports(ALL_TYPES))
            // {
            //     const val = noNaN(this.control.value,      1);
            //     const dec = noNaN(this.control.displayDec, 0);
                
            //     request.push(
            //         NUMBER_VALUE, 
            //         new NumberValue(val, dec).toString());
            // }
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
        if (   this.input.connected
            && this.value.isValid())
        {
            const noColor = 
                isDarkMode()
                ? rgbNoColorDark
                : rgbNoColorLight;

            const rgbaVal = this.value.fill.toRgba();
            const rgbaText = getTextColorFromBackColor(rgbaVal, rgbaVal[3]);


            this.input.wireColor   = !rgbIsNaN(rgbaVal) ? rgbaVal : noColor;
            this.input.colorLight  = 
            this.input.colorDark   = rgb_a(rgbaText, 0.2);

            this.output.wireColor  = !rgbIsNaN(rgbaVal) ? rgbaVal : noColor;
            this.output.colorLight =
            this.output.colorDark  = rgb_a(rgbaText, 0.2);


            this.textControl.style.display = 'none';
        }
        else
        {
            const noColor  = isDarkMode() ? rgbNoColorDark      : rgbNoColorLight;
            const rgbaText = isDarkMode() ? rgbaNoColorTextDark : rgbaNoColorTextLight;


            this.input.wireColor           = noColor;
            this.input.colorLight          = 
            this.input.colorDark           = rgb_a(rgbaText, 0.12);
        
            this.output.wireColor          = noColor;
            this.output.colorLight         =
            this.output.colorDark          = rgb_a(rgbaText, 0.12);


            this.textControl.style.display = 'inline-block';
            this.textControl.style.color   = rgba2style(rgbaText);

            this.textControl.innerHTML     = 'no style';
            
            this.div.style.background =
                isDarkMode()
                ? 'rgba(56, 56, 56, 0.95)'
                : 'rgba(255, 255, 255, 0.95)';
        }


        this.div.style.height = '20px';


        if (this.input ) this.input .updateControl();
        if (this.output) this.output.updateControl();
    }



    enableControlText(enable)
    {
        enable &= !this.input || !this.input.connected;

        const opEnable = 
                enable 
            || !this.input 
            || !this.input.connected 
            ||  this.input.connectedOutput.supports(ALL_TYPES);

        enableElementText(this.textControl, enable);
        this.textControl.readOnly = !enable;
    }



    loadParam(param)
    {
        this.setValue(parseListValue(param)[0], true, true, false);
    }
}