class   OpConditionBase
extends OperatorWithSymbol
{
    constructor(type, id, name, symbol)
    {
        super(type, id, name, symbol);

        this.alwaysLoadParams = true;

        
        this.addInput(new Input(NUMBER_TYPES));
        this.addInput(new Input(NUMBER_TYPES));

        this.addOutput(new Output([NUMBER_VALUE], this.output_genRequest));

        this.addParam(this.paramValue);
    }



    output_genRequest(gen)
    {
        // 'this' is the output

        gen.scope.push({
            nodeId:  this.node.id, 
            paramId: NULL });

        const [request, ignore] = this.node.genRequestStart(gen);
        if (ignore) return request;

        
        const input0 = this.node.inputs[0];
        const input1 = this.node.inputs[1];

        
        if (   input0.connected
            && input1.connected)   request.push(2,
                                       ...pushInputOrParam(input0, gen),
                                       ...pushInputOrParam(input1, gen));

        else if (input0.connected) request.push(1, ...pushInputOrParam(input0, gen));
        else if (input1.connected) request.push(1, ...pushInputOrParam(input1, gen));
            
        else                       request.push(0);


        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateParams()
    {
        this.paramValue.enableControlText(false);


        const v = Math.round(this.paramValue.value.value);

             if (this.isUnknown())       this.paramValue.controls[0].valueText = UNKNOWN_DISPLAY;
        else if (settings.showBoolValues
              && !isNaN(v))              this.paramValue.controls[0].valueText = v != 0 ? getTrueDisplay() : getFalseDisplay();
        else                             this.paramValue.controls[0].valueText = '';


        this.paramValue.controls[0].text.style.fontStyle = 
               settings.showBoolValues 
            && this.paramValue.controls[0].valueText != UNKNOWN_DISPLAY
            ? 'normal' 
            : 'italic';


        //this.paramValue.controls[0].text.style.letterSpacing = settings.showBoolValues ? '0.1em' : 0; // this is if "true" and "false" are used
        
        this.paramValue.controls[0].showBar = !this.isUnknown();


        this.updateParamControls();
    }



    updateHeaderLabel()
    {
        //console.log('OperatorWithSymbol.updateHeaderLabel()');
        
        OperatorWithValue.prototype.updateHeaderLabel.call(this);


        const colBack = rgbFromType(this.type, this.active);
        const colText = isDark(colBack) ? [1, 1, 1] : [0, 0, 0];

        this._symbol.style.fontSize   = this._showOnlySymbol ? 17 : 12;
        this._symbol.style.fontWeight = this.active ? 'bold' : 'normal';
        this._symbol.style.color      = rgb2style(colText);
        this._symbol.style.left       = 'calc(50%)';
        

        //const padding = this.header.connectionPadding;
        const inputs  = this.headerInputs;


        const [inputY, inputHeight] = getHeaderConnY(inputs);//, padding, 5);

        if (this._showOnlySymbol)
        {
            this._symbol.style.top = inputY[0]/2 + inputHeight/2 - 3;
        }
        else
        {
            this._symbol.style.top = inputY[0]/2 + inputHeight/2 - 9;
            this.label  .style.top = 'calc(50% - 2px)';
        }
        

        this.label.style.visibility = this._showOnlySymbol ? 'hidden'  : 'visible';
    }



    paramsToJson(nTab = 0)
    {
        return '';
    }
}