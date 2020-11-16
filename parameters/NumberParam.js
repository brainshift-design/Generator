class   NumberParam
extends Parameter
{
    #value;

    get value() { return this._control.value; }
    set value(value) { this._control.setValue(value); }

    setValue(value, fireChangeEvent = true) { this._control.setValue(value, fireChangeEvent); }


    input; 


    constructor(name, 
                val = 0, 
                min = Number.MIN_SAFE_INTEGER, 
                max = Number.MAX_SAFE_INTEGER)
    {
        super(name, 'NUM');

        this._control = document.createElement('div');
        this.control.param  = this;
        this.control.zIndex = 0;

        initSlider(
            this.control,
            100,  // width
            20,   // height
            this.name, 
            min,
            max,
            val,  // default
            0.01, // drag scale
            1,    // wheel step
            0,    // decimals
            0,    // acceleration
            '');  // suffix

        this.div.appendChild(this.control);

        this.input = new Input('NUM');
        this.input._param = this;
        this.input.control.style.float     = 'left';
        this.input.control.style.position  = 'absolute';
        this.input.control.style.top       = '50%';
        this.input.control.style.transform = 'translateY(-50%)';
        this.div.appendChild(this.input.control);

        this.control.addEventListener('onchange', e =>
        {
            this.op.valid = false;
            setParam(this, this.value);
            //this.op.graph.mutex = true;            
        });
    }
}