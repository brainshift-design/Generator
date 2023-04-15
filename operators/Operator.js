const connectionSize = 9;
const connectionGap  = 4;

const defHeaderHeight = 32;



class Operator
{
    subscription = false;


    #type; // used in the code, not for generation
    get type() { return this.#type; }
    

    id;

    get pageId() 
    { 
        return pageIdFromPath(this.id);
    }

    get nodeId() { return this.id.split('/').at(-1); }


    _name;
    get name()     { return this._name; }
    set name(name) { this.setName(name); }


    defId;
    defName;


    enabled;
    cached;
    inert; // doesn't eval inputs if values exist
    slow;  // takes a while to finish operation, shows a progress bar

    renamed            = false;     


    inputs             = [];
    outputs            = [];
  
    params             = [];
    hiddenParams       = [];
  
      
    variableInputs     = false;

    alwaysLoadParams   = false;
    alwaysSaveParams   = false;

    canDisable         = false;


    scrollName         = true;

    showActiveArrow    = false;

    sharpBottomCorners = false;

    stripIdForCopy     = false; // one-time flag
    

    defaultWidth;
    labelOffsetFactor;


    _creatingButton    = null; // this is used to place the node under its creating button

    
    requestCache       = []; // for nodes without an output


    // node UI

    div;
    inner;
    header;

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
    //hiddenParamBack;

    subscribeCover;
    subscribeLabel;

    reorderArrows;
    showReorderArrows  = false;


    valid;

    
    measureData = { divBounds: new Rect(0, 0, 0, 0) };



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

    get headerInputs          () { return this.inputs .filter(i => !i.param);                   }
    get headerOutputs         () { return this.outputs.filter(o => !o.param);                   }
   
    get connectedHeaderInputs () { return this.inputs .filter(i => !i.param && i.connected);    }
    get connectedHeaderOutputs() { return this.outputs.filter(o => !o.param && o.connected);    }



    constructor(type, id, name, defWidth = defNodeWidth, progressBar = false)
    {
        this.#type             = type;
        this.id                = makeNodePath(id);
        
        this.enabled           = true;
        this.cached            = true;
        this.inert             = false;
        this.slow              = false;

        this.defId             = id;
        this.defName           = name;

        this.defaultWidth      = defWidth;
        this.labelOffsetFactor = 0;
        
        this.valid             = false;

        this.createNode();

        if (progressBar)
            this.createProgressBar();

        this.setName(name);
    }    



    getInputId(input)
    {
        return input.param
             ? input.param.id
             : input.index.toString();
    }



    inputFromId(id)
    {
        return this.inputs.find(i => i.id == id);
    }



    addInput(input)
    {
        input._node = this;

        const index = this.headerInputs.length;

        this.inputs.splice(index, 0, input);
        this.inputControls.insertBefore(input.div, this.inputControls.children[index]);
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
             : output.index.toString();
    }



    outputFromId(id)
    {
        return this.outputs.find(o => o.id == id);
    }



    addOutput(output)
    {
        output._node = this;

        this.outputs.push(output);
        this.outputControls.appendChild(output.div);
    }



    getUncachedInputNodes()
    {
        const uncachedNodes = [];

        for (const input of this.inputs)
        {
            if (input.connected)
            {
                const node = input.connectedOutput.node;

                if (!node.cached) pushUnique(uncachedNodes, node);
                pushUnique(uncachedNodes, node.getUncachedInputNodes());
            }
        }
        
        return uncachedNodes;
    }
 
 
 
    getAutoOutput(inputTypes)
    {
        const outputs = this.headerOutputs.filter(o => arraysIntersect(o.types, inputTypes));

        return  outputs.length == 1
            && !this.isOrFollows(graphView.tempConn.input.node)
            ? outputs[0]
            : null;
    }



    addBaseParams()
    {

    }



    addParam(param, volatile = false)
    {
        param._node    = this;
        param.volatile = volatile;

        this.params.push(param);
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
 
    

    createAndAddParamByType(type, id, showName, hasInput, hasOutput, volatile = false)
    {
             if (NUMBER_TYPES.includes(type)) return this.addParam(new NumberParam(id, id, showName, hasInput, hasOutput), volatile);
        else if (  TEXT_TYPES.includes(type)) return this.addParam(new   TextParam(id, id,           hasInput, hasOutput), volatile);
        else if ( COLOR_TYPES.includes(type)) return this.addParam(new  ColorParam(id, id, showName, hasInput, hasOutput), volatile);
        else if (  FILL_TYPES.includes(type)) return this.addParam(new   FillParam(id, id, showName, hasInput, hasOutput), volatile);
        else if (STROKE_TYPES.includes(type)) return this.addParam(new StrokeParam(id, id, showName, hasInput, hasOutput), volatile);
        else if (  LIST_TYPES.includes(type)) return this.addParam(new   ListParam(id, id,           hasInput, hasOutput), volatile);

        else console.assert(false, 'cannot add parameter of type \'' + type + '\'');

        return null;
    }



    createAndInsertParamByType(index, type, id, showName, hasInput, hasOutput, volatile = false)
    {
             if (NUMBER_TYPES.includes(type)) return this.insertParam(index, new NumberParam(id, id, showName, hasInput, hasOutput), volatile);
        else if (  TEXT_TYPES.includes(type)) return this.insertParam(index, new   TextParam(id, id,           hasInput, hasOutput), volatile);
        else if ( COLOR_TYPES.includes(type)) return this.insertParam(index, new  ColorParam(id, id, showName, hasInput, hasOutput), volatile);
        else if (  FILL_TYPES.includes(type)) return this.insertParam(index, new   FillParam(id, id, showName, hasInput, hasOutput), volatile);
        else if (STROKE_TYPES.includes(type)) return this.insertParam(index, new StrokeParam(id, id, showName, hasInput, hasOutput), volatile);
        else if (  LIST_TYPES.includes(type)) return this.insertParam(index, new   ListParam(id, id,           hasInput, hasOutput), volatile);

        else console.assert(false, 'cannot insert parameter of type \'' + type + '\'');

        return null;
    }



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
        if (minZoomDialogVisible)
            hideDeleteConnectionsDialog();
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

        this.updateMeasureData();
        this.updateHeaderLabelOffsetX();

        return true;
    }



    setPosition(x, y, updateTransform = true)
    {
        //console.log('Operator.setPosition()');
   
        this.div.style.left = x + 'px';
        this.div.style.top  = y + 'px';

        if (updateTransform)
        {
            this.div.style.display = 'block';
            this.updateTransform();
        }

        this.updateMeasureData();

    }



    setSize(w, h, updateTransform = true)
    {
        this.div.style.width  = w + 'px';
        this.div.style.height = h + 'px';

        if (updateTransform)
        {
            this.div.style.display = 'block';
            this.updateTransform();
        }
    }



    setRect(x, y, w, h, updateTransform = true)
    {
        console.log('Operator.setRect()');

        this.div.style.left   = x + 'px';
        this.div.style.top    = y + 'px';
        this.div.style.width  = w + 'px';
        this.div.style.height = h + 'px';

        if (updateTransform)
        {
            this.div.style.display = 'block';
            this.updateTransform();
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



    isConnectedUncached()
    {
        return this.inputs.find(i => i.isConnectedUncached());
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



    isOrFollows(node, considerIs = true)
    {
        if (   this == node
            && considerIs)
            return true;

        for (const input of this.inputs)
        {
            if (   input.connected
                && input.connectedOutput.node.isOrFollows(node))
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



    isOrFollowedByMultiplier()
    {
        return isMultiplier(this)
             ? true
             : this.hasMultipliedOutputs();
    }



    hasMultipliedOutputs()
    {
        for (const output of this.outputs)
            if (output.isMultiplied())
                return true;

        return false;
    }



    isUnknown()
    {
        return false;
        // return this.isConnectedUncached()
        //     && this.hasMultipliedOutputs();
    }



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
            param.controls[0].setMin(value.min, value.displayMin);
            param.controls[0].setMax(value.max, value.displayMax);
        }
            
        param.setValue(value.value, true, true, false);
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
            const nextActive   = getActiveAfterNode(this);
            const beforeActive = nextActive && nextActive.follows(this);

            const options =
                  ((this.active     ? 1 : 0) << 0)
                | ((beforeActive    ? 1 : 0) << 1)
                | ((this.enabled    ? 1 : 0) << 2)
                | ((this.isCached() ? 1 : 0) << 3)
                | nodeOptions;

            request.push(options);
        }


        return [request, ignore];
    }



    setTransform(nodeLeft, nodeTop, nodeRect)
    {
        this.div.style.transform =
              'translate(' 
            + (graph.currentPage.pan.x * graph.currentPage.zoom) + 'px, '
            + (graph.currentPage.pan.y * graph.currentPage.zoom) + 'px) '
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

        const colInput   = this.active ? rgb_a(rgbaText, 0.4 ) : rgb_a(rgbSaturateHsv(rgbFromType(this.type, true), 0.5), 0.8);
        const colOutput  = this.active ? rgb_a(rgbaText, 0.35) : rgb_a(rgbSaturateHsv(rgbFromType(this.type, true), 0.5), 0.7);
        
        const colWire = rgbFromType(this.type, true);

        
        return {
            back:   rgbaBack, 
            border: rgbaBorder,
            text:   rgbaText,
            input:  colInput,
            output: colOutput,
            wire:   colWire };
    }



    getActiveOffset()
    {
        return 4;
    }



    connectToSelected(selected)
    {
        console.assert(!isEmpty(selected));

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

        if (  !isEmpty(nonDefaultParams) // don't include empty param section
            || this.alwaysSaveParams)
            json += this.paramsToJson(nTab);

        json += '\n' + pos + '}';


        return json;
    }



    toJsonBase(nTab)
    {
        let   pos = ' '.repeat(nTab);
        const tab = HTAB;

        let json =
              pos + tab + '"type": "'    + this.type                                     + '",\n'
            + pos + tab + '"id": "'      + (this.stripIdForJson ? this.nodeId : this.id) + '",\n'
            + pos + tab + '"name": "'    + this.name.replace('"', '\\\"')                + '",\n'
            + pos + tab + '"renamed": "' + boolToString(this.renamed)                    + '",\n'
            + pos + tab + '"enabled": "' + boolToString(this.enabled)                    + '",\n'
            + pos + tab + '"x": "'       + parseFloat(this.div.style.left)               + '",\n'
            + pos + tab + '"y": "'       + parseFloat(this.div.style.top )               + '",\n'
            + pos + tab + '"z": "'       + graph.nodes.indexOf(this)                     + '"';

        if (this.active)
            json += ',\n' + pos + tab + '"active": "' + this.active + '"';

        this.stripIdForCopy = false;

        return json;
    }



    paramsToJson(nTab = 0)
    {
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
        this.id      = _node.id;
        this.name    = _node.name;
    
        if (_node.renamed != undefined)
            this.renamed = parseBool(_node.renamed);

        if (_node.enabled)
            this.enabled = parseBool(_node.enabled);
    
        if (   _node.params
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
                this.createAndAddParamByType(_param[0], _param[1], false, false, true);
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
        terminals:   terminals,
        scope:       paramNode ? [{nodeId: paramNode.id, paramId: NULL}] : [],
        passedNodes: [],
        paramNodes:  [],
        markParams:  true
    };    
}



function areConnected(node1, node2)
{
    return node1.isOrFollows(node2)
        || node2.isOrFollows(node1);
}



function onVariableConnectInput(node)
{
    node.addNewInput();
}



function onVariableDisconnectInput(node, input)
{
    removeFromArray(node.inputs, input);
    node.inputControls.removeChild(input.div);
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



function makeNodePath(id)
{
    return graph.currentPage.id + '/' + id;
}