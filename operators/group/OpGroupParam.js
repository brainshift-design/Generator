class   OpGroupParam
extends OperatorBase
{
    headerCircle;

    circleBack;
    circle;
    icon;


    constructor()
    {
        super(GROUP_PARAM, 'param', 'parameter');


        this.addInput (new Input(ALL_TYPES));
        this.addOutput(new Output([ANY_TYPE], this.output_genRequest));



        this.circleBack        = createDiv('headerCircleBack');
        this.circle            = createDiv('headerCircle');

        this.headerCircle      = createDiv('headerCircleWrapper');;
        this.headerCircle.over = false;

        this.headerCircle.addEventListener('pointerenter', e => { this.headerCircle.over = true;  this.updateHeader(); });
        this.headerCircle.addEventListener('pointerleave', e => { this.headerCircle.over = false; this.updateHeader(); });

        this.headerCircle.addEventListener('pointerdown',  e => 
        { 
            e.stopPropagation();

            if (e.button == 0)
            {
                hideAllMenus(); 

                //...
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
                this.headerCircle.over ? 0.7 : 0.35));

        this.icon.style.display            = 'inline-block';
        this.icon.style.background         = 'url(\'data:image/svg+xml;utf8,<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M2.57143 0C1.15126 0 0 1.15126 0 2.57143V9.42857C0 10.8487 1.15126 12 2.57143 12H9.42857C10.8487 12 12 10.8487 12 9.42857V2.57143C12 1.15126 10.8487 0 9.42857 0H2.57143ZM6 8.57143C7.42017 8.57143 8.57143 7.42017 8.57143 6C8.57143 4.57983 7.42017 3.42857 6 3.42857C4.57983 3.42857 3.42857 4.57983 3.42857 6C3.42857 7.42017 4.57983 8.57143 6 8.57143Z" fill="'+headerStyle+'"/></svg>\')';
        this.icon.style.backgroundPosition = '50% 50%';
        this.icon.style.backgroundRepeat   = 'no-repeat';
    }
}