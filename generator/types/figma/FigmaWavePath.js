class FigmaWavePath
extends FigmaVectorPath
{
    shape;
    _x;
    _y;
    _width;
    amplitude;
    frequency;
    offset;
    alignX;
    alignY;

    

    constructor(nodeId, objectId, objectName, shape, x, y, width, amplitude, frequency, offset, alignX, alignY)
    {
        let points = makeWave(
            shape, 
            x,
            y,
            width, 
            amplitude, 
            frequency,
            offset,
            alignX,
            alignY);

        points = points.map(p => PointValue.fromPoint(nodeId, p));


        points.forEach(p => 
        {
            // p.y.value = height/2 + (p.y.value - height/2) * height/width;

            // if (width < 0) 
            //     p.x.value += width;
        });

        // if (width  < 0) width  *= -1;
        // if (height < 0) height *= -1;


        super(
            nodeId, 
            objectId,
            objectName,
            points,
            0,  // open
            2,  // cubic
            0,  // even-odd winding
            0); // no round
        

        this.shape     = shape;
        this._x        = x;
        this._y        = y;
        this._width    = width;
        this.amplitude = amplitude;
        this.frequency = frequency;
        this.offset    = offset;
        this.alignX    = alignX;
        this.alignY    = alignY;


        let height = amplitude;
        
        this.createDefaultSpace(
            x + width /2,
            y + height/2);
    }



    copy()
    {
        const copy = new FigmaWavePath(
            this.nodeId,
            this.objectId,
            this.objectName,

            this.shape,
            this._x,
            this._y,
            this._width,
            this.amplitude,
            this.frequency,
            this.offset,
            this.alignX,
            this.alignY);


        copy.pathPoints = [...this.pathPoints];
        copy.pathData   = this.pathData;

        copy.copyBase(this);


        return copy;
    }
}