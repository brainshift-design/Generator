class FigmaFrame
extends FigmaShape
{
    x;
    y;
    width;
    height;

    round;
    
    clip;

    children;



    constructor(nodeId, objectId, objectName, x, y, width, height, round, clip, children = [])
    {
        super(FRAME, nodeId, objectId, objectName);
        
        this.x        = x;
        this.y        = y;
        this.width    = width;
        this.height   = height;
    
        this.round    = round;

        this.clip     = clip;
    
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
  
            this.clip,
    
            this.children);


        copy.copyBase(this);


        return copy;
    }



    getCount()
    {
        let nObjects = super.getCount();

        for (const obj of this.children)
            nObjects += obj.getCount();

        return nObjects;
    }


    
    checkFlipped(flipX, flipY)
    {
        super.checkFlipped(flipX, flipY);

        for (const obj of this.children)
        {
            obj.checkFlipped(flipX, flipY);

            if (flipX)
            {
                obj.xp0.x = this.width - obj.xp0.x;
                obj.xp1.x = this.width - obj.xp1.x;
                obj.xp2.x = this.width - obj.xp2.x;
            }

            if (flipY)
            {
                obj.xp0.y = this.height - obj.xp0.y;
                obj.xp1.y = this.height - obj.xp1.y;
                obj.xp2.y = this.height - obj.xp2.y;
            }
        }
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

            clip:     this.clip,
        
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

            /* 29 */ this.clip,

            /* 30 */ this.children.map(o => o.toData())
        ];
    }
}



