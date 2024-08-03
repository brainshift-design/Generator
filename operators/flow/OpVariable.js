class   OpVariable
extends ResizableBase
{
    paramValue = null;


    linkedId   = NULL;
    linkedType = NULL; // this is resolvedType
    linkedName = '';

    isBool     = false;

    menuBoolValue;
    
    

    constructor()
    {
        super(VARIABLE, 'variable', 'variable', iconVariable);


        this.iconOffsetY    = 1;
        this.alwaysShowIcon = true;


        this.divIcon.style.opacity       = 0.5;
        this.divIcon.style.pointerEvents = 'all';


        this.addInput(new Input([NUMBER_VALUE, TEXT_VALUE, COLOR_VALUE]));
        this.addOutput(new Output([VARIABLE_VALUE], this.output_genRequest));

        // this.inputs[0].addEventListener('connect',    () => OpVariable_onConnectInput   (this));
        // this.inputs[0].addEventListener('disconnect', () => OpVariable_onDisconnectInput(this));



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



    output_genRequest(gen)
    {
        // 'this' is the output

        gen.scope.push({
            nodeId:  this.node.id, 
            paramId: NULL });


        const options = 0;//(this.existing ? 1 : 0) << 21;


        const [request, ignore] = this.node.genRequestStart(gen, options);
        if (ignore) return request;

                
        const input = 
            this.node.inputs.length > 0
            ? this.node.inputs[0]
            : null;

        const hasInput = 
               input 
            && input.connected;


        request.push(hasInput ? 1 : 0);

        if (hasInput)
            request.push(...pushInputOrParam(input, gen));


        request.push(this.node.linkedId);
        request.push(this.node.linkedType);
        request.push(this.node.linkedName);


        request.push(this.node.paramValue ? 1 : 0);
        
        if (this.node.paramValue)
            request.push(...this.node.paramValue.genRequest(gen));


        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateValueParamFromResolved(resolvedType)
    {
        let type   = NULL;
        let isBool = false;

        switch (resolvedType)
        {
            case 'FLOAT':   type = NUMBER_VALUE; isBool = false; break;
            case 'BOOLEAN': type = NUMBER_VALUE; isBool = true;  break;
            case 'STRING':  type = TEXT_VALUE;   isBool = false; break;
            case 'COLOR':   type = COLOR_VALUE;  isBool = false; break;
            default:                                             break;
        }

        this.updateValueParamFromType(type, isBool, this.isBool);
    }



    updateValueParamFromType(type, isBool, prevIsBool)
    {
        let icon;
        let iconOffsetY = 0;

        switch (type)
        {
            case NUMBER_VALUE:  icon = isBool ? iconVarBoolean : iconVarNumber;  iconOffsetY =  isBool ? 0 : -1;  break;
            case TEXT_VALUE:    icon = iconVarText;                              iconOffsetY =  1;                break;
            case COLOR_VALUE:   icon = iconVarColor;                             iconOffsetY = -2;                break;
            default:            icon = iconVariable;                             iconOffsetY =  0;                break;
        }


        this.isBool = isBool;


        if (  !this.paramValue
            || this.paramValue.type != type
            || this.isBool != prevIsBool)
        {
            this.connectedInputs .forEach(i => uiDisconnect(i, false));
            this.connectedOutputs.forEach(o => o.connectedInputs.forEach(i => uiDisconnect(i, false)));

            this.removeAllParams();


            if (   type != NULL
                && type != ANY_VALUE)
            {
                this.paramValue = this.createAndAddParamByType(type, 'value', false, true, true);
                this.paramValue.input.getValuesForUndo = getNodeInputValuesForUndo;

                if (this.isBool)
                {
                    this.paramValue.controls[0].setMin(0);
                    this.paramValue.controls[0].setMax(1);

                    this.paramValue.divider = 0.62;
                    this.paramValue.controls[0].allowEditDecimals = false;

                    this.menuBoolValue = createBoolMenu(this.paramValue);
                }
            }
            else
            {
                this.paramValue = null;
                this.name       = 'variable';

                this.linkedId   = NULL;
                this.linkedType = NULL;
                this.linkedName = '';

                //pushUpdate(null, [this]);

                actionManager.clear();
                uiShowClearUndoWarning('variables');
            }


            this.icon        = icon;
            this.iconOffsetY = iconOffsetY;
        }
    }



    updateValueParamValuesFromResolved(resolvedType, varName, values, update = false)
    {
        if (this.linkedName != varName)
        {
            this.linkedName = varName;
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



    updateValueParamValue(varValue, update = false)
    {
        let updateNode = false;

        
        if (this.linkedName != varValue.variableName)
        {
            this.linkedName = varValue.variableName;
            updateNode = true;


            consoleAssert(varValue.variableValue, 'a valid variable value is required here');


            if (!this.paramValue.value.equals(varValue.variableValue))
            {
                this.paramValue.setValue(varValue.variableValue, update, true, update);

                actionManager.clear();
                uiShowClearUndoWarning('variables');
            }
        }


        if (updateNode)
            this.updateNode();
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        super.updateValues(requestId, actionId, updateParamId, paramIds, values);


        const value = values[paramIds.findIndex(id => id == 'value')];


        this.updateValueParamFromType(
            value.variableValue.type, 
            value.variableValue.type == NUMBER_VALUE 
                ? value.variableValue.isBoolean 
                : false, 
            this.isBool);

        if (   value.variableValue
            && value.variableValue.type != NULL
            && value.variableValue.type != ANY_VALUE)
            this.updateValueParamValue(value);


        //this.updateValueParamFromResolved(value.resolvedType);
        //this.updateValueParamValuesFromResolved(value.resolvedType, value.name, [value.value]);


        // uiUpdateVariable(
        //     this.linkedVariableId, 
        //     this.linkedVariableTemp, 
        //     getVariableValue(value));


        // if (    this.linkedVariableId != NULL
        //     && !this.linkedVariableTemp)
        // {
        //     while (this.headerInputs.length > 0)
        //         this.removeInput(this.headerInputs[0]);
        // }
        // else
        // {
        //     if (this.headerInputs.length == 0)
        //     {
        //         this.addInput(new Input([NUMBER_VALUE, TEXT_VALUE, COLOR_VALUE]));

        //         this.inputs[0].addEventListener('connect',    () => OpVariable_onConnectInput   (this));
        //         this.inputs[0].addEventListener('disconnect', () => OpVariable_onDisconnectInput(this));
        //     }
        // }
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
        if (this.linkedId == NULL)
            return 'variable';
        

        const parts = this.linkedName.split('/');
        
        if (parts.length == 1)
            return this.linkedName;
    
        
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
             + ',\n' + pos + tab + '"linkedId": "'   + this.linkedId   + '"'
             + ',\n' + pos + tab + '"linkedType": "' + this.linkedType + '"'
             + ',\n' + pos + tab + '"linkedName": "' + this.linkedName + '"';
    }



    loadParams(_node, pasting)
    {
        const found = graph.currentPage.nodes.find(n => n.linkedId == _node.linkedId);

        if (!found)
        {
            super.loadParams(_node, pasting);
            
            this.linkedId   = _node.linkedId;
            this.linkedType = _node.linkedType;
            this.linkedName = _node.linkedName;
        }
        else
        {
            this.name       = this.defName;

            this.linkedId   = NULL;
            this.linkedType = NULL;
            this.linkedName = '';
        }
    }
}



// function OpVariable_onConnectInput(node)
// {
//     actionManager.do(new LinkExistingVariableAction(
//         node.id,
//         NULL,
//         NULL,
//         '',
//         true));
// }



// function OpVariable_onDisconnectInput(node)
// {
//     actionManager.do(new LinkExistingVariableAction(
//         node.id,
//         NULL,
//         NULL,
//         '',
//         false));
// }