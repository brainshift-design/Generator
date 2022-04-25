/*
    Operators don't have data types, those are inferred from the outputs.

    Outputs and have a toString() method, which creates a string that
    is added to the complete recursive generation request. 
    
    The generator then does the calculation and sends back two kinds of messages:
    node value updates and Figma page updates.

    Value updates can trigger a visual node update. The update info is passed
    in the update message.


    Output.toString(output)
    Parameter.toString()
*/



const connectionSize = 9;
const connectionGap  = 2;



class Operator
{
    graph = null;
    
    
    #type; // used in the code, not for generation
    get type() { return this.#type; }
    
    defShortName;
    

    _id;
    get id() { return this._id; }
    set id(id) { this._id = id; }

    _name;
    get name() { return this._name; }
    set name(name) { this.setName(name); }


    inputs  = [];
    outputs = [];
    params  = [];
    
    
    _variableInputs  = false;

    alwaysLoadParams = false;
    loading          = false;

    defaultWidth;
    labelOffsetFactor;


    _creatingButton  = null; // this is used to place the node under its creating button


    


    // node UI

    div;
    inner;
    header;
    paramBack;
    labelWrapper;
    label;
    inputControls;
    outputControls;


   

    valid; // regeneration flag



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
       
    
    get activeColor()
    {
        switch (this.type)
        {
            case NUMBER:    return rgbNumber; //activeNumberColor;
            case COLOR:     return rgbActiveColor;
            case RECTANGLE: return rgbActiveObject;
        }

        return 'magenta';
    }



    get passiveColor()
    {
        switch (this.type)
        {
            case NUMBER:    return rgbNumber;
            case COLOR:     return rgbColor;
            case RECTANGLE: return rgbObject;
        }

        return 'magenta';
    }



    constructor(type, shortName, defWidth = 80)
    {
        this.#type             = type;
        this._id               = shortName;
        
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
            if (this._variableInputs)
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
 
    

    reset() // for the entire generation run
    {
        for (const input of this.inputs)
        {
            input.currentSeed = input.initialSeed;
            
            if (input.connected)
                input.connectedOutput.node.reset();
        }
    }



    // refresh() // for repeats requests from nodes that duplicate their input, like row and column
    // {
    //     for (const input of this.inputs)
    //     {
    //         if (input.connected)
    //             input.connectedOutput.node.refresh();
    //     }
    // }


    
    invalidate()
    {
        if (!this.valid) // stops a node with inputs from same output 
            return;      // from being invalidated more than once
    
        this.valid = false;


        for (const output of this.outputs)
        {
            output.cache = '';
            
            for (const connInput of output.connectedInputs)
                connInput.node.invalidate();
        }
    }



    pushUpdate()
    {
        //log(this.id + '.Operator.pushUpdate()');

        this.invalidate();

        setTimeout(() => getTerminalsAfterNode(this).forEach(n => n.update()));
    }



    update()
    {
        if (this.valid) return;
        
        log(this.id + '.Operator.update()');
    
        //this.updateParams(false);
        //this.updateData();

        this.valid = true;


        // if (this.active)
        //     uiGenParseRequest(this.toString());

        for (const output of this.outputs)
        {
            console.log('output', output);
            if (output) console.log('output.toString()', output.toString());
            uiGenParseRequest(output.toString());
        }
        

        if (graphView.canUpdateNodes)
            this.updateNode();

        this.loading = false;
    }



    // updateData()
    // {
    //     //log(this.id + '.Operator.updateData()');

    //     this.setParamOutputData();
    // }



    toString() 
    { 
        // create the generator string here

        return '';
    }



    updateNode() 
    {
        //log(this.id + '.Operator.updateNode()');

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
        //log(this.id + '.Operator.updateHeader()');
        
        const height = this.updateHeaderInputsAndOutputs();

        this.header.style.height = height;

        this.paramBack.style.height = this.inner.offsetHeight - height;
        this.paramBack.style.top    = height;


        updateNodeLabelOffset(this);
    }



    updateHeaderInputsAndOutputs()
    {
        // console.log('this.inputs',  this.inputs);
        // console.log('this.outputs', this.outputs);

        const headerInputs  = this.inputs .filter(i => !i.param);
        const headerOutputs = this.outputs.filter(o => !o.param);

        const padding  = this.header.connectionPadding;
            
        const [ inputY,  inputHeight] = getHeaderConnY(headerInputs,  padding, 5);
        const [outputY, outputHeight] = getHeaderConnY(headerOutputs, padding, 2);

             if (inputHeight  > outputHeight) for (let i = 0; i < headerOutputs.length; i++) outputY[i] += (inputHeight  - outputHeight)/2;
        else if (outputHeight > inputHeight ) for (let i = 0; i < headerInputs .length; i++)  inputY[i] += (outputHeight - inputHeight )/2;


        for (let i = 0; i < headerInputs.length; i++) 
        {
            headerInputs[i].control.style.top = inputY[i];
            headerInputs[i].updateControl();
        }

        for (let i = 0; i < headerOutputs.length; i++) 
        {
            headerOutputs[i].control.style.top = outputY[i];
            headerOutputs[i].updateControl();
        }


        return Math.max(inputHeight, outputHeight) 
             + this.header.connectionPadding * 2;
    }



    updateParams(dispatchEvents)
    {
        for (const param of this.params)
            param.update(dispatchEvents);
    }



    setParamOutputData()
    {
        for (const param of this.params)
            param.setOutputData();
    }



    updateParamControls()
    {
        this.params.forEach(p => p.updateControls());
    }



    setName(newName)
    {
        this._name = newName;
        // this.label.innerHTML = this._name;
        // //this.label.innerHTML = this.id;
        
        return true;
    }



    isBefore(node)
    {
        if (!this.outputs.find(o => o.connected))
            return false;

        for (const input of output.connectedInputs)
        {
            if (input.node == node)        return true;
            if (input.node.isBefore(node)) return true;
        }

        return false;
    }



    isAfter(node)
    {
        if (this.inputs.length == 0)
            return false;

        for (const input of inputs)
        {
            if (input.connectedOutput.node == node)       return true;
            if (input.connectedOutput.node.isAfter(node)) return true;
        }

        return false;
    }

    

    updateConnectedInputValueText() {}



    setSelected(sel)
    {
        this._selected = sel;

        this.div.style.boxShadow = 
            this._selected
            ? '0 0 0 2px ' + colorStyleRgb(rgbActiveObject)
            : 'none';
    }
    


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



    paramIsConsideredDefault(param)
    {
        return param.isDefault()
            && (   !param.input 
                || !param.input.connected);
    }



    toJson(nTab = 0) 
    {
        let   pos = ' '.repeat(nTab);
        const tab = '  ';
        
        let json = 
              pos + '{\n'
            + this.toJsonBase(nTab);

        if (this.params.filter(p => !this.paramIsConsideredDefault(p)).length > 0)
        {
            // json +=
            //     ',\n'
            //     + pos + tab + '"params":\n'
            //     + pos + tab + '[\n';

            json += this.paramsToJson(nTab);

            // json += 
            //     pos + tab + ']';
        }

        json += '\n' + pos + '}';

        return json;
    }



    toJsonBase(nTab)
    {
        let   pos = ' '.repeat(nTab);
        const tab = '  ';

        let json =
              pos + tab + '"type": "'        + this.type            + '",\n'
            + pos + tab + '"id": "'          + this.id                + '",\n'
            + pos + tab + '"name": "'        + this.name              + '",\n'
            + pos + tab + '"x": "'           + this.div.style.left    + '",\n'
            + pos + tab + '"y": "'           + this.div.style.top     + '",\n'
            + pos + tab + '"labelOffset": "' + this.labelOffsetFactor + '"';

        return json;
    }



    paramsToJson(nTab = 0)
    {
        let   pos = ' '.repeat(nTab);
        const tab = '  ';

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
                {
                    this.params[index].setDecimalsFrom(_param[1]);
                    this.params[index].setValue(parseFloat(_param[1]), true, true, false);
                }
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