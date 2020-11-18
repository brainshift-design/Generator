class   NumberParam
extends Parameter
{
    get value() { return this._control.value; }
    set value(value) { this._control.setValue(value); }

    setValue(value, fireChangeEvent = true) { this._control.setValue(value, fireChangeEvent); }


    input; 


    constructor(name, 
                value     = 0, 
                min       = Number.MIN_SAFE_INTEGER, 
                max       = Number.MAX_SAFE_INTEGER,
                decimals  = 0,
                dragScale = 0.01)
    {
        super(name, 'NUM');

        this._control = document.createElement('div');
        this.control.param  = this;
        this.control.zIndex = 0;

        initSlider(
            this.control,
            100,       // width
            20,        // height
            this.name, 
            min,
            max,
            value,     // default
            dragScale, // drag scale
            1,         // wheel step
            decimals,  // decimals
            0,         // acceleration
            '');       // suffix

        this.div.appendChild(this.control);

        this.input = new Input('NUM');
        this.input._param = this;
        this.input.control.style.float     = 'left';
        this.input.control.style.position  = 'absolute';
        this.input.control.style.top       = '50%';
        this.input.control.style.transform = 'translateY(-50%)';
        this.div.appendChild(this.input.control);

        this.control.addEventListener('change', e =>
        {
            this.op.valid = false;
            setParam(this, this.value);
        });

        this.input.addEventListener('connect', e =>
        {
            this.control.style.fontStyle     = 'italic';
            this.control.style.pointerEvents = 'none';
        });

        this.input.addEventListener('disconnect', e =>
        {
            this.control.style.fontStyle     = 'normal';
            this.control.style.pointerEvents = 'auto';
        });
    }
}