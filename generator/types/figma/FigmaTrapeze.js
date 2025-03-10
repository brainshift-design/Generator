class FigmaTrapeze
extends FigmaVectorPath
{
    width;
    height;

    round;
    bias;



    constructor(nodeId, objectId, objectName, x, y, width, height, round, bias)
    {
        const tw = width * (1 + Math.min(0,  bias/100));
        const bw = width * (1 + Math.min(0, -bias/100));
        
        const tx = x + (width - tw) / 2;
        const bx = x + (width - bw) / 2;

        const points =
        [
            PointValue.create(nodeId, tx,      y         ),
            PointValue.create(nodeId, bx,      y + height),
            PointValue.create(nodeId, bx + bw, y + height),
            PointValue.create(nodeId, tx + tw, y         )
        ];

    
        super(
            nodeId, 
            objectId,
            objectName, 
            points,
            1, // closed
            0, // linear
            0, // even-odd winding
            round);

        this.type   = TRAPEZE;

        this.x      = x;
        this.y      = y;
        this.width  = width;
        this.height = height;

        this.round  = round;
        this.bias   = bias;

        
        this.createDefaultSpace(
            x + width /2, 
            y + height/2);
    }



    copy()
    {
        const copy = new FigmaTrapeze(
            this.nodeId,
            this.objectId,
            this.objectName,

            this.x,
            this.y,
            this.width,
            this.height,
            
            this.round,
            this.bias);

            
        copy.pathPoints = [...this.pathPoints];
        copy.pathData   = this.pathData;
    
        copy.copyBase(this);

        //copy.updatePathPoints();


        return copy;
    }



    toNewValue()
    {
        return TrapezeValue.fromObject(this);
    }
}
