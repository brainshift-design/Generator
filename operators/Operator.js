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

    _id;
    get id() { return this._id; }
    set id(id)
    {
        this._id = id;
        this.label.innerHTML = id;
    }
    
    _graph = null;
    get graph() { return this._graph; }
    setGraph(graph) { this._graph = graph; }
    
    
    params = [];
    
    inputs = [];
    output = null;
    

    //#valid = false; // this is the flag for regeneration


    _selected;
    get selected() { return this._selected; }
    set selected(sel) 
    {
        if (this._selected)
            remove(this, graph.selected);

        this.setSelected(sel); 

        if (this._selected)
            graph.selected.push(this);
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

        this.header.style.backgroundColor = this.activeColor;
        this.header.style.boxShadow       = 'none';
        this.label .style.color           = 'white';
        
        if (   this.output
            && this.output.dataType == 'OBJ')
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
    }

    
    get activeNodeInTree() { return this.getActiveNodeInTree(null); }

    getActiveNodeInTree(callerOp = null)
    {
        if (this.active)
            return this;

        for (const input of this.inputs)
        {
            if (   input.connected
                && input.connectedOutput.op != callerOp)
            {
                const active = input.connectedOutput.op.getActiveNodeInTree(this);
                if (active) return active;
            }
        }

        for (const param of this.params)
        {
            if (   param.input.connected
                && param.input.connectedOutput.op != callerOp)
            {
                const active = param.input.connectedOutput.op.getActiveNodeInTree(this);
                if (active) return active;
            }
        }

        if (   this.output
            && this.output.connected)
        {
            for (const input of this.output.connectedInputs)
            {
                if (/*   !!input.op
                    &&*/ input.op != callerOp)
                {
                    const active = input.op.getActiveNodeInTree(this);
                    if (active) return active;
                }
                // else if (!!input.param
                //         && input.param.op != callerOp)
                // {
                //     const active = input.param.op.getActiveNodeInTree(this);
                //     if (active) return active;
                // }
            }
        }

        return null;
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
            case 'NUM': return ACTIVE_NUM_COLOR;
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

        this._id = opType; // this is a temp until the op becomes a graph node
        
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
        if (this._graph.nodes.find(node => node.id == newId))
            return false; // graph already contains a node with this id

        this._id = newId;
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