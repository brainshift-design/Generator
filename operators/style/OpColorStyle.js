class   OpColorStyle
extends OperatorBase
{
    paramValue;

    circle;
    link;

    existing        = false;

    linkedStyleId   = NULL;
    linkedStyleName = NULL;




    constructor(options = {})
    {
        super(COLOR_STYLE, 'style');

        this.inert = true;


        this.addParam(this.paramValue = new ColorParam('value', '', false, true, true, ColorValue.fromRgb(rgbDefaultFill)));

        this.paramValue.input.getValuesForUndo = this.input_getValuesForUndo;
        this.paramValue.input.addEventListener('disconnect', e => OpColorStyle_value_onDisconnectInput(this, e.detail.input));

        
        if (!!options.existing)
        {
            this.existing = true;
            this.paramValue.setValue(ColorValue.NaN, false, false, false);
        }


        this.circle      = createDiv('styleCircle');
        this.circle.over = false;

        this.circle.addEventListener('pointerenter', e => { this.circle.over = true;  this.updateLinkIcon(); });
        this.circle.addEventListener('pointerleave', e => { this.circle.over = false; this.updateLinkIcon(); });

        this.circle.addEventListener('pointerdown',  e => 
        { 
            e.stopPropagation();

            if (   e.button == 0
                && this.existing)
            {
                hideAllMenus(); 

                uiQueueMessageToFigma({
                    cmd:   'figGetAllLocalColorStyles',
                    nodeId: this.id,
                    px:     e.clientX,
                    py:     e.clientY }); 
            }
        });


        this.link = createDiv('styleLink');


        this.circle.appendChild(this.link);
        this.label.insertBefore(this.circle, this.labelText);
    }



    setName(newName, options = {})
    {
        super.setName(newName, options);

        if (isValid(options.updateNodes))
            pushUnique(options.updateNodes, this);
    }



    genRequest(gen)
    {
        // 'this' is the node

        gen.scope.push({
            nodeId:  this.id, 
            paramId: NULL });


        const options = 
              (this.existing              ? 1 : 0) << 21
            | (this.linkedStyleId != NULL ? 1 : 0) << 22;


        const [request, ignore] = this.genRequestStart(gen, options);
        if (ignore) return request;

                
        request.push(...this.paramValue.genRequest(gen));


        gen.scope.pop();
        pushUnique(gen.passedNodes, this);

        return request;
    }



    updateParams()
    {
        const enabled =
              !this.existing 
            || this.linkedStyleId != NULL;

        this.paramValue.enableControlText(enabled);

        this.paramValue.control.valueText =  this.isUnknown() ? UNKNOWN_DISPLAY : '';
        this.paramValue.control.showBar   = !this.isUnknown();

        this.updateParamControls();
    }



    updateHeader()
    {
        super.updateHeader();


        this.header.style.height = '25px';


        if (this.paramValue.value.isValid()
            && (  !this.existing
                || this.linkedStyleId != NULL))
        {
            const rgb = this.paramValue.value.toRgb();
            
            this.circle.style.background = rgb2style(rgb);

            this.circle.style.boxShadow = 
                    isDarkMode() &&  isDark(rgb, 0.4)
                || !isDarkMode() && !isDark(rgb, 0.9)
                ? '0 0 0 1px var(--figma-color-bg-tertiary) inset'
                : 'none';
        }
        else
        {
            this.circle.style.background = 'transparent';
            this.circle.style.boxShadow  = '0 0 0 1px var(--figma-color-bg-tertiary) inset';
        }


        this.updateLinkIcon();
    }

    

    updateLinkIcon()
    {
        if (this.existing)
        {
            const colors = this.getHeaderColors();

            const rgb = this.paramValue.value.toRgb();
            const linkStyle = rgba2style(
                rgb_a(
                       this.paramValue.value.isValid()
                    && (  !this.existing
                        || this.linkedStyleId != NULL)
                    ? (isDark(rgb) ? [1, 1, 1] : [0, 0, 0])
                    : colors.text, 
                    this.circle.over ? 1 : 0.5));

            this.link.style.display            = 'inline-block';
            this.link.style.background         = 'url(\'data:image/svg+xml;utf8,<svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M3.5962 8.54594C3.01041 9.13173 2.06066 9.13173 1.47488 8.54594C0.889091 7.96015 0.889091 7.01041 1.47488 6.42462L2.88909 5.01041L2.18198 4.3033L0.767771 5.71751C-0.20854 6.69382 -0.20854 8.27674 0.767771 9.25305C1.74408 10.2294 3.32699 10.2294 4.3033 9.25305L5.71752 7.83883L5.01041 7.13173L3.5962 8.54594ZM6.77818 3.94975L3.94975 6.77817L3.24264 6.07107L6.07107 3.24264L6.77818 3.94975ZM9.25305 4.3033L7.83884 5.71751L7.13173 5.01041L8.54595 3.59619C9.13173 3.01041 9.13173 2.06066 8.54595 1.47487C7.96016 0.889085 7.01041 0.889085 6.42462 1.47487L5.01041 2.88909L4.3033 2.18198L5.71752 0.767765C6.69383 -0.208546 8.27674 -0.208546 9.25305 0.767765C10.2294 1.74408 10.2294 3.32699 9.25305 4.3033Z" fill="' + linkStyle + '"/></svg>\')';
            this.link.style.backgroundPosition = '50% 50%';
            this.link.style.backgroundRepeat   = 'no-repeat';
        }
        else
            this.link.style.display            = 'none';    
    }



    paramIsConsideredDefault(param)
    {
        return  param.isDefault()
            && !this.inputs[0].connected;
    }



    toJsonBase(nTab = 0) 
    {
        let   pos = ' '.repeat(nTab);
        const tab = TAB;

        return super.toJsonBase(nTab)
             + ',\n' + pos + tab + '"existing": "'      + boolToString(this.existing) + '"'
             + ',\n' + pos + tab + '"linkedStyleId": "' + this.linkedStyleId          + '"';
    }



    loadParams(_node, pasting)
    {
        if (!pasting)
        {
            if (_node.existing != undefined) 
                this.existing = isTrue(_node.existing);
            
            this.linkedStyleId = _node.linkedStyleId;
        }
        else
        {
            this.existing       = false;
            this.linkedStyleId  = NULL;
            this.linkedStyleName = '';
        }


        super.loadParams(_node, pasting);
    }
}



function OpColorStyle_value_onDisconnectInput(node, input)
{
    if (   node.existing
        && node.linkedStyleId == NULL)
        node.paramValue.setValue(ColorValue.NaN, false, false, false);
}