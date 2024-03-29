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
        let nObjects =
            this.children.length > 0
            ? super.getCount()
            : 0;

        for (const obj of this.children)
            nObjects += obj.getCount();

        return nObjects;
    }



    createDefaultSpace(cx = 0, cy = 0)
    {
        super.createDefaultSpace(cx, cy);

        for (const obj of this.children)
            obj.createDefaultSpace(cx, cy);
    }



    resetSpace(bounds, singlePoint = false, cx = 0.5, cy = 0.5, units = 0)
    {
        super.resetSpace(bounds, false, cx, cy, units);

        for (const obj of this.children)
            obj.resetSpace(bounds, false, cx, cy, units);
    }



    getBounds()
    {
        return getObjBounds(this.children);
    }



    applyTransform(xform, affectSpace)
    {
        // super.applyTransform(xform, affectSpace);

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
   
            /* 24 */ this.children.map(o => o.toData())
        ];
    }
}