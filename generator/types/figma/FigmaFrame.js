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

        this.createDefaultSpace(
            x + width /2, 
            y + height/2);
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



    getCount()
    {
        return super.getCount() + this.children.length;
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
   
            /* 24 */ this.x,
            /* 25 */ this.y,
            /* 26 */ this.width,
            /* 27 */ this.height,

            /* 28 */ this.round,

            /* 29 */ this.children.map(o => o.toData())
        ];
    }
}



