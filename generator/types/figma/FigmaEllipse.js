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
   
            /* 23 */ this.x,
            /* 24 */ this.y,
            /* 25 */ this.width,
            /* 26 */ this.height,
            /* 27 */ this.round,

            /* 28 */ this.from,
            /* 29 */ this.to,
            /* 30 */ this.inner
        ];
    }
}