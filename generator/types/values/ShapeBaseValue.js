/*
    This is getting closer to Figma now, so here the format changes,
    and objects hold stroke values directly, which incoming stroke values just set.
*/

class ShapeBaseValue
extends GValue
{
    nodeId;

    // fill;
    // stroke;



    constructor(type, nodeId)
    {
        super(type);

        this.nodeId = nodeId; 

        // this.fill   = FillValue.default.copy();
        // this.stroke = StrokeValue.NaN  .copy();
    }



    copyBase(base)
    {
        this.nodeId = base.nodeId;

        // this.fill   = base.fill  .copy();
        // this.stroke = base.stroke.copy();
    }



    isValid()
    {
        return true;
        // return this.fill  .isValid()
        //    && !this.stroke.isValid();
    }



    // toString()
    // {
    //     return      this.fill  .toString()
    //         + ' ' + this.stroke.toString();
    // }



    // toDisplayString()
    // {
    //     return      this.fill  .toDisplayString()
    //         + ' ' + this.stroke.toDisplayString();
    // }
}



// function parseShapeBaseValue(str, i, obj)
// {
//     const fill   = parseFillValue  (str, i); i += fill  [1];
//     const stroke = parseStrokeValue(str, i); i += stroke[1];

//     obj.fill   = fill  [0];
//     obj.stroke = stroke[0];

//     return i;
// }