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
        this.addParam(this.paramFill         = new FillParam  ('fill',         'f',      false, true, true, ColorFillValue.default));
        this.addParam(this.paramStroke       = new FillParam  ('stroke',       's',      false, true, true));
        this.addParam(this.paramStrokeWeight = new NumberParam('strokeWeight', 'weight', true,  true, true, 1, 0));
        this.addParam(this.paramStrokeFit    = new SelectParam('strokeFit',    'fit',    true,  true, true, ['inside', 'center', 'outside'], 0));
        this.addParam(this.paramStrokeJoin   = new SelectParam('strokeJoin',   'join',   true,  true, true, ['miter', 'bevel', 'round'], 0));
        this.addParam(this.paramStrokeMiter  = new NumberParam('strokeMiter',  'miter',  true,  true, true, 28.96, 0, 180, 2));

        this.paramStrokeMiter.control.setSuffix('°', true);


        const cond = () => 
               this.paramStroke.value.isValid() //&& isValidRgb(dataColorToRgb(this.paramStroke.value.color.toDataColor()))
            || this.paramStroke.connected;

        this.paramStrokeWeight.show = () => cond();
        this.paramStrokeFit   .show = () => cond();
        this.paramStrokeJoin  .show = () => cond();
        this.paramStrokeMiter .show = () => cond() && this.paramStrokeJoin.value == 0;
    } 



    updateBaseValues(updateParamId, paramIds, values, obj)
    {
        this.paramFill        .setValue(obj.fill,         false, true, false);
        this.paramStroke      .setValue(obj.stroke,       false, true, false);
        this.paramStrokeWeight.setValue(obj.strokeWeight, false, true, false);
        this.paramStrokeFit   .setValue(obj.strokeFit,    false, true, false);
        this.paramStrokeJoin  .setValue(obj.strokeJoin,   false, true, false);
        this.paramStrokeMiter .setValue(obj.strokeMiter,  false, true, false);

        super.updateValues(updateParamId, paramIds, values);
    }
}