class FigmaEllipse
extends FigmaShape
{
    x;
    y;
    width;
    height;

    from;
    to;
    inner;

    

    constructor(nodeId, objectId, objectName, x, y, width, height, from, to, inner)
    {
        super(ELLIPSE, nodeId, objectId, objectName);
        
        this.x      = x;
        this.y      = y;
        this.width  = width;
        this.height = height;

        this.from   = from;
        this.to     = to;
        this.inner  = inner;
    }



    copy()
    {
        const copy = new FigmaEllipse(
            this.nodeId,
            this.objectId,
            this.objectName,

            this.x,
            this.y,
            this.width,
            this.height,
            
            this.from,
            this.to,
            this.inner);


        copy.copyBase(this);


        return copy;
    }



    toData()
    {
        return [
            ...super.toData(),
   
            /* 21 */ this.x,
            /* 22 */ this.y,
            /* 23 */ this.width,
            /* 24 */ this.height,

            /* 25 */ this.from,
            /* 26 */ this.to,
            /* 27 */ this.inner
        ];
    }
}