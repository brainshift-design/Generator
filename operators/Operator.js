/*
    data types:
        OBJ
        NUM
*/

class Operator
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
    

    static nextId = 1;
    id = Operator.nextId++;


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
            removeFromArray(this, graphView.selected);

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
        setActive(this, true);

        this.header.style.backgroundColor = this.activeColor;
        this.header.style.boxShadow       = 'none';
        this.label .style.color           = this.dataType == 'OBJ' ? 'white' : 'black';
        
        if (this.dataType == 'OBJ')
            generate([this.activeNodeInTree]);
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

            removeNodeOutput(this);
        }

        this._active = false;
        setActive(this, false);
    }

    
    get activeNodeInTree() 
    { 
        const left  = this.getActiveNodeLeft();  if (!!left ) return left;
        const right = this.getActiveNodeRight(); if (!!right) return right;

         return null;
    }

    getActiveNodeLeft()
    {
        if (this.active) return this;

        for (const input of this.inputs)
        {
            if (input.connected)
            {
                const left = input.connectedOutput.op.getActiveNodeLeft();
                if (left) return left;
            }
        }

        return null;
    }

    getActiveNodeRight()
    {
        if (this.active) return this;

        if (!!this.output)
        {
            for (const input of this.output.connectedInputs)
            {
                const right = input.op.getActiveNodeRight();
                if (right) return right;
            }
        }

        return null;
    }


    get lastNodeInTree() 
    { 
        const right = this.getLastNodeRight(); 
        return !!right ? right : null;
    }

    getLastNodeRight()
    {
        var right = null;

        if (!!this.output)
        {
            for (const input of this.output.connectedInputs)
            {
                const _right = input.op.getLastNodeRight(this);
                if (_right && !!right) return this;
                right = _right;
            }
        }

        return !!right ? right : this;
    }


    updateConnectedInputValueText() {}


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
            case 'NUM': return NUM_COLOR; //ACTIVE_NUM_COLOR;
        }

        return 'magenta';
    }

    get passiveColor()
    {
        switch (this.#dataType)
        {
            case 'OBJ': return OBJ_COLOR;
            case 'NUM': return NUM_COLOR;
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
        createDiv(this, headerColor);
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
        this.label.innerHTML = newId;

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
            if (input.connectedOutput.op == node)        return true;
            if (input.connectedOutput.op.isAfter(node)) return true;
        }

        return false;
    }
}