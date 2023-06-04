const defParamHeight = 22;



class Parameter
extends EventTarget
{
    #type;     get type()    { return this.#type;    }
    _id;       get id()      { return this._id;      }
    #name;     get name()    { return this.#name;    }
    _node;     get node()    { return this._node;    }
    _div;      get div()     { return this._div;     }


    get index() { return this.node.params.indexOf(this); }


    showName;
    divider        = 0.5;

    divName;
    divControls;


    controls       = [];

    // proxy          = null;


    backStyleLight  = 'rgba(255, 255, 255, 0.95)';
    valueStyleLight = '#7772';
    textStyleLight  = '#000';
                
    backStyleDark   = 'rgba(56, 56, 56, 0.95)';
    valueStyleDark  = '#ffffff20';
    textStyleDark   = '#eee';


    input;
    output;

    
    onbeforechange = new Event('beforechange');
    onchange       = new Event('change');
    onconfirm      = new Event('confirm');
    onchangelock   = new Event('changelock');


    changing       = false;

    volatile       = false;
    noUpdate       = false;
 
    affectsHeader  = true; // indicates whether the parameter contributes to the header's result data

    isResult       = false;
    //managing       = false; // undoing or redoing


    canShow = () => true;



    constructor(type, id, name, showName)
    {
        super();

        this._id                  = id;
        this.#name                = name;
        this.#type                = type;
  
        this.showName             = showName;

        this._div                 = createDiv('paramDiv');
        this.divName              = createDiv('paramName');
        this.divControls          = createDiv('paramControls');

        this.div    .style.height = defParamHeight;
        //this.divName.style.height = defParamHeight;

        this.input                = null;
        this.output               = null;

        this.div.appendChild(this.divName);
        this.div.appendChild(this.divControls);
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
        return true;
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
        this.div.style.background = 
            darkMode 
            ? this.backStyleDark 
            : this.backStyleLight;


        if (this.input ) this.input .updateControl();
        if (this.output) this.output.updateControl();
        
       
        this.controls.forEach(c => 
        {
            checkControlVisible(this, c);
            c.update();
        });



        const left = this.input ? 12 : 0;

        const dw = 
              (this. input ? 12 : 0) 
            + (this.output ? 12 : 0);


        if (this.showName)
        {
            const nameSize = this.divider <= 1 ? ((   this.divider *100) + '%') : (this.divider + 'px');
            const  valSize = this.divider <= 1 ? (((1-this.divider)*100) + '%') : ('calc(100% - ' + this.divider + 'px)');

            this.divName    .innerHTML        =  this.name;
   
            this.divName    .style.display    = 'inline-block';
            this.divName    .style.right      =  valSize;
            this.divName    .style.width      = 'calc(' + nameSize + ' - ' + (this.input ? 12 : 0) + 'px)';
            
            this.divControls.style.left       =  nameSize;
            this.divControls.style.marginLeft = '3px';
            this.divControls.style.width      = 'calc(calc(' + valSize + ' - ' + (this.output ? 12 : 0) + 'px) - 3px)';
        }
        else
        {
            this.divName    .style.display    = 'none';
            
            // this.divControls.style.left       = '50%';
            //this.divControls.style.transform  = 'translateX(-50%) translateY(-50%)';
            this.divControls.style.marginLeft =  0;
            this.divControls.style.left       =  left+'px';
            this.divControls.style.width      = 'calc(100% - ' + dw + 'px)';
        }
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
                    actionManager.do(
                        new SetParamValueAction(this, value), 
                          !isEmpty(actionManager.actions)
                        && actionManager.actions.at(-1).type == SET_PARAM_VALUE_ACTION
                        && this.changing);

                    this.dispatchEvent(this.onconfirm);
                }
            }
        }


        // if (this.proxy) 
        //     this.proxy.updateControls();
    }



    updateSetting(setting, value)
    {

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

        return pos + '["' + this.type  + '", "' + id  + '", "' + this.value.toJson() + '"]';
    }



    loadParam(_param)
    {
        
    }



    toJsCode(gen)
    {
        return '';
    }
}



function setParamValue(param, value, updateParamId = '')
{
    if (param.id != updateParamId)
        param.setValue(value, false, true, false);
}



function checkControlVisible(param, control)
{
    control.div.style.display = 
          !param.isResult
        || settings.showOperationResults
        ? 'inline-block'
        : 'none';
}



function createParamFromType(type, options = {})
{
    const id        = options.id        != undefined ? options.id        : 'value';
    const name      = options.name      != undefined ? options.name      : '';
    const showName  = options.showName  != undefined ? options.showName  : false;
    const hasInput  = options.hasInput  != undefined ? options.hasInput  : false;
    const hasOutput = options.hasOutput != undefined ? options.hasOutput : false;

         if (NUMBER_TYPES.includes(type)) return new NumberParam(id, name, showName, hasInput, hasOutput);
    else if (  TEXT_TYPES.includes(type)) return new   TextParam(id, name,           hasInput, hasOutput);
    else if ( COLOR_TYPES.includes(type)) return new  ColorParam(id, name, showName, hasInput, hasOutput);
    else if (  FILL_TYPES.includes(type)) return new   FillParam(id, name, showName, hasInput, hasOutput);
    else if (STROKE_TYPES.includes(type)) return new StrokeParam(id, name, showName, hasInput, hasOutput);
    else if (  LIST_TYPES.includes(type)) return new   ListParam(id, name, showName, hasInput, hasOutput);
}