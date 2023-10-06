class FigmaFrame
extends FigmaShape
{
    x;
    y;
    width;
    height;

    round;
    
    children;



    constructor(nodeId, objectId, objectName, x, y, width, height, round, children = [])
    {
        super(FRAME, nodeId, objectId, objectName);
        
        this.x        = x;
        this.y        = y;
        this.width    = width;
        this.height   = height;
    
        this.round    = round;
    
        this.children = children.map(c => c.copy());
    }



    copy()
    {
        const copy = new FigmaFrame(
            this.nodeId,
            this.objectId,
            this.objectName,
    
            this.x,
            this.y,
            this.width,
            this.height,
    
            this.round,
    
            this.children);


        copy.copyBase(this);


        return copy;
    }



    toJsonObject()
    {
        return {
            ...super.toJsonObject(),
   
            x:        this.x,
            y:        this.y,
            width:    this.width,
            height:   this.height,
        
            round:    this.round,
        
            children: this.children
        };
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

            /* 28 */ this.children.map(o => o.toData())
        ];
    }
}



