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



    toJsonObject()
    {
        return {
            ...super.toJsonObject(),
   
            x:      this.x,
            y:      this.y,
            width:  this.width,
            height: this.height,

            from:   this.from,
            to:     this.to,
            inner:  this.inner
        };
    }



    toData()
    {
        return [
            ...super.toData(),
   
            /* 19 */ this.x,
            /* 20 */ this.y,
            /* 21 */ this.width,
            /* 22 */ this.height,

            /* 23 */ this.from,
            /* 24 */ this.to,
            /* 25 */ this.inner
        ];
    }
}