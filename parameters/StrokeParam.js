class   StrokeParam
extends Parameter
{
    defaultValue;

    oldValue = null;
    

    checkers;

    colorControl;
     textControl;

    
    // get valueText() { return this.colorControl.valueText; }

    
    value;
    

    
    constructor(id,
                name, 
                showName,
                hasInput,
                hasOutput,
                defaultValue = StrokeValue.NaN,
                dragScale    = 0.05)
    {
        super(FILL, id, name);


        this.checkers                     = createDiv();

        this.colorControl                 = createDiv();
        this. textControl                 = createDiv('colorControlText');

        this.defaultValue                 = defaultValue;
        this.value                        = defaultValue;

        
        this.checkers    .style.position  = 'absolute';
        this.checkers    .style.width     = '100%';
        this.checkers    .style.height    = '20px';
        

        this.colorControl.style.position  = 'absolute';
        this.colorControl.style.display   = 'block';
        this.colorControl.style.width     = '100%';
        this.colorControl.style.height    = '20px';

        this.textControl .style.width     = '100%';
        this.textControl .style.textAlign = 'center';
    

        this.div.appendChild(this.checkers);
        
        this.div.appendChild(this.colorControl);
        this.div.appendChild(this. textControl);

       
        if (hasInput)  this.initInput(STROKE_TYPES);
        if (hasOutput) this.initOutput(STROKE_VALUE, this.output_genRequest);
    }



    // setName(name, dispatchEvents = true)
    // {
    //     super.setName(name, dispatchEvents);
    //     this.colorControl.setName(name);
    // }



    isDefault()
    {
        return this.value.equals(this.defaultValue);
    }



    setValue(value, createAction, updateControl = true, dispatchEvents = true) 
    {
        if (!(value instanceof StrokeValue))
        {
            console.trace();
            console.log('value =', value);
            console.assert(false, 'StrokeParam.setValue(value) is ' + typeof value + ', must be a StrokeValue');
        }


        console.assert(
               value.type 
            && value.type == STROKE_VALUE, 
            'StrokeParam value.type must be STROKE_VALUE');

        this.preSetValue(value, createAction, dispatchEvents);


        this.value = value;

// console.log('this.value =', this.value);
//         if (updateControl)
//             this.updateControls();


        super.setValue(value, createAction, updateControl, dispatchEvents);


        this.oldValue = this.value;
    }    



    updateControls()
    {
        if (this.value.isValid())
        {
            const rgbaVal = this.value.fill.toRgba();
            rgbaVal[3] /= 100;

            const rgbaText = 
                rgbaVal[3] >= 0.5
                ? (isDark(rgbaVal) 
                   ? [1, 1, 1, 0.8]
                   : [0, 0, 0, 0.5]) 
                : (isDarkMode()
                   ? [1, 1, 1, 0.8]
                   : [0, 0, 0, 0.5]);


            this.input.wireColor   = rgbaVal;
            this.input.colorLight  = 
            this.input.colorDark   = rgb_a(rgbaText, isDark(rgbaText) ? 0.12 : 0.44);

            this.output.wireColor  = rgbaVal;
            this.output.colorLight =
            this.output.colorDark  = rgb_a(rgbaText, isDark(rgbaText) ? 0.12 : 0.44);


            this.checkers.style.background =
                isDarkMode()
                ?   'linear-gradient(45deg, #222 25%, transparent 25%, transparent 75%, #222 75%), '
                  + 'linear-gradient(45deg, #222 25%, transparent 25%, transparent 75%, #222 75%)'
                :   'linear-gradient(45deg, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%), '
                  + 'linear-gradient(45deg, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%)';

            this.checkers.style.display            = 'inline-block';
            this.checkers.style.backgroundColor    = isDarkMode() ? '#444' : '#fff';

            this.checkers.style.backgroundSize     = '20px 20px';
            this.checkers.style.backgroundPosition = '0 0, 10px 10px';

            this.colorControl.style.display        = 'inline-block';
            this.colorControl.style.background     = rgba2style(rgbaVal);

            this.textControl.innerHTML             = 'stroke';
            this.textControl.style.color           = rgba2style(rgbaText);
        }
        else
        {
            this.checkers    .style.display        = 'none';
            this.colorControl.style.display        = 'none';

            this.colorControl.style.background     = 'transparent';

            this.textControl.innerHTML             = 'no stroke';
            this.textControl.style.color           = isDarkMode() ? '#eee8' : '#0006';
        }


        this.div.style.height = '20px';


        if (this.input ) this.input .updateControl();
        if (this.output) this.output.updateControl();
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
            STROKE_VALUE, 
            this.value.toString());

        return request;
    }



    output_genRequest(gen)
    {
        return this.param.genRequest(gen);
    }



    // textboxHasFocus()
    // {
    //     return hasFocus(this.weightControl.textbox)
    //         || hasFocus(this.   fitControl.textbox)
    //         || hasFocus(this.  joinControl.textbox);
    // }



    enableControlText(enable)
    {
        enableElementText(this.textControl, enable);
        this.textControl.readOnly = !enable;
    }
    
    
    
    toString()
    {
        return this.value.toString();
    }



    toJson(nTab = 0, id = '')
    {
        let pos = ' '.repeat(nTab);
        
        if (id == '')
            id = this.id;

        return pos + '["' + id  + '", "' + this.value.toString() + '"]';
    }


    
    loadParam(param)
    {
        this.setValue(parseStrokeValue(param)[0], true, true, false);
    }
}