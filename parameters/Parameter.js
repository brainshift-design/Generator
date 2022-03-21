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


    _control; get control() { return this._control; }
    _div;     get div()     { return this._div;     }


    input;
    output;

    
    onbeforechange = new Event('beforechange');
    onchange       = new Event('change');
    onconfirm      = new Event('confirm');
    onchangelock   = new Event('changelock');


    isLocked = false;

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



    updateLock()
    {
        let opacity = this.isLocked ? 0.5 : 0.1;
        
             if (this.paramLock.down0) opacity += 0.3;
        else if (this.paramLock.over ) opacity += 0.15;
        
        this.paramLock.style.background = 
            this.isLocked
            ? 'url(\'data:image/svg+xml;utf8,<svg width="5" height="7" viewBox="0 0 8 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M5.5 2.5V4H2.5V2.5C2.5 1.67157 3.17157 1 4 1C4.82843 1 5.5 1.67157 5.5 2.5ZM1.5 4V2.5C1.5 1.11929 2.61929 0 4 0C5.38071 0 6.5 1.11929 6.5 2.5V4H7C7.27614 4 7.5 4.22386 7.5 4.5V9.5C7.5 9.77614 7.27614 10 7 10H1C0.723858 10 0.5 9.77614 0.5 9.5V4.5C0.5 4.22386 0.723858 4 1 4H1.5Z" fill="black" fill-opacity="'+opacity+'"/></svg>\')'
            : 'url(\'data:image/svg+xml;utf8,<svg width="7" height="7" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M6 4V5H6.5C6.77614 5 7 5.22386 7 5.5V10.5C7 10.7761 6.77614 11 6.5 11H0.5C0.223858 11 0 10.7761 0 10.5V5.5C0 5.22386 0.223858 5 0.5 5H5V2.5C5 1.11929 6.11929 0 7.5 0C8.88071 0 10 1.11929 10 2.5V4H9V2.5C9 1.67157 8.32843 1 7.5 1C6.67157 1 6 1.67157 6 2.5V4Z" fill="black" fill-opacity="'+opacity+'"/></svg>\')';

        this.paramLock.style.backgroundPosition = '50% 50%';
        this.paramLock.style.backgroundRepeat   = 'no-repeat';

        this.paramLock.style.left = this.isLocked ? 11   : 12;
        this.paramLock.style.top  = this.isLocked ?  4.5 :  4;
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
        paramLock.param.isLocked = !paramLock.param.isLocked;
        paramLock.param.updateLock();

        paramLock.param.dispatchEvent(paramLock.param.onchangelock);
    }
}