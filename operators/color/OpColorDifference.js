class   OpColorDifference
extends OperatorBase
{
    static { Operator.types[COLOR_DIFFERENCE] = this; }



    paramDeltaE;
    paramSpace;
    param1;
    param2;
    param3;


    constructor()
    {
        super(COLOR_DIFFERENCE, 'colorDiff', 'difference', iconColorDifference);

        this.outputValueType = ANY_VALUE;


        this.addInput(new Input([COLOR_VALUE, FILL_VALUE, COLOR_STOP_VALUE]));
        this.addInput(new Input([COLOR_VALUE, FILL_VALUE, COLOR_STOP_VALUE]));

        this.addOutput(new Output([NUMBER_VALUE], this.output_genRequest));


        this.addParam(this.paramDeltaE = new OptionParam('deltaE', '', false, true,  true, ['ΔE 76', 'ΔE 94', 'ΔE 00', 'ΔE CMC', 'ΔE ITU'], 2));
        this.addParam(this.paramSpace  = new OptionParam('space',  '', false, true,  true, ['okLab', 'Lab'], 0));
        this.addParam(this.param1      = new NumberParam('param1', '', true,  true,  true, 100, 0, 100));
        this.addParam(this.param2      = new NumberParam('param2', '', true,  true,  true, 100, 0, 100));
        this.addParam(this.param3      = new NumberParam('param3', '', true,  true,  true, 100, 0, 100));

        this.param1.controls[0].setMin(  0);
        this.param1.controls[0].setMax(100);

        this.param2.controls[0].setMin(  0);
        this.param2.controls[0].setMax(100);

        this.param3.controls[0].setMin(  0);
        this.param3.controls[0].setMax(100);

        this.param1.controls[0].suffix = '%';
        this.param2.controls[0].suffix = '%';
        this.param3.controls[0].suffix = '%';

        this.param1.divider = 0.42;
        this.param2.divider = 0.42;
        this.param3.divider = 0.42;


        this.paramDeltaE.addEventListener('change', () => 
        {
            if (this.paramDeltaE.value.value == 4)
            {
                if (this.paramSpace.output.connected) this.paramSpace.output.connectedInputs.forEach(i => uiDisconnect(i));
                if (this.paramSpace. input.connected) uiDisconnect(this.paramSpace.input);
            }

            if (   this.paramDeltaE.value.value == 0
                || this.paramDeltaE.value.value == 4)
            {
                if (this.param1.output.connected) this.param1.output.connectedInputs.forEach(i => uiDisconnect(i));
                if (this.param2.output.connected) this.param2.output.connectedInputs.forEach(i => uiDisconnect(i));

                if (this.param1.input.connected) uiDisconnect(this.param1.input);
                if (this.param2.input.connected) uiDisconnect(this.param2.input);
            }

            if (   this.paramDeltaE.value.value == 0
                || this.paramDeltaE.value.value == 3
                || this.paramDeltaE.value.value == 4)
            {
                if (this.param3.output.connected) this.param3.output.connectedInputs.forEach(i => uiDisconnect(i));
                if (this.param3. input.connected) uiDisconnect(this.param3.input);
            }
        });
    }



    output_genRequest(gen)
    {
        // 'this' is the output


        if (gen.passedNodes.includes(this.node))
        {
            return [
                this.node.type, 
                this.node.id, 
                this.node.name];
        }


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

        else if (input0.connected) request.push(1, 0, ...pushInputOrParam(input0, gen));
        else if (input1.connected) request.push(1, 1, ...pushInputOrParam(input1, gen));
            
        else                       request.push(0);


        request.push(...this.node.paramDeltaE.genRequest(gen));
        request.push(...this.node.paramSpace .genRequest(gen));
        request.push(...this.node.param1     .genRequest(gen));
        request.push(...this.node.param2     .genRequest(gen));
        request.push(...this.node.param3     .genRequest(gen));

        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);


        return request;
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        const type   = values[paramIds.findIndex(id => id == 'type'  )];
        const deltaE = values[paramIds.findIndex(id => id == 'deltaE')];
        
        if (type)
            this.headerOutputs[0].types = [type.value];


        switch (deltaE.value)
        {
            case 0:
                if (!this.paramHolder.contains(this.paramSpace.div)) this.paramHolder.appendChild(this.paramSpace.div);
                if ( this.paramHolder.contains(this.param1    .div)) this.paramHolder.removeChild(this.param1    .div);
                if ( this.paramHolder.contains(this.param2    .div)) this.paramHolder.removeChild(this.param2    .div);
                if ( this.paramHolder.contains(this.param3    .div)) this.paramHolder.removeChild(this.param3    .div);

                break;

            case 1:
            case 2:
                this.param1.setName('× H');
                this.param2.setName('× C');
                this.param3.setName('× L');

                if (!this.paramHolder.contains(this.paramSpace.div)) this.paramHolder.appendChild(this.paramSpace.div);
                if (!this.paramHolder.contains(this.param1    .div)) this.paramHolder.appendChild(this.param1    .div);
                if (!this.paramHolder.contains(this.param2    .div)) this.paramHolder.appendChild(this.param2    .div);
                if (!this.paramHolder.contains(this.param3    .div)) this.paramHolder.appendChild(this.param3    .div);

                break;

            case 3:
                this.param1.setName('× C');
                this.param2.setName('× L');

                if (!this.paramHolder.contains(this.paramSpace.div)) this.paramHolder.appendChild(this.paramSpace.div);
                if (!this.paramHolder.contains(this.param1    .div)) this.paramHolder.appendChild(this.param1    .div);
                if (!this.paramHolder.contains(this.param2    .div)) this.paramHolder.appendChild(this.param2    .div);
                if ( this.paramHolder.contains(this.param3    .div)) this.paramHolder.removeChild(this.param3    .div);

                break;

            case 4:
                if (this.paramHolder.contains(this.paramSpace.div)) this.paramHolder.removeChild(this.paramSpace.div);
                if (this.paramHolder.contains(this.param1    .div)) this.paramHolder.removeChild(this.param1    .div);
                if (this.paramHolder.contains(this.param2    .div)) this.paramHolder.removeChild(this.param2    .div);
                if (this.paramHolder.contains(this.param3    .div)) this.paramHolder.removeChild(this.param3    .div);
                break;
        }


        // super.updateParamControls();

        
        super.updateValues(requestId, actionId, updateParamId, paramIds, values);
    }
}