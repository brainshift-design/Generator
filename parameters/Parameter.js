class Parameter
extends EventTarget
{
    #type;
    get type() { return this.#type; }
    
    #name;
    get name()    { return this.#name; }

    _op;
    get op()   { return this._op; }


    // _operator; get operator() { return this._operator; }
    _control;  get control()  { return this._control;  }
    _div;      get div()      { return this._div;      }


    input;
    output;

    
    onchange  = new Event('change' );
    onconfirm = new Event('confirm');


    constructor(name, type)
    {
        super();

        this.#type = type;
        this.#name = name;

        this._div = document.createElement('div');

        this.div.style.position = 'relative';
        this.div.style.padding  = 0;
        this.div.style.width    = '100%';

        this.input  = null;
        this.output = null;
    }



    setName(name, dispatchEvents = true)
    {
        this.#name = name; 
        this.update(dispatchEvents);
    }



    initInput(hasInput, dataType)
    {
        this.input = hasInput ? new Input(dataType) : null;
        if (!this.input) return;

        this.input._param = this;
        this.input.control.style.float     = 'left';
        this.input.control.style.position  = 'absolute';
        this.input.control.style.top       = '50%';
        this.input.control.style.transform = 'translateY(-50%)';
        this.div.appendChild(this.input.control);


        this.input.addEventListener('connect', () =>
        {
            this.control.style.fontStyle = 'italic';
            this.control.pointerEvents   = false;
        });
    
        
        this.input.addEventListener('disconnect', () =>
        {
            this.control.style.fontStyle = 'normal';
            this.control.pointerEvents   = true;
        });
    }



    initOutput(hasOutput, dataType)
    {
        this.output = hasOutput ? new Output(dataType) : null;
        if (!this.output) return;

        this.output._param = this;
        this.output.control.style.float     = 'right';
        this.output.control.style.position  = 'absolute';
        this.output.control.style.top       = '50%';
        this.output.control.style.transform = 'translateY(-50%)';
        this.div.appendChild(this.output.control);
    }



    isDefault() { return false; }


    
    update(dispatchEvents)
    {
        // overrides should check inputs for data here
    }    



    setOutputData() { }



    setValue(value, confirm, updateControl = true, dispatchEvents = true) 
    {
        if (dispatchEvents)
            this.dispatchSetValueEvents(this.oldValue, value, confirm);
    }



    dispatchSetValueEvents(oldValue, newValue, confirm)
    {
        if (newValue != oldValue)
        {
            this.dispatchEvent(this.onchange);
            
            if (confirm)
            {
                actionManager.do(new SetValueAction(this, this.value));
                this.dispatchEvent(this.onconfirm);
            }
        }
    }



    save(nTab) {}
}