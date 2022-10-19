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

    
    inputs        = [];
    outputs       = [];

    params        = [];
    hiddenParams  = [];

    
    variableInputs       = false;

    alwaysLoadParams     = false;

    scrollName           = true;


    defaultWidth;
    labelOffsetFactor;


    _creatingButton  = null; // this is used to place the node under its creating button

    
    requestCache = []; // for nodes without an output


    // node UI

    div;
    inner;
    header;

    divDisabled;
    
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
       
    
    get headerConnected()
    {
        const inputs = this.inputs.filter(i => 
              !i.param 
            && i.connected);
            
        return inputs.length > 0;
    }



    constructor(type, shortName, defWidth = 100)
    {
        this.#type             = type;
        this.id                = shortName;
        
        this.enabled           = true;

        this.defShortName      = shortName;
        this.defaultWidth      = defWidth;
        this.labelOffsetFactor = 0;
        
        this.valid             = false;

        createOperatorNode(this);

        this.setName(shortName);
    }    



    addInput(input)
    {
        input._node = this;
        this.inputs.push(input);
        this.inputControls.appendChild(input.div);
    }



    getAutoInput(outTypes)
    {
        const inputs = this.inputs.filter(i => i.types.find(_i => outTypes.includes(_i)));

        
        if (graphView.overInput)
            return graphView.overInput;

        if (   graphView.savedConn
            && graphView.savedConn.input
            && graphView.savedConn.input.node == this)
            return graphView.savedConn.input;
        
        else if (!graphView.tempConn.output.node.isOrFollows(this))
        {
            if (this.variableInputs)
                return lastOf(inputs);

            else
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



    addOutput(output)
    {
        output._node = this;
        this.outputs.push(output);
        this.outputControls.appendChild(output.div);
    }



    getAutoOutput(inputTypes)
    {
        const outputs = this.outputs.filter(o => inputTypes.includes(o.type));

        return     outputs.length == 1
               && !this.isOrFollows(graphView.tempConn.input.node)
               ? outputs[0]
               : null;
    }



    addBaseParams()
    {

    }



    addParam(param)
    {
        this.params.push(param);
        
        param._node = this;

        if (param.input)
        {
            param.input._node = this;
            this.inputs.push(param.input);
        }

        if (param.output)
        {
            param.output._node = this;
            this.outputs.push(param.output);
        }

        this.inner.appendChild(param.div);
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



    follows(node) 
    { 
        return this.isOrFollows(node, true); 
    }



    isOrFollows(node, ignoreIs = false)
    {
        if (    this == node
            && !ignoreIs)
            return true;
            
        for (const input of this.inputs)
        {
            if (   input.connected
                && input.connectedOutput.node.isOrFollows(node))
                return true;
        }

        return false;
    }



    paramIsConsideredDefault(param) // this has to be an op virtual method, not a param method
    {
        return param.isDefault()
            && (   !param.input 
                || !param.input.connected);
    }



    canAutoConnectFrom(node)
    {
        return false;
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
            values.push([param.id, param.value]);

        return values;
    }



    genRequest(gen)
    {
        // this function exists because a node without outputs
        // should still be able to generate a request
        
        return [];
    }



    genRequestStart(gen)
    {
        const request = [
            this.type, 
            this.id];


        const ignore = gen.passedNodes.includes(this);

        if (!ignore)
        {
            const nextActive   = getActiveNodeRightInTreeFromNode(this);
            const beforeActive = nextActive && nextActive.follows(this);

            const options =
                  ((this.active  ? 1 : 0) << 0)
                | ((beforeActive ? 1 : 0) << 1)
                | ((this.enabled ? 1 : 0) << 2);

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

        graphView.updateNodeTransform(this);
    }



    updateBorder()
    {
        // this.inner.style.boxShadow = 
        //       '0 0 0 1px ' 
        //     + (this.div.over ? 'var(--figma-color-bg-brand)' : '#0001');
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
        this.params.forEach(p => p.updateControls());
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


        const colors          = Operator.prototype.getHeaderColors.call(this);

        
        let fontSize = 11;

        // compensate for bold active header names look THINNER when zoomed out
             if (graphView.zoom < 0.5 ) fontSize = 17;
        else if (graphView.zoom < 0.75) fontSize = 15;
        else if (graphView.zoom < 1   ) fontSize = 13;
        else if (graphView.zoom < 1.5 ) fontSize = 12;

        this.label.style.color      = rgba2style(colors.text);
        this.label.style.fontSize   = this.active ? fontSize : 11;
        this.label.style.height     = this.active ? fontSize * 14 / 11 : 14;
        this.label.style.fontWeight = this.active ? (graphView.zoom < 1.5 ? '900' : 'bold') : 'normal';
    }



    updateHeaderInputsAndOutputs()
    {
        // console.log('this.inputs',  this.inputs);
        // console.log('this.outputs', this.outputs);

        const inputs          = this.inputs .filter(i => !i.param);
        const connectedInputs = this.inputs .filter(i => !i.param && i.connected);
        const outputs         = this.outputs.filter(o => !o.param);

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
        //logFunction('Operator.updateValues()');

        for (let i = 0, paramIndex; i < paramIds.length; i++)
        {
            if (    paramIds[i] != updateParamId
                && (paramIndex = this.params.findIndex(p => p.id == paramIds[i])) > -1)
                this.params[paramIndex].setValue(values[i], false, true, false);
        }
    }



    getHeaderColors()
    {
        const rgbaBack  = rgb_a(rgbHeaderFromType(this.type, this.active), 0.95);
        const rgbaText  = isDark(rgbaBack) ? [1, 1, 1, 1] : [0, 0, 0, 1]; 

        const colInput  = this.active ? rgb_a(rgbaText, 0.4)  : rgb_a(rgbSaturateHsv(rgbHeaderFromType(this.type, true), 0.5), 0.8);
        const colOutput = this.active ? rgb_a(rgbaText, 0.35) : rgb_a(rgbSaturateHsv(rgbHeaderFromType(this.type, true), 0.5), 0.7);
        const colWire   = rgbHeaderFromType(this.type, true);

        return {
            back:   rgbaBack, 
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
        const tab = TAB;
        

        let json = 
              pos + '{\n'
            + this.toJsonBase(nTab);

        if (this.params.filter(p => !this.paramIsConsideredDefault(p)).length > 0)
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
            if (!param.isDefault())
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
        this.id      = _node.id;
        this.name    = _node.name;

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
            const index = this.params.findIndex(p => p.id == _param[0]);

            if (index >= 0)
                this.params[index].loadParam(_param[1]);
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



function pushUpdate(nodes)
{
    pushUpdateFromParam(nodes, null);
}



function pushUpdateFromParam(nodes, param)
{
    //console.log('pushUpdateFromParam('+param+')', nodes);

    
    const set =
          ((settings.includeLxxColorSpaces ? 1 : 0) << 0)
        | ((settings.logRequests           ? 1 : 0) << 1);


    const request = [set.toString()];


    if (param) request.push(param.node.id, param.id);
    else       request.push(NULL, NULL);


    const gen = createGenObject(param ? param.node : null);

        
    nodes.forEach(n => n.invalidate());

        
    const terminals = [];
    
    nodes.forEach(n => pushUnique(
        terminals, 
        getTerminalsAfterNode(n)));


    for (const node of terminals)
    {
        if (!gen.passedNodes.includes(node))
        {
            request.push(...getNodeRequest(node, gen));
            pushUnique(gen.passedNodes, node);
        }
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
        &&  lastOf(gen.scope).nodeId != input.connectedOutput.node.id
        && !input.connectedOutput.node.valid)
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


    if (node.outputs.filter(o => !o.param).length > 0)
    {
        node.outputs
            .filter(o => !o.param)
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
        scope:       paramNode ? [{nodeId: paramNode.id, paramId: NULL}] : [], // [{nodeId, paramId}]
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