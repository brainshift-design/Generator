class   OpGeometryBase
extends OperatorBase
{
    paramFill;
    paramStroke;


    btnProportional;

    refWidth  = Number.NaN;
    refHeight = Number.NaN;


    
    constructor(type, shortName, defWidth = 80)
    {
        super(type, shortName, defWidth);
    }



    addBaseParams()
    {
        this.addParam(this.paramFill   = new FillParam  ('fill',   'f', false, true, true, FillValue.default));
        this.addParam(this.paramStroke = new StrokeParam('stroke', 's', false, true, true, StrokeValue.NaN));
    } 



    updateBaseValues(updateParamId, obj)
    {
        setParamValue(this.paramFill,   obj.fill,   updateParamId);
        setParamValue(this.paramStroke, obj.stroke, updateParamId);

        this.updateParamDisplay();
    }
}