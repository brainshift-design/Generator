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

        this.paramStroke.input.addEventListener('disconnect', () => { this.paramStroke.setValue(StrokeValue.NaN, false, true, false); });
    } 



    updateBaseValues(updateParamId, paramIds, values)
    {
        const fill   = values[paramIds.findIndex(id => id == 'fill'  )];
        const stroke = values[paramIds.findIndex(id => id == 'stroke')];

        setParamValue(this.paramFill,   fill,   updateParamId);
        setParamValue(this.paramStroke, stroke, updateParamId);

        this.updateParamDisplay();
    }
}