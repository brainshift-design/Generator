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
    }



    setName(name, dispatchEvents = true)
    {
        this.#name = name; 
        this.update(dispatchEvents);
    }



    isDefault() { return false; }


    
    update(dispatchEvents)
    {
        // overrides should check inputs for data here
    }    



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