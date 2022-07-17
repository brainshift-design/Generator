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
    get name() { return this._name; }
    set name(name) { this.setName(name); }


    inputs  = [];
    outputs = [];
    params  = [];
    
    
    variableInputs  = false;

    alwaysLoadParams = false;

    defaultWidth;
    labelOffsetFactor;


    _creatingButton  = null; // this is used to place the node under its creating button

    scrollName = true;

    
    // node UI

    div;
    inner;
    header;
    paramBack;
    labelWrapper;
    label;
    textbox;
    inputControls;
    outputControls;



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
       
    
    // get activeColor()
    // {
    //     switch (this.type)
    //     {
    //         case NUMBER:    return rgbNumber; //activeNumberColor;
    //         case COLOR:     return rgbActiveColor;
    //         case RECTANGLE: return rgbActiveObject;
    //     }

    //     return 'magenta';
    // }



    // get passiveColor()
    // {
    //     switch (this.type)
    //     {
    //         case NUMBER:    return rgbNumber;
    //         case COLOR:     return rgbColor;
    //         case RECTANGLE: return rgbObject;
    //     }

    //     return 'magenta';
    // }



    get headerConnected()
    {
        const inputs = this.inputs.filter(i => 
              !i.param 
            && i.connected);
            
        return inputs.length > 0;
    }



    constructor(type, shortName, defWidth = 80)
    {
        this.#type             = type;
        this.id                = shortName;
        
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
        this.inputControls.appendChild(input.control);
    }



    getAutoInput(outType)
    {
        const inputs = this.inputs.filter(i => i.types.includes(outType));

        
        if (graphView.overInput)
            return graphView.overInput;

        if (   graphView.savedConn
            && graphView.savedConn.input
            && graphView.savedConn.input.node == this)
            return graphView.savedConn.input;
        
        else if (!graphView.tempConn.output.node.follows(this))
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
        this.outputControls.appendChild(output.control);
    }



    getAutoOutput(inputTypes)
    {
        const outputs = this.outputs.filter(o => inputTypes.includes(o.type));

        return     outputs.length == 1
               && !this.follows(graphView.tempConn.input.node)
               ? outputs[0]
               : null;
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

        param.control.style.display = 'inline-block';
        param.control.style.width   = '100%';


        this.inner.appendChild(param.div);
    }
 
    

    setSelected(sel)
    {
        this._selected = sel;

        this.div.style.boxShadow = 
            this._selected
            ? '0 0 0 2px ' + colorStyleRgb(rgbActiveObject) //colFigmaBlue
            : 'none';
    }
    


    makeActive()
    {
        this._active = true;

        if (!graphView.activeNodes.includes(this))
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
        // this.label.innerHTML = this._name;
        // //this.label.innerHTML = this.id;
        
        return true;
    }



    // isBefore(node)
    // {
    //     if (!this.outputs.find(o => o.connected))
    //         return false;

    //     for (const input of output.connectedInputs)
    //     {
    //         if (input.node == node)        return true;
    //         if (input.node.isBefore(node)) return true;
    //     }

    //     return false;
    // }



    // isAfter(node)
    // {
    //     if (this.inputs.length == 0)
    //         return false;

    //     for (const input of inputs)
    //     {
    //         if (input.connectedOutput.node == node)       return true;
    //         if (input.connectedOutput.node.isAfter(node)) return true;
    //     }

    //     return false;
    // }

    

    follows(node)
    {
        if (this == node)
            return true;
            
        for (const input of this.inputs)
        {
            if (   input.connected
                && input.connectedOutput.node.follows(node))
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

        this.valid = false;

        for (const output of this.outputs)
        {
            output.cache = [];
            
            for (const input of output.connectedInputs)
                input.node.invalidate();
        }
    }



    toString() 
    { 
        // create the generator string here

        return '';
    }



    getRequestStart()
    {
        const req = [
            this.type, 
            this.id];

        if (this.active) 
            req.push(ACTIVE);

        return req;
    }



    updateNode() 
    {
        //console.log(this.id + '.Operator.updateNode()');

        this.updateBorder();
        this.updateHeader();
        this.updateParamControls();

        graphView.updateNodeTransform(this);
    }



    updateBorder()
    {
        // this.inner.style.boxShadow = 
        //       '0 0 0 1px ' 
        //     + (this.div.over ? colorStyleRgb(rgbActiveObject) : '#0001');
    }



    updateHeader()
    {
        //console.log(this.id + '.Operator.updateHeader()');
        
        const height = this.updateHeaderInputsAndOutputs();

        this.header   .style.height = height;

        this.paramBack.style.height = this.inner.offsetHeight - height;
        this.paramBack.style.top    = height;

        this.updateHeaderLabel();
    }



    updateHeaderLabel()
    {
        this.label.innerHTML = 
            settings.showNodeId 
            ? this.id 
            : this.name;
        
        const [,,,,, textStyle] = this.getHeaderColors();
        this.label.style.color  = textStyle;

        this.label.style.left = '50%';
        this.label.style.top  = '50%';

        updateHeaderLabelOffset(this);
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
            inputs[i].control.style.top = inputY[i];
            inputs[i].updateControl();
        }

        for (let i = 0; i < outputs.length; i++) 
        {
            outputs[i].control.style.top = outputY[i];
            outputs[i].updateControl();
        }


        return Math.max(inputHeight, outputHeight) 
             + this.header.connectionPadding * 2;
    }



    getHeaderColors()
    {
        const colBack   = rgbFromType(this.type, this.active);
        const darkText  = rgb2hclokl(colBack)[2] > 0.71;

        const colText   = darkText ? [0, 0, 0, 1] : [1, 1, 1, 1];
        const textStyle = colorStyleRgba(colText);

        const colInput  = colText;
        const colOutput = colText;
        
        return [
            colBack, 
            darkText,
            colInput,
            colOutput, 
            colText,
            textStyle ];
    }



    updateParams(dispatchEvents)
    {
        for (const param of this.params)
            param.update(dispatchEvents);
    }



    updateValues(updateParamId, paramIds, values) // virtual
    {
        for (let i = 0; i < paramIds.length; i++)
        {
            if (paramIds[i] != updateParamId)
                this.params.find(p => p.id == paramIds[i])
                    .setValue(values[i], false, true, false);
        }
    }



    // updateOutputCache(index, cache)
    // {
    //     this.outputs[index].cache = cache;
    // }



    setParamOutputData()
    {
        for (const param of this.params)
            param.setOutputData();
    }



    updateParamControls()
    {
        this.params.forEach(p => p.updateControls());
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
              pos + tab + '"type": "'        + this.type                      + '",\n'
            + pos + tab + '"id": "'          + this.id                        + '",\n'
            + pos + tab + '"name": "'        + this.name.replace('"', '\\\"') + '",\n'
            + pos + tab + '"x": "'           + this.div.style.left            + '",\n'
            + pos + tab + '"y": "'           + this.div.style.top             + '"';//,\n'
            //+ pos + tab + '"labelOffset": "' + this.labelOffsetFactor + '"';

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
            if (   !param.isDefault()
                && (   !param.input
                    || !param.input.connected))
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



    loadParams(_node)
    {
        if (_node.params)
        {
            for (const _param of _node.params)
            {
                const index = this.params.findIndex(p => p.id == _param[0]);
                
                if (index >= 0) 
                    this.params[index].setValue(parseGNumberValue(_param[1]), true, true, false);
            }
        }
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
    //console.log('pushUpdate()', nodes);
    
    pushUpdateFromParam(nodes, null);
}



function pushUpdateFromParam(nodes, param)
{
    //console.log((param ? param.node.id + '.': '') + 'pushUpdateFromParam('+(param ? param.id : 'null')+')');

    // each type is followed first by the node ID, then the params

    const request = 
        param
        ? [param.node.id, param.id]
        : ['', ''];


    const gen = createGenObject(param ? param.node : null);

        
    nodes.forEach(n => n.invalidate());

        
    const terminals = [];
    
    nodes.forEach(n => pushUnique(
        terminals, 
        getTerminalsAfterNode(n)));



    terminals.forEach(n => 
        n.outputs
            .filter(o => !o.param)
            .forEach(o =>
            {
                const _r = o.genRequest(gen);
                const r = [..._r];
                request.push(...r);
            })); 


    gen.markParams = false;
    gen.paramNodes
        .filter(n => !terminals.includes(n))
        .forEach(n => 
            n.outputs
                .filter(o => !o.param)
                .forEach(o =>
                    request.push(...o.genRequest(gen)))); 


    // if (    param
    //     && !gen.passedNodes.includes(param.node)
    //     && !gen.paramNodes .includes(param.node))
    //         param.node.outputs
    //             .filter(o => !o.param)
    //             .forEach(o =>
    //                 request.push(...o.genRequest(gen))); 

        
    uiQueueMessageToGenerator({
        cmd:     'genRequest',
        request:  request,
        settings: settings
    });
}



function createGenObject(paramNode)
{
    return {
        scope:       paramNode ? [{nodeId: paramNode.id, paramId: ''}] : [], // [{nodeId, paramId}]
        passedNodes: [],
        paramNodes:  [],
        markParams:  true
    };    
}



function areConnected(node1, node2)
{
    return node1.follows(node2)
        || node2.follows(node1);
}