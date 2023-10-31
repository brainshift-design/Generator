class   OpWave
extends OperatorBase
{
    paramShape;
    paramBase;
    paramAmplitude;
    paramFrequency;
    paramOffset;
    paramBias;



    constructor()
    {
        super(NUMBER_WAVE, 'wave', 'wave', iconWave);

        this.cached      = false;
        this.canDisable  = true;
        this.iconOffsetY = 1;
        

        this.addOutput(new Output([NUMBER_VALUE], this.output_genRequest));


        this.addParam(this.paramShape     = new SelectParam('shape',     'shape',     false, true, true, ['square', 'saw', 'back saw', 'triangle', 'sine'], 4));
        this.addParam(this.paramBase      = new NumberParam('base',      'base',      true,  true, true, 0));
        this.addParam(this.paramAmplitude = new NumberParam('amplitude', 'amplitude', true,  true, true, 100));
        this.addParam(this.paramFrequency = new NumberParam('frequency', 'frequency', true,  true, true, 1, 0));
        this.addParam(this.paramOffset    = new NumberParam('offset',    'offset',    true,  true, true, 0));
        this.addParam(this.paramBias      = new NumberParam('bias',      'bias',      true,  true, true, 0, -100, 100));


        this.paramFrequency.controls[0].setDecimals(1);
        this.paramOffset   .controls[0].setDecimals(1);

        this.paramBias     .controls[0].suffix = '%';

        this.setAllParamDividers(0.56);
    }



    output_genRequest(gen)
    {
        // 'this' is the output

        gen.scope.push({
            nodeId:  this.node.id, 
            paramId: NULL });

        const [request, ignore] = this.node.genRequestStart(gen);
        if (ignore) return request;

        
        request.push(...this.node.paramShape    .genRequest(gen));
        request.push(...this.node.paramBase     .genRequest(gen));
        request.push(...this.node.paramAmplitude.genRequest(gen));
        request.push(...this.node.paramFrequency.genRequest(gen));
        request.push(...this.node.paramOffset   .genRequest(gen));
        request.push(...this.node.paramBias     .genRequest(gen));


        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }
}