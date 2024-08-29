const connectionSize  = 9;
const connectionGap   = 4;

const defHeaderHeight = 32;



class Operator
{
    subscription = false;
    beta         = false;


    #type; // used in the code, not for generation
    get type() { return this.#type; }
    

    valueType;


    createTime;
    updateTime;


    id;

    get pageId() 
    { 
        return pageIdFromPath(this.id);
    }

    get nodeId() { return this.id.split('/').at(-1); }


    group = null; // to which the node belongs


    _name;
    get name()     { return this._name;  }
    set name(name) { this.setName(name); }


    defId;
    defName;

    promptName;

    promptAttributes = [];

    icon;
    iconOffsetY = 0;


    headerHeight;
    

    enabled            = true;
    cached             = true;
    isMultiplier       = false;
    
    inert; // doesn't eval inputs if values exist
    slow;  // takes a while to finish operation, shows a progress bar

    canRename          = true;
    renamed            = false;     


    inputs             = [];
    outputs            = [];
  
    params             = [];
    hiddenParams       = [];
  
      
    variableInputs     = false;

    alwaysLoadParams   = false;
    alwaysSaveParams   = false;

    showIcon           = true;
    alwaysShowIcon     = false;

    saveParams         = true;  // master switch to not save any params

    canDisable         = false;


    scrollName         = true;

    showActiveArrow    = false;

    highlight          = 0;

    layoutIndex        = -1;
    newX               = Number.NaN;

    sharpBottomCorners = false;

    stripIdForCopy     = false; // one-time flag
    
    allowEmptyName     = false;
    

    notCondition       = false; // show node params in condition branch


    showHeaderTooltip  = false;
    preview            = null;


    defaultWidth;
    labelOffsetFactor;

    deselectTimer      = -1;


    _creatingButton    = null; // this is used to place the node under its creating button

    
    requestCache       = [];   // for nodes without an output


    // node UI

    div;
    inner;
    header;

    divIcon;
    divDisabled;
    
    progressWrapper    = null;
    progressBar        = null;
   
    hasProgressBar     = false;


    labelWrapper;
    label;
    labelText;
    textbox;
    inputControls;
    outputControls;

    paramHolder;

    proCover;
    proLabel;

    reorderArrows;
    showReorderArrows  = false;


    suffix = '';


    valid;

    
    measureData;



    _selected;
    get selected() { return this._selected; }
    set selected(sel) 
    {
        if (this._selected)
            removeFromArray(graphView.selectedNodes, this);

        this.setSelected(sel);     

        if (this._selected)
            graphView.selectedNodes.push(this);
    }        



    _active = false;
    get active() { return this._active; }


    get headerConnected       () { return !isEmpty(this.headerInputs.filter(i => i.connected)); }

    get headerInputs          () { return this. inputs.filter(i => !i.param);                   }
    get headerOutputs         () { return this.outputs.filter(o => !o.param);                   }
   
    get connectedInputs       () { return this. inputs.filter(i => i.connected);                }
    get connectedOutputs      () { return this.outputs.filter(o => o.connected);                }

    get connectedHeaderInputs () { return this. inputs.filter(i => !i.param && i.connected);    }
    get connectedHeaderOutputs() { return this.outputs.filter(o => !o.param && o.connected);    }


    get connections() 
    { 
        const conns = [];

        conns.push(...this.connectedInputs.map(i => i.connection));

        for (const output of this.connectedOutputs)
            conns.push(...output.connectedInputs.map(i => i.connection));

        return conns;
    }

    
    getDescription       = () => '';
    getDescriptionPrompt = () => this.getDescription();



    constructor(type, id, name, icon, defWidth = defNodeWidth, progressBar = false, createTooltip = true)
    {
        this.createTime        = Date.now();
        this.updateTime        = this.createTime;

        this.#type             = type;

        this.outputValueType         = NULL;

        this.id                = id;
        this.id                = makeNodePath(this);
        
        this.defId             = id;
        this.defName           = name;

        this.promptName        = name;


        this.icon              = icon;

        this.defaultWidth      = defWidth;
        this.labelOffsetFactor = 0;

        this.inert             = false;
        this.slow              = false;

        this.valid             = false;


        this.initMeasureData();
        

        this.createNode();


        if (progressBar)
            this.createProgressBar();

        if (createTooltip)
            createHeaderTooltip(this);


        this.setName(name);
    }    



    getInputId(input)
    {
        return input.param
             ? input.param.id
             : 'h' + input.index.toString();
    }



    inputFromId(id)
    {
        return this.inputs.find(i => i.id == id);
    }



    addInput(input, assign = true)
    {
        if (assign)
            input._node = this;

        const index = this.headerInputs.length;

        this.inputs.splice(index, 0, input);
        this.inputControls.insertBefore(input.div, this.inputControls.children[index]);
    }



    removeInput(input)
    {
        input._node = null;

        removeFromArray(this.inputs, input);
        this.inputControls.removeChild(input.div);

        return input;
    }



    createInputForObjects(types, getValuesForUndo)
    {
        return new Input(types, getValuesForUndo);
    }



    getAutoInput(output)
    {
        const inputs = this.headerInputs.filter(i => 
               i.canAutoConnect
            && i.canConnectFrom(output));

        
        if (   graphView.overInput
            && inputs.includes(graphView.overInput))
            return graphView.overInput;


        if (   graphView.savedConn
            && graphView.savedConn.input
            && graphView.savedConn.input.node == this)
            return graphView.savedConn.input;
        
        else if (!graphView.tempConn.output.node.isOrFollows(this))
        {
            if (this.variableInputs)
                return inputs.filter(i => !i.param).at(-1);

            else if (!isEmpty(inputs))
            {
                for (const input of inputs)
                {
                    if (!input.connected)
                        return input;
                }

                // at this point no empty inputs were found, so connect to the first one
                return inputs[0];
            }
        }


        return null;
    }



    getOutputId(output)
    {
        return output.param
             ? output.param.id
             : 'h' + output.index.toString();
    }



    outputFromId(id)
    {
        return this.outputs.find(o => o.id == id);
    }



    addOutput(output, assign = true)
    {
        if (assign)
            output._node = this;

        this.outputs.push(output);
        this.outputControls.appendChild(output.div);
    }



    removeOutput(output)
    {
        output._node = null;

        removeFromArray(this.outputs, output);
        this.outputControls.removeChild(output.div);

        return output;
    }



    getUncachedInputNodes(stackOverflowProtect = 100)
    {
        const uncachedNodes = [];

        if (stackOverflowProtect <= 0)
            return uncachedNodes;

        for (const input of this.inputs)
        {
            if (input.connected)
            {
                const node = input.connectedOutput.node;

                if (!node.cached) pushUnique(uncachedNodes, node);
                pushUnique(uncachedNodes, node.getUncachedInputNodes(stackOverflowProtect-1));
            }
        }
        
        return uncachedNodes;
    }
 
 
 
    getAutoOutput(inputTypes)
    {
        const outputs = this.headerOutputs.filter(o => 
               o.types.includes(ANY_VALUE)
            || arraysIntersect(o.types, inputTypes)
            || inputTypes.includes(ANY_VALUE));

        return  outputs.length == 1
            && !this.isOrFollows(graphView.tempConn.input.node)
            ? outputs[0]
            : null;
    }



    addBaseParamsBefore()
    {

    }



    addBaseParamsAfter()
    {

    }



    paramFromId(id)
    {
        return this.params.find(p => p.id == id);
    }



    addParam(param, volatile = false)
    {
        param._node    = this;
        param.volatile = volatile;

        this.params     .push(param);
        this.paramHolder.appendChild(param.div);

        if (param. input) this. inputs.push(param. input);
        if (param.output) this.outputs.push(param.output);

        return param;
    }
 
    

    insertParam(index, param, volatile = false)
    {
        param._node    = this;
        param.volatile = volatile;

        this.params.splice(index, 0, param);
        this.paramHolder.insertBefore(param.div, this.paramHolder.children[index]);

        if (param. input) this. inputs.splice(index, 0, param. input);
        if (param.output) this.outputs.splice(index, 0, param.output);

        return param;
    }
 
    

    // setParamIndex(param, index)
    // {
    //     moveInArray(this.params, this.params.indexOf(param), index);
    //     this.paramHolder.insertBefore(param.div, this.paramHolder.children[index]);

    //     if (param. input) moveInArray(this. inputs, this. inputs.indexOf(param. input), index);
    //     if (param.output) moveInArray(this.outputs, this.outputs.indexOf(param.output), index);
    // }



    createAndAddParamByType(type, id, showName, hasInput, hasOutput, volatile = false)
    {
             if (type ==       NUMBER_VALUE) return this.addParam(new      NumberParam(id, id, showName, hasInput, hasOutput), volatile);
        else if (type ==         TEXT_VALUE) return this.addParam(new        TextParam(id, id, showName, hasInput, hasOutput), volatile);
        else if (type ==        COLOR_VALUE) return this.addParam(new       ColorParam(id, id, showName, hasInput, hasOutput), volatile);
        else if (type ==         FILL_VALUE) return this.addParam(new        FillParam(id, id, showName, hasInput, hasOutput), volatile);
        else if (type ==   COLOR_STOP_VALUE) return this.addParam(new   ColorStopParam(id, id, showName, hasInput, hasOutput), volatile);
        else if (type ==     GRADIENT_VALUE) return this.addParam(new    GradientParam(id, id, showName, hasInput, hasOutput), volatile);
        else if (type ==       STROKE_VALUE) return this.addParam(new      StrokeParam(id, id, showName, hasInput, hasOutput), volatile);
        else if (type ==         LIST_VALUE) return this.addParam(new        ListParam(id, id, showName, hasInput, hasOutput), volatile);
        else if (type ==    RECTANGLE_VALUE) return this.addParam(new   RectangleParam(id, id, showName, hasInput, hasOutput), volatile);
        else if (type ==         LINE_VALUE) return this.addParam(new        LineParam(id, id, showName, hasInput, hasOutput), volatile);
        else if (type ==      ELLIPSE_VALUE) return this.addParam(new     EllipseParam(id, id, showName, hasInput, hasOutput), volatile);
        else if (type ==      TRAPEZE_VALUE) return this.addParam(new     TrapezeParam(id, id, showName, hasInput, hasOutput), volatile);
        else if (type ==      POLYGON_VALUE) return this.addParam(new     PolygonParam(id, id, showName, hasInput, hasOutput), volatile);
        else if (type ==         STAR_VALUE) return this.addParam(new        StarParam(id, id, showName, hasInput, hasOutput), volatile);
        else if (type ==   TEXT_SHAPE_VALUE) return this.addParam(new   TextShapeParam(id, id, showName, hasInput, hasOutput), volatile);
        else if (type ==        POINT_VALUE) return this.addParam(new       PointParam(id, id, showName, hasInput, hasOutput), volatile);
        else if (type ==  VECTOR_PATH_VALUE) return this.addParam(new  VectorPathParam(id, id, showName, hasInput, hasOutput), volatile);
        else if (type ==  DROP_SHADOW_VALUE) return this.addParam(new  DropShadowParam(id, id, showName, hasInput, hasOutput), volatile);
        else if (type == INNER_SHADOW_VALUE) return this.addParam(new InnerShadowParam(id, id, showName, hasInput, hasOutput), volatile);
        else if (type ==   LAYER_BLUR_VALUE) return this.addParam(new   LayerBlurParam(id, id, showName, hasInput, hasOutput), volatile);
        else if (type ==    BACK_BLUR_VALUE) return this.addParam(new    BackBlurParam(id, id, showName, hasInput, hasOutput), volatile);

        else consoleError('cannot add parameter of type \'' + type + '\'');

        return null;
    }



    createAndInsertParamByValue(index, value, id, showName, hasInput, hasOutput, volatile = false)
    {
        let param = null;


        if (value)
        {
                 if (value.type ==       NUMBER_VALUE) param = this.insertParam(index, new      NumberParam(id, id, showName, hasInput, hasOutput), volatile);
            else if (value.type ==         TEXT_VALUE) param = this.insertParam(index, new        TextParam(id, id, showName, hasInput, hasOutput), volatile);
            else if (value.type ==        COLOR_VALUE) param = this.insertParam(index, new       ColorParam(id, id, showName, hasInput, hasOutput), volatile);
            else if (value.type ==         FILL_VALUE) param = this.insertParam(index, new        FillParam(id, id, showName, hasInput, hasOutput), volatile);
            else if (value.type ==   COLOR_STOP_VALUE) param = this.insertParam(index, new   ColorStopParam(id, id, showName, hasInput, hasOutput), volatile);
            else if (value.type ==     GRADIENT_VALUE) param = this.insertParam(index, new    GradientParam(id, id, showName, hasInput, hasOutput), volatile);
            else if (value.type ==       STROKE_VALUE) param = this.insertParam(index, new      StrokeParam(id, id, showName, hasInput, hasOutput), volatile);
            else if (value.type ==         LIST_VALUE) param = this.insertParam(index, new        ListParam(id, id, showName, hasInput, hasOutput), volatile);
            else if (value.type ==    RECTANGLE_VALUE) param = this.insertParam(index, new   RectangleParam(id, id, showName, hasInput, hasOutput), volatile);
            else if (value.type ==         LINE_VALUE) param = this.insertParam(index, new        LineParam(id, id, showName, hasInput, hasOutput), volatile);
            else if (value.type ==      ELLIPSE_VALUE) param = this.insertParam(index, new     EllipseParam(id, id, showName, hasInput, hasOutput), volatile);
            else if (value.type ==      TRAPEZE_VALUE) param = this.insertParam(index, new     TrapezeParam(id, id, showName, hasInput, hasOutput), volatile);
            else if (value.type ==      POLYGON_VALUE) param = this.insertParam(index, new     PolygonParam(id, id, showName, hasInput, hasOutput), volatile);
            else if (value.type ==         STAR_VALUE) param = this.insertParam(index, new        StarParam(id, id, showName, hasInput, hasOutput), volatile);
            else if (value.type ==   TEXT_SHAPE_VALUE) param = this.insertParam(index, new   TextShapeParam(id, id, showName, hasInput, hasOutput), volatile);
            else if (value.type ==        POINT_VALUE) param = this.insertParam(index, new       PointParam(id, id, showName, hasInput, hasOutput), volatile);
            else if (value.type ==  VECTOR_PATH_VALUE) param = this.insertParam(index, new  VectorPathParam(id, id, showName, hasInput, hasOutput), volatile);
            else if (value.type ==  DROP_SHADOW_VALUE) param = this.insertParam(index, new  DropShadowParam(id, id, showName, hasInput, hasOutput), volatile);
            else if (value.type == INNER_SHADOW_VALUE) param = this.insertParam(index, new InnerShadowParam(id, id, showName, hasInput, hasOutput), volatile);
            else if (value.type ==   LAYER_BLUR_VALUE) param = this.insertParam(index, new   LayerBlurParam(id, id, showName, hasInput, hasOutput), volatile);
            else if (value.type ==    BACK_BLUR_VALUE) param = this.insertParam(index, new    BackBlurParam(id, id, showName, hasInput, hasOutput), volatile);

            else consoleError('cannot insert parameter of type \'' + value.type + '\'');


            if (value.type == NUMBER_VALUE)
                param.isBoolean = value.isBoolean;
        }

        
        return param;
    }



    // removeParamById(paramId)
    // {
    //     const param = this.params.find(p => p.id == paramId);

    //     if (param)
    //         this.removeParam(param);
    // }



    removeParam(param)
    {
        if (param.input)
        {
            if (param.input.connected)
                uiDisconnect(param.input);

            param.input._node = null;
            removeFromArray(this.inputs, param.input);
        }

        if (param.output)
        {
            for (const input of param.output.connectedInputs)
                uiDisconnect(input);

            param.output._node = null;
            removeFromArray(this.outputs, param.output);
        }


        if (this.paramHolder.contains(param.div))
            this.paramHolder.removeChild(param.div);
    
        removeFromArray(this.params, param);

        param._node = null;
    }



    getAllParamConnections()
    {
        const conns = [];

        for (let i = 0; i < this.params.length; i++)
        {
            const param = this.params[i];

            if (   param.input 
                && param.input.connected)
                conns.push(param.input.connection.toDataObject());

            if (param.output)
            {
                for (const input of param.output.connectedInputs)
                    conns.push(input.connection.toDataObject());
            }
        }

        return conns;
    }



    disconnectAllParams(deleteSavedConnections = false)
    {
        for (let i = this.params.length-1; i >= 0; i--)
        {
            const param = this.params[i];

            if (param.input && param.input.connected)
            {
                if (deleteSavedConnections)
                    uiDeleteSavedConn(param.input.connection);

                uiDisconnect(param.input);
            }

            if (param.output)
            {
                for (const input of param.output.connectedInputs)
                {
                    if (deleteSavedConnections)
                        uiDeleteSavedConn(input.connection);

                    uiDisconnect(input);
                }
            }
        }
    }



    removeAllParams()
    {
        for (let i = this.params.length-1; i >= 0; i--)
            this.removeParam(this.params[i]);
    }



    disconnectParamsNotInList(list, deleteSavedConnections = false)
    {
        for (let i = this.params.length-1; i >= 0; i--)
        {
            if (list.includes(this.params[i].id))
                continue;


            const param = this.params[i];

            if (param.input && param.input.connected)
            {
                if (deleteSavedConnections)
                    uiDeleteSavedConn(param.input.connection);

                uiDisconnect(param.input);
            }


            if (param.output)
            {
                for (const input of param.output.connectedInputs)
                {
                    if (deleteSavedConnections)
                        uiDeleteSavedConn(input.connection);

                    uiDisconnect(input);
                }
            }
        }
    }



    removeParamsNotInList(list)
    {
        for (let i = this.params.length-1; i >= 0; i--)
            if (!list.includes(this.params[i].id))
                this.removeParam(this.params[i]);
    }



    updateParamDisplay() // must be called at the end of each final Op constructor
    {
        for (const param of this.params)
            param.div.style.display = param.canShow() ? 'inline-block' : 'none';
    }



    getTabParams()
    {
        return this.params.filter(p => p.canShow());
    }



    setSelected(sel)
    {
        this._selected = sel;

        this.updateBorder();

        //if (deleteConnectionsDialogVisible)
        //if (minZoomDialogVisible)
        //    hideMinZoomDialog();
    }
    


    makeActive()
    {
        this._active = true;

        if (    graphView
            &&  graphView.activeNodes
            && !graphView.activeNodes.includes(this))
            graphView.activeNodes.push(this);
    }



    makePassive()
    {
        if (!this._active) 
            return;
            
        if (graphView.activeNodes.includes(this))
            removeFromArray(graphView.activeNodes, this);

        this._active = false;
    }



    setName(newName, options = {})
    {
        this._name = newName;

        //this.updateMeasureData();
        //this.updateHeaderLabelOffsetX();

        return true;
    }



    setPosition(x, y, updateTransform = true)
    {
        //console.log('Operator.setPosition()');
   
        this.x = x;
        this.y = y;

        this.div.style.left = x + 'px';
        this.div.style.top  = y + 'px';

        if (updateTransform)
        {
            this.div.style.display = 'block';
            this.updateTransform();
        }

        this.updateMeasureData();
    }



    // setSize(w, h, updateTransform = true)
    // {
    //     this.div.style.width  = w + 'px';
    //     this.div.style.height = h + 'px';

    //     if (updateTransform)
    //     {
    //         this.div.style.display = 'block';
    //         this.updateTransform();
    //     }
    // }



    setRect(x, y, w, h, updateTransform = true)
    {
        //console.log('Operator.setRect()');

        this.x      = x;
        this.y      = y;
        this.width  = w;
        this.height = h;

        this.div.style.left   = x + 'px';
        this.div.style.top    = y + 'px';
        this.div.style.width  = w + 'px';
        this.div.style.height = h + 'px';

        if (updateTransform)
        {
            this.div.style.display = 'block';
            //this.updateParams();
            this.updateTransform();
        }
    }



    setHeight(h, updateTransform = true)
    {
        this.div.style.height = h + 'px';

        if (updateTransform)
        {
            this.div.style.display = 'block';
            this.updateTransform();
        }
    }



    showParamMenu(e, param, menu)
    {
        if (e.button == 2)
        {
            e.preventDefault();
            e.stopPropagation();

            param.controls[0].buttonDown2 = true;

            menu.showAt(e.clientX, e.clientY, false);
        }
    }



    canAutoConnectFrom(output)
    {
        return false;
    }



    isCached()
    {
        for (const input of this.inputs)
        {
            if (    input.connected
                && !input.connectedOutput.node.isCached())
                return false;
        }

        return this.cached;
    }



    isConnectedTo(node)
    {
        return this. inputs.find(i => i.connected && i.connectedOutput.node == node)
            || this.outputs.find(o => o.connected && o.connectedInputs.find(i => i.node == node));
    }



    isParallelTo(node)
    {
        return !this.follows(node)
            && !node.follows(this);
    }



    follows(node) 
    { 
        return this.isOrFollows(node, false); 
    }



    isOrFollows(node, considerIs = true, stackOverflowProtect = 100)
    {
        if (   this == node
            && considerIs)
            return true;

        if (stackOverflowProtect <= 0)
            return false;

        for (const input of this.inputs)
        {
            if (   input.connected
                && input.connectedOutput.node.isOrFollows(node, true, stackOverflowProtect-1))
                return true;
        }

        return false;
    }



    immediatelyFollows(node, headerOnly = false)
    {
        const inputs = 
            headerOnly 
            ? this.headerInputs 
            : this.inputs;

        for (const input of inputs)
        {
            if (   input.connected
                && input.connectedOutput.node == node)
                return true;
        }

        return false;
    }



    isOrPrecededByUncached(stackOverflowProtect = 100)
    {
        return !this.cached
             || this.hasUncachedInputs(stackOverflowProtect-1);
    }



    headerIsOrPrecededByUncached(stackOverflowProtect = 100)
    {
        return !this.cached
             || this.hasUncachedHeaderInputs(stackOverflowProtect-1);
    }



    isOrPrecededByMultiplier()
    {
        return this.isMultiplier
            || this.hasMultipliedInputs();
    }



    isOrFollowedByMultiplier()
    {
        return this.isMultiplier
             ? true
             : this.hasMultipliedOutputs();
    }



    isOrFollowedBySolver()
    {
        return this.type == NUMBER_SOLVE
             ? true
             : this.hasSolvedOutputs();
    }



    isOrFollowedByRepeat()
    {
        return this.type == REPEAT
             ? true
             : this.outputs.find(o => o.isFollowedByRepeat());
    }



    hasUncachedInputs(stackOverflowProtect = 100)
    {
        if (stackOverflowProtect <= 0)
            return false;

        for (const input of this.inputs)
        {
            if (input.isUncached(stackOverflowProtect-1))
                return true;
        }

        return false;
    }



    hasUncachedHeaderInputs(stackOverflowProtect = 100)
    {
        if (stackOverflowProtect <= 0)
            return false;

        for (const input of this.headerInputs)
        {
            if (input.isUncached(stackOverflowProtect-1))
                return true;
        }

        return false;
    }



    hasMultipliedInputs()
    {
        for (const input of this.inputs)
            if (   input.connectedOutput
                && input.connectedOutput.node.isOrPrecededByMultiplier())
                return true;

        return false;
    }



    hasMultipliedOutputs()
    {
        for (const output of this.outputs)
            for (const input of output.connectedInputs)
                if (input.node.isOrFollowedByMultiplier())
                    return true;

        return false;
    }



    hasSolvedOutputs()
    {
        for (const output of this.outputs)
            for (const input of output.connectedInputs)
                if (input.node.isOrFollowedBySolver())
                    return true;

        return false;
    }



    hasConditionOutputs()
    {
        for (const output of this.outputs)
            if (output.isCondition())
                return true;

        return false;
    }



    isHeaderUnknown(stackOverflowProtect = 100)
    {
        return this.headerIsOrPrecededByUncached(stackOverflowProtect-1)
            && this.hasMultipliedOutputs();
    }



    isUnknown(stackOverflowProtect = 100)
    {
        return this.isOrPrecededByUncached(stackOverflowProtect-1)
            && (   this.hasMultipliedOutputs()
                || this.hasSolvedOutputs());
    }



    // hasUnknownParams()
    // {
    //     return this.params.find(p => p.isUnknown()) != null;
    // }



    paramCanBeUnknown(param)
    {
        return false;
    }



    paramIsConsideredDefault(param) // this has to be an op virtual method, not a param method
    {
        return param.isDefault()
            && (   !param.input 
                || !param.input.connected);
    }



    restoreParamUndoValue(value)
    {
        const param = this.params.find(p => p.id == value.paramId);

        if (value.type == NUMBER_VALUE)
        {
            param.controls[0].setMin(value.displayMin, value.min);
            param.controls[0].setMax(value.displayMax, value.max);
        }
            
        param.setValue(value.value, true, true, false);
    }
    
    

    setAllParamDividers(divider)
    {
        for (const param of this.params)
            if (   param instanceof NumberParamBase
                || param instanceof TextParam)
                param.divider = divider;
    }



    reset() // for the entire generation run
    {
        for (const input of this.inputs)
        {
            input.currentSeed = input.initialSeed;
            
            if (input.connected)
                input.connectedOutput.node.reset();
        }
    }



    invalidate()
    {
        this.valid        = false;
        this.requestCache = [];


        for (const output of this.outputs)
        {
            output.cache = [];
            
            for (const input of output.connectedInputs)
                input.node.invalidate();
        }
    }



    genRequest(gen)
    {
        // this function exists because a node without outputs
        // should still be able to generate a request
        
        return [];
    }



    genRequestStart(gen, nodeOptions = 0)
    {
        const request = [
            this.type, 
            this.id,
            this.name ];


        const ignore = gen.passedNodes.includes(this);

        if (!ignore)
        {
            const nextActive   = getActiveAfterNode(this, true);
            const beforeActive = nextActive && nextActive.follows(this);

            const nextList     = getListAfterNode(this, true);
            const beforeList   = nextList && nextList.follows(this);

            const options =
                  ((this.active       ? 1 : 0) << 0)
                | ((beforeActive      ? 1 : 0) << 1)
                | ((beforeList        ? 1 : 0) << 2)
                | ((this.enabled      ? 1 : 0) << 3)
                | ((this.cached       ? 1 : 0) << 4)
                | ((this.isUnknown()  ? 1 : 0) << 5)
                | ((this.notCondition ? 1 : 0) << 6)
                | nodeOptions;

            request.push(options);
        }


        return [request, ignore];
    }



    setTransform(nodeLeft, nodeTop, nodeRect)
    {
        this.div.style.transform =
              'translate(' 
            +     (graph.currentPage.pan.x * graph.currentPage.zoom) + 'px, '
            +     (graph.currentPage.pan.y * graph.currentPage.zoom) + 'px) '
            + 'scale(' + graph.currentPage.zoom + ')';

        this.div.style.transformOrigin = 
              ((graph.currentPage.pan.x - nodeLeft) / nodeRect.width  * 100) + '% ' 
            + ((graph.currentPage.pan.y - nodeTop ) / nodeRect.height * 100) + '%';  
    }



    getOffsetRect()
    {
        const ox   = -graph.currentPage.pan.x / graph.currentPage.zoom;
        const oy   = -graph.currentPage.pan.y / graph.currentPage.zoom;

        const rect = boundingRect(this.div);

        return new DOMRect(
            ox + (rect.left / graph.currentPage.zoom),
            oy + (rect.top  / graph.currentPage.zoom),
            rect.width      / graph.currentPage.zoom, 
            rect.height     / graph.currentPage.zoom);
    }



    getHeaderColors(options = {})
    {
        const rgbaBack = 
            this.inert
            ? rgb_a(rgbDocumentBody, 0.95)
            : rgb_a(rgbFromType(this.type, this.active), 0.95);

        const rgbaBorder = rgb_a(rgbFromType(this.type, this.active), 0.95);
        const rgbaText   = isDark(rgbaBack) ? [1, 1, 1, 1] : [0, 0, 0, 1]; 

        return {
            back:      rgbaBack, 
            colorBack: rgba_NaN, // for color headers
            border:    rgbaBorder,
            text:      rgbaText };
    }



    getHeaderInputColor()
    {
        return rgba_NaN;
    }



    getHeaderOutputColor()
    {
        return rgba_NaN;
    }



    getInputWireColor()
    {
        return rgb_NaN;
    }



    getOutputWireColor()
    {
        return rgb_NaN;
    }



    getActiveOffset()
    {
        return 0;
    }



    getDefaultOffset()
    {
        return 0;
    }



    connectToSelected(selected)
    {
        consoleAssert(!isEmpty(selected));

        const node   = selected[0];
        const inputs = this.inputs.filter(i => i.types.includes(node.type));
    
        if (   node
            && !isEmpty(node.outputs)
            && !isEmpty(inputs))
            actionManager.do(new ConnectAction(node.outputs[0], inputs[0]), true);
    }



    updateConnectedInputValueText() {}



    toJson(nTab = 0) 
    {
        let pos = ' '.repeat(nTab);
        

        let json = 
              pos + '{\n'
            + this.toJsonBase(nTab);

        const nonDefaultParams = this.params.filter(p => !this.paramIsConsideredDefault(p));

        if (    (  !isEmpty(nonDefaultParams) // don't include empty param section
                 || this.alwaysSaveParams)
             && this.saveParams)
            json += this.paramsToJson(nTab);

        json += '\n' + pos + '}';


        return json;
    }



    toJsonBase(nTab)
    {
        let   pos = ' '.repeat(nTab);
        const tab = HTAB;

        let json =
              pos + tab + '"type": "'         + this.type                                     + '",\n'
            + pos + tab + '"created": "'      + this.createTime                               + '",\n'
            + pos + tab + '"updated": "'      + this.updateTime                               + '",\n'
            + pos + tab + '"id": "'           + (this.stripIdForCopy ? this.nodeId : this.id) + '",\n'
            + pos + tab + '"name": "'         + encodeURIComponent(this.name)                 + '",\n'
            + pos + tab + '"renamed": "'      + boolToString(this.renamed)                    + '",\n'
            + pos + tab + '"enabled": "'      + boolToString(this.enabled)                    + '",\n'
            + pos + tab + '"highlight": "'    + this.highlight                                + '",\n'
            + pos + tab + '"notCondition": "' + boolToString(this.notCondition)               + '",\n'
            + pos + tab + '"x": "'            + parseFloat(this.div.style.left)               + '",\n'
            + pos + tab + '"y": "'            + parseFloat(this.div.style.top )               + '",\n'
            + pos + tab + '"z": "'            + graph.nodes.indexOf(this)                     + '"';

        if (this.active)
            json += ',\n' + pos + tab + '"active": "' + this.active + '"';

        this.stripIdForCopy = false;

        return json;
    }



    paramsToJson(nTab = 0)
    {
        //console.log(this.nodeId + '.paramsToJson()');

        let   pos = ' '.repeat(nTab);
        const tab = HTAB;


        let json =
             ',\n'
            + pos + tab + '"params":\n'
            + pos + tab + '[\n';
        
            
        let first = true;
        for (const param of this.params)
        {
            if (  !param.isDefault()
                || this.alwaysSaveParams)
            {
                if (!first) json += ',\n'; first = false;
                json += pos + tab + tab + param.toJson(nTab);
            }
        }


        if (!first)
            json += '\n';

        json += pos + tab + ']';

        
        return json;
    }



    loadFromParsedJson(_node, pasting)
    {
        this.createTime = _node.created ? parseInt(_node.created) : Date.now(); 
        this.updateTime = _node.updated ? parseInt(_node.updated) : this.createTime;

        this.id   = _node.id;
        this.name = decodeURIComponent(_node.name);
    
        // for pasting
        if (_node.x           ) this.x            = parseFloat(_node.x);
        if (_node.y           ) this.y            = parseFloat(_node.y);

        if (_node.renamed     ) this.renamed      = parseBool(_node.renamed);
        if (_node.enabled     ) this.enabled      = parseBool(_node.enabled);
        if (_node.highlight   ) this.highlight    = parseInt (_node.highlight);
        if (_node.notCondition) this.notCondition = parseBool(_node.notCondition);
    
        if (  _node.params
            || this.alwaysLoadParams)
            this.loadParams(_node, pasting);
    }



    loadParams(_node, pasting)
    {
        if (!_node.params)
            return;
     
        for (const _param of _node.params)
        {
            let index = this.params.findIndex(p => p.id == _param[1]);

            if (index < 0)
            {
                this.createAndAddParamByType(_param[0], _param[1], true, false, true, true);
                index = this.params.length-1;
            }

            this.params[index].loadParam(_param);
        }
    }



    toString() 
    { 
        // create the generator string here

        return '';
    }



    toJavascript(gen)
    {
        return '';
    }



    toJsDefs(gen)
    {
        return '';
    }



    toJsCode(gen)
    {
        return '';
    }



    static getPromptFormat()
    {
        return `NODE: name | type | default ID | description
| node-specific attributes (name: description)`;
    }



    static getJSONformat()
    {
        return `
- type
- created
- updated
- id
- name
- renamed
- enabled
- highlight
- notCondition
- x
- y
- z
- active
- width
- height
- node-specific attributes (name: description)
`;
    }



    toPrompt()
    {
        let prompt = `NODE: ${this.promptName} | ${this.type} | ${this.defId} | ${this.getDescriptionPrompt()}`;

        this.promptAttributes.forEach(a => prompt += '\n| ' + a[0] + ': ' + a[1]);
        this.params          .forEach(p => prompt += '\n\t' + p.toPrompt());

        prompt += '\n\n';

        return prompt;
    }
}



function getHeaderConnY(conns)//, padding, offset)
{
    const y      = [];
    let   height = 0;
    
    for (let i = 0; i < conns.length; i++)
    {
        if (i > 0) height += connectionGap;
        y.push(/*offset + padding*/ + height);
        height += connectionSize;
    }

    return [y, height];
}



function createGenObject(paramNode, terminals)
{
    return {
        terminals:    terminals,
        scope:        paramNode ? [{nodeId: paramNode.id, paramId: NULL}] : [],
        passedNodes:  [],
        paramNodes:   [],
        markParams:   true
    };    
}



function areConnected(node1, node2)
{
    return node1.isOrFollows(node2)
        || node2.isOrFollows(node1);
}



function onVariableConnectInput(input)
{
    input.node.addNewInput();

    //input.node.updateMeasureData();
    //input.node.updateNode();
}



function onVariableDisconnectInput(input)
{
    removeFromArray(input.node.inputs, input);

    input.node.inputControls.removeChild(input.div);
    //input.node.updateMeasureData();
    //input.node.updateNode();
}



function onVariableListConnectInput(input, updateOutput = true)
{
    onVariableConnectInput(input);

    if (updateOutput)
        updateOutputListTypeFromConnectedInputs(input.node);
}



function onVariableListDisconnectInput(input, updateOutput = true)
{
    onVariableDisconnectInput(input);

    if (updateOutput)
        updateOutputListTypeFromConnectedInputs(input.node);
}



function updateOutputListTypeFromConnectedInputs(node)
{
    const types = [];

    for (const input of node.connectedInputs)
        pushUnique(types, input.connectedOutput.types);

    node.outputs[0].types = [finalListTypeFromTypes(types)];
}



function getNodeInputValuesForUndo(input)
{
    const values = []; 

    for (const param of input.node.params)
        values.push(param.getValueForUndo());

    return values;
}



function getNodeOutputValuesForUndo(output)
{
    const values = []; 

    for (const param of output.node.params)
        values.push(param.getValueForUndo());

    return values;
}



function getParamInputValuesForUndo(input)
{
    return [input.param.getValueForUndo()];
}



function getParamOutputValuesForUndo(output)
{
    return [output.param.getValueForUndo()];
}



function nodesAreParallel(nodes)
{
    for (let i = 0; i < nodes.length-1; i++)
        for (let j = i + 1; j < nodes.length; j++)
            if (!nodes[i].isParallelTo(nodes[j]))
                return false;

    return true;
}



// function restoreNodeUndoValues(node, values)
// {
//     for (const value of values)
//     {
//         const param = node.params.find(p => p.id == value.paramId);

//         if (param)
//         {
//             if (   value.min != undefined
//                 && value.max != undefined)
//             {
//                 param.controls[0].setMin(value.min);
//                 param.controls[0].setMax(value.max);
//             }
                
//             param.setValue(value.value, true, true, false);
//         }
//     }
// }



function makeNodePath(node)
{
    if (!node) 
        return '';


    let path = idFromNodePath(node.id);


    let group = node;
    
    while (isValid(group = group.group))
        path = group.id + '/' + path;


    if (   graph.currentPage
        && graph.currentPage.id != NULL)
        path = graph.currentPage.id + '/' + path;

        
    return path;
}



function idFromNodePath(path)
{
    return path
         ? path.split('/').at(-1)
         : '';
}



function createHeaderTooltip(node, tooltip = ttText)
{
    createTooltipSrc(
        node.header, 
        node.header, 
        () => tooltip, 
        () =>    node.showHeaderTooltip 
              && (      node.type == TEXT_CHAR
                     && settings.showTooltipAscii  
                  || settings.showTooltipLists));


    node.header.addEventListener('pointerenter', e =>
    {
        if (  !currentTooltip
            && node.preview)
        {
            let strTooltip = 
                node.isUnknown()
                ? NAN_DISPLAY
                : node.preview.toPreviewString();

            if (   node.showHeaderTooltip === true
                && strTooltip != '')
                initTextTooltip(strTooltip);
        }
    });


    node.header.addEventListener('pointerdown', () =>
    {
        if (tooltipTimer)
            clearTimeout(tooltipTimer);

        if (currentTooltip) 
            hideTooltip(currentTooltip);
    });
}