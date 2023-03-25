class   OpColorInterpolate
extends OpColorBase
{
    paramSpace;
    paramAmount;
    paramGamma;



    constructor()
    {
        super(COLOR_INTERPOLATE, 'inter');

        
        this.addInput(new Input(COLOR_TYPES));
        this.addInput(new Input(COLOR_TYPES));

        this.addOutput(new Output([COLOR_VALUE], this.output_genRequest));


        this.addParam(this.paramSpace  = new SelectParam('space',  '',  false, true, true, OpColorSpaces.map(s => s[1]), 1));
        this.addParam(this.paramAmount = new NumberParam('amount', '',  true,  true, true, 50, 0,  100, 0));
        this.addParam(this.paramGamma  = new NumberParam('gamma',  'γ', true,  true, true, 1,  0.01, 4, 2));
      
        
        this.paramSpace.controls[0].setMin(1);
        this.paramSpace.excludeFromMenu.push(0);
        this.paramSpace.input.outputMustBeCached = true;

        
        this.paramAmount.controls[0].min = Number.MIN_SAFE_INTEGER; // allow
        this.paramAmount.controls[0].max = Number.MAX_SAFE_INTEGER; // extrapolation

        this.paramAmount.controls[0].setSuffix('%', true);
        

        this.header.connectionPadding = 12.5;

        
        createTooltip(ttInterpolationSpace);
        createTooltipPointerTrap(ttInterpolationSpace);
        
        this.paramSpace.getTooltip = () => 
            settings.showTooltipColorInterpolation 
            ? ttInterpolationSpace 
            : null;
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


        request.push(...this.node.paramSpace .genRequest(gen));
        request.push(...this.node.paramAmount.genRequest(gen));
        request.push(...this.node.paramGamma .genRequest(gen));


        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        const col = values[paramIds.findIndex(id => id == 'value')];

        this._color = 
            col
            ? col.toDataColor()
            : dataColor_NaN;

        super.updateValues(requestId, actionId, updateParamId, paramIds, values);
    }
}



function removeOpColorInterpolateParamWires(node)
{
    if (node.paramGamma.input.connected)
        uiDisconnect(node.paramGamma.input);

    for (const input of node.paramGamma.output.connectedInputs)
        uiDisconnect(input);
}



function showOpColorInterpolateGammaControl(node, show)
{
    if (    show
        && !node.inner.contains(node.paramGamma.div))
        node.inner.appendChild(node.paramGamma.div);

    else if (!show
           && node.inner.contains(node.paramGamma.div))
        node.inner.removeChild(node.paramGamma.div);
}
