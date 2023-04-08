class   ColorParam
extends Parameter
{
    defaultValue;

    oldValue = null;

    
    _warningOverlay;
    
    forceShowWarning = false;
    warningStyle;


    checkers;
    

    
    get valueText() { return this.controls[0].valueText; }
    set valueText(text) 
    {
        this.controls[0].valueText = text;
        this.controls[0].update();
    }

    
    get value() { return this.controls[0].value; }
    

    
    constructor(id,
                name, 
                showName,
                hasInput,
                hasOutput,
                defaultValue = ColorValue.fromRgb([0x80, 0x80, 0x80]),
                dragScale    = 0.05)
    {
        super(COLOR_VALUE, id, name);

        this.defaultValue = defaultValue;


        this.controls[0] = new ColorControl(
            null,
            this,
            this.id,
            this.name, 
            showName,
            defaultValue,   
            dragScale); 

        this.controls[0].successOnFocusOut = true;
        this.controls[0].div.zIndex        = 0;

        this.controls[0].div.style.display = 'inline-block';
        this.controls[0].div.style.width   = '100%';

        
        this._warningOverlay = createDiv('colorWarningOverlay');
        this._warningOverlay.style.zIndex  = 21;
        
        this.div.appendChild(this._warningOverlay);


        this.checkers                      = createDiv();
 
        this.checkers.style.position       = 'absolute';
        this.checkers.style.width          = '100%';
        this.checkers.style.height         = '20px';
        this.checkers.style.display        = 'none';
        this.checkers.style.pointerEvents  = 'none';


        this.div.appendChild(this.checkers);
        this.div.appendChild(this.controls[0].div);

       
        if (hasInput)  this.initInput(COLOR_TYPES, getParamInputValuesForUndo, this.input_getBackInitValue);
        if (hasOutput) this.initOutput([COLOR_VALUE], this.output_genRequest, getParamOutputValuesForUndo, this.output_backInit);


        this.controls[0].addEventListener('confirm', () => 
        {
            this.setValue(this.controls[0].value, true, false); 
        });


        this.controls[0].addEventListener('finishedit', e =>
        { 
            if (!e.detail.success)
                return;

            if (   e.detail.value.trim() != ''
                && e.detail.value != e.detail.oldValue)
            {
                const webColor = webColors.find(wc => wc.name.toLowerCase() == e.detail.value.toLowerCase());
                if (webColor) e.detail.value = webColor.color;

                const rgb = validHex2rgb(e.detail.value);
                const val = ColorValue.fromRgb(scaleRgb(rgb));

                this.setValue(val, true);
                e.preventSetValue = true;
            }
        });
    }



    input_getBackInitValue()
    {
        // 'this' is the input

        return this.param.value;
    }



    output_backInit(value)
    {
        // 'this' is the output

        if (value.type == FILL_VALUE)
            value = value.color;

        this.param.setValue(value, false, true, false);
    }



    setName(name, dispatchEvents = true)
    {
        super.setName(name, dispatchEvents);
        this.controls[0].setName(name);
    }



    isDefault = () => this.value.equals(this.defaultValue);



    isVisible()
    {
        return this.controls[0].div.style.display != 'none';
    }



    resetControls()
    {
        this.controls[0].valueText = '';
    }



    setValue(value, createAction, updateControl = true, dispatchEvents = true) 
    {
        console.assert(
               value.type 
            && value.type == COLOR_VALUE, 
            'value.type must be COLOR_VALUE');
            
        this.preSetValue(value, createAction, dispatchEvents);

        this.controls[0].value = value.copy();

        if (updateControl)
            this.controls[0].setValue(this.controls[0].value, true, false); 


        super.setValue(value, createAction, updateControl, dispatchEvents);


        this.oldValue = this.value.copy();
    }    



    updateControls()
    {
        this.updateWarningOverlay();


        const noColor = 
            darkMode
            ? rgbNoColorDark
            : rgbNoColorLight;

        const rgbVal   = this.value.toRgb();
        const rgbaText = getTextColorFromBackColor(rgbVal, 1);
        
        
        if (this.input)
        {
            this.input.colorLight  = 
            this.input.colorDark   = rgb_a(rgbaText, 0.2);
            this.input.wireColor   = !rgbIsNaN(rgbVal) ? rgbVal : noColor;
        }

        if (this.output)
        {
            this.output.colorLight =
            this.output.colorDark  = rgb_a(rgbaText, 0.2);
            this.output.wireColor  = !rgbIsNaN(rgbVal) ? rgbVal : noColor;
        }


        this.checkers.style.background = 
            darkMode
            ?   'linear-gradient(45deg, #222 25%, transparent 25%, transparent 75%, #222 75%), '
              + 'linear-gradient(45deg, #222 25%, transparent 25%, transparent 75%, #222 75%)'
            :   'linear-gradient(45deg, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%), '
              + 'linear-gradient(45deg, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%)';

        this.checkers.style.backgroundColor    = darkMode ? '#444' : '#fff';

        this.checkers.style.backgroundSize     = '22px 22px';
        this.checkers.style.backgroundPosition = '0 0, 11px 11px';

        this.checkers.style.left               = '-3.5px';
        this.checkers.style.width              = 'calc(100% + 3.5px)';


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
        return hasFocus(this.controls[0].textbox);
    }



    enableControlText(enable)
    {
        enable &= 
               !this.input 
            || !this.input.connected;

        enableElementText(this.controls[0].div, enable);
        
        this.controls[0].readOnly = !enable;
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
    
    
    
    loadParam(_param)
    {
        this.setValue(parseColorValue(_param[2])[0], true, false, false);
    }
}