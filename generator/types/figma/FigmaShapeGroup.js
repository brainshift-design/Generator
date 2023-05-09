class FigmaShapeGroup
extends FigmaShape
{
    children;



    constructor(nodeId, nodeName, objectId, children = [])
    {
        super(SHAPE_GROUP, nodeId, nodeName, objectId);
        
        this.children = clone(children);
    }



    copy()
    {
        const copy = new FigmaShapeGroup(
            this.nodeId,
            this.nodeName,
            this.objectId,
            this.children);

        copy.copyBase(this);

        return copy;
    }
}