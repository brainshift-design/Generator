class GFrame
extends GShape
{
    static { GNode.types[FRAME] = this; }



    children = null;
    position = null;
    round    = null;
    clip     = null;



    constructor(nodeId, options)
    {
        super(FRAME, nodeId, options);
    }



    reset()
    {
        super.reset();

        this.children = null;
        this.position = null;
        this.round    = null;
        this.clip     = null;
    }



    copy()
    {
        const copy = new GFrame(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.children) copy.children = this.children.copy();
        if (this.position) copy.position = this.position.copy();
        if (this.round   ) copy.round    = this.round   .copy();
        if (this.clip    ) copy.clip     = this.clip    .copy();

        return copy;
    }



    paramFromId(paramId)
    {
        switch (paramId)
        {
            case 'children': return this.input ? this.value.children : this.children;
            case 'position': return this.input ? this.value.position : this.position;
            case 'x':        return this.input ? this.value.x        : this.x;
            case 'y':        return this.input ? this.value.y        : this.y;
            case 'width':    return this.input ? this.value.width    : this.width;
            case 'height':   return this.input ? this.value.height   : this.height;
            case 'round':    return this.input ? this.value.round    : this.round;
            case 'clip':     return this.input ? this.value.clip     : this.clip;
        }

        return super.paramFromId(paramId);
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        const [x, y, width, height] = await this.evalBaseParams(parse);

        let children = await evalListValue  (this.children, parse);
        let position = await evalNumberValue(this.position, parse);
        let round    = await evalNumberValue(this.round,    parse);
        let clip     = await evalNumberValue(this.clip,     parse);


        if (   children
            && SHAPE_VALUES.includes(children.type)
            && children.type != SHAPE_LIST_VALUE)
        {
            const objects    = children.objects;
            children         = new ListValue([children]);
            children.objects = objects;
        }


        let input = null;

        if (this.input)
        {
            input = await evalFrameValue(this.input, parse);

            this.value = new FrameValue(
                this.nodeId,
                children ?? input.children,
                position ?? input.position,
                x        ?? input.x,
                y        ?? input.y,
                width    ?? input.width,
                height   ?? input.height,
                round    ?? input.round,
                clip     ?? input.clip);
        }
        else
        {
            this.value = new FrameValue(
                this.nodeId, 
                children,
                position,
                x, 
                y, 
                width,
                height, 
                round,
                clip);
        }


        const childType = new TextValue(finalListTypeFromValues(children.items));

        this.setUpdateValues(parse, 
        [
            ['childType', childType],
            ['position',  position ],
            ['x',         x        ],
            ['y',         y        ],
            ['width',     width    ],
            ['height',    height   ],
            ['round',     round    ],
            ['clip',      clip     ]
        ]);


        await this.evalShapeBase(parse);


        await this.evalObjects(parse);


        if (!this.children) this.children = this.value.children.copy();
        if (!this.position) this.position = this.value.position.copy();
        if (!this.x       ) this.x        = this.value.x       .copy();
        if (!this.y       ) this.y        = this.value.y       .copy();
        if (!this.width   ) this.width    = this.value.width   .copy();
        if (!this.height  ) this.height   = this.value.height  .copy();
        if (!this.round   ) this.round    = this.value.round   .copy();
        if (!this.clip    ) this.clip     = this.value.clip    .copy();


        this.validate();

        return this;
    }



    async evalObjects(parse, options = {})
    {
        if (!this.options.enabled)
            return;
            

        if (   this.value.position
            && this.value.x
            && this.value.y
            && this.value.width
            && this.value.height
            && this.value.round
            && this.value.clip)
        {
            let   pos = this.value.position.value;
            let   x   = this.value.x       .value;
            let   y   = this.value.y       .value;
            let   w   = this.value.width   .value;
            let   h   = this.value.height  .value;
            const r   = Math.max(0, this.value.round.value);
            const c   = this.value.clip    .value;


            const frame = new FigmaFrame(
                this.nodeId,
                this.nodeId,
                this.nodeName,
                x, y, w, h, r, c);


            const bounds = getObjBounds(this.value.objects);

            const singlePoint =
                   this.value.objects.length  == 1 
                && this.value.objects[0].type == POINT;

                
            const xoff = createTransform(-x, -y);

            for (let i = 0; i < this.value.objects.length; i++)
            {
                const obj = this.value.objects[i];

                // const angle1 = anglev_(obj.sp0, obj.sp1);
                // const angle2 = anglev_(obj.sp0, obj.sp2);

                obj.createDefaultSpace();
                
                // obj.sp1 = addv(obj.sp0, vector(angle1, 1));
                // obj.sp2 = addv(obj.sp0, vector(angle2, 1));

                obj.resetSpace(bounds, singlePoint);

                if (pos > 0)
                    obj.applyTransform(xoff, 2);

                this.addChildObject(frame.children, obj);
            }


            frame.createDefaultTransform(x, y);
            frame.createDefaultTransformPoints(x, y, w, h);
        
            this.value.objects = [frame];

            
            this.setUpdateValues(parse, 
            [
                ['nChildren', new NumberValue(frame.children.length)]
            ], 
            true);
        }


        await super.evalObjects(parse);
    }



    addChildObject(objects, _obj)
    {
        const obj = copyFigmaObject(_obj);
                    
        obj.nodeId   = this.nodeId;
        obj.objectId = obj.objectId + OBJECT_SEPARATOR + this.nodeId;
        obj.listId   = -1;
        
        objects.push(obj);
    }



    toNewValue()
    {
        return this.value.copy();
    }



    isValid()
    {
        return super.isValid()
            && this.children && this.children.isValid()
            && this.position && this.position.isValid()
            && this.round    && this.round   .isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.children) this.children.pushValueUpdates(parse);
        if (this.position) this.position.pushValueUpdates(parse);
        if (this.round   ) this.round   .pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.children) this.children.invalidateInputs(parse, from, force);
        if (this.position) this.position.invalidateInputs(parse, from, force);
        if (this.round   ) this.round   .invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.children) this.children.iterateLoop(parse);
        if (this.position) this.position.iterateLoop(parse);
        if (this.round   ) this.round   .iterateLoop(parse);
    }



    static parseRequest(parse)
    {
        const [, nodeId, options, ignore] = genParseNodeStart(parse);
    
    
        const frame = new GFrame(nodeId, options);
    
    
        let nInputs = -1;
    
        if (!ignore)
        {
            nInputs = parseInt(parse.move());
            consoleAssert(nInputs => 0 && nInputs <= 1, 'nInputs must be [0, 1]');
        }
    
    
        if (parse.settings.logRequests) 
            logReq(frame, parse, ignore);
    
    
        if (ignore) 
        {
            genParseNodeEnd(parse, frame);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }
    
    
        parse.nTab++;
    
    
        if (nInputs == 1)
            frame.input = genParse(parse);
    
    
        const nParamIds = genParseParamCount(parse);
    
        for (let i = 0; i < nParamIds; i++)
        {
            const paramId = genParseParamId(parse);
    
            parse.inParam = true;
    
            switch (paramId)
            {
            case 'children': frame.children = genParse(parse); break;
            case 'position': frame.position = genParse(parse); break;
            case 'x':        frame.x        = genParse(parse); break;
            case 'y':        frame.y        = genParse(parse); break;
            case 'width':    frame.width    = genParse(parse); break;
            case 'height':   frame.height   = genParse(parse); break;
            case 'round':    frame.round    = genParse(parse); break;
            case 'clip':     frame.clip     = genParse(parse); break;
            case 'props':    frame.props    = genParse(parse); break;
            }
        }
    
    
        parse.inParam = false;
        parse.nTab--;
    
    
        genParseNodeEnd(parse, frame);
        return frame;
    }
}