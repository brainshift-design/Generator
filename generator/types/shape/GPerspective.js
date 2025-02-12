class GPerspective
extends GOperator1 
{
    static { GNode.types[PERSPECTIVE] = this; }



    fov     = null;
    rotateX = null;
    rotateY = null;
    rotateZ = null;
    order   = null;




    constructor(nodeId, options) 
    {
        super(PERSPECTIVE, nodeId, options);
    }



    reset() 
    {
        super.reset();
    
        this.fov     = null;
        this.rotateX = null;
        this.rotateY = null;
        this.rotateZ = null;
        this.order   = null;
    }




    copy() 
    {
        const copy = new GPerspective(this.nodeId, this.options);
    
        copy.copyBase(this);
    
        if (this.fov    ) { copy.fov     = this.fov    .copy(); }
        if (this.rotateX) { copy.rotateX = this.rotateX.copy(); }
        if (this.rotateY) { copy.rotateY = this.rotateY.copy(); }
        if (this.rotateZ) { copy.rotateZ = this.rotateZ.copy(); }
        if (this.order  ) { copy.order   = this.order  .copy(); }
    
        return copy;
    }



    async eval(parse) 
    {
        if (this.isCached())
            return this;


        let   input   = await evalValue      (this.input,   parse);
        const fov     = await evalNumberValue(this.fov,     parse);
        const rotateX = await evalNumberValue(this.rotateX, parse);
        const rotateY = await evalNumberValue(this.rotateY, parse);
        const rotateZ = await evalNumberValue(this.rotateZ, parse);
        const order   = await evalNumberValue(this.order,   parse);

        
        if (input)
        {
            const _input = input;

            if (input.type == POINT_VALUE)
            {
                input = new PointValue3(input.nodeId, input.x, input.y, new NumberValue(0));
                input.copyCustomParams(_input);
            }
            else if (input.type == VECTOR_VERTEX_VALUE)
            {
                input = new PointValue3(input.nodeId, input.x, input.y, new NumberValue(0));
                input.copyCustomParams(_input);
            }


            this.value = input.copy();

            
            if (   this.value 
                && this.value.isValid() 
                && fov    
                && rotateX
                && rotateY
                && rotateZ
                && order  )
            {
                this.value.nodeId  = this.nodeId;
                this.value.objects = getValidObjects(this.input.value);
    
    
                const rot = getRotationMatrix(
                    rotateX.value,
                    rotateY.value, 
                    rotateZ.value,
                    order  .value);

                const focalLength = computeFocalLength(fov.value);

                
                if (this.options.enabled)
                {
                    consoleAssert(
                        this.value.type == POINT3_VALUE, 
                        'value type must bew POINT3');

                    consoleAssert(
                           this.value.objects.length == 1 
                        && this.value.objects[0].type == POINT3, 
                        'value must have exactly one point');


                    const obj = this.value.objects[0];

                    const point = new FigmaPoint3(
                        this.nodeId,
                        obj.objectId,
                        obj.objectName);

                    point.objectId += OBJECT_SEPARATOR + this.nodeId;


                    if (this.options.enabled)
                    {
                        const pt3 = [
                            obj.x, 
                            obj.y, 
                            input.z.value];
                        
                        const rotated = mulv3m3(pt3, rot);
                        const factor  = perspectiveScale(focalLength, rotated[2]);
                        
                        point.x = rotated[0] * factor;
                        point.y = rotated[1] * factor;
                        point.z = factor;
                 
                        this.value.x.value = point.x;
                        this.value.y.value = point.y;
                        this.value.z.value = point.z;
                    }

                    this.value.objects = [point];
                }
            }
        }
        else 
        {
            this.value = new NullValue();
        }
        
        
        await this.evalObjects(parse);

        
        this.setUpdateValues(parse,
        [
            ['type',    this.outputType()],
            ['fov',     fov              ],
            ['rotateX', rotateX          ],
            ['rotateY', rotateY          ],
            ['rotateZ', rotateZ          ],
            ['order',   order            ]
        ]);


        this.validate();

        return this;
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
            && this.fov     && this.fov    .isValid()
            && this.rotateX && this.rotateX.isValid()
            && this.rotateY && this.rotateY.isValid()
            && this.rotateZ && this.rotateZ.isValid()
            && this.order   && this.order  .isValid();

    }
    
    
    
    pushValueUpdates(parse) 
    {
        super.pushValueUpdates(parse);

        if (this.fov    ) { this.fov    .pushValueUpdates(parse); }
        if (this.rotateX) { this.rotateX.pushValueUpdates(parse); }
        if (this.rotateY) { this.rotateY.pushValueUpdates(parse); }
        if (this.rotateZ) { this.rotateZ.pushValueUpdates(parse); }
        if (this.order  ) { this.order  .pushValueUpdates(parse); }
    }
    
    
    
    invalidateInputs(parse, from, force) 
    {
        super.invalidateInputs(parse, from, force);
    
        if (this.fov    ) { this.fov    .invalidateInputs(parse, from, force); }
        if (this.rotateX) { this.rotateX.invalidateInputs(parse, from, force); }
        if (this.rotateY) { this.rotateY.invalidateInputs(parse, from, force); }
        if (this.rotateZ) { this.rotateZ.invalidateInputs(parse, from, force); }
        if (this.order  ) { this.order  .invalidateInputs(parse, from, force); }
    }
    
    
    
    iterateLoop(parse) 
    {
        super.iterateLoop(parse);
    
        if (this.fov    ) { this.fov    .iterateLoop(parse); }
        if (this.rotateX) { this.rotateX.iterateLoop(parse); }
        if (this.rotateY) { this.rotateY.iterateLoop(parse); }
        if (this.rotateZ) { this.rotateZ.iterateLoop(parse); }
        if (this.order  ) { this.order  .iterateLoop(parse); }
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
        
        perspective.fov     = genParse(parse);
        perspective.rotateX = genParse(parse);
        perspective.rotateY = genParse(parse);
        perspective.rotateZ = genParse(parse);
        perspective.order   = genParse(parse);


        parse.inParam = false;
        parse.nTab--;


        genParseNodeEnd(parse, perspective);
        return perspective;
    }
}



