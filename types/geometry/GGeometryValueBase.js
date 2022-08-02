class GGeometryValueBase
extends GType
{
    nodeId;

    fills = [];
    
    //stroke = null;



    constructor(type = GEOMETRY_VALUE, nodeId)
    {
        super(type);

        this.nodeId = nodeId;
    }



    toFigmaObject()
    {
        return {
            nodeId: this.nodeId,
            fills:  this.fills
        }
    }



    toString()
    {
        return '';
    }
}