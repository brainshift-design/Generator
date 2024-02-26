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


        super(
            nodeId, 
            objectId,
            objectName,
            points,
            0,                  // open
            shape == 4 ? 2 : 0, // cubic
            0,                  // even-odd winding
            0);                 // no round
        

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