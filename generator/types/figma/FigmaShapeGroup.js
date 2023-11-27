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



    getCount()
    {
        return super.getCount() + this.children.length;
    }



    applyTransform(xform, affectSpace)
    {
        for (const obj of this.children)
            obj.applyTransform(xform, affectSpace);
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
   
            /* 23 */ this.children.map(o => o.toData())
        ];
    }
}