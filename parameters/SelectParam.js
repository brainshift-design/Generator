class   SelectParam
extends NumberParamBase
{
    options         = [];
    excludeFromMenu = []; // indices
    


    constructor(id,
                name,
                showName,
                hasInput,
                hasOutput,
                options,
                defaultValue = 0)
    {
        super(NUMBER_VALUE, id, name);

        this.control        = createDiv();
        
        this.control.param  = this;
        this.control.zIndex = 0;

       
        this.defaultValue   = new NumberValue(defaultValue);


        initNumberControl(
            this,
            this.control,
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


        this.setOptions(options);

        this.control.allowEditDecimals = false;

        this.control.successOnFocusOut = true;
        this.control.barTop            = 0.8;

        this.control.style.display     = 'inline-block';
        this.control.style.width       = '100%';

        this.div.appendChild(this.control);


        if (hasInput)  this.initInput(NUMBER_TYPES);
        if (hasOutput) this.initOutput([NUMBER_VALUE], this.output_genRequest);

            
        this.control.addEventListener('confirm', () => { this.setValue(this.value, true, true); });


        // this.tooltip = createDiv('tooltip');
        // document.body.appendChild(this.tooltip);

        //createTooltip(this.tooltip);

        createTooltipSrc(this.control, this.control, () => 
        {
            const tooltip = this.getTooltip();

            if (tooltip)
                this.initTooltip(tooltip, this.options);

            this.control.addEventListener('change', () => 
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
        this.control.options = [...options];
    }



    toString()
    {
        return this.input
            && this.input.connected 

            ? [ ...pushInputOrParam(this.input, createGenObject()) ]

            : [ NUMBER_VALUE, 
                this.value.toString(), 
                this.control.displayDec.toString() ];
    }
}



function initSelectParamMenu(param)
{
    menuSelectParam.clearItems();

    for (let i = 0; i < param.options.length; i++)
    {
        const option = param.options[i];
        
        if (param.excludeFromMenu.includes(i))
            continue;

        const options = { callback: () => param.setValue(new NumberValue(i), true) };

        if (param.control.readOnly)
            options['enabled'] = false;

        const item = new MenuItem(option, options);

        item.setChecked(i == param.value.toNumber());

        menuSelectParam.addItems([item]);
    }

    menuSelectParam.minWidth = 80;
}
