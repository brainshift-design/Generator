class   SelectParam
extends NumberParamBase
{
    options           = [];
    excludeFromMenu   = []; // indices
    separatorsBefore  = [];
    
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
        super(NUMBER_VALUE, id, name);

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

        this.controls[0].div.style.display = 'inline-block';
        this.controls[0].div.style.width   = '100%';

       
        this.defaultValue = new NumberValue(defaultValue);


        this.setOptions(options);

        this.controls[0].allowEditDecimals = false;

        this.controls[0].successOnFocusOut = true;
        this.controls[0].barTop            = 0.8;

        this.divControls.appendChild(this.controls[0].div);


        if (hasInput)  this.initInput([NUMBER_VALUE], getParamInputValuesForUndo, this.input_getBackInitValue);
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


        // this.tooltip = createDiv('tooltip');
        // document.body.appendChild(this.tooltip);

        //createTooltip(this.tooltip);

        createTooltipSrc(this.controls[0].div, this.controls[0].div, () => 
        {
            const tooltip = this.getTooltip();

            if (tooltip)
                this.initTooltip(tooltip, this.options);

            this.controls[0].addEventListener('change', () => 
            {
                if (tooltip) hideTooltip(tooltip);
            });

            return this.getTooltip();
        });
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


    
    getTooltip = () => null;//this.tooltip;



    setOptions(options)
    {
        this            .options = [...options];
        this.controls[0].options = [...options];
    }



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



function initSelectParamMenu(param)
{
    menuSelectParam.clearItems();


    const s = !param.reverseMenu ? 0 : param.controls[0].displayMax;
    const c = !param.reverseMenu ? i => i <= param.controls[0].displayMax : i => i >= 0;
    const d = !param.reverseMenu ? 1 : -1;


    for (let i = s; c(i); i += d)
    {
        const option = param.options[i];
        
        if (param.excludeFromMenu.includes(i))
            continue;


        if (param.separatorsBefore.includes(i))
            menuSelectParam.addItems([new MenuItem(option, {separator: true})]);
        

        const options = { callback: () => param.setValue(new NumberValue(i), true) };

        if (param.controls[0].readOnly)
            options.enabled = false;

            
        const item = new MenuItem(
            option.replaceAll('/', ' / '), 
            options);

        item.setChecked(i == param.value.toNumber());

        menuSelectParam.addItems([item]);
    }


    menuSelectParam.minWidth = 120;
}
