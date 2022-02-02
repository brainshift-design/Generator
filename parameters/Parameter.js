class Parameter
extends EventTarget
{
    #type;
    get type() { return this.#type; }
    
    #name;
    get name() { return this.#name; }

    _op;
    get op()   { return this._op; }


    valueIsValid = true;

    
    // _operator; get operator() { return this._operator; }
    _control;  get control()  { return this._control;  }
    _div;      get div()      { return this._div;      }


    input;
    output;

    
    onbeforechange = new Event('beforechange');
    onchange       = new Event('change');
    onconfirm      = new Event('confirm');



    constructor(name, type)
    {
        super();

        this.#type = type;
        this.#name = name;

        this._div = createDiv();

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
            this.control.readOnly        = true;
        });
    
        
        this.input.addEventListener('disconnect', () =>
        {
            this.control.style.fontStyle = 'normal';
            this.control.readOnly        = false;
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
        //console.log('    ' + this.name + '.setValue(' + value + ', dispatch = ' + dispatchEvents + ')');
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



    toJson(nTab = 0, name = '')
    {
        let pos = ' '.repeat(nTab);

        if (name == '')
            name = this.name;

        return pos + '["' + name  + '", "' + this.value + '"]';
    }
}