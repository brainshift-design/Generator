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
        this.div.op = this;

        this.div.style.display  = 'inline-block';
        this.div.style.position = 'absolute';
        this.div.style.width    = 100;
        this.div.style.height   = 'auto';
        //this.div.style.border = '1px solid red';
        
        this.div.dragging = false;
        
    
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
        
        
        this.createDivLabel();
    }     


    createDivLabel()
    {
        this.label = document.createElement('div');
        
        this.label.innerHTML          = this.id;
           
        this.label.style.fontFamily   = 'Inter';
        this.label.style.fontSize     = '11';
        this.label.style.paddingLeft  = '4px';
        this.label.style.display      = 'inline-block';
        this.label.style.width        = 'calc(100% - 2px)';
        this.label.style.height       = 20;
        this.label.style.background   = '#a3d3fd';
        this.label.style.borderRadius = '4px 4px 0 0';
        this.label.style.color        = 'black';
        this.label.style.textAlign    = 'center';
        
        this.div.appendChild(this.label);
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
        
        this.div.appendChild(param.control);
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