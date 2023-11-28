class FigmaEllipse
extends FigmaShape
{
    x;
    y;
    width;
    height;
    round;

    from;
    to;
    inner;

    

    constructor(nodeId, objectId, objectName, x, y, width, height, round, from, to, inner)
    {
        super(ELLIPSE, nodeId, objectId, objectName);
        
        this.x      = x;
        this.y      = y;
        this.width  = width;
        this.height = height;
        this.round  = round;

        this.from   = from;
        this.to     = to;
        this.inner  = inner;

        
        this.createDefaultSpace(
            x + width /2, 
            y + height/2);
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
            this.round,
            
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
   
            /* 24 */ this.x,
            /* 25 */ this.y,
            /* 26 */ this.width,
            /* 27 */ this.height,
            /* 28 */ this.round,

            /* 29 */ this.from,
            /* 30 */ this.to,
            /* 31 */ this.inner
        ];
    }
}