class   ColorParam
extends Parameter
{
    defaultValue;

    oldValue = null;

    
    _warningOverlay;
    
    forceShowWarning = false;
    warningStyle;


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
        super(COLOR_VALUE, id, name);

        this.checkers       = createDiv();
        this.control        = createDiv();
        
        this.control.param  = this;
        this.control.zIndex = 0;
   
        this.defaultValue   = defaultValue;


        this._warningOverlay = createDiv('colorWarningOverlay');
        this._warningOverlay.style.zIndex = 21;
        this.div.appendChild(this._warningOverlay);


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
                const val = ColorValue.fromRgb(scaleRgb(rgb));

                this.setValue(val, true);
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
            this.control.setValue(this.control.value, true, false); 


        super.setValue(value, createAction, updateControl, dispatchEvents);


        this.oldValue = this.value.copy();
    }    



    updateControls()
    {
        this.updateWarningOverlay();


        this.checkers.style.background = 
            isDarkMode()
            ?   'linear-gradient(45deg, #222 25%, transparent 25%, transparent 75%, #222 75%), '
              + 'linear-gradient(45deg, #222 25%, transparent 25%, transparent 75%, #222 75%)'
            :   'linear-gradient(45deg, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%), '
              + 'linear-gradient(45deg, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%)';

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
    
    
    
    updateWarningOverlay() 
    {
        //console.log(this.id + '.updateWarningOverlay()');

        const rgb = this.value.toRgb();

        if (!rgbIsNaN(rgb))
        {
            if (  !rgbIsValid(rgb)
                || this.forceShowWarning)
            {
                if (!this.forceShowWarning)
                    this.warningStyle = getDefaultWarningStyle(rgb);

                this.updateWarningOverlayStyle(rgb);
            }
            else
                this._warningOverlay.style.display = 'none';
        }
        else
        {
            this.warningStyle = getDefaultWarningStyle(rgb);
            this.updateWarningOverlayStyle(rgb);
        }
    }



    updateWarningOverlayStyle(colBack, height = -1)
    {
        //console.log('colBack =', colBack);
        
        this._warningOverlay.style.height = 
            height < 0
            ? this.div.offsetHeight
            : height;

        this._warningOverlay.style.background =
               rgbIsOk(colBack)
            && !this.forceShowWarning
            ? 'transparent'
            : 'repeating-linear-gradient('
               + '-45deg, '
               + 'transparent 0 7px,'
               +  this.warningStyle + ' 7px 14px)';

        this._warningOverlay.style.display = 'block';
    }
    
    
    
    loadParam(param)
    {
        this.setValue(parseColorValue(param)[0], true, true, false);
    }
}