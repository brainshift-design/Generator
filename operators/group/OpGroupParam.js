class   OpGroupParam
extends OperatorBase
{
    headerCircle;

    circleBack;
    circle;
    icon;

    paramType = 0; // 0 = param
                   // 1 = header
                   // 2 = variable header


    constructor()
    {
        super(GROUP_PARAM, 'param', 'parameter');

        this.alwaysLoadParams = true;


        this.addInput (new Input(ALL_TYPES));
        this.addOutput(new Output([ANY_TYPE], this.output_genRequest));



        this.circleBack        = createDiv('headerCircleBack');
        this.circle            = createDiv('headerCircle');

        this.headerCircle      = createDiv('headerCircleWrapper');;
        this.headerCircle.over = false;
        this.headerCircle.down = false;

        this.headerCircle.addEventListener('pointerenter', e => { this.headerCircle.over = true;  this.updateHeader(); });
        this.headerCircle.addEventListener('pointerleave', e => { this.headerCircle.over = false; this.updateHeader(); });

        this.headerCircle.addEventListener('pointerdown',  e => 
        { 
            e.stopPropagation();

            if (e.button == 0)
            {
                hideAllMenus();

                let paramType = this.paramType + 1;
                if (paramType == 3) paramType = 0;

                actionManager.do(new ToggleParamHeaderAction(this.id, paramType));
            }
            else
                e.preventDefault();
        });


        this.icon = createDiv('headerIcon');


        this.headerCircle.appendChild(this.circleBack);
        this.headerCircle.appendChild(this.circle);
        this.headerCircle.appendChild(this.icon);
        
        this.label.insertBefore(this.headerCircle, this.labelText);
    }



    output_genRequest(gen)
    {
        // 'this' is the output        

        gen.scope.push({
            nodeId:  this.node.id, 
            paramId: NULL });


        const [request, ignore] = this.node.genRequestStart(gen);
        if (ignore) return request;


        const input = this.node.inputs[0];


        request.push(input.connected ? 1 : 0);

        if (input.connected) 
            request.push(...pushInputOrParam(input, gen));


        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateHeader()
    {
        super.updateHeader();


        if (true) //this.paramValue.value.isValid()
        {
            const colors     = this.getHeaderColors();

            //const rgb        = rgbFromType(ANY_TYPE);//this.paramValue.value.toRgba();
            //const rgbaStripe = rgb_a(getStripeBackColor(rgb));
            
            this.circleBack.style.visibility = 'hidden';//'visible';
            //this.circle    .style.background = rgba2style(rgbaStripe);

            // this.headerCircle.style.boxShadow = 
            //     //     darkMode &&  isDark(rgbaStripe, 0.4)
            //     // || !darkMode && !isDark(rgbaStripe, 0.9)
            //     //? 
            //     '0 0 0 1px ' + rgba2style(rgb_a(colors.text, this.headerCircle.over ? 0.7 : 0.35)) +' inset'
                // : 'none';
        }
        else
        {
            this.circleBack  .style.visibility = 'hidden';
            this.circle      .style.background = 'transparent';
            this.headerCircle.style.boxShadow  = '0 0 0 1px var(--figma-color-bg-tertiary) inset';
        }


        this.updateHeaderIcon();
    }

    

    updateHeaderIcon()
    {
        const colors = this.getHeaderColors();

        const rgba       = rgb_a(rgbFromType(ANY_TYPE));
        const rgbaStripe = rgb_a(getStripeBackColor(rgba), rgba[3]);

        const headerStyle = rgba2style(
            rgb_a(
                    rgbFromType(ANY_TYPE) //this.paramValue.value.isValid()
                ? (isDark(rgbaStripe) ? [1, 1, 1] : [0, 0, 0])
                : colors.text, 
                this.headerCircle.down 
                ? 1 
                : this.headerCircle.over
                  ? 0.7 
                  : 0.5));

        this.icon.style.display            = 'inline-block';
        this.icon.style.background         = this.paramType == 2
                                             ? 'url(\'data:image/svg+xml;utf8,<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 3C0 1.34314 1.34314 0 3 0H9C10.6569 0 12 1.34314 12 3V9C12 10.6569 10.6569 12 9 12H3C1.34314 12 0 10.6569 0 9V3ZM5 2.5H7V5H9.5V7H7V9.5H5V7H2.5V5H5V2.5Z" fill="'+headerStyle+'"/></svg>\')'
                                             : this.paramType == 1
                                               ? 'url(\'data:image/svg+xml;utf8,<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 3C0 1.34314 1.34314 0 3 0H9C10.6569 0 12 1.34314 12 3V9C12 10.6569 10.6569 12 9 12H3C1.34314 12 0 10.6569 0 9V3ZM6 8C7.10455 8 8 7.10461 8 6C8 4.89539 7.10455 4 6 4C4.89545 4 4 4.89539 4 6C4 7.10461 4.89545 8 6 8Z" fill="'+headerStyle+'"/></svg>\')'
                                               : 'url(\'data:image/svg+xml;utf8,<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 0H0V12H12V0ZM11 1H1V11H11V1Z" fill="'+headerStyle+'"/><path d="M8 6C8 7.10457 7.10457 8 6 8C4.89543 8 4 7.10457 4 6C4 4.89543 4.89543 4 6 4C7.10457 4 8 4.89543 8 6Z" fill="'+headerStyle+'"/></svg>\')';

        this.icon.style.backgroundPosition = '50% 50%';
        this.icon.style.backgroundRepeat   = 'no-repeat';
    }



    toJsonBase(nTab = 0) 
    {
        let   pos = ' '.repeat(nTab);
        const tab = HTAB;

        let json = super.toJsonBase(nTab);

        json += ',\n' + pos + tab + '"paramType": "' + this.paramType + '"';

        return json;
    }



    loadParams(_node, pasting)
    {
        super.loadParams(_node, pasting);

        if (_node.paramType != undefined)
            this.paramType = parseInt(_node.paramType);
    }
}