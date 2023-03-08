class   SelectParam
extends NumberParamBase
{
    options         = [];
    excludeFromMenu = []; // indices
    
    reverseMenu     = false;



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
            createDiv(),
            this,
            120, // width
            20,  // height
            this.id,
            this.name, 
            showName,
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

        this.div.appendChild(this.controls[0].div);


        if (hasInput)  this.initInput(NUMBER_TYPES, getParamInputValuesForUndo, this.input_getBackInitValue);
        if (hasOutput) this.initOutput([NUMBER_VALUE], this.output_genRequest, getParamOutputValuesForUndo, this.output_backInit);

            
        this.controls[0].addEventListener('confirm', () => { this.setValue(this.value, true, true); });


        // this.tooltip = createDiv('tooltip');
        // document.body.appendChild(this.tooltip);

        //createTooltip(this.tooltip);

        createTooltipSrc(this.controls[0], this.controls[0], () => 
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
        this        .options = [...options];
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

        console.assert(value.type == NUMBER_VALUE, 'expected NUMBER_VALUE in backInit()');
        
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


        const options = { callback: () => param.setValue(new NumberValue(i), true) };

        if (param.controls[0].readOnly)
            options['enabled'] = false;

            
        const item = new MenuItem(option, options);

        item.setChecked(i == param.value.toNumber());

        menuSelectParam.addItems([item]);
    }


    menuSelectParam.minWidth = 80;
}
