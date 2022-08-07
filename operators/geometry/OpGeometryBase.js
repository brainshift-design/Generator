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
        this.addParam(this.paramFill         = new FillParam  ('fill',             'f',      true, true, true));
        this.addParam(this.paramStroke       = new FillParam  ('stroke',           's',      true, true, true));

        this.addParam(this.paramStrokeWeight = new NumberParam('strokeWeight',     'weight', true, true, true, 1, 0));
        this.addParam(this.paramStrokeFit    = new SelectParam('strokeFit',        'fit',    true, true, true, ['inside', 'center', 'outside'], 0));
        this.addParam(this.paramStrokeJoin   = new SelectParam('strokeJoin',       'join',   true, true, true, ['miter', 'bevel', 'round'], 0));
        this.addParam(this.paramStrokeMiter  = new NumberParam('strokeMiterLimit', 'limit',  true, true, true, 28.96, 0, 180, 2));

        this.paramStrokeMiter.control.setSuffix('°', true);


        //this.paramFill.fills.push(new GColorFillValue(0, 0, 0, 1));


        const cond = () => 
               this.paramStroke.fills.length > 0
            || this.paramStroke.connected;

        this.paramStrokeWeight.show = () => cond;
        this.paramStrokeFit   .show = () => cond;
        this.paramStrokeJoin  .show = () => cond;
        this.paramStrokeMiter .show = () => cond && this.paramStrokeJoin.value == 0;
    } 
}