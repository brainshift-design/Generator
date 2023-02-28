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


    volatile       = false;
    noUpdate       = false;
 
    affectsHeader  = true; // indicates whether the parameter contributes to the header's result data

    isResult       = false;


    canShow = () => true;



    constructor(type, id, name)
    {
        super();


        this.#id                = id;
        this.#name              = name;
        this.#type              = type;

        this._div               = createDiv();

        this.div.style.position = 'relative';
        this.div.style.padding  = 0;
        this.div.style.width    = '100%';

        this.input              = null;
        this.output             = null;

        enableElementText(this.div, true);
    }



    setName(name, dispatchEvents = true)
    {
        this.#name = name; 
        this.update(dispatchEvents);
    }



    initInput(types, getNodeInputValuesForUndo = null, getBackInitValue = null)
    {
        this.input = new Input(types, getNodeInputValuesForUndo, getBackInitValue);

        this.input._param              = this;

        this.input.div.style.float     = 'left';
        this.input.div.style.position  = 'absolute';
        this.input.div.style.top       = '50%';
        this.input.div.style.transform = 'translateY(-50%)';

        this.input.colorLight          = [0, 0, 0, 0.12];
        this.input.colorDark           = [1, 1, 1, 0.12];
        this.input.overFactor          = 3;

        this.input.canAutoConnect      = false;
        
        this.div.appendChild(this.input.div);

        this.input.addEventListener('connect',    () => this.enableControlText(false));
        this.input.addEventListener('disconnect', () => this.enableControlText(true ));
    }



    initOutput(types, toString, getNodeOutputValuesForUndo = null, backInit = null)
    {
        this.output = new Output(types, toString, getNodeOutputValuesForUndo, backInit);

        this.output._param              = this;

        this.output.div.style.float     = 'right';
        this.output.div.style.position  = 'absolute';
        this.output.div.style.top       = '50%';
        this.output.div.style.transform = 'translateY(-50%)';
        
        this.output.colorLight          = [0, 0, 0, 0.12];
        this.output.colorDark           = [1, 1, 1, 0.12];
        this.output.overFactor          = 3;

        this.div.appendChild(this.output.div);
    }



    isDefault = () => false;


    
    isVisible()
    {
        return false;
    }



    resetControls()
    {
        
    }



    getValueForUndo()
    {
        return {
            paramId: this.id, 
            value:   this.value
        };    
    }    



    update(dispatchEvents)
    {

    }    



    updateControls()
    {
        checkControlVisible(this, this.control);

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



    enableControlText(enable)
    {

    }
    
    
    
    toString()
    {
        return this.value.toString();
    }



    toJson(nTab = 0, id = '')
    {
        let pos = ' '.repeat(nTab);
        
        if (id == '')
            id = this.id;

        return pos + '["' + this.type  + '", "' + id  + '", "' + this.value.toString() + '"]';
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



function checkControlVisible(param, control)
{
    control.style.display = 
          !param.isResult
        || settings.showOperationResults
        ? 'inline-block'
        : 'none';
}