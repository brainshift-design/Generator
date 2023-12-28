class OpRender
extends OpShapeBase
{
    btnFinal;
    
    finalize = false;
    

    paramRetain;



    constructor()
    {
        super(RENDER, 'render', 'render', '');

        this.subscription   = true;
        this.variableInputs = true;
        this.canDisable     = true;
        this.iconOffsetY    = -1;


        this.addNewInput();


        this.addParam(this.paramRetain = new NumberParam('retain', 'preserve', true, true, true, 1, 0, 1));

        this.paramRetain.divider = 0.62;


        this.addBaseParams();


        this.btnFinal = createDiv('btnRenderFinal');
        this.btnFinal.over = false;
        this.btnFinal.down = false;


        this.btnFinal.addEventListener('pointerenter', e =>
        { 
            this.btnFinal.over = true;  
            this.updateHeader(); 
        });


        this.btnFinal.addEventListener('pointerleave', e =>
        { 
            this.btnFinal.over = false; 
            this.updateHeader(); 
        });


        this.btnFinal.addEventListener('pointerdown',  e =>
        { 
            this.btnFinal.down = true; 
            this.updateHeader(); 


            e.stopPropagation();


            uiMakeNodeActive(this, true);


            this.finalize = true;
            pushUpdate(null, [this]);


            setTimeout(() => 
            {
                this.btnFinal.down = false;
                this.updateHeader(); 
            },
            200);


            // if (this.enabled)
            // {

            // }
        });


        // this.divIcon.addEventListener('pointerup',  e => 
        // { 
        //     console.log('up');
        //     e.stopPropagation();
        // });


        this.label.insertBefore(this.btnFinal, this.labelText);
    }



    addNewInput()
    {
        const newInput = new Input([...SHAPE_VALUES, SHAPE_LIST_VALUE]);
        newInput.isNew = true;

        newInput.addEventListener('connect',    e => { onVariableConnectInput(e.detail.input); e.detail.input.isNew = false; });
        newInput.addEventListener('disconnect', e => onVariableDisconnectInput(e.detail.input));

        this.addInput(newInput);

        return newInput;
    }



    genRequest(gen)
    {
        // 'this' is the node

        gen.scope.push({
            nodeId:  this.id, 
            paramId: NULL });


        const [request, ignore] = this.genRequestStart(gen);
        if (ignore) return request;


        const connectedInputs = this.inputs.filter(i => i.connected && !i.param);


        request.push(connectedInputs.length); // utility values like param count are stored as numbers
        
        for (const input of connectedInputs)
            request.push(...pushInputOrParam(input, gen));

        request.push(...this.paramRetain.genRequest(gen));

        
        request.push(
            NUMBER_VALUE,
            new NumberValue(this.finalize ? 1 : 0).toString());
            
        this.finalize = false;


        gen.scope.pop();
        pushUnique(gen.passedNodes, this);

        return request;
    }



    updateHeader()
    {
        super.updateHeader();

        this.updateFinalIcon();
    }



    updateParams()
    {
        this.paramRetain.enableControlText(true);

        updateParamConditionText(this.paramRetain, this.paramRetain.isUnknown(), true, 1);

        this.updateParamControls();
    }



    updateFinalIcon()
    {
        const colors     = this.getHeaderColors();

        //const rgba       = rgb_a(rgbFromType(ANY_VALUE));
        //const rgbaStripe = rgb_a(getStripeBackColor(rgba), rgba[3]);

        const headerStyle = rgba2style(
            rgb_a(
                //rgbFromType(ANY_VALUE)
                //? (isDark(rgbaStripe) ? [1, 1, 1] : [0, 0, 0])
                //: 
                colors.text, 
                this.btnFinal.down 
                ? 1 
                : this.btnFinal.over
                  ? 1 
                  : 0.5));

        this.btnFinal.style.position           = 'relative';
        this.btnFinal.style.top                = '-1px';
        this.btnFinal.style.display            = 'inline-block';
        this.btnFinal.style.background         =  this.btnFinal.down
                                                  ? 'url(\'data:image/svg+xml;utf8,' + iconRender    .replaceAll('white', headerStyle) + '\')'
                                                  : 'url(\'data:image/svg+xml;utf8,' + iconRenderDown.replaceAll('white', headerStyle) + '\')';

        this.btnFinal.style.backgroundPosition = '50% 50%';
        this.btnFinal.style.backgroundRepeat   = 'no-repeat';
    }
}