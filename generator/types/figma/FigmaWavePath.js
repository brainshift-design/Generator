class FigmaWavePath
extends FigmaVectorPath
{
    _x;
    _y;
    _width;
    _height;

    shape;
    base;
    amplitude;
    frequency;
    offset;
    bias;

    

    constructor(nodeId, objectId, objectName, x, y, width, height, shape, base, amplitude, frequency, offset, bias)
    {
        let points = makeWave(
            x,
            y,
            width, 
            height,  
            shape, 
            base, 
            amplitude, 
            frequency,
            offset,
            bias);

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
        

        this._x        = x;
        this._y        = y;
        this._width    = width;
        this._height   = height;

        this.shape     = shape;
        this.base      = base;
        this.amplitude = amplitude;
        this.frequency = frequency;
        this.offset    = offset;
        this.bias      = bias;


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

            this._x,
            this._y,
            this._width,
            this._height,
            
            this.shape,
            this.base,
            this.amplitude,
            this.frequency,
            this.offset,
            this.bias);


        copy.pathPoints = [...this.pathPoints];
        copy.pathData   = this.pathData;

        copy.copyBase(this);


        return copy;
    }
}