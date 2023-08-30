class   OpTimer
extends OperatorBase
{
    paramDelay;

    updateTimer = -1;
    updateDelay =  0;



    constructor()
    {
        super(TIMER, 'timer', 'timer', iconTimer);

        this.subscription = true;
        this.canDisable   = true;
        this.iconOffsetY  = -2;
        

        this.addInput (new Input(ALL_VALUES));
        this.addOutput(new Output([ANY_VALUE], this.output_genRequest));


        this.inputs[0].addEventListener('connect',    () => OpTimer_onConnectInput(this));
        this.inputs[0].addEventListener('disconnect', () => OpTimer_onDisconnectInput(this));


        this.addParam(this.paramDelay = new NumberParam('delay', 'delay', true, true, true, 5, 0));

        this.paramDelay.controls[0].suffix = ' sec';
        this.paramDelay.divider            = 0.45;
    }



    output_genRequest(gen)
    {
        // 'this' is the output

        gen.scope.push({
            nodeId:  this.node.id, 
            paramId: NULL });

        const [request, ignore] = this.node.genRequestStart(gen);
        if (ignore) return request;


        const input = this.node.inputs[0];


        request.push(input.connected ? 1 : 0);


        if (input.connected)
            request.push(...pushInputOrParam(input, gen));

        request.push(...this.node.paramDelay.genRequest(gen));

            
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    
    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        super.updateValues(requestId, actionId, updateParamId, paramIds, values);


        const delay = values[paramIds.findIndex(id => id == 'delay')].toNumber();

        if (delay > 0)
        {
            if (   this.updateTimer < 0
                || this.updateDelay != delay)
            {
                if (this.updateTimer >= 0)
                    clearTimeout(this.updateTimer);

                this.updateTimer = setTimeout(() => pushUpdate(null, [this]), delay * 1000);
            } 
        }
        else if (this.updateTimer >= 0)
        {
            clearTimeout(this.updateTimer);
            this.updateTimer = -1;
        }
    }


    
    updateParams()
    {
        this.paramDelay.enableControlText(true);
    
        this.updateParamControls();
    }



    getHeaderColors(options = {})
    {
        const colors = super.getHeaderColors(options);
        const type   = this.outputs[0].types[0];

        colors.text  = isDark(colors.back) ? [1, 1, 1, 1] : [0, 0, 0, 1]; 

        const gray =
                this.active
            && !this.inputs[0].connected;

        colors.input  = gray ? rgb_a(colors.text, 0.4)  : rgb_a(rgbSaturateHsv(rgbFromType(type, true), 0.5), 0.8);
        colors.output = gray ? rgb_a(colors.text, 0.35) : rgb_a(rgbSaturateHsv(rgbFromType(type, true), 0.5), 0.7);
        colors.wire   = gray ? rgbFromType(ANY_VALUE, true) : rgbFromType(type, true);

        return colors;
    }



    toJsCode(gen)
    {
        return '';
    }
}



function OpTimer_onConnectInput(node)
{
    node.outputs[0].types = [...node.inputs[0].connectedOutput.types];
}



function OpTimer_onDisconnectInput(node)
{
    node.outputs[0].types = [ANY_VALUE];
}