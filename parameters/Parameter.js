const defParamHeight = 22;



class Parameter
extends EventTarget
{
    #type;     get type()    { return this.#type; }
    _id;       get id()      { return this._id;   }
    #name;     get name()    { return this.#name; }
    _node;     get node()    { return this._node; }
    _div;      get div()     { return this._div;  }


    get index() { return this.node.params.indexOf(this); }


    showName;
    showValue;

    divider         = 0.5;

    divName;
    divControls;


    controls        = [];

 // proxy           = null;


    backStyleLight  = 'rgba(255, 255, 255, 0.95)';
    valueStyleLight = '#7772';
    textStyleLight  = '#000';
                
    backStyleDark   = 'rgba(56, 56, 56, 0.95)';
    valueStyleDark  = '#ffffff20';
    textStyleDark   = '#eee';


    forceInputColorType  = NULL;
    forceOutputColorType = NULL;

    
    input;
    output;

    
    onbeforechange = new Event('beforechange');
    onchange       = new Event('change');
    onconfirm      = new Event('confirm');
    onchangelock   = new Event('changelock');


    isNodeValue    = false; // helps figure out if a wire is unknown


    changing       = false;

    volatile       = false;
    noUpdate       = false;
 
    affectsHeader  = true; // indicates whether the parameter contributes to the header's result data

    isResult       = false;
    //managing       = false; // undoing or redoing


    canShow = () => true;

    alwaysRequest  = false;

    showIndexName  = false;


    getDescription       = () => '';
    getDescriptionPrompt = () => this.getDescription();



    constructor(type, id, name, showName)
    {
        super();

        this._id              = id;
        this.#name            = name;
        this.#type            = type;
  
        this.showName         = showName;
        this.showValue        = true;

        this._div             = createDiv('paramDiv');
        this.divName          = createDiv('paramName');
        this.divControls      = createDiv('paramControls');

        this.div.style.height = defParamHeight;

        this.input            = null;
        this.output           = null;

        this.div.appendChild(this.divName    );
        this.div.appendChild(this.divControls);


        // this.div.addEventListener('pointerdown', e =>
        // {
        //     if (e.button == 2)
        //     {
        //         e.preventDefault();
        //         e.stopPropagation();

        //         if (    this.controls.length > 0
        //             &&  this.controls[0] instanceof NumberControl
        //             && !isEmpty(this.controls[0].options))
        //         {
        //             initSelectParamMenu(this);
        //             menuSelectParam.showAt(e.clientX, e.clientY, false);
        //         }
        //     }
        // });


        this.div.addEventListener('pointermove', e =>
        {
            if (panMode)
            {
                setCursor(panCursor);
                return;
            }

            if (graphView.tempConn)
                this.checkDragConnection();
        });


        this.div.addEventListener('pointerleave', e =>
        {
            if (panMode)
                return;


            if (graphView.tempConn)
            {
                const tc = graphView.tempConn;


                if (   tc.output
                    && tc.output.node != this.node)
                {
                    const input = graphView.overInput;
                    
                    graphView.overInput = null;
                    tc.input            = null;
                    
                    if (input) // will be null if data types don't match or there's no auto input for someo other reason
                    {
                        input.mouseOver = false;
                        input.updateControl();
                    }
                    
                    tc.wire.inputPos = point_NaN;
                }
                else if (tc.input
                      && tc.input.node != this.node)
                {
                    const output = graphView.overOutput;
                    
                    graphView.overOutput = null;
                    tc.output            = null;

                    if (output) // will be null if data types don't match or there's no auto output for someo other reason
                    {
                        output.mouseOver = false;
                        output.updateControl();
                    }

                    tc.wire.outputPos = point_NaN;

                    tc.input.updateControl();
                }
            }
        });

        
        this.div.addEventListener('pointerup', e =>
        {
            if (panMode)
                return;


            if (graphView.tempConn)
            {
                const tc = graphView.tempConn;


                if (    tc.output
                    && !tc.output.node.isOrFollows(this.node))
                {
                    graphView.endConnection(e.pointerId, getCtrlKey(e), e.shiftKey);

                    if (graphView.overInput)
                        graphView.overInput.endConnection();
                }
                else if (tc.input
                    && !this.node.isOrFollows(tc.input.node))
                {
                    graphView.endConnection(e.pointerId, getCtrlKey(e), e.shiftKey);
                    
                    if (graphView.overOutput)
                        graphView.overOutput.endConnection();
                }
            }
        });
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
        
        this.output.overFactor          = 3;

        this.div.appendChild(this.output.div);
    }



    isDefault = () => false;


    
    isVisible()
    {
        return true;
    }



    isFollowedByMultiplier()
    {

    }



    isOnlyParamUnknown(stackOverflowProtect = 100)
    {
        return (      this.input
                   && this.input.isUncached(stackOverflowProtect-1))
            && this.node.hasMultipliedOutputs();
    }



    isUnknown(stackOverflowProtect = 100)
    {
        return (      this.input
                   && this.input.isUncached(stackOverflowProtect-1)
                ||    this.isNodeValue
                   && this.node.isUnknown(stackOverflowProtect-1))
            && this.node.hasMultipliedOutputs();
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



    updateControls(updateBack = true)
    {
        if (updateBack)
        {
            this.div.style.background = 
                darkMode 
                ? this.backStyleDark 
                : this.backStyleLight;
        }
        

        if (this.input ) this.input .updateControl();
        if (this.output) this.output.updateControl();
        
       
        checkParamVisible(this);
        
        
        const left = this.input || this.output ? 12 : 0;

        const dw = 2 * (left > 0 ? 12 : 0);
            // + (left > 0 ? 12 : 0);


        const showValue = 
               this.showValue 
            && (   !this.node.hasConditionOutputs()
                || !this.isNodeValue
                ||  this.notCondition);


        if (this.showName)
        {
            const nameSize = this.divider <= 1 ? ((   this.divider *100) + '%') : (this.divider + 'px');
            const  valSize = this.divider <= 1 ? (((1-this.divider)*100) + '%') : ('calc(100% - ' + this.divider + 'px)');

            this.divName.innerHTML = this.showIndexName ? this.index : this.name;
   
            this.divName    .style.display = 'inline-block';
            this.divControls.style.display = showValue ? 'inline-block' : 'none';


            if (    showValue)
                //|| !this.isNodeValue)
            {
                this.divControls.style.left       =  nameSize;
                this.divControls.style.marginLeft = '3px';
                this.divControls.style.width      = 'calc(calc(' + valSize + ' - ' + (this.output ? 12 : 0) + 'px) - 3px)';

                this.divName.style.right          =  valSize;
                this.divName.style.width          = 'calc(' + nameSize + ' - ' + (this.input ? 12 : 0) + 'px)';
                this.divName.style.textAlign      = 'right';
            }
            else
            {
                this.divName.style.right          =  0;
                this.divName.style.width          = '100%';
                this.divName.style.textAlign      = 'center';
            }
        }
        else
        {
            this.divName    .style.display    = 'none';
            this.divControls.style.display    = 'inline-block';
            
            this.divControls.style.marginLeft =  0;
            this.divControls.style.left       =  left+'px';
            this.divControls.style.width      = 'calc(100% - ' + dw + 'px)';
        }


        this.controls.forEach(c => c.update());
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
        if (   dispatchEvents
            && this.node.enabled)
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



    getWireColor()
    {
        return rgbFromType(this.type, true);
    }



    updateSetting(setting, value)
    {

    }



    checkDragConnection()
    {
        let savedInput = 
            graphView.savedConn
            ? graphView.savedConn.input
            : null;


        const tc = graphView.tempConn;


        if (    tc.output
            &&  this.input
            &&  this.input.canConnectFrom(tc.output)
            && !tc.output.node.isOrFollows(this.node)
            && (  !this.input.connected // not already connected to this input
                || this.input.connectedOutput != tc.output
                || this.input == savedInput))
        {
            graphView.overInput = this.input;
            tc.input            = this.input;
                
            this.input.mouseOver = true;
            this.input.updateControl();

            tc.wire.inputPos = this.input.getWirePosition();
            tc.wire.update();

            tc.output.updateControl();
        }

        else if ( tc.input
                &&  this.output
                &&  tc.input.canConnectFrom(this.output)
                && !this.node.isOrFollows(tc.input.node))
        {
            graphView.overOutput = this.output;
            tc.output            = this.output;
                
            this.output.mouseOver = true;
            this.output.updateControl();

            tc.wire.outputPos = this.output.getWirePosition();
            tc.wire.update();

            tc.input.updateControl();
        }
    }



    formatControlTextbox(control)
    {
        control.textbox.style.left      = this.divControls.offsetLeft;
        control.textbox.style.top       = this.div        .offsetTop;

        control.textbox.style.width     = control.div.offsetWidth;
        control.textbox.style.height    = defParamHeight;
        
        control.textbox.style.textAlign = 'center';
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



    static getPromptFormat()
    {
        return `id | type | description | IO`;
    }



    toPrompt()
    {
        const id   = this.id;
        const type = this.type;
        const desc = this.getDescriptionPrompt();
        const io   = (this.input || this.output ? '' : '-')
                   + (this.input  ? 'I' : '')
                   + (this.output ? 'O' : '');


        return `${id} | ${type} | ${desc} | ${io}`;
    }
}



function setParamValue(param, value, updateParamId = '')
{
    if (param.id != updateParamId)
        param.setValue(value, false, true, false);
}



function checkParamVisible(param)
{
    param.div.style.display = 
          !param.isResult
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



function formatParamSuffix(suffix, suffixOffsetY = 0)
{
    return '<span style="font-size: 8px; opacity: ' + (darkMode ? 50 : 75) + '%; font-weight: 200; position: relative; top: ' + suffixOffsetY + 'px;">&nbsp;' + suffix + '</span>';
}