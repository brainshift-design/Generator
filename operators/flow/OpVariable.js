const defaultVariableNodeName = PLUGIN_LOGO + '/variable';



class   OpVariable
extends ResizableBaseWithSeparator
{
    variableId         = NULL;
    variableType       = NULL; // this is the resolved type
    variableName       = '';   // must be set even if nothing is connected
    variableValues     = [];
    variableTemp       = false;

    paramValues        = [];
    menuBoolValues     = [];

    isBool             = false;

    loadInputAndOutput = true;



    constructor()
    {
        super(VARIABLE, 'variable', defaultVariableNodeName, iconVariable, 200);


        this.iconOffsetY    = 1;
        this.alwaysShowIcon = true;

        this.divider        = 0.5;


        this.divIcon.style.opacity       = 0.5;
        this.divIcon.style.pointerEvents = 'all';


        this.addInput (new Input([ANY_VALUE, NUMBER_VALUE, TEXT_VALUE, COLOR_VALUE, FILL_VALUE]));
        //this.addOutput(new Output([VARIABLE_VALUE], this.output_genRequest));


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
        if (newName.split('/').length < 2)
        {
            // super.setName(this.textbox.savedValue.trim(), options);
            return;
        }


        this.variableName = newName;
        

        super.setName(newName, options);

        if (isValid(options.updateNodes))
            pushUnique(options.updateNodes, this);
    }



    setRect(x, y, w, h, updateTransform = true)
    {
        const height = defHeaderHeight + (this.paramValues.length * defParamHeight);

        this.height             = height;
        this.inner.style.height = height + 'px';

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

        return this.node.genRequest(gen);
    }



    genRequest(gen)
    {
        // 'this' is the node

        gen.scope.push({
            nodeId:  this.id, 
            paramId: NULL });


        const [request, ignore] = this.genRequestStart(gen);
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

        
        //noUpdatePrecisionIds.push(this.variableId); // not part of request


        request.push(this.variableId);
        
        request.push(
            this.variableName != '' 
                ? this.variableName 
                : this.name);
        
        request.push(this.variableType);
        request.push(this.variableValues.length);


        for (const variableValue of this.variableValues)
        {
            let strValue;

            
            switch (this.variableType)
            {
            case 'FLOAT':   
                strValue = variableValue.toString();    
                break;

            case 'BOOLEAN': 
                strValue = boolToString(variableValue); 
                break;

            case 'STRING':  
                strValue = encodeURIComponent(variableValue);
                break;
    
            case 'COLOR':
                strValue = 
                            variableValue.r.toString()
                    + ' ' + variableValue.g.toString()
                    + ' ' + variableValue.b.toString()
                    + ' ' + variableValue.a.toString();
                break;
            }


            request.push(strValue);
        }


        this.variableValues = []; // only needs to be sent once


        request.push(this.variableTemp ? 1 : 0);


        request.push(this.paramValues.length);
        
        for (const paramValue of this.paramValues)
            request.push(...paramValue.genRequest(gen));


        gen.scope.pop();
        pushUnique(gen.passedNodes, this);

        return request;
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        const value = values[paramIds.findIndex(id => id == 'value')];


        this.variableName = value.variableName;
        this._name        = value.variableName;

        noUpdateVariableIds.push(this.variableId);


        if (   value.variableValues.length > 0
            && value.variableValues[0])
        {
            this.updateValueParamsFromType(
                value.variableValues.length,
                value.variableValues[0].type,
                value.variableValues[0].type == NUMBER_VALUE
                    ? value.variableValues[0].isBoolean
                    : false,
                this.isBool);

            if (   value.variableValues[0]
                && value.variableValues[0].type != NULL
                && value.variableValues[0].type != ANY_VALUE)
                this.updateValueParamValues(value);
        }


        for (const param of this.params)
            param.divider = this.divider;
    }

    
    
    updateValueParamsFromResolved(resolvedType, resolvedValues)
    {
        let type   = NULL;
        let isBool = false;

        switch (resolvedType)
        {
            case 'FLOAT':   type = NUMBER_VALUE;                break;
            case 'BOOLEAN': type = NUMBER_VALUE; isBool = true; break;
            case 'STRING':  type =   TEXT_VALUE;                break;
    
            case 'COLOR':   
                type = 
                    resolvedValues[0].a == 1 
                        ? COLOR_VALUE
                        : FILL_VALUE; 
                break;
        }

        this.updateValueParamsFromType(resolvedValues.length, type, isBool, this.isBool);
    }



    updateValueParamsFromType(nParams, type, isBool, prevIsBool)
    {
        let icon;
        let iconOffsetY;

        switch (type)
        {
            case NUMBER_VALUE:  icon = isBool ? iconVarBoolean : iconVarNumber;  iconOffsetY =  isBool ? 0 : 1;  break;
            case   TEXT_VALUE:  icon = iconVarText;                              iconOffsetY =  1;               break;
            case  COLOR_VALUE:   
            case   FILL_VALUE:  icon = iconVarColor;                             iconOffsetY = -2;               break;
            default:            icon = iconVariable;                             iconOffsetY =  1;               break;
        }


        this.isBool = isBool;


        if (   this.paramValues.length == 0
            || this.paramValues.some(p => p.type != type)
            || this.isBool != prevIsBool)
        {
            const connections = [];

            for (const input of this.connectedInputs)
            {
                const conn = input.connection;
                if (!conn) continue;

                connections.push([
                    conn.output.node.id, 
                    conn.output.id,
                    conn.input.node.id, 
                    conn.input.id]);
            }

            for (const output of this.connectedOutputs)
            {
                for (const conn of output.connections)
                {
                    if (!conn) continue;

                    connections.push([
                        conn.outputNodeId, 
                        conn.outputId, 
                        conn.inputNodeId, 
                        conn.inputId]);
                }
            }


            this.connectedInputs .forEach(i => uiDisconnect(i, false));
            this.connectedOutputs.forEach(o => o.connectedInputs.forEach(i => uiDisconnect(i, false)));


            this.removeAllParams();
            this.menuBoolValues = [];


            if (   type != NULL
                && type != ANY_VALUE)
            {
                for (let i = 0; i < nParams; i++)
                {
                    const paramValue = this.createAndAddParamByType(type, 'value'+i, '', nParams > 1, true, true);
                    this.paramValues.push(paramValue);

                    paramValue.input.getValuesForUndo = getNodeInputValuesForUndo;

                    if (type == COLOR_VALUE)
                        paramValue.input.types.push(FILL_VALUE);

                    if (this.isBool)
                    {
                        paramValue.isBoolean = true;

                        paramValue.controls[0].setMin(0);
                        paramValue.controls[0].setMax(1);

                        paramValue.divider = 0.62;
                        paramValue.controls[0].allowEditDecimals = false;
                    }


                    if (this.isBool)
                        this.menuBoolValues.push(createBoolMenu(paramValue));
                }


                pollVariables();


                for (const conn of connections)
                {
                    const outputNode = nodeFromId(conn[0]);
                    const output     = outputNode ? outputNode.outputFromId(conn[1]) : null;

                    const inputNode  = nodeFromId(conn[2]);
                    const input      = inputNode ? inputNode.inputFromId(conn[3]) : null;

                    if (   output
                        && input
                        && input.canConnectFrom(output))
                        uiConnect(output, input);
                }
            }
            
            else
            {
                this.paramValues    = [];
                this.menuBoolValues = [];

                this._name          = this.variableName;

                this.variableId     = NULL;
                this.variableType   = NULL;
            }


            this.icon        = icon;
            this.iconOffsetY = iconOffsetY;
        }
    }



    updateValueParamValuesFromResolved(resolvedType, varName, resolvedValues, resolvedModes, update = false)
    {
        if (this.variableName != varName)
        {
            this.variableName = varName;
            this._name        = varName;

            this.updateNode();
        }


        console.assert(
            resolvedValues.length == this.paramValues.length, 
            'value count must equal param count');
        
        console.assert(
            resolvedValues.length == resolvedModes.length, 
            'value count must equal mode count');
        

        for (let i = 0; i < resolvedValues.length; i++)
        {
            if (!isValid(resolvedValues[i]))
                continue;
            
            
            const resolvedValue = resolvedValues  [i];
            const resolvedMode  = resolvedModes   [i];
            const    paramValue = this.paramValues[i];
            

            const value = getValueFromVariable(resolvedType, resolvedValue);
  
            
            if (!(      paramValue.value.type  == NUMBER_VALUE
                     && paramValue.value.value == value.value
                     && value.type == NUMBER_VALUE
                  || paramValue.value.equals(value)))
            {
                if (value.decimals <= paramValue.value.decimals)
                    this.checkNoUpdateDecimals(value, paramValue);

                paramValue.setValue(value, update, true, update);
            }


            if (paramValue.name != resolvedMode)
                paramValue.setName(resolvedMode);
        }


        this.updateNode();
    }



    updateValueParamValues(varValue, update = false)
    {
        let updateNode   = false;
        let valueChanged = false;

        
        if (this.variableName != varValue.variableName)
        {
            this.variableName = varValue.variableName;
            updateNode = true;
        }


        
        consoleAssert(
            varValue.variableValues.length == this.paramValues.length, 
            'value count must match param count');


        for (let i = 0; i < varValue.variableValues.length; i++)
        {
            const varVal = varValue.variableValues[i];
            if (varVal == this.variableValues[i]) continue;


            consoleAssert(
                varVal, 
                'a valid variable value is required here');

            if (    this.paramValues[i].type == varVal.type
                && !this.paramValues[i].value.equals(varVal))
            {
                this.paramValues[i].setValue(varVal, update, true, update);
                valueChanged = true;
            }

            updateNode = true;
        }


        if (updateNode)
            this.updateNode();

    }



    updateInputsAndOutputs(linked, temp)
    {
        if (linked)
        {
            if (temp)
            {
                this.addHeaderInput();
                this.addHeaderOutput();
            }
            else
            {
                this.removeHeaderInput();
                this.removeHeaderOutput();
            }
        }
        else
        {
            this.addHeaderInput();
            this.removeHeaderOutput();
        }
    }



    addHeaderInput()
    {
        if (this.headerInputs .length == 0) 
            this.addInput(new Input(
                [
                       ANY_VALUE, 
                    NUMBER_VALUE, 
                      TEXT_VALUE, 
                     COLOR_VALUE, 
                      FILL_VALUE
                ]));
    }


    
    addHeaderOutput()
    {
        if (this.headerOutputs.length == 0) 
            this.addOutput(new Output([VARIABLE_VALUE], this.output_genRequest));
    }



    removeHeaderInput()
    {
        if (this.headerInputs.length > 0) 
            this.removeInput(this.headerInputs[0]);
    }



    removeHeaderOutput()
    {
        if (this.headerOutputs.length > 0) 
            this.removeOutput(this.headerOutputs[0]);
    }



    checkNoUpdateDecimals(value, paramValue)
    {
        const foundIndex = noUpdatePrecisionIds.indexOf(this.variableId);

        if (   value.type == NUMBER_VALUE
            && foundIndex < 0)
        {
            noUpdatePrecisionIds.splice(foundIndex, 1);
            value.decimals = paramValue.value.decimals;
        }
    }



    updateParams()
    {
        for (const paramValue of this.paramValues)
        {
            paramValue.enableControlText(
                    this.headerInputs.length == 0
                || !this.headerInputs[0].connected, 
                paramValue.isUnknown());

            if (this.isBool)
                updateParamConditionText(paramValue, paramValue.isUnknown(), true, 1);
        }


        this.updateParamControls();
    }



    getLabelText()
    {
        if (!this.variableName)
            return defaultVariableNodeName;


        const parts = this.variableName.split('/');
        
        if (parts.length == 1)
            return this.variableName;
    
        
        const path = parts.slice(0, -2).join('/');

        return path
             + (path.length > 0 ? '/' : '') 
             + parts.slice(-2, -1).map(p => '<b>' + p + '</b>').join('/') 
             + '/' + parts.at(-1);
    }



    getInputWireColor()
    {
        return this.headerInputs[0].connected
            ? rgbFromType(this.headerInputs[0].connectedOutput.types[0], true)
            : rgbFromType(ANY_VALUE, true);
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
             + ',\n' + pos + tab + '"variableId": "'   + this.variableId   + '"'
             + ',\n' + pos + tab + '"variableType": "' + this.variableType + '"'
             + ',\n' + pos + tab + '"variableName": "' + encodeURIComponent(this.variableName) + '"'
             + ',\n' + pos + tab + '"variableTemp": "' + boolToString(this.variableTemp) + '"';
    }



    loadParams(_node, pasting)
    {
        const found = graph.currentPage.nodes.find(n => n.variableId == _node.variableId);


        super.loadParams(_node, pasting);


        if (!found)
        {
            this.variableId   = _node.variableId;
            this.variableType = _node.variableType;
            this.variableName = decodeURIComponent(_node.variableName);
            this.variableTemp = parseBool(_node.variableTemp);
        }
        else
        {
            this.name       = this.defName;

            this.variableId   = NULL;
            this.variableType = NULL;
            this.variableName = '';
            this.variableTem  = false;
        }


        this.updateInputsAndOutputs(
            this.variableType != NULL, 
            this.variableTemp);
    }
}