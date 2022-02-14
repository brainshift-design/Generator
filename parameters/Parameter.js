class Parameter
extends EventTarget
{
    #type;
    get type() { return this.#type; }
    
    #id;
    get id() { return this.#id; }

    #name;
    get name() { return this.#name; }

    _op;
    get op()   { return this._op; }


    //valueIsValid = true;

    
    // _operator; get operator() { return this._operator; }
    _control;  get control()  { return this._control;  }
    _div;      get div()      { return this._div;      }


    input;
    output;

    
    onbeforechange = new Event('beforechange');
    onchange       = new Event('change');
    onconfirm      = new Event('confirm');



    constructor(id, name, type)
    {
        super();

        this.#id   = id;
        this.#name = name;
        this.#type = type;

        this._div = createDiv();

        this.div.style.position = 'relative';
        this.div.style.padding  = 0;
        this.div.style.width    = '100%';

        this.input  = null;
        this.output = null;

        enableElementText(this.div, true);
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

        this.input.addEventListener('connect',    () => enableSliderText(this.control, false));
        this.input.addEventListener('disconnect', () => enableSliderText(this.control, true ));
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
        if (   this.input
            && this.input.isConnected)
            this.input.connectedOutput.op.update();
    }    



    updateControls()
    {
        this.control.update();
        
        if (this.input ) this.input .updateControl();
        if (this.output) this.output.updateControl();
    }



    setOutputData() { }



    preSetValue(value, confirm, dispatchEvents = true) 
    {
        if (dispatchEvents)
        {
            if (value != this.oldValue)
                this.dispatchEvent(this.onbeforechange);
        }
    }



    setValue(value, confirm, updateControl = true, dispatchEvents = true) 
    {
        if (dispatchEvents)
        {
            if (value != this.oldValue)
            {
                this.dispatchEvent(this.onchange);
                
                if (confirm)
                {
                    actionManager.do(new SetParamValueAction(this, value));
                    this.dispatchEvent(this.onconfirm);
                }
            }
        }
    }



    toJson(nTab = 0, id = '')
    {
        let pos = ' '.repeat(nTab);

        if (id == '')
            id = this.id;

        return pos + '["' + id  + '", "' + this.value + '"]';
    }
}