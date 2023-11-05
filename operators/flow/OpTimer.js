class   OpTimer
extends OperatorBase
{
    paramInterval;
    paramWhile;
    paramLoop;

    updateTimer = -1;
    updateDelay =  0;



    constructor()
    {
        super(TIMER, 'timer', 'timer', iconTimer, defNodeWidth, true);

        this.subscription = true;
        this.canDisable   = true;
        this.iconOffsetY  = -2;
        

        this.addInput (new Input(ALL_VALUES));
        this.addOutput(new Output([ANY_VALUE], this.output_genRequest));


        this.inputs[0].addEventListener('connect',    () => OpTimer_onConnectInput(this));
        this.inputs[0].addEventListener('disconnect', () => OpTimer_onDisconnectInput(this));


        this.addParam(this.paramInterval = new NumberParam('interval', 'interval', true,  true, true, 5, 0));
        /*this.addParam(*/this.paramWhile    = new NumberParam('while',    'while',    true,  true, true, 1, 0, 1)/*)*/;
        /*this.addParam(*/this.paramLoop     = new NumberParam('loop',     '',         false, true, false)/*)*/;


        this.paramInterval.controls[0].suffix = ' sec';
        this.paramInterval.divider            = 0.5;

        this.paramWhile.divider               = 0.6;

        this.paramLoop.input.types.push(ANY_VALUE);
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

        request.push(...this.node.paramInterval.genRequest(gen));
        request.push(...this.node.paramWhile   .genRequest(gen));
        request.push(...this.node.paramLoop    .genRequest(gen));

            
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    
    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        super.updateValues(requestId, actionId, updateParamId, paramIds, values);


        const interval = values[paramIds.findIndex(id => id == 'interval')].toNumber();

        if (   interval > 0
            && this.enabled)
        {
            if (   this.updateTimer < 0
                || this.updateDelay != interval)
            {
                if (this.updateTimer >= 0)
                    clearTimeout(this.updateTimer);

                this.updateTimer = setTimeout(() => pushUpdate(null, [this]), interval * 1000);
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
        this.paramInterval.enableControlText(true);
        this.paramWhile   .enableControlText(false);
        this.paramLoop    .enableControlText(false);
    
        this.paramWhile.controls[0].valueText = '﻿';

        const arrowStyle = darkMode ? 'white' : 'black';
        this.paramLoop.controls[0].valueText = '<svg width="25" height="11" viewBox="0 0 25 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M23.991 0H24.991L24.991 2C24.991 4.76142 22.7524 7 19.991 7H14V6H19.991C22.2001 6 23.991 4.20914 23.991 2L23.991 0Z" fill="'+arrowStyle+'"/><rect width="4.97369" height="1" transform="matrix(0.707107 -0.707107 -0.707107 -0.707107 13.7036 7.224)" fill="'+arrowStyle+'"/><rect width="5" height="1" transform="matrix(0.707107 0.707107 0.707107 -0.707107 12.991 6.54858)" fill="'+arrowStyle+'"/><circle cx="0.5" cy="6.5" r="0.5" fill="'+arrowStyle+'"/><circle cx="4.5" cy="6.5" r="0.5" fill="'+arrowStyle+'"/><circle cx="8.5" cy="6.5" r="0.5" fill="'+arrowStyle+'"/></svg>';

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