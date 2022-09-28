class   OpColorInterpolate
extends OpColorBase
{
    paramSpace;
    paramAmount;
    paramGamma;



    constructor()
    {
        super(COLOR_INTERPOLATE, 'inter', 80);

        
        this.addInput(new Input(COLOR_TYPES));
        this.addInput(new Input(COLOR_TYPES));

        this.addOutput(new Output([COLOR], this.output_genRequest));


        this.addParam(this.paramSpace  = new SelectParam('space',  '',  false, true, true, OpColorSpaces.map(s => s[1]), 1));
        this.addParam(this.paramAmount = new NumberParam('amount', '',  true,  true, true, 50, 0,  100, 0));
        this.addParam(this.paramGamma  = new NumberParam('gamma',  'γ', true,  true, true, 1,  0.01, 4, 2));
      
        
        this.paramSpace.control.setMin(1);

        
        this.paramAmount.control.min = Number.MIN_SAFE_INTEGER; // allow
        this.paramAmount.control.max = Number.MAX_SAFE_INTEGER; // extrapolation

        this.paramAmount.control.setSuffix('%', true);
        

        this.header.connectionPadding = 12.5;

        
        //this._color = dataColor_NaN;

        
        // this.inputs[0].addEventListener('connect', () => 
        // {
        //     if (   !this.inputs[1].connected
        //         && !graphView.loadingNodes) 
        //         this.paramSpace.setValue(
        //             colorSpaceIndex(this.inputs[0].data.color[0]),
        //             true, true, false);
        // });


        // this.inputs[1].addEventListener('connect', () => 
        // {
        //     if (   !this.inputs[0].connected
        //         && !graphView.loadingNodes) 
        //         this.paramSpace.setValue(
        //             colorSpaceIndex(this.inputs[1].data.color[0]),
        //             true, true, false);
        // });


        this.paramSpace.control.addEventListener('change', () => hideTooltip(ttInterpolationSpace));


        createTooltip(ttInterpolationSpace);
        createTooltipSrc(this.paramSpace.control, () => ttInterpolationSpace);
    }



    output_genRequest(gen)
    {
        // 'this' is the output

        // if (!isEmpty(this.cache))
        //     return this.cache;


        gen.scope.push({
            nodeId:  this.node.id, 
            paramId: '' });

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



    updateValues(updateParamId, paramIds, values)
    {
        const col = values[paramIds.findIndex(id => id == 'value')];

        this._color = 
            col
            ? col.toDataColor()
            : dataColor_NaN;

        super.updateValues(updateParamId, paramIds, values);


        showOpColorInterpolateGammaControl(this, this.paramSpace.value == 1);    
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
