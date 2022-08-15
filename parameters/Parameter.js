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


    //locked = false;

    // showParamLock = false;
    // paramLock;

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

        // this.paramLock = createDiv('paramLock');
        // this.paramLock.param = this;
        // this.paramLock.addEventListener('pointerenter', paramLock_onpointerenter);
        // this.paramLock.addEventListener('pointerleave', paramLock_onpointerleave);
        // this.paramLock.addEventListener('pointerdown',  paramLock_onpointerdown );
        // this.paramLock.addEventListener('pointerup',    paramLock_onpointerup   );
        //this._div.appendChild(this.paramLock);

        enableElementText(this.div, true);

        //this.updateLock();
    }



    setName(name, dispatchEvents = true)
    {
        this.#name = name; 
        this.update(dispatchEvents);
    }



    initInput(types)
    {
        this.input = new Input(types);

        this.input._param = this;
        this.input.control.style.float     = 'left';
        this.input.control.style.position  = 'absolute';
        this.input.control.style.top       = '50%';
        this.input.control.style.transform = 'translateY(-50%)';
        this.div.appendChild(this.input.control);

        this.input.addEventListener('connect',    () => enableControlText(this.control, false));
        this.input.addEventListener('disconnect', () => enableControlText(this.control, true ));
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
            if (!this.valuesEqual(value, this.oldValue))
                this.dispatchEvent(this.onbeforechange);
        }
    }



    setValue(value, createAction, updateControl = true, dispatchEvents = true) 
    {
        if (dispatchEvents)
        {
            if (value != this.oldValue)
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



    valuesEqual(val1, val2)
    {
        return val1 == val2;
    }



    textboxHasFocus()
    {
        return false;
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



// function paramLock_onpointerenter(e)
// {
//     const paramLock = e.target;

//     paramLock.over = true;
//     paramLock.param.updateLock();
// }



// function paramLock_onpointerleave(e)
// {
//     const paramLock = e.target;

//     paramLock.over = false;
//     paramLock.param.updateLock();
// }



// function paramLock_onpointerdown(e)
// {
//     const paramLock = e.target;

//     // e.preventDefault();
//     e.stopPropagation();

//     if (e.button == 0)
//     {
//         paramLock.down0 = true;
//         paramLock.param.updateLock();
//     }
// }



// function paramLock_onpointerup(e)
// {
//     const paramLock = e.target;

//     if (e.button == 0)
//     {
//         paramLock.down0 = false;
//         paramLock.param.locked = !paramLock.param.locked;
//         paramLock.param.updateLock();

//         paramLock.param.dispatchEvent(paramLock.param.onchangelock);
//     }
// }