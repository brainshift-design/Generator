class   OptionParam
extends NumberParamBase
{
    options           = [];
    excludeFromMenu   = []; // indices

    separatorsBefore  = [];
    markMenuPro       = [];

    minMenuWidth      = 200;
    
    saveAsText        = false;
    
    reverseMenu       = false;

    

    constructor(id,
                name,
                showName,
                hasInput,
                hasOutput,
                options,
                defaultValue = 0)
    {
        super(NUMBER_VALUE, id, name, showName);

        this.controls[0] = new NumberControl(
            this,
            this.id,
            this.name, 
            defaultValue,
            0,
            options.length-1,
            0,   // decimals
            0.02);


        this.controls[0].div.zIndex = 0;

        // this.controls[0].div.style.display = 'inline-block';
        // this.controls[0].div.style.width   = '100%';

       
        this.defaultValue = new NumberValue(defaultValue);


        this.controls[0].successOnFocusOut = true;

        this.controls[0].div.zIndex = 0;
        this.divControls.appendChild(this.controls[0].div);


        this.setOptions(options);

        this.controls[0].allowEditDecimals = false;
        this.controls[0].barTop            = 0.8;


        for (let i = 0; i < options.length; i++)
            this.controls[0].textValues.push([i, options[i]]);


        if (hasInput)  this.initInput([NUMBER_VALUE, TEXT_VALUE], getParamInputValuesForUndo, this.input_getBackInitValue);
        if (hasOutput) this.initOutput([NUMBER_VALUE], this.output_genRequest, getParamOutputValuesForUndo, this.output_backInit);


        this.controls[0].addEventListener('change', () => 
        { 
            this.setValue(this.value, true, false, true);
            this.changing = true;
        });
            
        this.controls[0].addEventListener('confirm', () => 
        { 
            this.setValue(this.value, true, true); 
            this.changing = false;
        });


        this.tooltip = createDiv('tooltip');
        document.body.appendChild(this.tooltip);

        createTooltip(this.tooltip);

        createTooltipSrc(this.div, this.div, () => 
        {
            const tooltip = this.getTooltip();

            if (tooltip)
                this.initTooltip(tooltip, this.options);

            this.controls[0].addEventListener('change', () => 
            {
                if (tooltip) hideTooltip(tooltip);
            });

            return this.getTooltip();
        },
        paramTooltipDelay,
        () => settings.showTooltipParams);
    }



    initTooltip = (tooltip, options) =>
    {
        // let strOptions = '';

        // for (const option of options)
        // {
        //     if (strOptions != '') strOptions += ', ';
        //     strOptions += option;
        // }

        // tooltip.innerHTML = strOptions;
    };


    
    setOption(index, option)
    {
        this            .options[index] = option;
        this.controls[0].options[index] = option;
    }



    setOptions(options)
    {
        this            .options = [...options];
        this.controls[0].options = [...options];
    }



    // setValue(value, createAction, updateControl = true, dispatchEvents = true)
    // {
    //     super.setValue(value, createAction, updateControl, dispatchEvents);

    //     if (value.meta)
    //         this.updateTooltipFromMeta(value.meta);
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



    toString()
    {
        return this.input
            && this.input.connected 

            ? [ ...pushInputOrParam(this.input, createGenObject()) ]

            : [ NUMBER_VALUE, 
                this.value.toString(), 
                this.controls[0].displayDec.toString() ];
    }



    toJson(nTab = 0, id = '')
    {
        let pos = ' '.repeat(nTab);
        
        if (id == '')
            id = this.id;

        const type =
            this.saveAsText
            ? TEXT_VALUE
            : NUMBER_VALUE;

        const value = 
            this.saveAsText
            ? new TextValue(this.options[this.value.value]).toJson()
            : this.value.toJson();

        return pos + '["' + type  + '", "' + id  + '", "' + value + '"]';
    }



    loadParam(_param)
    {
        const str   = parseTextValue(_param[2])[0].toString();
        const index = this.options.indexOf(str);

        if (this.saveAsText) this.setValue(new NumberValue(index), true, true, false);
        else                 this.setValue(parseNumberValue(_param[2])[0], true, true, false);
    }
}



function initOptionParamMenu(param)
{
    menuOptionParam.clearItems();


    const s = !param.reverseMenu ? 0 : param.controls[0].maxDisplay;
    const c = !param.reverseMenu ? i => i <= param.controls[0].maxDisplay : i => i >= 0;
    const d = !param.reverseMenu ? 1 : -1;

    const pad = getDigitCount(param.controls[0].maxDisplay);

    
    for (let i = s; c(i); i += d)
    {
        const option = param.options[i];
        
        if (param.excludeFromMenu.includes(i))
            continue;


        if (param.separatorsBefore.includes(i))
            menuOptionParam.addItems([new MenuItem(option, null, false, {separator: true})]);
        

        const options = { 
            callback:     () => param.setValue(new NumberValue(i), true),
            subscription: param.markMenuPro.includes(i) };

        if (param.controls[0].readOnly)
            options.enabled = false;

            
        const index =
              '  '.repeat(pad - getDigitCount(i)) // en space + thin space, works for Inter
            + i.toString();

        const item = new MenuItem(
              index + '  ·  '
            + option.replaceAll('/', ' / '), 
            null,
            false,
            options);


        item.divName.style.fontVariantNumeric = 'tabular-nums';

        item.setChecked(i == param.value.toNumber());

        menuOptionParam.addItems([item]);
    }


    menuOptionParam.minWidth = param.minMenuWidth;
}
