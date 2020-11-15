/*
    data types:
        OBJ
        NUM
*/

class GOperator
{
    #opType;
    get opType() { return this.#opType; }
    
    #dataType;
    get dataType() { return this.#dataType; }

    _id;
    get id() { return this._id; }
    set id(id) { this._id = id; }
    
    _graph = null;
    get graph() { return this._graph; }
    setGraph(graph) { this._graph = graph; }
    
    
    params = [];
    
    inputs = [];
    output = null;
    
    cachedObjects = [];

    #valid = false; // this is the flag for regeneration

    
    _active = false;
    get active() { return this._active; }


    makeActive() // only true
    {
        this.makeLeftPassive();
        this.makeRightPassive();        

        this._active = true;
        this.div.style.boxShadow = '0 0 0 2px #18A0FB';

        if (   this.output
            && this.output.dataType == 'OBJ')
            generate([this]);
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
            this.div.style.boxShadow = 'none';
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

        if (   this.output
            && this.output.connected)
        {
            for (const input of this.output.connectedInputs)
            {
                if (input.op != callerOp)
                {
                    const active = input.op.getActiveNodeInTree(this);
                    if (active) return active;
                }
            }
        }

        return null;
    }


    set valid(val) { this.#valid = val; }
    get valid() 
    {
        var valid = this.#valid;
        
        for (const input of this.inputs)
        {
            if (input.connected)
                valid &= input.connectedOutput.op.valid;
        }

        return valid;
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
    }    
    
    
    addInput(input)
    {
        input._op = this;
        this.inputs.push(input);
    }


    setOutput(output)
    {
        if (this.output != null)
            this.output._op = null;

        output._op = this;
        this.output = output;
    }


    addParam(param)
    {
        this.params.push(param);
        param._op = this;
    }
 
    

    setId(newId)
    {
        if (this._graph.nodes.find(node => node.id == newId))
            return false; // graph already contains a node with this id

        this._id = newId;

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
}