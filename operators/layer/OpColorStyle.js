class   OpColorStyle
extends OperatorBase
{
    paramValue;

    styleCircle;

    circleBack;
    circleCheckers;
    circle;
    link;

    existing        = true;

    linkedStyleId   = NULL;
    linkedStyleName = NULL;




    constructor(options = {})
    {
        super(COLOR_STYLE, 'style', 'style', '');

        this.inert = true;


        this.addParam(this.paramValue = new FillParam('value', '', false, true, true, FillValue.NaN));

        this.paramValue.input.getValuesForUndo = getNodeInputValuesForUndo;
        this.paramValue.input.addEventListener('disconnect', e => OpColorStyle_value_onDisconnectInput(this, e.detail.input));

        
        if (!!options.existing)
        {
            this.existing = true;
            this.paramValue.setValue(FillValue.NaN, false, false, false);
        }


        this.circleBack       = createDiv('styleCircleBack');
        this.circleCheckers   = createDiv('styleCircleCheckers');
        this.circle           = createDiv('styleCircle');

        this.styleCircle      = createDiv('styleCircleWrapper');;
        this.styleCircle.over = false;

        this.styleCircle.addEventListener('pointerenter', e => { this.styleCircle.over = true;  this.updateLinkIcon(); });
        this.styleCircle.addEventListener('pointerleave', e => { this.styleCircle.over = false; this.updateLinkIcon(); });

        this.styleCircle.addEventListener('pointerdown',  e => 
        { 
            e.stopPropagation();

            if (   (  e.button == 0 
                   || e.button == 2)
                && this.existing)
            {
                hideAllMenus(); 

                uiQueueMessageToFigma({
                    cmd:   'figGetAllLocalColorStyles',
                    nodeId: this.id,
                    px:     e.clientX,
                    py:     e.clientY }); 
            }
            else
                e.preventDefault();
        });


        this.link = createDiv('styleLink');


        this.styleCircle.appendChild(this.circleBack);
        this.styleCircle.appendChild(this.circleCheckers);
        this.styleCircle.appendChild(this.circle);
        this.styleCircle.appendChild(this.link);
        
        this.label.insertBefore(this.styleCircle, this.labelText);


        this.updateParams();
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


        const options = (this.existing ? 1 : 0) << 21;


        const [request, ignore] = this.genRequestStart(gen, options);
        if (ignore) return request;

                
        request.push(this.linkedStyleId);
        request.push(...this.paramValue.genRequest(gen));


        gen.scope.pop();
        pushUnique(gen.passedNodes, this);

        return request;
    }



    updateParams()
    {
        const enabled = this.linkedStyleId != NULL;
            //   !this.existing 
            // || this.linkedStyleId != NULL;

        this.paramValue.enableControlText(enabled, this.isUnknown());

        // // this.paramValue.controls[0].valueText =  this.isUnknown() ? UNKNOWN_DISPLAY : null;
        // this.paramValue.controls[0].showBar   = false;//!this.isUnknown();


        //const colors   = this.getHeaderColors();
        //const rgbaBack = rgb_a(colors.stripeBack, colors.back[3]);

        //this.paramValue.controlWrapper.style.background = rgba2style(rgbaBack);
            //   !rgbaIsNaN(rgbaBack) 
            // && this.paramValue.value.opacity.isValid()
            // ?  rgba2style(rgbaBack)
            // : 'transparent'; 

        this.updateParamControls();
    }



    updateHeader()
    {
        super.updateHeader();


        if (this.paramValue.value.isValid()
            && (  !this.existing
                || this.linkedStyleId != NULL))
        {
            const rgba       = this.paramValue.value.toRgba();
            const rgbaStripe = rgb_a(getStripeBackColor(rgba), rgba[3]);
            
            this.circleBack    .style.visibility = 'visible';
            this.circleCheckers.style.visibility = 'visible';
            this.circle        .style.background = rgba2style(rgbaStripe);

            this.styleCircle.style.boxShadow = 
                    darkMode &&  isDark(rgbaStripe, 0.4)
                || !darkMode && !isDark(rgbaStripe, 0.9)
                ? '0 0 0 1px var(--figma-color-bg-tertiary) inset'
                : 'none';
        }
        else
        {
            this.circleBack    .style.visibility = 'hidden';
            this.circleCheckers.style.visibility = 'hidden';
            this.circle        .style.background = 'transparent';
            this.styleCircle   .style.boxShadow  = '0 0 0 1px var(--figma-color-bg-tertiary) inset';
        }


        this.updateLinkIcon();
    }

    

    updateLinkIcon()
    {
        if (this.existing)
        {
            const colors = this.getHeaderColors();

            const rgba       = this.paramValue.value.toRgba();
            const rgbaStripe = rgb_a(getStripeBackColor(rgba), rgba[3]);

            const linkStyle = rgba2style(
                rgb_a(
                       this.paramValue.value.isValid()
                    && this.linkedStyleId != NULL
                    ? (isDark(rgbaStripe) ? [1, 1, 1] : [0, 0, 0])
                    : colors.text, 
                    this.linkedStyleId != NULL
                    ? (this.styleCircle.over ? 0.5 : 0)
                    : (this.styleCircle.over ? 1 : 0.5)));

            this.circleBack.style.background             = darkMode ? '#2c2c2c' : '#ffffff';

            const rgb0 = hex2rgb('d9d9d9');
            const rgb1 = hex2rgb('f6f6f6');

            this.circleCheckers.style.display            = !rgbIsNaN(colors.back) ? 'inline-block' : 'none';
            this.circleCheckers.style.background         =
                  'linear-gradient(45deg, #'+rgb2hex(rgb0)+' 25%, transparent 25%, transparent 75%, #'+rgb2hex(rgb0)+' 75%), '
                + 'linear-gradient(45deg, #'+rgb2hex(rgb0)+' 25%, transparent 25%, transparent 75%, #'+rgb2hex(rgb0)+' 75%)';

            this.circleCheckers.style.backgroundColor    = '#'+rgb2hex(rgb1);
            this.circleCheckers.style.opacity            = 1 - this.paramValue.value.opacity.value / 100;
            this.circleCheckers.style.backgroundSize     = '6px 6px';
            this.circleCheckers.style.backgroundPosition = '0 0, 3px 3px';

            this.link.style.display                      = 'inline-block';
            this.link.style.background                   = 'url(\'data:image/svg+xml;utf8,<svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M3.5962 8.54594C3.01041 9.13173 2.06066 9.13173 1.47488 8.54594C0.889091 7.96015 0.889091 7.01041 1.47488 6.42462L2.88909 5.01041L2.18198 4.3033L0.767771 5.71751C-0.20854 6.69382 -0.20854 8.27674 0.767771 9.25305C1.74408 10.2294 3.32699 10.2294 4.3033 9.25305L5.71752 7.83883L5.01041 7.13173L3.5962 8.54594ZM6.77818 3.94975L3.94975 6.77817L3.24264 6.07107L6.07107 3.24264L6.77818 3.94975ZM9.25305 4.3033L7.83884 5.71751L7.13173 5.01041L8.54595 3.59619C9.13173 3.01041 9.13173 2.06066 8.54595 1.47487C7.96016 0.889085 7.01041 0.889085 6.42462 1.47487L5.01041 2.88909L4.3033 2.18198L5.71752 0.767765C6.69383 -0.208546 8.27674 -0.208546 9.25305 0.767765C10.2294 1.74408 10.2294 3.32699 9.25305 4.3033Z" fill="' + linkStyle + '"/></svg>\')';
            this.link.style.backgroundPosition           = '50% 50%';
            this.link.style.backgroundRepeat             = 'no-repeat';
        }
        else
        {
            this.circleBack.style.display = 'none';    
            this.link      .style.display = 'none';    
        }
    }



    getActiveOffset()
    {
        return -2;
    }



    // getHeaderColors(options = {})
    // {
    //     const colors = super.getHeaderColors();

    //     colors.stripeBack = getStripeBackColor(colors.back);

    //     return colors;
    // }



    paramIsConsideredDefault(param)
    {
        return  param.isDefault()
            && !this.inputs[0].connected;
    }



    toJsonBase(nTab = 0) 
    {
        let   pos = ' '.repeat(nTab);
        const tab = HTAB;

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
     
            super.loadParams(_node, pasting);
        }
        else
        {
            this.name            = this.defName;
            this.existing        = true;
            this.linkedStyleId   = NULL;
            this.linkedStyleName = '';
        }
    }
}



function OpColorStyle_value_onDisconnectInput(node, input)
{
    if (   node.existing
        && node.linkedStyleId == NULL)
        node.paramValue.setValue(FillValue.NaN, false, false, false);
}