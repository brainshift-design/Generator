class   OpColorInterpolate
extends OpColorBase
{
    paramSpace;
    paramAmount;



    constructor()
    {
        super(COLOR_INTERPOLATE, 'inter', 80);

        
        this.addInput(new Input(COLOR_TYPES));
        this.addInput(new Input(COLOR_TYPES));

        this.addOutput(new Output(COLOR, this.output_genRequest));


        this.addParam(this.paramSpace  = new SelectParam('space',  '',  false, true, true, OpColorSpaces.map(s => s[1]), 1));
        this.addParam(this.paramAmount = new NumberParam('amount', '',  true,  true, true, 50, 0, 100, 0));
      
        
        this.paramSpace.control.setMin(1);

        
        this.paramAmount.control.min = Number.MIN_SAFE_INTEGER; // allow
        this.paramAmount.control.max = Number.MAX_SAFE_INTEGER; // extrapolation

        this.paramAmount.control.setSuffix('%', true);
        

        this.header.connectionPadding = 12.5;



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

        if (!isEmpty(this.cache))
            return this.cache;


        gen.scope.push({
            nodeId:  this.node.id, 
            paramId: '' });

        const [req, ignore] = this.node.genRequestStart(gen);
        if (ignore) return req;


        const input0 = this.node.inputs[0];
        const input1 = this.node.inputs[1];

        
        if (   input0.connected
            && input1.connected)   req.push(2,
                                       ...input0.connectedOutput.genRequest(gen),
                                       ...input1.connectedOutput.genRequest(gen));

        else if (input0.connected) req.push(1, ...input0.connectedOutput.genRequest(gen));
        else if (input1.connected) req.push(1, ...input1.connectedOutput.genRequest(gen));
            
        else                       req.push(0);


        req.push(...this.node.paramSpace .genRequest(gen));
        req.push(...this.node.paramAmount.genRequest(gen));


        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return req;
    }



    updateValues(updateParamId, paramIds, values)
    {
        console.log('updateValues.values = ', values);
        const col    = values[paramIds.findIndex(id => id == COLOR_VALUE)];
        //const amount = values[paramIds.findIndex(id => id == 'amount')];

console.log('col.space =', col.space);
        this.paramSpace .setValue(col.space, false, true, false);
        //this.paramAmount.setValue(amount,    false, true, false);

        this._color = col.toDataColor();


        super.updateValues(updateParamId, paramIds, values);
    }



    canShowColor()
    {
        return this.inputs[0].connected
            || this.inputs[1].connected;
    }
}