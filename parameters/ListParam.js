class   ListParam
extends Parameter
{
    // get value() 
    // { 
    //     return new NumberValue(
    //         this.controls[0].value, 
    //         this.controls[0].displayDec); 
    // }

    // oldValue = null;


    // defaultValue;
    // alwaysSaveValue = false;


    // get valueText() { return this.controls[0].valueText; }
    // set valueText(text) 
    // {
    //     this.controls[0].valueText = text;
    //     this.controls[0].update();
    // }


    //  constructor(id,
    //             name, 
    //             showName,
    //             hasInput,
    //             hasOutput,
    //             defaultValue = 0, 
    //             min          = Number.MIN_SAFE_INTEGER, 
    //             max          = Number.MAX_SAFE_INTEGER,
    //             decimals     = 0,
    //             dragScale    = 0.05)
    // {
    //     super(NUMBER_VALUE, id, name);

        
    //     this.controls[0] = new NumberControl(
    //         createDiv('numberControl'),
    //         this,
    //         this.id,
    //         this.name, 
    //         showName,
    //         defaultValue,
    //         min,
    //         max,
    //         decimals,   
    //         dragScale); 

            
    //     this.controls[0].div.zIndex        = 0;

    //     this.controls[0].div.style.display = 'inline-block';
    //     this.controls[0].div.style.width   = '100%';

   
    //     this.defaultValue = new NumberValue(defaultValue, decimals);


    //     this.controls[0].successOnFocusOut = true;

    //     this.div.appendChild(this.controls[0].div);

       
    //     if (hasInput)  this.initInput(NUMBER_TYPES, getParamInputValuesForUndo, this.input_getBackInitValue);
    //     if (hasOutput) this.initOutput([NUMBER_VALUE], this.output_genRequest, getParamOutputValuesForUndo, this.output_backInit);


    //     this.controls[0].addEventListener('change', () => 
    //     { 
    //         this.setValue(this.value, true, false);
    //         this.changing = true;
    //     });


    //     this.controls[0].addEventListener('confirm', () => 
    //     { 
    //         this.changing = false;
    //     });


    //     this.controls[0].addEventListener('finishedit', e =>
    //     { 
    //         let   dec    = decCount(e.detail.value); 
    //         const oldDec = decCount(e.detail.oldValue);

            
    //         if (!e.detail.success)
    //             return;


    //         if (   Math.abs(e.detail.value - e.detail.oldValue) > Number.EPSILON
    //             && dec >= oldDec)
    //         {
    //             this.setValue(new NumberValue(parseFloat(e.detail.value), dec), true);
    //             e.preventSetValue = true;
    //         }
    //         else if (this.controls[0].allowEditDecimals)
    //         {
    //             if (Math.abs(parseFloat(e.detail.value) - parseFloat(e.detail.oldValue)) <= Number.EPSILON)
    //                 dec += Math.log10(this.controls[0].valueScale);
    //             else
    //                 dec = oldDec;

    //             this.setValue(new NumberValue(parseFloat(e.detail.value), dec), true);
    //             e.preventSetValue = true;
    //         }
    //     });



    //     createTooltipSrc(this.controls[0].div, this.controls[0].div, () => 
    //     {
    //         this.controls[0].addEventListener('change', () => 
    //         {
    //             const tooltip = this.getTooltip();
    //             if (tooltip) hideTooltip(tooltip);
    //         });
            
    //         return this.getTooltip();
    //     });
    // }



    // getTooltip = () => null;


    
    // setName(name, dispatchEvents = true)
    // {
    //     super.setName(name, dispatchEvents);
    //     this.controls[0].setName(name);
    // }



    // input_getBackInitValue()
    // {
    //     // 'this' is the input

    //     return this.param.value;
    // }



    // output_backInit(value)
    // {
    //     // 'this' is the output

    //     console.assert(value.type == NUMBER_VALUE, 'expected NUMBER_VALUE in backInit()');
        
    //     this.param.setValue(value, false, true, false);
    // } 
    
    

    // setValue(value, createAction, updateControl = true, dispatchEvents = true) 
    // {
    //     // console.log(this.id + '.setValue() value =', value);

    //     console.assert(
    //         value instanceof NumberValue,
    //         'value must be a NumberValue');


    //     this.preSetValue(value, createAction, dispatchEvents);

        
    //     //console.log('NumberParamBase.setValue value =', value);
    //     if (updateControl)
    //     {
    //         this.controls[0].setDecimals(value.decimals, value.decimals);
    //         this.controls[0].setValue(value.value, false, false); 
    //     }


    //     super.setValue(value, createAction, updateControl, dispatchEvents);

        
    //     this.oldValue = this.value.copy();
    // }    



    // showValue(show)
    // {
    //     this.controls[0].showValue = show;
    //     this.controls[0].update();
    // }



    // isVisible()
    // {
    //     return this.controls[0].div.style.display != 'none';
    // }



    // resetControls()
    // {
    //     this.controls[0].valueText = '';
    // }



    // getValueForUndo()
    // {
    //     return {
    //         paramId:    this.id, 
    //         value:      this.value,
    //         min:        this.controls[0].min,
    //         max:        this.controls[0].max,
    //         displayMin: this.controls[0].displayMin,
    //         displayMax: this.controls[0].displayMax
    //     };
    // }



    // genRequest(gen)
    // {
    //     // this function exists because a parameter without an output
    //     // should still be able to generate a request
        
    //     // 'this' is the param

    //     if (    this.output
    //         && !isEmpty(this.output.cache)
    //         &&  gen.passedNodes.includes(this.node))
    //         return this.output.cache;

            
    //     const request = [];


    //     if (   this.input
    //         && this.input.connected)
    //         request.push(...pushInputOrParam(this.input, gen));

    //     else request.push( 
    //         NUMBER_VALUE, 
    //         new NumberValue(
    //             this.controls[0].value, 
    //             this.controls[0].displayDec).toString());


    //     return request;
    // }



    // output_genRequest(gen)
    // {
    //     return this.param.genRequest(gen);
    // }



    // textboxHasFocus()
    // {
    //     return hasFocus(this.controls[0].textbox);
    // }



    // enableControlText(enable)
    // {
    //     enable &= 
    //            !this.input 
    //         || !this.input.connected;
            
    //     enableElementText(this.controls[0].div, enable);

    //     this.controls[0].readOnly = !enable;

    //     this.updateValueText();
    // }
    
    
    
    // updateValueText()
    // {
    //     let unknown = false;

    //     // if (   this.input
    //     //     && this.input.connected)
    //     // {
    //     //     if (   this.input.isConnectedUncached()
    //     //         && this.node.hasMultipliedOutputs())
    //     //         unknown = true;
    //     // }


    //     if (unknown)
    //         this.controls[0].valueText = UNKNOWN_DISPLAY;

    //     this.controls[0].showBar = !unknown;
    // }



    // isDefault = () => 
    //        !this.alwaysSaveValue
    //      && this.value.equals(this.defaultValue);



    // loadParam(param)
    // {
    //     this.setValue(parseNumberValue(param)[0], true, true, false);
    // }
}