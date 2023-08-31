class   OpVariable
extends OperatorBase
{
    paramValue;


    linkedVariableId   = NULL;
    linkedVariableName = NULL;



    constructor(options = {})
    {
        super(VARIABLE, 'variable', 'variable', iconVarNumber);


        this.resetValueParam();


        this.divIcon.style.opacity       = 0.5;
        this.divIcon.style.pointerEvents = 'all';


        this.divIcon.addEventListener('pointerenter', e => 
        { 
            this.divIcon.style.opacity = 1;  
        });


        this.divIcon.addEventListener('pointerleave', e => 
        { 
            this.divIcon.style.opacity = 0.5;  
        });


        this.divIcon.addEventListener('pointerdown',  e => 
        { 
            e.stopPropagation();

            if (   e.button == 0 
                || e.button == 2)
            {
                hideAllMenus(); 

                uiQueueMessageToFigma(
                {
                    cmd:   'figGetAllLocalVariables',
                    nodeId: this.id,
                    px:     e.clientX,
                    py:     e.clientY 
                }); 
            }
        });


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

                
        request.push(this.linkedVariableId);
        request.push(...this.paramValue.genRequest(gen));


        gen.scope.pop();
        pushUnique(gen.passedNodes, this);

        return request;
    }



    resetValueParam()
    {
        this.addParam(this.paramValue = new ListParam('value', '?', false, false, false));
        this.paramValue.itemName = '';
    }



    updateValueParam(resolvedType)
    {
        let type;
        let icon;
        let iconOffsetY = 0;

        switch (resolvedType)
        {
            case 'FLOAT':   type = NUMBER_VALUE; icon = iconVarNumber;  iconOffsetY = -1; break;
            case 'BOOLEAN': type = NUMBER_VALUE; icon = iconVarBoolean; iconOffsetY =  0; break;
            case 'STRING':  type = TEXT_VALUE;   icon = iconVarText;    iconOffsetY =  1; break;
            case 'COLOR':   type = COLOR_VALUE;  icon = iconVarColor;   iconOffsetY = -2; break;
        }


        if (this.paramValue.type != type)
        {
            this.removeAllParams();
            this.createAndAddParamByType(type, 'value', false, true, true);

            this.icon = icon;
        }
    }



    updateParams()
    {
        const enabled = this.linkedVariableId != NULL;
            //   !this.existing 
            // || this.linkedVariableId != NULL;

        this.paramValue.enableControlText(enabled, this.isUnknown());

        // // this.paramValue.controls[0].valueText =  this.isUnknown() ? UNKNOWN_DISPLAY : '';
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



    // updateHeader()
    // {
    //     super.updateHeader();


    //     if (this.paramValue.value.isValid()
    //         && (  !this.existing
    //             || this.linkedVariableId != NULL))
    //     {
    //         this.btnCircle.style.boxShadow = 
    //                 darkMode &&  isDark(rgbaStripe, 0.4)
    //             || !darkMode && !isDark(rgbaStripe, 0.9)
    //             ? '0 0 0 1px var(--figma-color-bg-tertiary) inset'
    //             : 'none';
    //     }
    //     else
    //     {
    //         this.btnCircle     .style.boxShadow  = '0 0 0 1px var(--figma-color-bg-tertiary) inset';
    //     }


    //     this.updateLinkIcon();
    // }
    //}



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
            && (   !this.inputs[0]
                || !this.inputs[0].connected);
    }



    toJsonBase(nTab = 0) 
    {
        let   pos = ' '.repeat(nTab);
        const tab = HTAB;

        return super.toJsonBase(nTab)
             + ',\n' + pos + tab + '"linkedVariableId": "' + this.linkedVariableId          + '"';
    }



    loadParams(_node, pasting)
    {
        if (!pasting)
        {
            this.linkedVariableId = _node.linkedVariableId;
     
            super.loadParams(_node, pasting);
        }
        else
        {
            this.name               = this.defName;
            this.linkedVariableId   = NULL;
            this.linkedVariableName = '';
        }
    }
}



function OpVariable_value_onDisconnectInput(node, input)
{
    if (node.linkedVariableId == NULL)
        node.paramValue.setValue(FillValue.NaN, false, false, false);
}