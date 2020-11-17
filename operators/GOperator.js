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


    set valid(valid) { this.#valid = valid; }
    
    get valid() 
    {
        var valid = this.#valid;
        if (!valid) return valid;
        
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

        param.input._op = this;
        this.inputs.push(param.input);
    }
 
    

    setId(newId)
    {
        if (this._graph.nodes.find(node => node.id == newId))
            return false; // graph already contains a node with this id

        this._id = newId;

        return true;
    }


    generate(callerInput) 
    { 
        this.valid = true; 
    }


    reset() 
    {
        for (const input of this.inputs)
        {
            input.currentSeed = input.initialSeed;
            
            if (input.connected)
                input.connectedOutput.op.reset();
        }
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