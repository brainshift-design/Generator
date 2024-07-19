class   OpVariable
extends ResizableBase
{
    paramValue         = null;


    linkedVariableId   = NULL;
    linkedVariableType = NULL; // this is resolvedType
    linkedVariableName = '';
    linkedVariableTemp = false;

    isBool             = false;



    constructor()
    {
        super(VARIABLE, 'variable', 'variable', iconVariable);


        this.iconOffsetY    = 1;
        this.alwaysShowIcon = true;


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



    setRect(x, y, w, h, updateTransform = true)
    {
        // const headerHeight = Math.max(defHeaderHeight, boundingRect(this.header).height / graph.currentPage.zoom);

        const height = defHeaderHeight + (this.paramValue ? defParamHeight : 0);


        this.height             = height;
        this.inner.style.height = height + 'px';

        //this.updateSizers();

        super.setRect(
            x, 
            y, 
            w, 
            height, 
            updateTransform);
    }



    genRequest(gen)
    {
        // 'this' is the node

        gen.scope.push({
            nodeId:  this.id, 
            paramId: NULL });


        const options = 0;//(this.existing ? 1 : 0) << 21;


        const [request, ignore] = this.genRequestStart(gen, options);
        if (ignore) return request;

                
        const input = 
            this.inputs.length > 0
            ? this.inputs[0]
            : null;

        const hasInput = 
               input 
            && input.connected;


        request.push(hasInput ? 1 : 0);

        if (hasInput)
            request.push(...pushInputOrParam(input, gen));


        request.push(this.linkedVariableId);
        request.push(this.linkedVariableType);
        request.push(this.linkedVariableName);
        request.push(boolToString(this.linkedVariableTemp));


        request.push(this.paramValue ? 1 : 0);
        
        if (this.paramValue)
            request.push(...this.paramValue.genRequest(gen));


        gen.scope.pop();
        pushUnique(gen.passedNodes, this);

        return request;
    }



    updateValueParamType(resolvedType)
    {
        let type = NULL;

        let icon;
        let iconOffsetY = 0;


        const prevIsBool = this.isBool;

        switch (resolvedType)
        {
            case 'FLOAT':   type = NUMBER_VALUE; icon = iconVarNumber;  iconOffsetY = -1; this.isBool = false; break;
            case 'BOOLEAN': type = NUMBER_VALUE; icon = iconVarBoolean; iconOffsetY =  0; this.isBool = true;  break;
            case 'STRING':  type = TEXT_VALUE;   icon = iconVarText;    iconOffsetY =  1; this.isBool = false; break;
            case 'COLOR':   type = COLOR_VALUE;  icon = iconVarColor;   iconOffsetY = -2; this.isBool = false; break;
            default:                             icon = iconVariable;   iconOffsetY =  0;                      break;
        }


        if (  !this.paramValue
            || this.paramValue.type != type
            || this.isBool != prevIsBool)
        {
            this.connectedInputs .forEach(i => uiDisconnect(i, false));
            this.connectedOutputs.forEach(o => o.connectedInputs.forEach(i => uiDisconnect(i, false)));

            this.removeAllParams();


            if (type != NULL)
            {
                this.paramValue = this.createAndAddParamByType(type, 'value', false, true, true);
                this.paramValue.input.getValuesForUndo = getNodeInputValuesForUndo;

                if (type == NUMBER_VALUE)
                {
                    this.paramValue.controls[0].setMin(this.isBool ? 0 : Number.MIN_SAFE_INTEGER);
                    this.paramValue.controls[0].setMax(this.isBool ? 1 : Number.MAX_SAFE_INTEGER);
                }
            }
            else
            {
                this.paramValue = null;
                this.name = 'variable';

                this.linkedVariableId   = NULL;
                this.linkedVariableType = NULL;
                this.linkedVariableName = '';
                this.linkedVariableTemp = false;

                pushUpdate(null, [this]);

                actionManager.clear();
                uiShowClearUndoWarning('variables');
            }


            this.icon        = icon;
            this.iconOffsetY = iconOffsetY;
        }
    }



    updateValueParamValues(resolvedType, varName, values, update = false)
    {
        if (this.linkedVariableName != varName)
        {
            this.linkedVariableName = varName;
            this.updateNode();
        }


        if (values.length > 0)
        {
            let val = values[0];

            if (val)
            {
                const value = getValueFromVariable(resolvedType, val);
              
                if (!this.paramValue.value.equals(value))
                {
                    this.paramValue.setValue(value, update, true, update);

                    actionManager.clear();
                    uiShowClearUndoWarning('variables');
                }
            }
        }
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        super.updateValues(requestId, actionId, updateParamId, paramIds, values);


        // const value = values[paramIds.findIndex(id => id == 'value')];

        // uiUpdateVariable(
        //     this.linkedVariableId, 
        //     this.linkedVariableTemp, 
        //     getVariableValue(value));


        if (    this.linkedVariableId != NULL
            && !this.linkedVariableTemp)
        {
            while (this.headerInputs.length > 0)
                this.removeInput(this.headerInputs[0]);
        }
        else
        {
            if (this.headerInputs.length == 0)
            {
                this.addInput(new Input([NUMBER_VALUE, TEXT_VALUE, COLOR_VALUE]));

                this.inputs[0].addEventListener('connect',    () => OpVariable_onConnectInput   (this));
                this.inputs[0].addEventListener('disconnect', () => OpVariable_onDisconnectInput(this));
            }
        }
    }

    
    
    updateParams()
    {
        if (this.paramValue)
        {
            this.paramValue.enableControlText(false, this.paramValue.isUnknown());

            if (this.isBool)
                updateParamConditionText(this.paramValue, this.paramValue.isUnknown(), true, 1);
        }


        this.updateParamControls();
    }



    getLabelText()
    {
        if (this.linkedVariableId == NULL)
            return 'variable';
        

        const parts = this.linkedVariableName.split('/');
        
        if (parts.length == 1)
            return this.linkedVariableName;
    
        
        return parts.join('/');
        // return parts.slice(0, -1).map(p => '<b>' + p + '</b>').join('/') 
        //      + '/' + parts.at(-1);
    }



    getActiveOffset()
    {
        return -2;
    }



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
             + ',\n' + pos + tab + '"linkedVariableId": "'   + this.linkedVariableId   + '"'
             + ',\n' + pos + tab + '"linkedVariableType": "' + this.linkedVariableType + '"'
             + ',\n' + pos + tab + '"linkedVariableName": "' + this.linkedVariableName + '"'
             + ',\n' + pos + tab + '"linkedVariableTemp": "' + boolToString(this.linkedVariableTemp) + '"';
    }



    loadParams(_node, pasting)
    {
        const found = graph.currentPage.nodes.find(n => n.linkedVariableId == _node.linkedVariableId);

        if (!found)
        {
            super.loadParams(_node, pasting);
            
            this.linkedVariableId   = _node.linkedVariableId;
            this.linkedVariableType = _node.linkedVariableType;
            this.linkedVariableName = _node.linkedVariableName;
            this.linkedVariableTemp = _node.linkedVariableTemp;
        }
        else
        {
            this.name               = this.defName;
            this.linkedVariableId   = NULL;
            this.linkedVariableType = NULL;
            this.linkedVariableName = '';
            this.linkedVariableTemp = false;
        }
    }
}



function OpVariable_onConnectInput(node)
{
    actionManager.do(new LinkExistingVariableAction(
        node.id,
        NULL,
        NULL,
        '',
        true));
}



function OpVariable_onDisconnectInput(node)
{
    actionManager.do(new LinkExistingVariableAction(
        node.id,
        NULL,
        NULL,
        '',
        false));
}