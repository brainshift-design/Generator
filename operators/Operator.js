class Operator
{
    #type;
    get type() { return this.#type; }

    _id;
    get id() { return this._id; }

    _graph = null;
    get graph() { return this._graph; }

    setGraph(graph)
    {
        this._graph = graph;
    }
    

    params = [];
    
    inputs = [];
    output;


    #valid = false; // this is the flag for regeneration

    set valid(val) { this.#valid = val; }
    get valid() 
    {
        var valid = this.#valid;

        for (const input of this.inputs)
            valid &= input.valid;

        return valid;
    }


    div; // container for the op's controls
    label;


    constructor(type)
    {
        this.#type = type;
        this._id   = type; // this is a temp until the op becomes a graph node
        
        this.createDiv();
    }    
    
    
    createDiv()
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
            if (e.button == 0)
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
            this.op.graph.activeNode = this.op;
        });


        this.div.addEventListener('pointerenter', function(e)
        {
            this.op.inner.style.boxShadow = '0 0 0 1px #18A0FB';
        });

        this.div.addEventListener('pointerleave', function(e)
        {
            this.op.inner.style.boxShadow = 'none';
        });


        this.createDivLabel();
    }     


    createDivLabel()
    {
        this.label = document.createElement('div');
        
        this.label.className = 'nodeLabel';
        this.label.innerHTML = this.id;
          
        this.inner.appendChild(this.label);
    }
    

    setDivPosition(x, y)
    {
        this.div.style.left = x;
        this.div.style.top  = y;
    }


    addInput(input)
    {
        input._op = this;
        this.inputs.push(input);
        this.label.appendChild(input.control);
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
        param.control.style.display = 'inline-block';
        
        this.inner.appendChild(param.control);
    }
 
    

    setId(newId)
    {
        if (this._graph.nodes.findIndex(node => node.id == newId) >= 0)
            return false; // graph already contains a node with this id

        this._id = newId;
        this.label.innerHTML = newId;

        return true;
    }


    generate() 
    { 
        this.valid = true; 
        return {}; 
    }
}