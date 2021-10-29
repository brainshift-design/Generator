/*
    data types:
        OBJ
        number
*/

class UOperator
{
    #opType;
    get opType() { return this.#opType; }
    
    #dataType;
    get dataType() { return this.#dataType; }

    _name;
    get name() { return this._name; }
    set name(name)
    {
        this._name = name;
        this.label.innerHTML = name;
    }
    

    static nextId = 0;
    id = UOperator.nextId++;


    graph = null;
    
    
    params = [];
    
    inputs = [];
    output = null;
    

    //#valid = false; // this is the flag for regeneration



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



    setSelected(sel)
    {
        this._selected = sel;

        this.div.style.boxShadow = 
            this._selected
            ? '0 0 0 2px ' + ACTIVE_OBJ_COLOR
            : 'none';
    }
    


    _active = false;
    get active() { return this._active; }



    makeActive() // only true
    {
        this.makeLeftPassive();
        this.makeRightPassive();        

        this._active = true;
        uiSetActive(this, true);

        this.header.style.backgroundColor = this.activeColor;
        this.header.style.boxShadow       = 'none';
        this.label .style.color           = this.dataType == 'OBJ' ? 'white' : 'black';
        
        if (this.dataType == 'OBJ')
            uiGenerateObjects([activeNodeInTree(this).id]);
    }
        
    

    makeLeftPassive()
    {
        for (const input of this.inputs)
        {
            if (input.connected)
            {
                input.connectedOutput.op.makePassive();
                input.connectedOutput.op.makeLeftPassive();            
            }
        }
    }
    


    makeRightPassive()
    {
        if (this.output)
        {
            for (const input of this.output.connectedInputs)
            {
                input.op.makePassive();
                input.op.makeRightPassive();            
            }
        }
    }
    


    makePassive()
    {
        if (this.active)
        {
            this.header.style.backgroundColor = this.passiveColor;
            this.header.style.boxShadow       = '0 0 0 1px #0001 inset';
            this.label .style.color           = 'black';

            uiDeleteNodeObjects([this.id]);
        }

        this._active = false;
        uiSetActive(this, false);
    }



    // set valid(val) { this.#valid = val; }
    // get valid() 
    // {
    //     var valid = this.#valid;
        
    //     for (const input of this.inputs)
    //     {
    //         if (input.connected)
    //             valid &= input.connectedOutput.op.valid;
    //     }

    //     return valid;
    // }


    get activeColor()
    {
        switch (this.#dataType)
        {
            case 'OBJ': return ACTIVE_OBJ_COLOR;
            case 'number': return NUM_COLOR; //ACTIVE_NUM_COLOR;
        }

        return 'magenta';
    }

    get passiveColor()
    {
        switch (this.#dataType)
        {
            case 'OBJ': return OBJ_COLOR;
            case 'number': return NUM_COLOR;
        }

        return 'magenta';
    }



    div;
    inner;
    header;
    label;
    inputControls;
    outputControls;



    constructor(opType, dataType)
    {
        this.#opType   = opType;   // this is the operator type
        this.#dataType = dataType; // this is the op's main data type

        this._name = opType; // this is a temp until the op becomes a graph node
        
        var headerColor = colorFromDataType(dataType, false);
        createNode(this, headerColor);
    }    
    
    

    addInput(input)
    {
        input._op = this;
        this.inputs.push(input);
        this.inputControls.appendChild(input.control);
    }



    setOutput(output)
    {
        if (this.output != null)
        {
            this.outputControls.removeChild(this.output.control);
            this.output._op = null;
        }

        output._op = this;
        this.output = output;
        this.outputControls.appendChild(output.control);
    }



    addParam(param)
    {
        this.params.push(param);
        
        param._op = this;

        param.input._op = this;
        this.inputs.push(param.input);
        
        param.control.style.display = 'inline-block';
        
        this.inner.appendChild(param.div);
    }
 
    

    setId(newId)
    {
        if (this.graph.nodes.find(node => node.id == newId))
            return false; // graph already contains a node with this id

        this._name = newId;
        this.label.innerHTML = this.id + ': ' + newId;

        return true;
    }



    generate() 
    { 
        this.valid = true; 
    }



    isBefore(node)
    {
        if (   !this.output
            || !this.output.connected)
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



    save(nTab) 
    {
        let   pos = ' '.repeat(nTab);
        const tab = '  ';
        
        let save = 
              pos + '{\n'
            + pos + tab + '"type": "' + this.opType         + '",\n'
            + pos + tab + '"name": "' + this.name           + '",\n'
            + pos + tab + '"x"   : "' + this.div.style.left + '",\n'
            + pos + tab + '"y"   : "' + this.div.style.top  + '"';
        
        for (const param of this.params)
        {
            if (!param.isDefault())
                save += ',\n' + param.save(nTab + 2);
        }

        save += '\n' + pos + '}';

        return save;
    }
}