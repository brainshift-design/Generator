class   OpVariable
extends ResizableBase
{
    paramValue;


    linkedVariableId = NULL;



    constructor(options = {})
    {
        super(VARIABLE, 'variable', 'variable', iconVarNumber);


        this.canRename = false;


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



    updateValueParam(resolvedType, values)
    {
        let type;
        let value;

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
            this.paramValue = this.createAndAddParamByType(type, 'value', false, true, true);

            this.icon        = icon;
            this.iconOffsetY = iconOffsetY;
        }


        if (values.length > 0)
        {
            const val = values[0];

            switch (resolvedType)
            {
                case 'FLOAT':   value = new NumberValue(val);                      break;
                case 'BOOLEAN': value = new NumberValue(val, 0);                   break;
                case 'STRING':  value = new TextValue(val);                        break;

                case 'COLOR':
                    value = ColorValue.create(
                        1, 
                        Math.round(val.r * 0xff), 
                        Math.round(val.g * 0xff), 
                        Math.round(val.b * 0xff)); 
                    
                    break;
            }

            this.paramValue.setValue(value, false, true, false);
        }
    }



    updateParams()
    {
        const enabled = this.linkedVariableId != NULL;
            //   !this.existing 
            // || this.linkedVariableId != NULL;

        this.paramValue.enableControlText(false, this.paramValue.isUnknown());

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
             + ',\n' + pos + tab + '"linkedVariableId": "' + this.linkedVariableId + '"';
    }



    loadParams(_node, pasting)
    {
        if (!pasting)
        {
            super.loadParams(_node, pasting);
            
            this.linkedVariableId = _node.linkedVariableId;
        }
        else
        {
            this.name             = this.defName;
            this.linkedVariableId = NULL;
        }
    }
}



function OpVariable_value_onDisconnectInput(node, input)
{
    if (node.linkedVariableId == NULL)
        node.paramValue.setValue(FillValue.NaN, false, false, false);
}