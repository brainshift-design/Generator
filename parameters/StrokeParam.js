class   StrokeParam
extends Parameter
{
    defaultValue;

    oldValue = null;
    

    checkers;
    controlWrapper;

    weightControl;
       fitControl;
      joinControl;
    
    
    get valueText() { return this.colorControl.valueText; }
    // set valueText(text) 
    // {
    //     this.colorControl.valueText = text;
    //     this.updateControls();
    // }

    
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

        this.checkers              = createDiv();
        this.controlWrapper        = createDiv();

        this.weightControl         = createDiv();
        this.weightControl.param   = this;
        this.weightControl.zIndex  = 0;

        this.fitControl            = createDiv();
        this.fitControl.param      = this;
        this.fitControl.zIndex     = 0;
   
        this.joinControl           = createDiv();
        this.joinControl.param     = this;
        this.joinControl.zIndex    = 0;
   
        this.defaultValue          = defaultValue;
        this.value                 = defaultValue;

        
        initNumberControl(
            this,
            this.weightControl,
            120, // width
            20,  // height
            this.id,
            'weight', 
            false,
            0,
            100,
            defaultValue.weight.value,
            0);

        initNumberControl(
            this,
            this.fitControl,
            120, // width
            20,  // height
            this.id,
            'fit', 
            false,
            0,
            100,
            defaultValue.fit.value,
            0);

        initNumberControl(
            this,
            this.joinControl,
            120, // width
            20,  // height
            this.id,
            'join', 
            false,
            0,
            100,
            defaultValue.join.value,
            0);


        this.checkers.style.position                = 'absolute';
        this.checkers.style.width                   = '100%';
        this.checkers.style.height                  = '20px';


        this.controlWrapper.style.display           = 'inline-block';
        this.controlWrapper.style.width             = '100%';
        this.controlWrapper.style.height            = '20px';


        this.weightControl.successOnFocusOut        = true;
        this.weightControl.style.display            = 'inline';
        this.weightControl.style.width              = '40%';
        this.weightControl.style.position           = 'absolute';
        this.weightControl.style.left               = 0;
        this.weightControl.barTop                   = 0.8;
        this.weightControl.barBottom                = 1;


        this.fitControl.successOnFocusOut           = true;
        this.fitControl.style.display               = 'inline';
        this.fitControl.style.width                 = '40%';
        this.fitControl.style.position              = 'absolute';
        this.fitControl.style.right                 = 0;
        this.fitControl.barTop                      = 0.8;
        this.fitControl.barBottom                   = 1;


        this.joinControl.successOnFocusOut          = true;
        this.joinControl.style.display              = 'inline';
        this.joinControl.style.width                = '40%';
        this.joinControl.style.position             = 'absolute';
        this.joinControl.style.right                = 0;
        this.joinControl.barTop                     = 0.8;
        this.joinControl.barBottom                  = 1;


        this.weightControl.text.style.transform     = 'translateX(-40%)';
        this.   fitControl.text.style.transform     = 'translateX(-50%)';
        this.  joinControl.text.style.transform     = 'translateX(-70%)';


        // this.  colorControl.textbox.style.position  = 'absolute';
        // this.  colorControl.textbox.style.left      = '0';
        // this.  colorControl.textbox.style.width     = '60%';
        // this.  colorControl.textbox.style.transform = 'translateX(0)';
        // this.  colorControl.textbox.style.textAlign = 'right';
        
        // this.opacityControl.textbox.style.position  = 'absolute';
        // this.opacityControl.textbox.style.right     = '0';
        // this.opacityControl.textbox.style.width     = '40%';
        // this.opacityControl.textbox.style.transform = 'translateX(25%)';
        // this.opacityControl.textbox.style.textAlign = 'left';


        this.controlWrapper.appendChild(this.weightControl);
        this.controlWrapper.appendChild(this.   fitControl);
        this.controlWrapper.appendChild(this.  joinControl);
        
        this.div.appendChild(this.checkers);
        this.div.appendChild(this.controlWrapper);

       
        if (hasInput)  this.initInput(STROKE_TYPES);
        if (hasOutput) this.initOutput(STROKE_VALUE, this.output_genRequest);


        this.weightControl.addEventListener('confirm', () =>
        { 
            this.setValue(new StrokeValue(
                this.value.fill,
                new NumberValue(this.weightControl.value, this.weightControl.dec), 
                new NumberValue(this.   fitControl.value, this.   fitControl.dec), 
                new NumberValue(this.  joinControl.value, this.  joinControl.dec),
                this.value.miter), 
                true, false);
        });


        this.fitControl.addEventListener('confirm', () =>
        { 
            this.setValue(new StrokeValue(
                this.value.fill,
                new NumberValue(this.weightControl.value, this.weightControl.dec), 
                new NumberValue(this.   fitControl.value, this.   fitControl.dec), 
                new NumberValue(this.  joinControl.value, this.  joinControl.dec), 
                this.value.miter), 
                true, false);
        });


        this.joinControl.addEventListener('confirm', () =>
        { 
            this.setValue(new StrokeValue(
                this.value.fill,
                new NumberValue(this.weightControl.value, this.weightControl.dec), 
                new NumberValue(this.   fitControl.value, this.   fitControl.dec), 
                new NumberValue(this.  joinControl.value, this.  joinControl.dec), 
                this.value.miter), 
                true, false);
        });
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


        if (updateControl)
        {
            this.weightControl.setValue(value.weight.value, false, true, false); 
            this.   fitControl.setValue(value.   fit.value, false, true, false); 
            this.  joinControl.setValue(value.  join.value, false, true, false); 
        }


        super.setValue(value, createAction, updateControl, dispatchEvents);


        this.oldValue = this.value;
    }    



    updateControls()
    {
        //const rgbVal = [0.5, 0.5, 0.5];
        const rgbVal = dataColor2rgb(this.value.fill.color.toDataColor());

        const rgbText = 
            true//this.opacityControl.value >= 50
            ? (isDark(rgbVal) 
               ? [1, 1, 1, 0.8]
               : [0, 0, 0, 0.5]) 
            : (isDarkMode()
               ? [1, 1, 1, 0.8]
               : [0, 0, 0, 0.5]);


        this.input.wireColor   = rgbVal;
        this.input.colorLight  = 
        this.input.colorDark   = rgb_a(rgbText, isDark(rgbText) ? 0.12 : 0.44);

        this.output.wireColor  = rgbVal;
        this.output.colorLight =
        this.output.colorDark  = rgb_a(rgbText, isDark(rgbText) ? 0.12 : 0.44);


        this.checkers.style.background =
            isDarkMode()
            ?   'linear-gradient(45deg, #222 25%, transparent 25%, transparent 75%, #222 75%), '
              + 'linear-gradient(45deg, #222 25%, transparent 25%, transparent 75%, #222 75%)'
            :   'linear-gradient(45deg, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%), '
              + 'linear-gradient(45deg, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%)';

        this.checkers.style.display            = 'inline-block';//this.value.isValid() ? 'inline-block' : 'none';
        this.checkers.style.backgroundColor    = isDarkMode() ? '#444' : '#fff';

        this.checkers.style.backgroundSize     = '20px 20px';
        this.checkers.style.backgroundPosition = '0 0, 10px 10px';

        
        const fillStyle = rgba2style(rgb_a(rgbVal, 1));//this.opacityControl.value/100));

        this.weightControl.backColorLight  = 
        this.weightControl.backColorDark   = 
        this.   fitControl.backColorLight  = 
        this.   fitControl.backColorDark   = 
        this.  joinControl.backColorLight  = 
        this.  joinControl.backColorDark   = fillStyle;

        this.weightControl.valueColorLight = 
        this.weightControl.valueColorDark  = 
        this.   fitControl.valueColorLight = 
        this.   fitControl.valueColorDark  = 
        this.  joinControl.valueColorLight = 
        this.  joinControl.valueColorDark  = 'transparent';//rgba2style(rgb_a(rgbText, 0.12));

        this.weightControl.textColorLight  = 
        this.weightControl.textColorDark   = 
        this.   fitControl.textColorLight  = 
        this.   fitControl.textColorDark   = 
        this.  joinControl.textColorLight  = 
        this.  joinControl.textColorDark   = rgba2style(rgbText);

        this.weightControl.update();
        this.   fitControl.update();
        this.  joinControl.update();


        // this.colorControl.style.backgroundColor = fillStyle;
        //this.colorControl.style.color           = rgba2style(rgb_a(rgbText, 0.6));


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



    textboxHasFocus()
    {
        return hasFocus(this.weightControl.textbox)
            || hasFocus(this.   fitControl.textbox)
            || hasFocus(this.  joinControl.textbox);
    }



    enableControlText(enable)
    {
        enableElementText(this.weightControl, enable);
        enableElementText(this.   fitControl, enable);
        enableElementText(this.  joinControl, enable);
        
        this.weightControl.readOnly = !enable;
        this.   fitControl.readOnly = !enable;
        this.  joinControl.readOnly = !enable;
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