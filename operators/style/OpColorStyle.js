class   OpColorStyle
extends OperatorBase
{
    paramValue;

    circle;
    link;

    existing = false;
    //picking  = false;



    constructor(options = {})
    {
        super(COLOR_STYLE, 'style');

        this.inert = true;


        this.addParam(this.paramValue = new ColorParam('value', '', false, true, false, ColorValue.fromRgb(rgbDefaultFill)));


        if (!!options.existing)
        {
            this.existing = true;
            this.paramValue.setValue(ColorValue.NaN, false, false, false);
        }


        this.circle = createDiv('styleCircle');
        this.circle.over = false;

        this.circle.addEventListener('pointerenter', e => { this.circle.over = true;  this.updateLinkIcon(); });
        this.circle.addEventListener('pointerleave', e => { this.circle.over = false; this.updateLinkIcon(); });

        this.circle.addEventListener('pointerdown',  e => 
        { 
            hideAllMenus(); 
            
            uiQueueMessageToFigma({
                cmd:   'figGetAllLocalColorStyles',
                nodeId: this.id }); 
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

        const [request, ignore] = this.genRequestStart(gen);
        if (ignore) return request;

                
        request.push(...this.paramValue.genRequest(gen));


        gen.scope.pop();
        pushUnique(gen.passedNodes, this);

        return request;
    }



    updateParams()
    {
        const input = this.inputs[0];
        

        this.paramValue.enableControlText(!input.connected);

        this.paramValue.control.valueText =  this.isUnknown() ? UNKNOWN_DISPLAY : '';
        this.paramValue.control.showBar   = !this.isUnknown();


        this.updateParamControls();
    }



    updateHeader()
    {
        super.updateHeader();

        this.header.style.height = '25px';

        if (this.paramValue.value.isValid())
        {
            const rgb = this.paramValue.value.toRgb();
            
            this.circle.style.background = rgb2style(rgb);
            this.circle.style.boxShadow  = 'none';
        }
        else
        {
            const colors = this.getHeaderColors();

            this.circle.style.background = 'transparent';
            this.circle.style.boxShadow  = '0 0 0 1px ' + rgb2style_a(colors.text, 0.15) + ' inset';
        }

        this.updateLinkIcon();
    }



    updateLinkIcon()
    {
        if (this.existing)
        {
            const colors = this.getHeaderColors();

            this.link.style.display            = 'inline-block';
            this.link.style.background         = 'url(\'data:image/svg+xml;utf8,<svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M3.5962 8.54594C3.01041 9.13173 2.06066 9.13173 1.47488 8.54594C0.889091 7.96015 0.889091 7.01041 1.47488 6.42462L2.88909 5.01041L2.18198 4.3033L0.767771 5.71751C-0.20854 6.69382 -0.20854 8.27674 0.767771 9.25305C1.74408 10.2294 3.32699 10.2294 4.3033 9.25305L5.71752 7.83883L5.01041 7.13173L3.5962 8.54594ZM6.77818 3.94975L3.94975 6.77817L3.24264 6.07107L6.07107 3.24264L6.77818 3.94975ZM9.25305 4.3033L7.83884 5.71751L7.13173 5.01041L8.54595 3.59619C9.13173 3.01041 9.13173 2.06066 8.54595 1.47487C7.96016 0.889085 7.01041 0.889085 6.42462 1.47487L5.01041 2.88909L4.3033 2.18198L5.71752 0.767765C6.69383 -0.208546 8.27674 -0.208546 9.25305 0.767765C10.2294 1.74408 10.2294 3.32699 9.25305 4.3033Z" fill="' + rgba2style(rgb_a(colors.text, this.circle.over ? 1 : 0.5)) + '"/></svg>\')';
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
             + ',\n' + pos + tab + '"existing": "' + boolToString(this.existing) + '"';
    }



    loadParams(_node)
    {
        if (_node.existing != undefined)
            this.existing = isTrue(_node.existing);

        super.loadParams(_node);
    }
}