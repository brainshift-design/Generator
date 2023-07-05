class FigmaShapeGroup
extends FigmaShape
{
    children;



    constructor(nodeId, objectId, objectName, children = [])
    {
        super(SHAPE_GROUP, nodeId, objectId, objectName);
        
        this.children = children.map(c => c.copy());
    }



    copy()
    {
        const copy = new FigmaShapeGroup(
            this.nodeId,
            this.objectId,
            this.objectName,

            this.children);

        copy.copyBase(this);

        return copy;
    }



    toJsonObject()
    {
        return {
            ...super.toJsonObject(),
   
            children: this.children
        };
    }



    toData()
    {
        return [
            ...super.toData(),
   
            /* 21 */ this.children.map(o => o.toData())
        ];
    }
}