class FigmaBoolean
extends FigmaShape
{
    operation;
    children;



    constructor(nodeId, objectId, objectName, operation, children = [])
    {
        super(BOOLEAN, nodeId, objectId, objectName);
        
        this.operation = operation;
        this.children  = children.map(c => c.copy());
    }



    copy()
    {
        const copy = new FigmaBoolean(
            this.nodeId,
            this.objectId,
            this.objectName,
            this.operation,
            this.children);

        copy.copyBase(this);

        return copy;
    }
}