class   OpArithmetic
extends OperatorWithSymbol
{
    constructor(type, id, name, symbol)
    {
        super(type, id, name, symbol);
        
        this.variableInputs   = true;
        this.alwaysLoadParams = true;


        this.addNewInput();
        this.addOutput(new Output([NUMBER_VALUE], this.output_genRequest));
        
        this.addParam(this.paramValue);
    }
    
    
    
    addNewInput()
    {
        const newInput = new Input([NUMBER_VALUE, NUMBER_LIST_VALUE]);
        newInput.isNew = true;

        newInput.addEventListener('connect',    e => { onVariableConnectInput(this); e.detail.input.isNew = false; });
        newInput.addEventListener('disconnect', e => onVariableDisconnectInput(this, e.detail.input));

        this.addInput(newInput);

        return newInput;
    }



    output_genRequest(gen)
    {
        // 'this' is the output

        gen.scope.push({
            nodeId:  this.node.id, 
            paramId: NULL });


        const [request, ignore] = this.node.genRequestStart(gen);
        if (ignore) return request;
            

        const connectedInputs = this.node.inputs.filter(i => i.connected);


        request.push(connectedInputs.length); // utility values like param count are stored as numbers
        
        connectedInputs.forEach(input => 
            request.push(...pushInputOrParam(input, gen)));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);
        
        return request;
    }



    updateParams()
    {
        this.paramValue.enableControlText(false);
                
        this.paramValue.controls[0].valueText =  this.isUnknown() ? UNKNOWN_DISPLAY : '';
        this.paramValue.controls[0].showBar   = !this.isUnknown();

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
            this._symbol.style.top = inputY[0]/2 + inputHeight/2;
        }
        else
        {
            this._symbol.style.top = inputY[0]/2 + inputHeight/2 - 4;
            this.label  .style.top = 'calc(50% - 1px)';
        }
        

        this.label.style.visibility = this._showOnlySymbol ? 'hidden'  : 'visible';
    }



    paramsToJson(nTab = 0)
    {
        return '';
    }
}