function getRotationMatrix(rotateX, rotateY, rotateZ, order)
{
    const rX = rotateX * Tau/360;
    const rY = rotateY * Tau/360;
    const rZ = rotateZ * Tau/360;


    const Mx = [
        [ 1,             0,             0            ],
        [ 0,             Math.cos(rX),  Math.sin(rX) ],
        [ 0,            -Math.sin(rX),  Math.cos(rX) ]];

    const My = [
        [ Math.cos(rY),  0,            -Math.sin(rY) ],
        [ 0,             1,             0            ],
        [ Math.sin(rY),  0,             Math.cos(rY) ]];
            
    const Mz = [
        [ Math.cos(rZ), -Math.sin(rZ),  0            ],
        [ Math.sin(rZ),  Math.cos(rZ),  0            ],
        [ 0,             0,             1            ]];


    let rot;
    
    switch (order)
    {
        case 0: rot = mulm3m3(Mz, My, Mx); break;
        case 1: rot = mulm3m3(My, Mz, Mx); break;
        case 2: rot = mulm3m3(Mz, Mx, My); break;
        case 3: rot = mulm3m3(Mx, Mz, My); break;
        case 4: rot = mulm3m3(Mx, My, Mz); break;
        case 5: rot = mulm3m3(My, Mx, Mz); break;
    }

    return rot;
}



function computeFocalLength(fovDegrees, sensorSize = 500)
{
    const fovRadians = fovDegrees * Tau/360;
    return (sensorSize / 2) / Math.tan(fovRadians / 2);
}



function perspectiveScale(focalLength, z)
{
    return focalLength / (focalLength + z);
}