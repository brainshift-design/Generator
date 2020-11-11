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

        if (this.output)
            regenerateOutputs([this.output]);
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
        
        var headerColor = 0;

        switch (dataType)
        {
            case 'OBJ': headerColor = '#BEDFFF'; break;
            case 'NUM': headerColor = '#ddd';    break;
        }
            
        this.createDiv(headerColor);
    }    
    
    
    createDiv(headerColor)
    {
        this.div = document.createElement('div');

        this.div.className = 'node';
        this.div.op        = this;
        this.div.dragging  = false;
    

        this.inner = document.createElement('div');
        this.inner.className = 'nodeInner';

        this.div.appendChild(this.inner);


        this.div.addEventListener('pointerdown', function(e) 
        {
            if (   e.button == 0
                && !graphView.overOutput
                && !graphView.overInput)
            {
                this.sx  = e.clientX;
                this.sy  = e.clientY;
                this.slx = this.offsetLeft;
                this.sly = this.offsetTop;
    
                this.dragging = true;
                this.setPointerCapture(e.pointerId);
            }
        });
    
        this.div.addEventListener('pointermove', function(e) 
        {
            if (this.dragging)
            {
                this.op.setDivPosition(
                    this.slx + e.clientX - this.sx,
                    this.sly + e.clientY - this.sy);
            };
        });
    
        this.div.addEventListener('pointerup', function(e) 
        {
            if (   e.button == 0
                && this.dragging)
            {
                this.dragging = false;
                this.releasePointerCapture(e.pointerId);
            }
        });
        
        
        this.div.addEventListener('dblclick', function(e)
        {
            this.op.makeActive();
        });


        this.div.addEventListener('pointerenter', function(e)
        {
            this.op.inner.style.boxShadow = '0 0 0 1px #18A0FB';
        });

        this.div.addEventListener('pointerleave', function(e)
        {
            this.op.inner.style.boxShadow = 'none';
        });


        this.createDivHeader(headerColor);
    }     


    createDivHeader(headerColor)
    {
        this.header = document.createElement('div');
        this.header.className = 'nodeHeader';
        this.header.style.backgroundColor = headerColor;

        this.inputControls = document.createElement('div');
        this.inputControls.className = 'inputControls';
        this.header.appendChild(this.inputControls);

        this.createDivLabel();

        this.outputControls = document.createElement('div');
        this.outputControls.className = 'outputControls';
        this.header.appendChild(this.outputControls);

        this.inner.appendChild(this.header);
    }


    createDivLabel()
    {
        this.label = document.createElement('div');
        this.label.className = 'nodeLabel';
        this.header.appendChild(this.label);
    }
    

    setDivPosition(x, y)
    {
        this.div.style.left = x;
        this.div.style.top  = y;

        for (const input of this.inputs)
        {
            if (input.connected) 
                input.connection.updateWire();
        }

        if (   this.output 
            && this.output.connected)
        {
            for (const input of this.output.connectedInputs)
                input.connection.updateWire();
        }
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