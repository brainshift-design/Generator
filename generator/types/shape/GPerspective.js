class GPerspective
extends GOperator1 
{
    static { GNode.types[PERSPECTIVE] = this; }



    z        = null;
    yaw      = null;
    pitch    = null;
    roll     = null;
    distance = null;
    zoom     = null;



    constructor(nodeId, options) 
    {
        super(PERSPECTIVE, nodeId, options);
    }



    reset() 
    {
        super.reset();
    
        this.z        = null;
        this.yaw      = null;
        this.pitch    = null;
        this.roll     = null;
        this.distance = null;
        this.zoom     = null;
    }



    copy() 
    {
        const copy = new GPerspective(this.nodeId, this.options);
    
        copy.copyBase(this);
    
        if (this.z       ) { copy.z        = this.z       .copy(); }
        if (this.yaw     ) { copy.yaw      = this.yaw     .copy(); }
        if (this.pitch   ) { copy.pitch    = this.pitch   .copy(); }
        if (this.roll    ) { copy.roll     = this.roll    .copy(); }
        if (this.distance) { copy.distance = this.distance.copy(); }
        if (this.zoom    ) { copy.zoom     = this.zoom    .copy(); }
    
        return copy;
    }



    async eval(parse) 
    {
        if (this.isCached())
            return this;


        const input    = await evalValue      (this.input,    parse);
        const z        = await evalNumberValue(this.z,        parse);
        const yaw      = await evalNumberValue(this.yaw,      parse);
        const pitch    = await evalNumberValue(this.pitch,    parse);
        const roll     = await evalNumberValue(this.roll,     parse);
        const distance = await evalNumberValue(this.distance, parse);
        const zoom     = await evalNumberValue(this.zoom,     parse);
        
        
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
                z,
                yaw,
                pitch, 
                roll,
                distance,
                zoom
            });


        this.setUpdateValues(parse,
        [
            ['type',     this.outputType()],
            ['zDepth',   z                ],
            ['yaw',      yaw              ],
            ['pitch',    pitch            ],
            ['roll',     roll             ],
            ['zoom',     zoom             ],
            ['distance', distance         ]
        ]);


        this.validate();

        return this;
    }
    
    
    
    async evalObjects(parse, options = {}) 
    {
        if (   this.value 
            && this.value.isValid() 
            && options.z        
            && options.yaw      
            && options.pitch    
            && options.roll     
            && options.distance 
            && options.zoom) 
        {
            this.value.objects = getValidObjects(this.input.value);


            if (isListValueType(this.value.type))
            {
                for (let i = 0; i < this.value.items.length; i++)
                    this.value.items[i].objects = this.value.objects.filter(o => o.itemIndex == i);
            }


            const yaw   = options.yaw  .value * Tau/360;
            const pitch = options.pitch.value * Tau/360;
            const roll  = options.roll .value * Tau/360;


            // build rotation matrices
            const Ry = [
                [ Math.cos(yaw),   0,                Math.sin(yaw)  ],
                [ 0,               1,                0              ],
                [-Math.sin(yaw),   0,                Math.cos(yaw)  ]];
                
            const Rx = [
                [ 1,               0,                0              ],
                [ 0,               Math.cos(pitch), -Math.sin(pitch)],
                [ 0,               Math.sin(pitch),  Math.cos(pitch)]];

            const Rz = [
                [ Math.cos(roll), -Math.sin(roll),   0              ],
                [ Math.sin(roll),  Math.cos(roll),   0              ],
                [ 0,               0,                1              ]];


            // combine rotations
            let R = mulm3m3(Ry, Rx, Rz);


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
                        options.z.value ];
                    
                    // apply rotation: rotated = R pt3D
                    const rotated = mulv3m3(pt3, R);
                    
                    // perspective projection
                    const factor = options.zoom.value * options.distance.value / nozero(options.distance.value + rotated[2]);                    
                    
                    // update object's coordinates with the projected values
                    obj.x = rotated[0] * factor;
                    obj.y = rotated[1] * factor;


                    if (this.value.type == POINT_VALUE)
                    {
                        this.value.x.value = obj.x;
                        this.value.y.value = obj.y;
                    }
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
            && this.z        && this.z       .isValid()
            && this.yaw      && this.yaw     .isValid()
            && this.pitch    && this.pitch   .isValid()
            && this.roll     && this.roll    .isValid()
            && this.distance && this.distance.isValid()
            && this.zoom     && this.zoom    .isValid();
    }
    
    
    
    pushValueUpdates(parse) 
    {
        super.pushValueUpdates(parse);

        if (this.z       ) { this.z       .pushValueUpdates(parse); }
        if (this.yaw     ) { this.yaw     .pushValueUpdates(parse); }
        if (this.pitch   ) { this.pitch   .pushValueUpdates(parse); }
        if (this.roll    ) { this.roll    .pushValueUpdates(parse); }
        if (this.distance) { this.distance.pushValueUpdates(parse); }
        if (this.zoom    ) { this.zoom    .pushValueUpdates(parse); }
    }
    
    
    
    invalidateInputs(parse, from, force) 
    {
        super.invalidateInputs(parse, from, force);
    
        if (this.z       ) { this.z       .invalidateInputs(parse, from, force); }
        if (this.yaw     ) { this.yaw     .invalidateInputs(parse, from, force); }
        if (this.pitch   ) { this.pitch   .invalidateInputs(parse, from, force); }
        if (this.roll    ) { this.roll    .invalidateInputs(parse, from, force); }
        if (this.distance) { this.distance.invalidateInputs(parse, from, force); }
        if (this.zoom    ) { this.zoom    .invalidateInputs(parse, from, force); }
    }
    
    
    
    iterateLoop(parse) 
    {
        super.iterateLoop(parse);
    
        if (this.z       ) { this.z       .iterateLoop(parse); }
        if (this.yaw     ) { this.yaw     .iterateLoop(parse); }
        if (this.pitch   ) { this.pitch   .iterateLoop(parse); }
        if (this.roll    ) { this.roll    .iterateLoop(parse); }
        if (this.distance) { this.distance.iterateLoop(parse); }
        if (this.zoom    ) { this.zoom    .iterateLoop(parse); }
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
        
        perspective.z        = genParse(parse);
        perspective.yaw      = genParse(parse);
        perspective.pitch    = genParse(parse);
        perspective.roll     = genParse(parse);
        perspective.distance = genParse(parse);
        perspective.zoom     = genParse(parse);


        parse.inParam = false;
        parse.nTab--;


        genParseNodeEnd(parse, perspective);
        return perspective;
    }
}
