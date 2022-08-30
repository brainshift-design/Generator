/*
    This is getting closer to Figma now, so here the format changes,
    and objects hold stroke values directly, which incoming stroke values just set.
*/

class GeometryBaseValue
extends GType
{
    nodeId;

    fill;
    stroke;



    constructor(type, nodeId)
    {
        super(type);

        this.nodeId = nodeId; 

        this.fill   = FillValue.default.copy();
        this.stroke = StrokeValue.NaN  .copy();
    }



    copyBase(base)
    {
        this.nodeId = base.nodeId;

        this.fill   = base.fill  .copy();
        this.stroke = base.stroke.copy();
    }



    isValid()
    {
        return this.fill  .isValid()
           && !this.stroke.isValid();
    }



    toFigmaObject()
    {
        return {
            nodeId: this.nodeId,

            fills:  this.fill.isValid() 
                    ? this.fill.toFigma() 
                    : [],
            
            ...this.stroke.toFigma()
        }
    }



    toString()
    {
        return      this.fill  .toString()
            + ' ' + this.stroke.toString();
    }
}



function parseGeometryBaseValue(str, i, obj)
{
    const fill   = parseFillValue  (str, i); i += fill  [1];
    const stroke = parseStrokeValue(str, i); i += stroke[1];

    obj.fill   = fill  [0];
    obj.stroke = stroke[0];

    return i;
}