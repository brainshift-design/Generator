class   NumberParam
extends Parameter
{
    #value;

    get value() { return this._control.value; }
    set value(val) { this._control.setValue(val); }


    input; 
    output;


    constructor(name, val = 0, min = Number.MIN_VALUE, max = Number.MAX_VALUE)
    {
        super('number');

        this._control = document.createElement('div');
        this.control.param = this;
        this.control.zIndex = 0;

        initSlider(
            this.control,
            100,  // width
            20,   // height
            name, 
            min,
            max,
            val,  // default
            0.01, // drag scale
            1,    // wheel step
            0,    // decimals
            0,    // acceleration
            '');  // suffix

        this.div.appendChild(this.control);

        this.input = new Input ('number');
        this.input._param = this;
        this.input.control.style.float = 'left';
        this.input.control.style.position = 'relative';
        this.input.control.style.left = 3;
        this.input.control.style.top  = 5;
        //this.input.control.style.boxShadow = '0 0 0 1px rgba(0, 0, 0, 0.12)';
        this.divIO.appendChild(this.input.control);

        this.output = new Output('number');
        this.output._param = this;
        this.output.control.style.float = 'right';
        this.output.control.style.right = 3;
        this.output.control.style.top   = 5;
        //this.output.control.style.boxShadow = '0 0 0 1px rgba(0, 0, 0, 0.12)';
        this.divIO.appendChild(this.output.control);
            
        this._control.addEventListener('onchange', function(e)
        {
            var op = this.param.op;

            op.valid = false;

            if (op.activeNodeInTree.output)
                regenerateOutputs([op.activeNodeInTree.output]);
    
            op.graph.mutex = true;            
        });
    }
}