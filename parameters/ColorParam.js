class   ColorParam
extends Parameter
{
    defaultValue;

    oldValue = null;

    
    checkers;
    
    control;
    

    
    get valueText() { return this.control.valueText; }
    set valueText(text) 
    {
        this.control.valueText = text;
        this.control.update();
    }

    
    get value() { return this.control.value; }
    

    
    constructor(id,
                name, 
                showName,
                hasInput,
                hasOutput,
                defaultValue = ColorValue.fromRgb([0x80, 0x80, 0x80]),
                dragScale    = 0.05)
    {
        super(COLOR, id, name);

        this.checkers       = createDiv();
        this.control        = createDiv();
        
        this.control.param  = this;
        this.control.zIndex = 0;
   
        this.defaultValue   = defaultValue;


        initColorControl(
            this,
            this.control,
            120, // width
            20,  // height
            this.id,
            this.name, 
            showName,
            defaultValue,   
            dragScale); 

        this.control.successOnFocusOut = true;


        this.checkers.style.position      = 'absolute';
        this.checkers.style.width         = '100%';
        this.checkers.style.height        = '20px';
        this.checkers.style.display       = 'none';
        this.checkers.style.pointerEvents = 'none';


        this.control .style.display       = 'inline-block';
        this.control .style.width         = '100%';


        this.div.appendChild(this.checkers);
        this.div.appendChild(this.control );

       
        if (hasInput)  this.initInput(COLOR_TYPES);
        if (hasOutput) this.initOutput([COLOR_VALUE], this.output_genRequest);


        this.control.addEventListener('confirm', () => 
        {
            this.setValue(this.control.value, true, false); 
        });


        this.control.addEventListener('finishedit', e =>
        { 
            if (!e.detail.success)
                return;


            if (e.detail.value != e.detail.oldValue)
            {
                const rgb = validHex2rgb(e.detail.value);

                this.setValue(ColorValue.fromRgb(scaleRgb(rgb)), true);
                e.preventSetValue = true;
            }
        });
    }



    setName(name, dispatchEvents = true)
    {
        super.setName(name, dispatchEvents);
        this.control.setName(name);
    }



    isDefault = () => this.value.equals(this.defaultValue);



    setValue(value, createAction, updateControl = true, dispatchEvents = true) 
    {
        console.assert(
               value.type 
            && value.type == COLOR_VALUE, 
            'value.type must be COLOR_VALUE');
            
        this.preSetValue(value, createAction, dispatchEvents);

        this.control.value = value.copy();

        if (updateControl)
            this.control.setValue(this.control.value, false, true); 

        super.setValue(value, createAction, updateControl, dispatchEvents);

        this.oldValue = this.value.copy();
    }    



    updateControls()
    {
        // const rgb = this.value.toRgb();

        // const col = 
        //     !rgbIsNaN(rgb)
        //     ? (isDark(rgb)
        //        ? [1, 1, 1]
        //        : [0, 0, 0])
        //     : (isDarkMode()
        //        ? [1, 1, 1]
        //        : [0, 0, 0]);


        // const noColor = 
        //     isDarkMode()
        //     ? rgbNoColorDark
        //     : rgbNoColorLight;

        // this.input.wireColor   = !rgbIsNaN(rgb) ? rgb : noColor;
        // this.input.colorLight  = 
        // this.input.colorDark   = rgb_a(col, 0.2);

        // this.output.wireColor  = !rgbIsNaN(rgb) ? rgb : noColor;
        // this.output.colorLight =
        // this.output.colorDark  = rgb_a(col, 0.2);


        this.checkers.style.background = 
            isDarkMode()
            ?   'linear-gradient(45deg, #222 25%, transparent 25%, transparent 75%, #222 75%), '
              + 'linear-gradient(45deg, #222 25%, transparent 25%, transparent 75%, #222 75%)'
            :   'linear-gradient(45deg, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%), '
              + 'linear-gradient(45deg, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%)';

        //this.checkers.style.display            = this.value.isValid() ? 'inline-block' : 'none';
        this.checkers.style.backgroundColor    = isDarkMode() ? '#444' : '#fff';

        this.checkers.style.backgroundSize     = '20px 20px';
        this.checkers.style.backgroundPosition = '0 0, 10px 10px';


        super.updateControls();
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
            COLOR_VALUE, 
            this.value.toString());


        return request;
    }



    output_genRequest(gen)
    {
        return this.param.genRequest(gen);
    }



    textboxHasFocus()
    {
        return hasFocus(this.control.textbox);
    }



    enableControlText(enable)
    {
        enable &= !this.input || !this.input.connected;
        enableElementText(this.control, enable);
        this.control.readOnly = !enable;
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
        this.setValue(parseColorValue(param)[0], true, true, false);
    }
}