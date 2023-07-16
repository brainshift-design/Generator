class FigmaVectorNetwork
extends FigmaObject
{
    // x;
    // y;
    // width;
    // height;
    
    // points;
    // closed;
    // degree;

    // pathPoints;

    // pathData;
    // winding;
    // round;



    // constructor(nodeId, objectId, objectName, points, closed, degree, winding, round)
    // {
    //     super(VECTOR_PATH, nodeId, objectId, objectName);
        
    //     this.points  = points.map(p => p.copy());

    //     this.closed  = closed;
    //     this.degree  = degree;
    //     this.winding = winding;

    //     this.round   = round;
        

    //     this.updatePathPoints();
    //     this.updatePathData();
    // }



    // copy()
    // {
    //     const copy = new FigmaVectorPath(
    //         this.nodeId,
    //         this.objectId,
    //         this.objectName,

    //         this.points, 

    //         this.closed, 
    //         this.degree,
    //         this.winding,

    //         this.round);


    //     copy.x      = this.x;
    //     copy.y      = this.y;
    //     copy.width  = this.width;
    //     copy.height = this.height;


    //     copy.copyBase(this);


    //     return copy;
    // }



    // updatePoints(xform, coords)
    // {
    //     for (let i = 0; i < this.points.length; i++)
    //         this.points[i] = PointValue.fromPoint(this.nodeId, transformPoint(this.points[i].toPoint(), xform, coords));

    //     this.updatePathPoints();
    //     this.updatePathData();
    // }



    // updatePathPoints()
    // {
    //     switch (this.degree)
    //     {
    //     case 0: this.pathPoints = this.points.map(p => p.toPoint());                           break;
    //     case 1: this.pathPoints = this.points.map(p => p.toPoint());                           break;
    //     case 2: this.pathPoints = this.points.map(p => p.toPoint());                           break;
    //     case 3: this.pathPoints = getSmoothPoints(this.points, this.closed, getSmoothSegment); break;
    //     case 4: this.pathPoints = getSmoothPoints(this.points, this.closed, getSineXSegment ); break;
    //     case 5: this.pathPoints = getSmoothPoints(this.points, this.closed, getSineYSegment ); break;
    //     }
    // }



    // updatePathData()
    // {
    //     let minX = Number.MAX_SAFE_INTEGER;
    //     let minY = Number.MAX_SAFE_INTEGER;
    //     let maxX = Number.MIN_SAFE_INTEGER;
    //     let maxY = Number.MIN_SAFE_INTEGER;

    //     for (const p of this.points)
    //     {
    //         minX = Math.min(minX, p.x.value);
    //         minY = Math.min(minY, p.y.value);
    //         maxX = Math.max(maxX, p.x.value);
    //         maxY = Math.max(maxY, p.y.value);
    //     }


    //     this.x      = minX;
    //     this.y      = minY;
    //     this.width  = maxX - minX;
    //     this.height = maxY - minY;

    //     this.createTransformPoints(null, this.x, this.y, this.width, this.height);


    //     this.pathData = getPathDataFromPoints(this.pathPoints, this.closed, this.degree);
    // }



    // toData()
    // {
    //     return [
    //         ...super.toData(),
   
    //         /* 21 */ this.x,
    //         /* 22 */ this.y,
    //         /* 23 */ this.width,
    //         /* 24 */ this.height,

    //         /* 25 */ this.pathData,
    //         /* 26 */ this.winding,
    //         /* 27 */ this.round * Math.abs(this.scaleCorners)
    //     ];
    // }
}
