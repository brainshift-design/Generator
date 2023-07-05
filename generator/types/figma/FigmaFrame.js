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
   
            /* 19 */ this.x,
            /* 20 */ this.y,
            /* 21 */ this.width,
            /* 22 */ this.height,

            /* 23 */ this.round,

            /* 24 */ this.children.map(o => o.toData())
        ];
    }
}



