class FigmaShapeGroup
extends FigmaShape
{
    children;



    constructor(nodeId, objectId, children = [])
    {
        super(SHAPE_GROUP, nodeId, objectId);
        
        this.children = clone(children);
    }



    copy()
    {
        const copy = new FigmaShapeGroup(
            this.nodeId,
            this.objectId,
            this.children);

        copy.copyBase(this);

        return copy;
    }
}