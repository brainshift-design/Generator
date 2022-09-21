class Parameter
extends EventTarget
{
    #type;     get type()    { return this.#type;    }
    #id;       get id()      { return this.#id;      }
    #name;     get name()    { return this.#name;    }
    _node;     get node()    { return this._node;    }
    _div;      get div()     { return this._div;     }


    get index() { return this.node.params.indexOf(this); }


    input;
    output;

    
    onbeforechange = new Event('beforechange');
    onchange       = new Event('change');
    onconfirm      = new Event('confirm');
    onchangelock   = new Event('changelock');


    noUpdate = false;



    show = () => true;



    constructor(type, id, name)
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



    initInput(types)
    {
        this.input = new Input(types, this.input_getValuesForUndo);

        this.input._param = this;
        this.input.control.style.float     = 'left';
        this.input.control.style.position  = 'absolute';
        this.input.control.style.top       = '50%';
        this.input.control.style.transform = 'translateY(-50%)';

        this.div.appendChild(this.input.control);

        this.input.addEventListener('connect',    () => this.enableControlText(false));
        this.input.addEventListener('disconnect', () => this.enableControlText(true ));
    }



    initOutput(type, toString)
    {
        this.output = new Output(type, toString);

        this.output._param = this;
        this.output.control.style.float     = 'right';
        this.output.control.style.position  = 'absolute';
        this.output.control.style.top       = '50%';
        this.output.control.style.transform = 'translateY(-50%)';
        
        this.div.appendChild(this.output.control);
    }



    isDefault() { return false; }


    
    input_getValuesForUndo()
    {
        return [[
            this.param.id, 
            this.param.value]];
    }



    update(dispatchEvents)
    {

    }    



    updateControls()
    {
        this.control.update();
        
        if (this.input ) this.input .updateControl();
        if (this.output) this.output.updateControl();
    }



    preSetValue(value, createAction, dispatchEvents = true) 
    {
        if (dispatchEvents)
        {
            if (!value.equals(this.oldValue))
                this.dispatchEvent(this.onbeforechange);
        }
    }



    setValue(value, createAction, updateControl = true, dispatchEvents = true) 
    {
        if (dispatchEvents)
        {
            if (   !this.oldValue
                || !value.equals(this.oldValue))
            {
                this.dispatchEvent(this.onchange);
                
                if (createAction)
                {
                    actionManager.do(new SetParamValueAction(this, value));
                    this.dispatchEvent(this.onconfirm);
                }
            }
        }
    }



    textboxHasFocus()
    {
        return false;
    }



    enableControlText()
    {
        return true;
    }



    toString()
    {
        // parameter outputs call this method
    }



    toJson(nTab = 0, id = '')
    {
        let pos = ' '.repeat(nTab);

        if (id == '')
            id = this.id;

        return pos + '["' + id  + '", "' + this.value + '"]';
    }



    loadParam(param)
    {
        
    }
}



function setParamValue(param, value, updateParamId = '')
{
    if (param.id != updateParamId)
        param.setValue(value, false, true, false);
}