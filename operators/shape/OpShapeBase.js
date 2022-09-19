class   OpShapeBase
extends OperatorBase
{
    // paramFill;
    // paramStroke;


    // btnProportional;

    // refWidth  = Number.NaN;
    // refHeight = Number.NaN;


    
    constructor(type, shortName, defWidth = 80)
    {
        super(type, shortName, defWidth);
    }



    // addBaseParams()
    // {
    //     this.addParam(this.paramFill   = new FillParam  ('fill',   'fill',   false, true, true, FillValue.default));
    //     this.addParam(this.paramStroke = new StrokeParam('stroke', 'stroke',        true, true, StrokeValue.NaN));

    //     this.paramStroke.input.addEventListener('disconnect', () => { this.paramStroke.setValue(StrokeValue.NaN, false, true, false); });
    // } 



    // getBaseValuesForUndo()
    // {
    //     return [ 
    //         [this.paramFill  .id, 
    //          this.paramFill  .value],

    //         [this.paramStroke.id, 
    //          this.paramStroke.value]];
    // }



    // updateBaseValues(updateParamId, paramIds, values)
    // {
    //     const fill   = values[paramIds.findIndex(id => id == 'fill'  )];
    //     const stroke = values[paramIds.findIndex(id => id == 'stroke')];

    //     setParamValue(this.paramFill,   fill,   updateParamId);
    //     setParamValue(this.paramStroke, stroke, updateParamId);

    //     this.updateParamDisplay();
    // }
}