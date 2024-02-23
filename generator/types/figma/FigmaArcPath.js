class FigmaArcPath
extends FigmaVectorPath
{
    position;
    _x;
    _y;
    _width;
    _height;

    start;
    sweep;

    

    constructor(nodeId, objectId, objectName, pos, x, y, width, height, start, sweep)
    {
        const points = makeArc_(
            point(
                x + width /2, 
                y + height/2), 
            width/2,  
            start, 
            start + sweep)
            .map(p => PointValue.fromPoint(nodeId, p));


        points.forEach(p => 
        {
            p.y.value = 
                pos > 0
                ? p.y.value * height/width
                : height/2 + (p.y.value - height/2) * height/width;

            if (   pos == 0
                && width < 0) 
                p.x.value += width;
        });

        if (width  < 0) width  *= -1;
        if (height < 0) height *= -1;


        super(
            nodeId, 
            objectId,
            objectName,
            points,
            0,  // open
            2,  // cubic
            0,  // even-odd winding
            0); // no round
        

        this.position = pos;
        this._x       = x;
        this._y       = y;
        this._width   = width;
        this._height  = height;

        this.start    = start;
        this.sweep    = sweep;


        this.createDefaultSpace(
            x + width /2,
            y + height/2);
    }



    copy()
    {
        const copy = new FigmaArcPath(
            this.nodeId,
            this.objectId,
            this.objectName,

            this.position,
            this._x,
            this._y,
            this._width,
            this._height,
            
            this.start,
            this.sweep);


        copy.copyBase(this);


        return copy;
    }



    // updatePathData()
    // {
    //     // const bounds = this.getBounds();

    //     // this.x      = bounds.x;
    //     // this.y      = bounds.y;
    //     // this.width  = bounds.width;
    //     // this.height = bounds.height;

    //     // this.createDefaultTransformPoints(this.x, this.y, this.width, this.height);

    //     this.pathData = getPathDataFromPoints(this.pathPoints, this.closed, this.degree);
    // }



    // getBounds()
    // {
    //     console.log('arc bounds');
    //     return FigmaShape.prototype.getBounds.call(this);
    // }
}