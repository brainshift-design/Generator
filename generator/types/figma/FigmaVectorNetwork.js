class FigmaVectorNetwork
extends FigmaShape
{
    x;
    y;
    width;
    height;
    
    points;
    edges;
    regions;

    networkData;



    constructor(nodeId, objectId, objectName, points, edges, regions)
    {
        super(VECTOR_NETWORK, nodeId, objectId, objectName);
        
        this.points  = points .map(p => p.copy());
        this.edges   = edges  .map(e => e.copy());
        this.regions = regions.map(r => r.copy());


        this.updateNetworkData();


        let bounds = Rect.NaN;

        for (let i = 0; i < this.edges.length; i++)
        {
            bounds = expandRect(
                bounds, 
                bounds3(
                    this.edges[i].start.toPoint(), 
                    this.edges[i].start.toPoint(),
                    this.edges[i].end  .toPoint(),
                    this.edges[i].end  .toPoint()));
        }

        this.createDefaultSpace(
            bounds.x + bounds.width /2,            
            bounds.y + bounds.height/2            
        );
    }



    copy()
    {
        const copy = new FigmaVectorNetwork(
            this.nodeId,
            this.objectId,
            this.objectName,

            this.points, 
            this.edges, 
            this.regions);


        copy.x      = this.x;
        copy.y      = this.y;
        copy.width  = this.width;
        copy.height = this.height;


        copy.copyBase(this);


        return copy;
    }



    updateNetworkData()
    {
        let minX = Number.MAX_SAFE_INTEGER;
        let minY = Number.MAX_SAFE_INTEGER;
        let maxX = Number.MIN_SAFE_INTEGER;
        let maxY = Number.MIN_SAFE_INTEGER;

        for (const p of this.points)
        {
            minX = Math.min(minX, p.x.value);
            minY = Math.min(minY, p.y.value);
            maxX = Math.max(maxX, p.x.value);
            maxY = Math.max(maxY, p.y.value);
        }


        this.x      = minX;
        this.y      = minY;
        this.width  = maxX - minX;
        this.height = maxY - minY;

        this.createDefaultTransformPoints(this.x, this.y, this.width, this.height);


        this.networkData = getNetworkData(this.points, this.edges, this.regions);
    }



    getBounds()
    {
        let bounds = Rect.NaN;

        for (let i = 0; i < this.edges.length; i++)
        {
            const edge = this.edges[i];

            const s  = edge.start;
            const e  = edge.end;
            let   st = edge.startTangent;
            let   et = edge.endTangent;

            if (!st.isValid()) st = s.copy();
            if (!et.isValid()) et = e.copy();

            bounds = expandRect(
                bounds, 
                bounds3(
                    s .toPoint(), 
                    st.toPoint(),
                    et.toPoint(),
                    e .toPoint()));
        }

        return bounds;
    }



    toNewValue()
    {
        return FigmaVectorNetwork.fromObject(this);
    }



    toData()
    {
        return [
            ...super.toData(),
   
            /* 21 */ this.x,
            /* 22 */ this.y,
            /* 23 */ this.width,
            /* 24 */ this.height,

            /* 25 */ this.networkData
        ];
    }
}



function getNetworkData(points, edges, _regions)
{
    const vertices = [];
    const segments = [];
    const regions  = [];


    for (const point of points)
    {
        let join;
        let cap;

        switch (point.join.value)
        {
            case 0: join = 'MITER'; break;
            case 1: join = 'BEVEL'; break;
            case 2: join = 'ROUND'; break;
        }
    
        switch (point.cap.value)
        {
            case 0: cap = 'NONE';   break;
            case 1: cap = 'SQUARE'; break;
            case 2: cap = 'ROUND';  break;
        }
    
        vertices.push(
        {
            x:            point.x.value,
            y:            point.y.value,
            strokeJoin:   join,
            strokeCap:    cap,
            cornerRadius: point.round.value
        });
    }


    for (const edge of edges)
    {
        segments.push(
        {
            start: points.findIndex(p => p.uniqueId == edge.start.uniqueId),
            end:   points.findIndex(p => p.uniqueId == edge.end  .uniqueId)
        });
    }


    for (const region of _regions)
    {
        const loops = [];

        for (const _loop of region.loops.items)
        {
            const loop = [];

            for (const _edge of _loop.items)
                loop.push(edges.findIndex(e => e.uniqueId == _edge.uniqueId));

            loops.push(loop);
        }


        regions.push(
        {
            windingRule: region.winding.value == 1 ? 'NONZERO' : 'EVENODD',
            loops:       loops,
            fills:       getObjectFills(region.fills)
        });
    }


    let networkData = 
    {
        vertices: vertices,
        segments: segments,
        regions:  regions
    };


    return networkData;
}