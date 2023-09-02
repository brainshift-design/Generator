class   OpVariable
extends ResizableBase
{
    paramValue;


    linkedVariableId   = NULL;
    linkedVariableType = NULL; // this is resolvedType
    linkedVariableName = '';

    isBool             = false;



    constructor(options = {})
    {
        super(VARIABLE, 'variable', 'variable', iconVariable);


        this.canRename   = false;
        this.iconOffsetY = 0;


        this.initValueParam();


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
        const headerHeight = Math.max(defHeaderHeight, boundingRect(this.header).height / graph.currentPage.zoom);

        const height =
            settings.showOperationResults
            ? Math.max(headerHeight + defParamHeight, h)
            : headerHeight + defParamHeight;

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


        const options = (this.existing ? 1 : 0) << 21;


        const [request, ignore] = this.genRequestStart(gen, options);
        if (ignore) return request;

                
        //request.push(this.linkedVariableId);
        request.push(...this.paramValue.genRequest(gen));


        gen.scope.pop();
        pushUnique(gen.passedNodes, this);

        return request;
    }



    initValueParam()
    {
        this.addParam(this.paramValue = new ListParam('value', '?', false, false, false));
        this.paramValue.itemName = '';
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


        if (   this.paramValue.type != type
            || this.isBool != prevIsBool)
        {
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
                this.initValueParam();


            this.icon        = icon;
            this.iconOffsetY = iconOffsetY;
        }
    }



    updateValueParamValues(resolvedType, values, update = false)
    {
        if (values.length > 0)
        {
            let value;

            const val = values[0];


            if (val)
            {
                switch (resolvedType)
                {
                    case 'FLOAT':   value = new NumberValue(val);    break;
                    case 'BOOLEAN': value = new NumberValue(val, 0); break;
                    case 'STRING':  value = new TextValue(val);      break;

                    case 'COLOR':
                        value = ColorValue.create(
                            1, 
                            Math.round(val.r * 0xff), 
                            Math.round(val.g * 0xff), 
                            Math.round(val.b * 0xff)); 
                        
                        break;
                }
                

                this.paramValue.setValue(value, update, true, update);
            }
        }
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        super.updateValues(requestId, actionId, updateParamId, paramIds, values);

        const value = values[paramIds.findIndex(id => id == 'value')];

        
        let val = null;

        switch (value.type)
        {
            case NUMBER_VALUE: 
                val = value.value;
                break;

            case TEXT_VALUE:   
                val = value.value;  
                break;

            case COLOR_VALUE:  
                val = value.toRgbObject(); 
                break;
        }

        
        uiUpdateVariable(this.linkedVariableId, val);
    }

    
    
    updateParams()
    {
        this.paramValue.enableControlText(false, this.paramValue.isUnknown());

        if (this.isBool)
            updateParamConditionText(this.paramValue, this.paramValue.isUnknown(), true, 1);

        this.updateParamControls();
    }



    getLabelText()
    {
        if (this.linkedVariableId == NULL)
            return 'variable';
        

        const parts = this.linkedVariableName.split('/');
        
        if (parts.length == 1)
            return this.linkedVariableName;
    
        
        return parts.slice(0, -1).map(p => '<b>' + p + '</b>').join('/') 
             + '/' + parts.at(-1);
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
             + ',\n' + pos + tab + '"linkedVariableName": "' + this.linkedVariableName + '"';
    }



    loadParams(_node, pasting)
    {
        if (!pasting)
        {
            super.loadParams(_node, pasting);
            
            this.linkedVariableId   = _node.linkedVariableId;
            this.linkedVariableType = _node.linkedVariableType;
            this.linkedVariableName = _node.linkedVariableName;
        }
        else
        {
            this.name               = this.defName;
            this.linkedVariableId   = NULL;
            this.linkedVariableType = NULL;
            this.linkedVariableName = '';
        }
    }
}
