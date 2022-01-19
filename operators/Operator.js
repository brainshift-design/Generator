class Operator
{
    #opType;
    get opType() { return this.#opType; }
    
    _dataType;
    get dataType() { return this._dataType; }

    _name;
    get name() { return this._name; }
    set name(name)
    {
        this._name = name;
        this.label.innerHTML = name;
    }

    shortTypeName;
    defaultWidth;

    static nextId = 0;
    id = Operator.nextId++;


    graph = null;
    
    
    inputs  = [];
    outputs = [];
    params  = [];
    

    
    // node UI

    div;
    inner;
    header;
    label;
    inputControls;
    outputControls;



    #valid = false; // this is the flag for regeneration


    set valid(val) { this.#valid = val;  }
    get valid()    { return this.#valid; }
    // {
    //     let valid = this.#valid;
        
    //     for (const input of this.inputs)
    //     {
    //         if (input.isConnected)
    //             valid &= input.connectedOutput.op.valid;
    //     }

    //     return valid;
    // }



    _selected;
    get selected() { return this._selected; }
    set selected(sel) 
    {
        if (this._selected)
            removeFromArray(graphView.selected, this);

        this.setSelected(sel);     

        if (this._selected)
            graphView.selected.push(this);
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



    constructor(opType, shortType, dataType, defWidth = 100)
    {
        this.#opType       = opType;   // this is the operator type
        this._dataType     = dataType; // this is the op's main data type
        
        this.shortTypeName = shortType;
        this._name         = shortType; // this is a temp until the op becomes a graph node
        
        this.defaultWidth  = defWidth;
        
        createNode(this);
    }    



    addInput(input)
    {
        input._op = this;
        this.inputs.push(input);
        this.inputControls.appendChild(input.control);
    }



    addOutput(output)
    {
        output._op = this;
        this.outputs.push(output);
        this.outputControls.appendChild(output.control);
    }



    // addOutput(output)
    // {
    //     if (this.output != null)
    //     {
    //         this.outputControls.removeChild(this.output.control);
    //         this.output._op = null;
    //     }

    //     output._op = this;
    //     this.output = output;
    //     this.outputControls.appendChild(output.control);
    // }



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



    refresh() // for repeats requests from nodes that duplicate their input, like row and column
    {
        for (const input of this.inputs)
        {
            if (input.isConnected)
                input.connectedOutput.op.refresh();
        }
    }


    
    invalidate()
    {
        if (!this.valid) // stops an op with inputs from same output 
            return;      // from being invalidated more than once
    
        this.#valid = false;


        for (const output of this.outputs)
            for (const connInput of output.connectedInputs)
                connInput.op.invalidate();
    }



    pushUpdate()
    {
        this.invalidate();
        
        lastNodesInTreeFrom(this).forEach(n => n.update());
    }



    needsUpdate()
    {
        if (this.valid)
            return false;

        return true;
    }



    update()
    {
        this.setParamOutputData();
        this.updateNode();

        this.#valid = true;
    }



    updateNode() 
    {
        this.updateHeader();


        const headerInputs = this.inputs.filter(i => !i.param);

        const inputSize = 10;
        const padding   =  8;
        const gap       =  4;

            
        let height = padding;


        for (let i = 0; i < headerInputs.length; i++)
        {
            const input = headerInputs[i];
            
            if (i > 0)
                height += gap;

            input.control.style.top       = height;
            input.control.style.transform = 'none';

            height += inputSize;
        }

        height += padding;


        this.header.style.height = height;


        graphView.updateNodeTransform(this);
    }



    updateHeader()
    {
        this.header.style.backgroundColor = colorStyleRgb(rgbFromDataType(this._dataType, false));
    }



    // updateInputWires()
    // {
    //     for (const input of this.inputs)
    //     {
    //         if (input.isConnected)
    //             input.connection.wire.update();
    //     }
    // }



    updateOutputWires()
    {
        for (const output of this.outputs)
        {
            for (const connInput of output.connectedInputs)
                connInput.connection.wire.update();
        }
    }



    // updateParamWires()
    // {
    //     for (const param of this.params)
    //     {
    //         if (   param.input
    //             && param.input.isConnected) 
    //             param.input.connection.wire.update();
    //     }
    // }



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



    generate() 
    { 
        // create the generation object here
    }



    setName(newName)
    {
        if (this.graph.nodes.find(node => node.id == newName))
            return false; // graph already contains a node with this id

        this._name = newName;
        this.label.innerHTML = newName;//this.id + ': ' + newName;

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
        
        if (this.dataType == 'object')
            uiGenerateObjects([this.id]);
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



    save(nTab) 
    {
        let   pos = ' '.repeat(nTab);
        const tab = '  ';
        
        let save = 
              pos + '{\n'
            + pos + tab + '"type":   "' + this.opType         + '",\n'
            + pos + tab + '"name":   "' + this.name           + '",\n'
            + pos + tab + '"node_x": "' + this.div.style.left + '",\n'
            + pos + tab + '"node_y": "' + this.div.style.top  + '"';
        
        for (const param of this.params)
        {
            if (!param.isDefault())
                save += ',\n' + param.save(nTab + 2);
        }

        save += '\n' + pos + '}';

        return save;
    }
}