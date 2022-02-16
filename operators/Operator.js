const connectionSize = 9;
const connectionGap  = 2;



class Operator
{
    #opType;
    get opType() { return this.#opType; }
    
    _dataType;
    get dataType() { return this._dataType; }

    _id;
    get id() { return this._id; }
    set id(id) { this._id = id; }

    _name;
    get name() { return this._name; }
    set name(name) { this.setName(name); }

    shortTypeName;
    defaultWidth;


    graph = null;
    
    
    inputs  = [];
    outputs = [];
    params  = [];
    
    
    _variableInputs  = false;

    alwaysLoadParams = false;
    loading          = false;

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


    dragParam;
    

    valid; // this is the flag for regeneration



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
        switch (this._dataType)
        {
            case 'number': return rgbNumber; //activeNumberColor;
            case 'color':  return rgbActiveColor;
            case 'object': return rgbActiveObject;
        }

        return 'magenta';
    }



    get passiveColor()
    {
        switch (this._dataType)
        {
            case 'number': return rgbNumber;
            case 'color':  return rgbColor;
            case 'object': return rgbObject;
        }

        return 'magenta';
    }



    constructor(opType, shortType, dataType, defWidth = 80)
    {
        this.#opType           = opType;   // this is the operator type
        this._dataType         = dataType; // this is the op's main data type
           
        this.shortTypeName     = shortType;
        this._id               = shortType;

        this.valid             = false;

        this.defaultWidth      = defWidth;
        
        this.labelOffsetFactor = 0;

        createOperatorNode(this);

        this.setName(shortType);
    }    



    addInput(input)
    {
        input._op = this;
        this.inputs.push(input);
        this.inputControls.appendChild(input.control);
    }



