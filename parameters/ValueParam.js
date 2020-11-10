class   ValueParam
extends Parameter
{
    #value;

    get value() { return this._control.value; }
    set value(val) { this._control.setValue(val); }


    constructor(name, min, max, val)
    {
        super('value');

        this._control = document.createElement('div');
        this._control.param = this;

        initSlider(
            this._control,
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