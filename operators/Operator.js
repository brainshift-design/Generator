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
    graph = null;
    
    
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

    
    inputs           = [];
    outputs          = [];
  
    params           = [];
    hiddenParams     = [];
  
      
    variableInputs   = false;

    alwaysLoadParams = false;
    alwaysSaveParams = false;

    scrollName       = true;


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
    textbox;
    inputControls;
    outputControls;

    paramBack;
    hiddenParamBack;

    //separator;
    //showAllParams = true;
    

    valid = false;



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
       
    
    get headerConnected() { return this.headerInputs.filter(i => i.connected).length > 0; }

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

        this.defShortName      = shortName;
        this.defaultWidth      = defWidth;
        this.labelOffsetFactor = 0;
        
        this.valid             = false;

        createOperatorNode(this);

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
        const input = new Input(types, getValuesForUndo);

        //input.addEventListener('disconnect', () => uiDeleteObjects([this.id]));

        return input;
    }



    getAutoInput(output)
    {
        const inputs = this.inputs.filter(i => 
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
                return lastOf(inputs.filter(i => !i.param));

            else if (inputs.length > 0)
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
        const outputs = this.outputs.filter(o => inputTypes.includes(o.type));

        return  outputs.length == 1
            && !this.isOrFollows(graphView.tempConn.input.node)
            ? outputs[0]
            : null;
    }



    addBaseParams()
    {

    }



    addParam(param)
    {
        param._node = this;

        this.params.push(param);
        this.inner.appendChild(param.div);
        

        if (param.input)
        {
            //param.input._node = this;
            this.inputs.push(param.input);
        }

        if (param.output)
        {
            //param.output._node = this;
            this.outputs.push(param.output);
        }

        return param;
    }
 
    

    addParamByType(type, id, showName, hasInput, hasOutput)
    {
             if (NUMBER_TYPES.includes(type)) return this.addParam(new NumberParam(id, id, showName, hasInput, hasOutput));
        else if ( COLOR_TYPES.includes(type)) return this.addParam(new  ColorParam(id, id, showName, hasInput, hasOutput));
        else if (  FILL_TYPES.includes(type)) return this.addParam(new   FillParam(id, id, showName, hasInput, hasOutput));
        else if (STROKE_TYPES.includes(type)) return this.addParam(new StrokeParam(id, id, showName, hasInput, hasOutput));
        else if ( STYLE_TYPES.includes(type)) return this.addParam(new  StyleParam(id, id, showName, hasInput, hasOutput));

        else console.assert(false, 'cannot create param of type \'' + type + '\'');

        return null;
    }



    removeParam(param)
    {
        removeFromArray(this.params, param);
        this.inner.removeChild(param.div);

        param._node = null;


        if (param.input)
        {
            param.input._node = null;
            removeFromArray(this.inputs, param.input);
        }

        if (param.output)
        {
            param.output._node = null;
            removeFromArray(this.outputs, param.output);
        }
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



    disconnectAllParams()
    {
        for (let i = this.params.length-1; i >= 0; i--)
        {
            const param = this.params[i];

            if (param.input && param.input.connected)
                uiDisconnect(param.input);

            if (param.output)
            {
                for (const input of param.output.connectedInputs)
                    uiDisconnect(input);
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

        this.div.style.boxShadow = 
            this._selected
            ? '0 0 0 2px var(--figma-color-bg-brand)'
            : 'none';

        if (deleteConnectionsDialogVisible)
            hideDeleteConnectionsDialog();
    }
    


    makeActive()
    {
        //console.log(this.id + '.makeActive()');
        
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



    setName(newName)
    {
        this._name = newName;
        return true;
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
        return this.isConnectedUncached()
            && this.hasMultipliedOutputs();
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
        //if (!this.valid) // stops a node with inputs from same output
        //    return;      // from being invalidated more than once
    
        //console.log(this.id + '.Operator.invalidate()');

        this.valid        = false;
        this.requestCache = [];

        for (const output of this.outputs)
        {
            output.cache = [];
            
            for (const input of output.connectedInputs)
                input.node.invalidate();
        }
    }



    input_getValuesForUndo()
    {
        const values = []; 

        for (const param of this.node.params)
            values.push(param.getValueForUndo());

        return values;
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
            this.id];


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



    updateNode() 
    {
        //console.log(this.id + '.Operator.updateNode()');

        this.      paramBack.style.backgroundColor = isDarkMode() ? '#363636' : 'white';
        this.hiddenParamBack.style.backgroundColor = isDarkMode() ? '#363636' : 'white';

        this.updateBorder();
        this.updateHeader();
        this.updateParams();
        this.updateDisabled();


        if (this.params.length > 0)
        {
            this.div   .style.borderBottomLeftRadius  = '0px';        
            this.inner .style.borderBottomLeftRadius  = '0px';        
            this.header.style.borderBottomLeftRadius  = '0px';        

            this.div   .style.borderBottomRightRadius = '0px';        
            this.inner .style.borderBottomRightRadius = '0px';        
            this.header.style.borderBottomRightRadius = '0px';        
        }
        else
        {
            this.div   .style.borderRadius = '4px';        
            this.inner .style.borderRadius = '4px';        
            this.header.style.borderRadius = '4px';        
        }


        graphView.updateNodeTransform(this);
    }



    updateBorder()
    {
        const colors = this.getHeaderColors();
        
        this.header.style.boxShadow = 
            this.inert
            ? '0 0 0 1px ' + rgba2style(colors.border) + ' inset'
            : 'none';
    }



    updateHeader()
    {
        //console.log(this.id + '.Operator.updateHeader()');
        
        const height = this.updateHeaderInputsAndOutputs();

        this.header.style.height = height;
        this.updateParamBack(height);

        this.updateHeaderLabel();
    }



    updateParams()
    {
        for (const param of this.params)
        {
            param.enableControlText(true);
            param.updateControls();
        }
    }



    updateDisabled()
    {
        //this.inner      .style.opacity = this.enabled ? '100%' : '10%';
        this.divDisabled.style.display   = this.enabled ? 'none' : 'inline-block';

        this.divDisabled.style.zIndex    = 1000;
        this.divDisabled.style.height    = Math.min(this.div.offsetWidth, this.div.offsetHeight) + 70;
        this.divDisabled.style.left      = (this.div.offsetWidth  - this.divDisabled.offsetWidth ) / 2;
        this.divDisabled.style.top       = (this.div.offsetHeight - this.divDisabled.offsetHeight) / 2;
        this.divDisabled.style.transform = 'rotate(45deg)';
    }



    updateParamBack(headerHeight)
    {
        this.      paramBack.style.height =
        this.hiddenParamBack.style.height = this.inner.offsetHeight - headerHeight;

        this.      paramBack.style.top    =
        this.hiddenParamBack.style.top    = headerHeight;
    }



    updateHeaderLabel()
    {
        this.label.innerHTML = 
            settings.showNodeId 
            ? this.id 
            : this.name;
        
        this.label.style.left = '50%';
        this.label.style.top  = '50%';

        updateHeaderLabelOffset(this);


        const colors = this.getHeaderColors();//          = Operator.prototype.getHeaderColors.call(this);

        
        let fontSize = 11;

        // compensate for bold active header names look THINNER when zoomed out
             if (graphView.zoom < 0.5 ) fontSize = 17;
        else if (graphView.zoom < 0.75) fontSize = 15;
        else if (graphView.zoom < 1   ) fontSize = 13;
        else if (graphView.zoom < 1.5 ) fontSize = 12;

        this.label.style.color      = rgba2style(colors.text);
        this.label.style.fontSize   = this.active ? fontSize : 11;
        this.label.style.height     = this.active ? fontSize * 14 / 11 : 14;

        this.label.style.fontWeight = 
            this.active 
            ? (graphView.zoom < 1.2 ? '900' : 'bold') 
            : (graphView.zoom < 1.2 ? '600' : 'normal');
    }



    updateHeaderInputsAndOutputs()
    {
        // console.log('this.inputs',  this.inputs);
        // console.log('this.outputs', this.outputs);

        const inputs          = this.headerInputs;

        const connectedInputs = inputs.filter(i => i.connected);
        const outputs         = this.headerOutputs;

        const padding         = this.header.connectionPadding;
            
        const [ inputY,          inputHeight] = getHeaderConnY(inputs,          padding, 5);
        const [       , connectedInputHeight] = getHeaderConnY(connectedInputs, padding, 5);
        const [outputY,         outputHeight] = getHeaderConnY(outputs,         padding, 2);

             if (connectedInputHeight > outputHeight) for (let i = 0; i < outputs.length; i++) outputY[i] += (connectedInputHeight - outputHeight)/2;
        else if (        outputHeight > inputHeight ) for (let i = 0; i < inputs .length; i++)  inputY[i] += (outputHeight - inputHeight )/2;


        for (let i = 0; i < inputs.length; i++)
        {
            inputs[i].div.style.top = inputY[i];
            inputs[i].updateControl();
        }

        for (let i = 0; i < outputs.length; i++) 
        {
            outputs[i].div.style.top = outputY[i];
            outputs[i].updateControl();
        }


        return Math.max(inputHeight, outputHeight) 
             + this.header.connectionPadding * 2;
    }



    updateValues(updateParamId, paramIds, values) // virtual
    {
        // logFunction(this.id + '.Operator.updateValues()');

        for (let i = 0, paramIndex; i < paramIds.length; i++)
        {
            if (    paramIds[i] != updateParamId
                && (paramIndex = this.params.findIndex(p => p.id == paramIds[i])) > -1)
                this.params[paramIndex].setValue(values[i], false, true, false);
        }
    }



    getHeaderColors()
    {
        const rgbaBack = 
            this.inert
            ? rgb_a(rgbDocumentBody, 0.95)
            : rgb_a(rgbHeaderFromType(this.type, this.active), 0.95);

        const rgbaBorder = rgb_a(rgbHeaderFromType(this.type, this.active), 0.95);

        const rgbaText   = isDark(rgbaBack) ? [1, 1, 1, 1] : [0, 0, 0, 1]; 

        const colInput   = this.active ? rgb_a(rgbaText, 0.4)  : rgb_a(rgbSaturateHsv(rgbHeaderFromType(this.type, true), 0.5), 0.8);
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



    connectToSelected(selected)
    {
        console.assert(selected.length > 0);

        const node   = selected[0];
        const inputs = this.inputs.filter(i => i.types.includes(node.type));
    
        if (   node
            && node.outputs.length > 0
            && inputs.length > 0)
            actionManager.do(new ConnectAction(node.outputs[0], inputs[0]), true);
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

        if (   nonDefaultParams.length > 0 // don't include empty param section
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
        //logFunction('Operator.paramsToJson()');
        
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



    loadFromParsedJson(_node)
    {
        this.id   = _node.id;
        this.name = _node.name;

        if (_node.enabled)
            this.enabled = parseBool(_node.enabled);
    
        if (   _node.params
            || this.alwaysLoadParams)
            this.loadParams(_node);
    }



    loadParams(_node)
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



function pushUpdate(action, nodes)
{
    pushUpdateFromParam(action, nodes, null);
}



function pushUpdateFromParam(action, nodes, param)
{
    // first check if any nodes to the left are uncached
    // and replace in update array as necessary

    for (let i = nodes.length-1; i >= 0; i--)
    {
        const node               = nodes[i];
        const uncachedInputNodes = node.getUncachedInputNodes();
        
        if (uncachedInputNodes.length > 0)
        {
            removeFromArray(nodes, node);

            pushUnique(nodes, uncachedInputNodes);

            for (const uncached of uncachedInputNodes)
                pushUnique(nodes, getTerminalsAfterNode(uncached));

            param = null;
        }
    }

    
    const set =
          ((settings.includeLxxColorSpaces ? 1 : 0) << 0)
        | ((settings.logRequests           ? 1 : 0) << 1);


    const request = 
    [
        action ? action.id : -1,
        set.toString()
    ];


    if (param) request.push(param.node.id, param.id);
    else       request.push(NULL, NULL);


    const gen = createGenObject(param ? param.node : null);


    nodes.forEach(n => n.invalidate());

        
    const terminals = [];
    nodes.forEach(n => pushUnique(terminals, getTerminalsAfterNode(n)));

    const uncachedInputNodes = [];
    terminals.forEach(n => pushUnique(uncachedInputNodes, n.getUncachedInputNodes()));
    uncachedInputNodes.forEach(n => pushUnique(terminals, getTerminalsAfterNode(n)));

    const progressNodes = [];
    nodes.forEach(n => pushUnique(progressNodes, getProgressNodesAfterNode(n)));


    for (const node of terminals)
    {
        if (gen.passedNodes.includes(node))
            continue;

        request.push(...getNodeRequest(node, gen));
        pushUnique(gen.passedNodes, node);
    }


    for (const node of gen.paramNodes)
    {
        if (   !terminals.includes(node)
            && !gen.passedNodes.includes(node))
            request.push(...getNodeRequest(node, gen));
    }


    if (settings.logRawRequests)
        console.log(
            '%c%s%s', 
            'background: #60aa60; color: #cfd', 
            'raw request = ', 
            request.toString());


    uiQueueMessageToGenerator({
        cmd:     'genRequest',
        request:  request
    });
}



function pushInputOrParam(input, gen)
{
    if (    input.connectedOutput.param
        &&  gen.markParams
        &&  lastOf(gen.scope).nodeId != input.connectedOutput.node.id)
    {
        pushUnique(gen.paramNodes, input.connectedOutput.node);

        return[ PARAM,
                input.connectedOutput.types[0],
                input.connectedOutput.node.id,
                input.connectedOutput.param.id ];
    }
    else
        return input.connectedOutput.genRequest(gen);
}



function getNodeRequest(node, gen)
{
    const request = [];


    if (node.headerOutputs.length > 0)
    {
        node.headerOutputs
            .forEach(o =>
            {
                const _r = o.genRequest(gen);
                const  r = [..._r];
                request.push(...r);
            });
    }
    else
        request.push(...node.genRequest(gen));


    return request;
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