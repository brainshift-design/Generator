class GPerspective
extends GOperator1 
{
    static { GNode.types[PERSPECTIVE] = this; }



    fov   = null;
    x     = null;
    y     = null;
    z     = null;
    order = null;



    constructor(nodeId, options) 
    {
        super(PERSPECTIVE, nodeId, options);
    }



    reset() 
    {
        super.reset();
    
        this.fov   = null;
        this.x     = null;
        this.y     = null;
        this.z     = null;
        this.order = null;
    }




    copy() 
    {
        const copy = new GPerspective(this.nodeId, this.options);
    
        copy.copyBase(this);
    
        if (this.fov  ) { copy.fov   = this.fov  .copy(); }
        if (this.x    ) { copy.x     = this.x    .copy(); }
        if (this.y    ) { copy.y     = this.y    .copy(); }
        if (this.z    ) { copy.z     = this.z    .copy(); }
        if (this.order) { copy.order = this.order.copy(); }
    
        return copy;
    }



    async eval(parse) 
    {
        if (this.isCached())
            return this;


        const input = await evalValue      (this.input, parse);
        const fov   = await evalNumberValue(this.fov,   parse);
        const x     = await evalNumberValue(this.x,     parse);
        const y     = await evalNumberValue(this.y,     parse);
        const z     = await evalNumberValue(this.z,     parse);
        const order = await evalNumberValue(this.order, parse);
        
        
        if (input) 
        {
            this.value = input.copy();
        
            if (this.value)
                this.value.nodeId = this.nodeId;
        }
        else 
        {
            this.value = new NullValue();
        }
        
        
        await this.evalObjects(
            parse, 
            {
                fov,
                x, 
                y,
                z,
                order
            });



        this.setUpdateValues(parse,
        [
            ['type',  this.outputType()],
            ['fov',   fov              ],
            ['x',     x                ],
            ['y',     y                ],
            ['z',     z                ],
            ['order', order            ]
        ]);


        this.validate();

        return this;
    }
    
    
    
    async evalObjects(parse, options = {}) 
    {
        if (   this.value 
            && this.value.isValid() 
            && options.fov 
            && options.x
            && options.y
            && options.z
            && options.order    )
        {
            this.value.objects = getValidObjects(this.input.value);


            if (isListValueType(this.value.type))
            {
                for (let i = 0; i < this.value.items.length; i++)
                    this.value.items[i].objects = this.value.objects.filter(o => o.itemIndex == i);
            }


            const x = options.x.value * Tau/360;
            const y = options.y.value * Tau/360;
            const z = options.z.value * Tau/360;


            // build rotation matrices
            const Mx = [
                [ 1,            0,            0           ],
                [ 0,            Math.cos(x),  Math.sin(x) ],
                [ 0,           -Math.sin(x),  Math.cos(x) ]];

            const My = [
                [ Math.cos(y),  0,           -Math.sin(y) ],
                [ 0,            1,            0           ],
                [ Math.sin(y),  0,            Math.cos(y) ]];
                    
            const Mz = [
                [ Math.cos(z), -Math.sin(z),  0           ],
                [ Math.sin(z),  Math.cos(z),  0           ],
                [ 0,            0,            1           ]];


            let R;
            
            // combine rotations
            switch (options.order.value)
            {
                case 0: R = mulm3m3(Mz, My, Mx); break;
                case 1: R = mulm3m3(My, Mz, Mx); break;
                case 2: R = mulm3m3(Mz, Mx, My); break;
                case 3: R = mulm3m3(Mx, Mz, My); break;
                case 4: R = mulm3m3(Mx, My, Mz); break;
                case 5: R = mulm3m3(My, Mx, Mz); break;
            }


            const focalLength = computeFocalLength(options.fov.value);


            for (const obj of this.value.objects) 
            {
                obj.nodeId    = this.nodeId;
                obj.objectId += OBJECT_SEPARATOR + this.nodeId;

                if (this.options.enabled)
                {
                    // construct the 3D point using the object's x,y and the z parameter
                    const pt3 = [
                        obj.x, 
                        obj.y, 
                        obj.z ];
                    
                    // apply rotation: rotated = R pt3D
                    const rotated = mulv3m3(pt3, R);
                    
                    // perspective projection
                    const factor = perspectiveScale(focalLength, rotated[2]);
                    
                    // update object's coordinates with the projected values
                    obj.x = rotated[0] * factor;
                    obj.y = rotated[1] * factor;


                    if (this.value.type == POINT_VALUE)
                    {
                        this.value.x.value = obj.x;
                        this.value.y.value = obj.y;
                        this.value.z.value = 0;
                    }
                }
            }


            if (   this.value.type == VECTOR_PATH_VALUE
                && this.value.objects
                && this.value.objects.length > 0
                && this.value.points.objects)
            {
                for (let i = 0; i < this.value.objects[0].points.length; i++)
                {
                    const p = this.value.objects[0].points[i].toPoint();
    
                    this.value.points.objects[i].x = p.x;
                    this.value.points.objects[i].y = p.y;
                    this.value.points.objects[i].z = 0;
                }
            }
        }

        
        await super.evalObjects(parse);
    }
    
    
    
    toNewValue() 
    {
        return this.value 
             ? this.value.copy() 
             : null;
    }
    
    
    
    isValid() 
    {
        return super.isValid() 
            && this.fov   && this.fov  .isValid()
            && this.x     && this.x    .isValid()
            && this.y     && this.y    .isValid()
            && this.z     && this.z    .isValid()
            && this.order && this.order.isValid();

    }
    
    
    
    pushValueUpdates(parse) 
    {
        super.pushValueUpdates(parse);

        if (this.fov  ) { this.fov  .pushValueUpdates(parse); }
        if (this.x    ) { this.x    .pushValueUpdates(parse); }
        if (this.y    ) { this.y    .pushValueUpdates(parse); }
        if (this.z    ) { this.z    .pushValueUpdates(parse); }
        if (this.order) { this.order.pushValueUpdates(parse); }
    }
    
    
    
    invalidateInputs(parse, from, force) 
    {
        super.invalidateInputs(parse, from, force);
    
        if (this.fov  ) { this.fov  .invalidateInputs(parse, from, force); }
        if (this.x    ) { this.x    .invalidateInputs(parse, from, force); }
        if (this.y    ) { this.y    .invalidateInputs(parse, from, force); }
        if (this.z    ) { this.z    .invalidateInputs(parse, from, force); }
        if (this.order) { this.order.invalidateInputs(parse, from, force); }
    }
    
    
    
    iterateLoop(parse) 
    {
        super.iterateLoop(parse);
    
        if (this.fov  ) { this.fov  .iterateLoop(parse); }
        if (this.x    ) { this.x    .iterateLoop(parse); }
        if (this.y    ) { this.y    .iterateLoop(parse); }
        if (this.z    ) { this.z    .iterateLoop(parse); }
        if (this.order) { this.order.iterateLoop(parse); }
    }
    
    
    
    static parseRequest(parse) 
    {
        const [, nodeId, options, ignore] = genParseNodeStart(parse);
     
     
        const perspective = new GPerspective(nodeId, options);
     
     
        let nInputs = -1;
     
        if (!ignore) 
        {
            nInputs = parseInt(parse.move());
            consoleAssert(nInputs => 0 && nInputs <= 1, 'nInputs must be [0, 1]');
        }
        
        
        if (parse.settings.logRequests) 
            logReq(perspective, parse, ignore);

        
        if (ignore) 
        {
            genParseNodeEnd(parse, perspective);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }
        
        
        parse.nTab++;
        
        
        if (nInputs == 1)
            perspective.input = genParse(parse);
        
        perspective.fov   = genParse(parse);
        perspective.x     = genParse(parse);
        perspective.y     = genParse(parse);
        perspective.z     = genParse(parse);
        perspective.order = genParse(parse);


        parse.inParam = false;
        parse.nTab--;


        genParseNodeEnd(parse, perspective);
        return perspective;
    }
}