    getAutoInput(dataType)
    {
        const inputs = this.inputs.filter(i => i.dataType == dataType);

        
        if (graphView.overInput)
            return graphView.overInput;

        if (   graphView.savedConn
            && graphView.savedConn.input
            && graphView.savedConn.input.op == this)
            return graphView.savedConn.input;
        
        else if (!graphView.tempConn.output.op.follows(this))
        {
            if (this._variableInputs)
                return lastOf(inputs);

            else
            {
                for (const input of inputs)
                {
                    if (!input.isConnected)
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
        output._op = this;
        this.outputs.push(output);
        this.outputControls.appendChild(output.control);
    }



    getAutoOutput(dataType)
    {
        const outputs = this.outputs.filter(o => o.dataType == dataType);

        return     outputs.length == 1
               && !this.follows(graphView.tempConn.input.op)
               ? outputs[0]
               : null;
    }



    addParam(param)
    {
        this.params.push(param);
        
        param._op = this;

        if (param.input)
        {
            param.input._op = this;
            this.inputs.push(param.input);
        }

        if (param.output)
        {
            param.output._op = this;
            this.outputs.push(param.output);
        }

        param.control.style.display = 'inline-block';
        param.control.style.width   = '100%';
        
''
        this.inner.appendChild(param.div);
    }
 
    

    reset() // for the entire generation run
    {
        for (const input of this.inputs)
        {
            input.currentSeed = input.initialSeed;
            
            if (input.isConnected)
                input.connectedOutput.op.reset();
        }
    }



    // refresh() // for repeats requests from nodes that duplicate their input, like row and column
    // {
    //     for (const input of this.inputs)
    //     {
    //         if (input.isConnected)
    //             input.connectedOutput.op.refresh();
    //     }
    // }


    
    invalidate()
    {
        if (!this.valid) // stops an op with inputs from same output 
            return;      // from being invalidated more than once
    
        this.valid = false;


        for (const output of this.outputs)
            for (const connInput of output.connectedInputs)
                connInput.op.invalidate();
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
        
        //log(this.id + '.Operator.update()');
    
        this.updateParams(false);
        this.updateData();

        this.valid = true;

        if (graphView.canUpdateNodes)
            this.updateNode();

        this.loading = false;
    }



    updateData()
    {
        //log(this.id + '.Operator.updateData()');

        this.setParamOutputData();
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


        updateNodeLabel(this);
    }



    updateHeaderInputsAndOutputs()
    {
        const headerInputs  = this.inputs .filter(i => !i.param);
        const headerOutputs = this.outputs.filter(o => !o.param);

        const padding  = this.header.connectionPadding;
            
        const [ inputY,  inputHeight] = getHeaderConnY(headerInputs,  padding, 5);
        const [outputY, outputHeight] = getHeaderConnY(headerOutputs, padding, 2);

             if (inputHeight  > outputHeight) for (let i = 0; i < headerOutputs.length; i++) outputY[i] += (inputHeight  - outputHeight)/2;
        else if (outputHeight > inputHeight ) for (let i = 0; i < headerInputs .length; i++)  inputY[i] += (outputHeight - inputHeight )/2;


        for (let i = 0; i < headerInputs .length; i++) 
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
        this.label.innerHTML = this._name;
        //this.label.innerHTML = this.id;

        return true;
    }



    isBefore(node)
    {
        if (!this.outputs.find(o => o.isConnected))
            return false;

        for (const input of output.connectedInputs)
        {
            if (input.op == node)        return true;
            if (input.op.isBefore(node)) return true;
        }

        return false;
    }



    isAfter(node)
    {
        if (this.inputs.length == 0)
            return false;

        for (const input of inputs)
        {
            if (input.connectedOutput.op == node)       return true;
            if (input.connectedOutput.op.isAfter(node)) return true;
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
    


    makeActive() // only true
    {
        this.makeLeftPassive();
        this.makeRightPassive();        

        this._active = true;
        uiSetActive(this, true);

        //this.header.style.backgroundColor = this.activeColor;
        //this.header.style.boxShadow       = 'none';
        //this.label .style.color           = this.dataType == 'object' ? 'white' : 'black';
        
        // if (this.dataType == 'object')
        //     uiGenerateObjects([this.id]);
    }
        
    

    makeLeftPassive()
    {
        for (const input of this.inputs)
        {
            if (input.isConnected)
            {
                input.connectedOutput.op.makePassive();
                input.connectedOutput.op.makeLeftPassive();            
            }
        }
    }
    


    makeRightPassive()
    {
        for (const output of this.outputs)
        {
            for (const connInput of output.connectedInputs)
            {
                connInput.op.makePassive();
                connInput.op.makeRightPassive();            
            }
        }
    }
    


    makePassive()
    {
        if (this.active)
        {
            // this.header.style.backgroundColor = this.passiveColor;
            // this.header.style.boxShadow       = '0 0 0 1px #0001 inset';
            // this.label .style.color           = 'black';

            uiDeleteNodeObjects([this.id]);
        }

        this._active = false;
        uiSetActive(this, false);
    }



    follows(node)
    {
        for (const input of this.inputs)
        {
            if (input.op == node)
                return true;
                
            else if (input.isConnected
                  && input.connectedOutput.op.follows(node))
                return true;
        }

        return false;
    }



    paramIsConsideredDefault(param)
    {
        return param.isDefault()
            && (   !param.input 
                || !param.input.isConnected);
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
            json +=
                ',\n'
                + pos + tab + '"params":\n'
                + pos + tab + '[\n';

            json += this.paramsToJson(nTab);

            json += 
                pos + tab + ']';
        }

        json += '\n' + pos + '}';

        return json;
    }



    toJsonBase(nTab)
    {
        let   pos = ' '.repeat(nTab);
        const tab = '  ';

        let json =
              pos + tab + '"type": "'        + this.opType            + '",\n'
            + pos + tab + '"id": "'          + this.id                + '",\n'
            + pos + tab + '"name": "'        + this.name              + '",\n'
            + pos + tab + '"x": "'           + this.div.style.left    + '",\n'
            + pos + tab + '"y": "'           + this.div.style.top     + '",\n'
            + pos + tab + '"labelOffset": "' + this.labelOffsetFactor + '"';

        return json;
    }



    paramsToJson(nTab)
    {
        let pos = ' '.repeat(nTab);

        let json = '';

        let first = true;
        for (const param of this.params)
        {
            if (   !param.isDefault()
                && (   !param.input
                    || !param.input.isConnected))
            {
                if (!first) json += ',\n'; first = false;
                json += pos + param.toJson(nTab);
            }
        }

        if (!first)
            json += '\n';

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
                    this.params[index].setValue(parseFloat(_param[1]), true, true, false);
                    //this.params[index].setDecimalsFrom(_param[1]);
                }
            }
        }
    }



    toString() 
    { 
        // create the definition string here

        /*

            A definition string is only to calculate graph results.

            [ ] = optional
            ... = list

            The general format is

                opType [params...] [inputs...]


            #               # of following values
            N               number value
            C               color value


            OpNumber        number [N]

            OpArithmetic    add [onlySymbol] # N...

            OpColor         color [color C] [space N] [c1 N] [c2 N] [c3 N]

            OpWebContrast   webcontrast [wcag N] [1:C] [2:C]

        */
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