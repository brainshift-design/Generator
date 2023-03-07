/*
    Operators don't have data types, those are inferred from the outputs.

    Outputs and have a toString() method, which creates a string that
    is added to the complete recursive generation request. 
    
    The generator then does the calculation and sends back two kinds of messages:
    node value updates and Figma page updates.

    Value updates can trigger a visual node update. The update info is passed
    in the update message.


    Output.genRequest()
    Parameter.genRequest()
*/


const connectionSize = 9;
const connectionGap  = 2;



class Operator
{
    subscription = false;


    graph  = null;
    
    
    #type; // used in the code, not for generation
    get type() { return this.#type; }
    
    defShortName;
    

    id;

    _name;
    get name()     { return this._name; }
    set name(name) { this.setName(name); }


    enabled;
    cached;
    inert; // doesn't eval inputs if values exist
    slow;  // takes a while to finish operation, shows a progress bar

    
    inputs           = [];
    outputs          = [];
  
    params           = [];
    hiddenParams     = [];
  
      
    variableInputs   = false;

    alwaysLoadParams = false;
    alwaysSaveParams = false;

    scrollName       = true;

    showActiveArrow  = false;

    sharpBottomCorners = false;
    

    defaultWidth;
    labelOffsetFactor;


    _creatingButton  = null; // this is used to place the node under its creating button

    
    requestCache = []; // for nodes without an output


    // node UI

    div;
    inner;
    header;

    divDisabled;
    
    progressWrapper = null;
    progressBar     = null;

    hasProgressBar  = false;


    labelWrapper;
    label;
    labelText;
    textbox;
    inputControls;
    outputControls;

    paramBack;
    hiddenParamBack;

    subscribeCover;
    subscribeLabel;


    valid;

    
    measureData = { divBounds: new Rect(0, 0, 0, 0) };



    _selected;
    get selected() { return this._selected; }
    set selected(sel) 
    {
        if (this._selected)
            removeFromArray(this.graph.view.selectedNodes, this);

        this.setSelected(sel);     

        if (this._selected)
            this.graph.view.selectedNodes.push(this);
    }        



    _active = false;
    get active() { return this._active; }
       
    
    get headerConnected() { return !isEmpty(this.headerInputs.filter(i => i.connected)); }

    get headerInputs () { return this.inputs .filter(i => !i.param); }
    get headerOutputs() { return this.outputs.filter(o => !o.param); }

    get connectedHeaderInputs () { return this.inputs .filter(i => !i.param && i.connected); }
    get connectedHeaderOutputs() { return this.outputs.filter(o => !o.param && o.connected); }



    constructor(type, shortName, defWidth = 100, progressBar = false)
    {
        this.#type             = type;
        this.id                = shortName;
        
        this.enabled           = true;
        this.cached            = true;
        this.inert             = false;
        this.slow              = false;

        this.defShortName      = shortName;
        this.defaultWidth      = defWidth;
        this.labelOffsetFactor = 0;
        
        this.valid             = false;

        this.createNode();

        if (progressBar)
            createNodeProgressBar(this);

        this.setName(shortName);
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

        
        const view = this.graph.view;


        if (   view.overInput
            && inputs.includes(view.overInput))
            return view.overInput;


        if (   view.savedConn
            && view.savedConn.input
            && view.savedConn.input.node == this)
            return view.savedConn.input;
        
        else if (!view.tempConn.output.node.isOrFollows(this))
        {
            if (this.variableInputs)
                return lastOf(inputs.filter(i => !i.param));

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
            && !this.isOrFollows(this.graph.view.tempConn.input.node)
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
        this.inner.appendChild(param.div);

        if (param. input) this. inputs.push(param. input);
        if (param.output) this.outputs.push(param.output);

        return param;
    }
 
    

    addParamByType(type, id, showName, hasInput, hasOutput, volatile = false)
    {
             if (NUMBER_TYPES.includes(type)) return this.addParam(new NumberParam(id, id, showName, hasInput, hasOutput), volatile);
        else if ( COLOR_TYPES.includes(type)) return this.addParam(new  ColorParam(id, id, showName, hasInput, hasOutput), volatile);
        else if (  FILL_TYPES.includes(type)) return this.addParam(new   FillParam(id, id, showName, hasInput, hasOutput), volatile);
        else if (STROKE_TYPES.includes(type)) return this.addParam(new StrokeParam(id, id, showName, hasInput, hasOutput), volatile);
        //else if ( COLOR_STYLE_TYPES.includes(type)) return this.addParam(new  StyleParam(id, id, showName, hasInput, hasOutput), volatile);

        else console.assert(false, 'cannot create parameter of type \'' + type + '\'');

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


        this.inner.removeChild(param.div);
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

        const view = this.graph.view;

        if (    view
            &&  view.activeNodes
            && !view.activeNodes.includes(this))
            view.activeNodes.push(this);
    }



    makePassive()
    {
        if (!this._active) 
            return;
            
        if (this.graph.view.activeNodes.includes(this))
            removeFromArray(this.graph.view.activeNodes, this);

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
            param.control.setMin(value.min, value.displayMin);
            param.control.setMax(value.max, value.displayMax);
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
        const view = this.graph.view;

        this.div.style.transform =
              'translate(' 
            + (view.pan.x * view.zoom) + 'px, '
            + (view.pan.y * view.zoom) + 'px) '
            + 'scale(' + view.zoom + ')';

        this.div.style.transformOrigin = 
              ((view.pan.x - nodeLeft) / nodeRect.width  * 100) + '% ' 
            + ((view.pan.y - nodeTop ) / nodeRect.height * 100) + '%';  
    }



    getOffsetRect()
    {
        const view = this.graph.view;

        const ox   = -view.pan.x / view.zoom;
        const oy   = -view.pan.y / view.zoom;

        const rect = boundingRect(this.div);

        return new DOMRect(
            ox + (rect.left / view.zoom),
            oy + (rect.top  / view.zoom), 
            rect.width      / view.zoom, 
            rect.height     / view.zoom);
    }



    getHeaderColors(options = {})
    {
        const rgbaBack = 
            this.inert
            ? rgb_a(rgbDocumentBody, 0.95)
            : rgb_a(rgbHeaderFromType(this.type, this.active), 0.95);

        const rgbaBorder = rgb_a(rgbHeaderFromType(this.type, this.active), 0.95);

        const rgbaText   = isDark(rgbaBack) ? [1, 1, 1, 1] : [0, 0, 0, 1]; 

        const colInput   = this.active ? rgb_a(rgbaText, 0.4 ) : rgb_a(rgbSaturateHsv(rgbHeaderFromType(this.type, true), 0.5), 0.8);
        const colOutput  = this.active ? rgb_a(rgbaText, 0.35) : rgb_a(rgbSaturateHsv(rgbHeaderFromType(this.type, true), 0.5), 0.7);
        const colWire    = rgbHeaderFromType(this.type, true);

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
            actionManager.do(new ConnectAction(this.graph, node.outputs[0], inputs[0]), true);
    }



    updateConnectedInputValueText() {}



    toJson(nTab = 0) 
    {
        let   pos = ' '.repeat(nTab);
       //const tab = TAB;
        

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
        const tab = TAB;

        let json =
              pos + tab + '"type": "'    + this.type                      + '",\n'
            + pos + tab + '"id": "'      + this.id                        + '",\n'
            + pos + tab + '"name": "'    + this.name.replace('"', '\\\"') + '",\n'
            + pos + tab + '"enabled": "' + boolToString(this.enabled)     + '",\n'
            + pos + tab + '"x": "'       + this.div.style.left            + '",\n'
            + pos + tab + '"y": "'       + this.div.style.top             + '",\n'
            + pos + tab + '"z": "'       + this.graph.nodes.indexOf(this) + '"';

        if (this.active)
            json += ',\n' + pos + tab + '"active": "' + this.active + '"';

        return json;
    }



    paramsToJson(nTab = 0)
    {
        let   pos = ' '.repeat(nTab);
        const tab = TAB;


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
        this.id   = _node.id;
        this.name = _node.name;

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
                this.addParamByType(_param[0], _param[1], false, false, true);
                index = this.params.length-1;
            }

            this.params[index].loadParam(_param[2]);
        }
    }



    toString() 
    { 
        // create the generator string here

        return '';
    }
}



function getHeaderConnY(conns, padding, offset)
{
    const y      = [];
    let   height = 0;
    
    for (let i = 0; i < conns.length; i++)
    {
        if (i > 0) height += connectionGap;
        y.push(offset + padding + height);
        height += connectionSize;
    }

    return [y, height];
}



function createGenObject(paramNode)
{
    return {
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
//                 param.control.setMin(value.min);
//                 param.control.setMax(value.max);
//             }
                
//             param.setValue(value.value, true, true, false);
//         }
//     }
// }