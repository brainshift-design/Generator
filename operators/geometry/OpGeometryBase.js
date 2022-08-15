class   OpGeometryBase
extends OperatorBase
{
    paramFill;
    paramStroke;

    paramStrokeWeight;
    paramStrokeFit;
    paramStrokeJoin;
    paramStrokeMiter;


    btnProportional;

    refWidth  = Number.NaN;
    refHeight = Number.NaN;


    
    constructor(type, shortName, defWidth = 80)
    {
        super(type, shortName, defWidth);
    }



    addBaseParams()
    {
        this.addParam(this.paramFill         = new FillParam  ('fill',             'f',      true, true, true, GColorFillValue.default));
        this.addParam(this.paramStroke       = new FillParam  ('stroke',           's',      true, true, true));

        this.addParam(this.paramStrokeWeight = new NumberParam('strokeWeight',     'weight', true, true, true, 1, 0));
        this.addParam(this.paramStrokeFit    = new SelectParam('strokeFit',        'fit',    true, true, true, ['inside', 'center', 'outside'], 0));
        this.addParam(this.paramStrokeJoin   = new SelectParam('strokeJoin',       'join',   true, true, true, ['miter', 'bevel', 'round'], 0));
        this.addParam(this.paramStrokeMiter  = new NumberParam('strokeMiterLimit', 'limit',  true, true, true, 28.96, 0, 180, 2));

        this.paramStrokeMiter.control.setSuffix('°', true);


        //this.paramFill.fills.push(new GColorFillValue(0, 0, 0, 1));


        const cond = () => 
                  this.paramStroke.value.isValid()
               && isValidRgb(dataColorToRgb(this.paramStroke.value.color.toDataColor()))
            || this.paramStroke.connected;

        this.paramStrokeWeight.show = () => cond();
        this.paramStrokeFit   .show = () => cond();
        this.paramStrokeJoin  .show = () => cond();
        this.paramStrokeMiter .show = () => cond() && this.paramStrokeJoin.value == 0;
    } 



    output_genRequest(gen)
    {
        // 'this' is the output

        const input = this.node.inputs[0];

        const paramIds = [];


        if (input.connected)
        {
            request.push(...pushInputOrParam(input, gen));


            for (const param of this.node.params)
                if (param.input && param.input.connected) 
                    paramIds.push(param.id);

            request.push(paramIds.join(','));


            if (this.node.paramX     .input.connected) request.push(...this.node.paramX     .genRequest(gen));
            if (this.node.paramY     .input.connected) request.push(...this.node.paramY     .genRequest(gen));
            if (this.node.paramWidth .input.connected) request.push(...this.node.paramWidth .genRequest(gen));
            if (this.node.paramHeight.input.connected) request.push(...this.node.paramHeight.genRequest(gen));
            if (this.node.paramAngle .input.connected) request.push(...this.node.paramAngle .genRequest(gen));
            if (this.node.paramRound .input.connected) request.push(...this.node.paramRound .genRequest(gen));
        }
        else
        {
            request.push(
                ...this.node.paramX     .genRequest(gen),
                ...this.node.paramY     .genRequest(gen),
                ...this.node.paramWidth .genRequest(gen),
                ...this.node.paramHeight.genRequest(gen),
                ...this.node.paramAngle .genRequest(gen),
                ...this.node.paramRound .genRequest(gen));
        }


        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }
}