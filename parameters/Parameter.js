class Parameter
extends EventTarget
{
    #type;
    get type() { return this.#type; }
    
    #id;
    get id() { return this.#id; }

    #name;
    get name() { return this.#name; }

    _node;
    get node() { return this._node; }


    _control; get control() { return this._control; }
    _div;     get div()     { return this._div;     }


    get index() { return this.node.params.indexOf(this); }


    input;
    output;

    
    onbeforechange = new Event('beforechange');
    onchange       = new Event('change');
    onconfirm      = new Event('confirm');
    onchangelock   = new Event('changelock');


    locked = false;

    showParamLock = false;
    paramLock;


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

        this.paramLock = createDiv('paramLock');
        this.paramLock.param = this;
        this.paramLock.addEventListener('pointerenter', paramLock_onpointerenter);
        this.paramLock.addEventListener('pointerleave', paramLock_onpointerleave);
        this.paramLock.addEventListener('pointerdown',  paramLock_onpointerdown );
        this.paramLock.addEventListener('pointerup',    paramLock_onpointerup   );
        this._div.appendChild(this.paramLock);

        enableElementText(this.div, true);

        this.updateLock();
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

        this.input.addEventListener('connect',    () => enableSliderText(this.control, false));
        this.input.addEventListener('disconnect', () => enableSliderText(this.control, true ));
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
        if (   this.input
            && this.input.connected)
            this.input.connectedOutput.node.update();

        if (this.showParamLock)
            this.paramLock.style.display = 'block';
        else
            this.paramLock.style.display = 'none';
    }    



    updateControls()
    {
        this.control.update();
        
        if (this.input ) this.input .updateControl();
        if (this.output) this.output.updateControl();
    }



    setOutputData() { }



    setLocked(locked)
    {
        this.locked = locked;
        this.updateLock();
    }



    updateLock()
    {
        let opacity = this.locked ? 0.5 : 0.1;
        
             if (this.paramLock.down0) opacity += 0.3;
        else if (this.paramLock.over ) opacity += 0.15;
        
        this.paramLock.style.background = 
            this.locked
            ? 'url(\'data:image/svg+xml;utf8,<svg width="5" height="7" viewBox="0 0 5 7" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M3.57143 1.75V2.8H1.42857V1.75C1.42857 1.1701 1.90826 0.7 2.5 0.7C3.09174 0.7 3.57143 1.1701 3.57143 1.75ZM0.714286 2.8V1.75C0.714286 0.783503 1.51378 0 2.5 0C3.48622 0 4.28571 0.783503 4.28571 1.75V2.8H4.64286C4.8401 2.8 5 2.9567 5 3.15V6.65C5 6.8433 4.8401 7 4.64286 7H0.357143C0.159899 7 0 6.8433 0 6.65V3.15C0 2.9567 0.159899 2.8 0.357143 2.8H0.714286Z" fill="black" fill-opacity="'+opacity+'" /></svg>\')'
            : 'url(\'data:image/svg+xml;utf8,<svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M4.30997 3.10005V3.80005H4.66913C4.86749 3.80005 5.02829 3.95675 5.02829 4.15005V7.65005C5.02829 7.84332 4.86749 8.00005 4.66913 8.00005H0.359164C0.160803 8.00005 0 7.84332 0 7.65005V4.15005C0 3.95675 0.160803 3.80005 0.359164 3.80005H3.59164V2.05005C3.59164 1.08355 4.39566 0.300049 5.38746 0.300049C6.37926 0.300049 7.18328 1.08355 7.18328 2.05005V3.10005H6.46495V2.05005C6.46495 1.47015 5.98254 1.00005 5.38746 1.00005C4.79237 1.00005 4.30997 1.47015 4.30997 2.05005V3.10005Z" fill="black" fill-opacity="'+opacity+'" /></svg>\')';

        this.paramLock.style.backgroundPosition = '50% 50%';
        this.paramLock.style.backgroundRepeat   = 'no-repeat';

        this.paramLock.style.left = this.locked ? 11 : 12;
        this.paramLock.style.top  = this.locked ?  4 :  3;
    }



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
}



function paramLock_onpointerenter(e)
{
    const paramLock = e.target;

    paramLock.over = true;
    paramLock.param.updateLock();
}



function paramLock_onpointerleave(e)
{
    const paramLock = e.target;

    paramLock.over = false;
    paramLock.param.updateLock();
}



function paramLock_onpointerdown(e)
{
    const paramLock = e.target;

    // e.preventDefault();
    e.stopPropagation();

    if (e.button == 0)
    {
        paramLock.down0 = true;
        paramLock.param.updateLock();
    }
}



function paramLock_onpointerup(e)
{
    const paramLock = e.target;

    if (e.button == 0)
    {
        paramLock.down0 = false;
        paramLock.param.locked = !paramLock.param.locked;
        paramLock.param.updateLock();

        paramLock.param.dispatchEvent(paramLock.param.onchangelock);
    }
}