class GShapeBoolean
extends GShape
{
    static { GNode.types[SHAPE_BOOLEAN] = this; }



    children  = null;
    operation = null;



    constructor(nodeId, options)
    {
        super(SHAPE_BOOLEAN, nodeId, options);
    }



    reset()
    {
        super.reset();

        this.children  = null;
        this.operation = null;
    }



    copy()
    {
        const copy = new GShapeBoolean(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.children ) copy.children  = this.children .copy();
        if (this.operation) copy.operation = this.operation.copy();

        return copy;
    }



    paramFromId(paramId)
    {
        switch (paramId)
        {
            case 'children':  return this.input ? this.value.children  : this.children;
            case 'operation': return this.input ? this.value.operation : this.operation;
        }

        return super.paramFromId(paramId);
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        await this.evalBaseParams(parse);

        let   children  = await evalListValue  (this.children,  parse);
        const operation = await evalNumberValue(this.operation, parse);


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
            input = await evalValue(this.input, parse);

            this.value = new ShapeBooleanValue(
                this.nodeId,
                children  ?? input.children,
                operation ?? input.operation);
        }
        else
        {
            this.value = new ShapeBooleanValue(
                this.nodeId, 
                children,
                operation);
        }


        this.setUpdateValues(parse,
        [
            ['operation', operation]
        ]);


        await this.evalShapeBase(parse);


        await this.evalObjects(parse);


        if (!this.children ) this.children  = this.value.children .copy();
        if (!this.operation) this.operation = this.value.operation.copy();


        this.validate();

        return this;
    }



    async evalObjects(parse, options = {})
    {
        if (!this.options.enabled)
            return;
            

        if (   this.value.objects
            && this.value.operation)
        {
            let typeSuffix = '';

            switch (this.operation.value)
            {
                case 0: typeSuffix = '+'; break;
                case 1: typeSuffix = '-'; break;
                case 2: typeSuffix = '*'; break;
                case 3: typeSuffix = '/'; break;
            }


            const bool = new FigmaBoolean(
                this.nodeId,
                this.nodeId + OBJECT_SEPARATOR + typeSuffix,
                this.nodeName,
                this.operation.value);


            const bounds = getObjBounds(this.value.objects);

            for (let i = 0; i < this.value.objects.length; i++)
            {
                const obj = this.value.objects[i];

                // const angle1 = anglev_(obj.sp0, obj.sp1);
                // const angle2 = anglev_(obj.sp0, obj.sp2);

                obj.createDefaultSpace();
                
                // obj.sp1 = addv(obj.sp0, vector(angle1, 1));
                // obj.sp2 = addv(obj.sp0, vector(angle2, 1));

                obj.resetSpace(bounds, false);

                this.addChildObject(bool.children, obj);
            }


            // console.log('bounds =', bounds);
            bool.x      = bounds.x;
            bool.y      = bounds.y;
            bool.width  = bounds.width;
            bool.height = bounds.height;

            
            bool.createDefaultSpace();
            bool.resetSpace(bounds);

            bool.createDefaultTransform(bounds.x, bounds.y);
            bool.createDefaultTransformPoints(bounds.x, bounds.y, bounds.width, bounds.height);
        
            this.value.objects = [bool];


            const nChildren = new NumberValue(
                this.children.objects 
                ? this.children.objects.length
                : 0);


            this.setUpdateValues(parse,
            [
                ['nChildren', nChildren]
            ],
            true);
        }
        else
        {
            this.value.objects = [];
            
            this.setUpdateValues(parse,
            [
                ['nChildren', new NumberValue(0)]
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
            && this.children  && this.children .isValid()
            && this.operation && this.operation.isValid();
    }



    pushValueUpdates(parse)
    {
        super.pushValueUpdates(parse);

        if (this.input    ) this.input    .pushValueUpdates(parse);
        if (this.children ) this.children .pushValueUpdates(parse);
        if (this.operation) this.operation.pushValueUpdates(parse);
    }



    invalidateInputs(parse, from, force)
    {
        super.invalidateInputs(parse, from, force);

        if (this.input    ) this.input    .invalidateInputs(parse, from, force);
        if (this.children ) this.children .invalidateInputs(parse, from, force);
        if (this.operation) this.operation.invalidateInputs(parse, from, force);
    }



    iterateLoop(parse)
    {
        super.iterateLoop(parse);

        if (this.input    ) this.input    .iterateLoop(parse);
        if (this.children ) this.children .iterateLoop(parse);
        if (this.operation) this.operation.iterateLoop(parse);
    }



    static parseRequest(parse)
    {
        const [, nodeId, options, ignore] = genParseNodeStart(parse);
    
    
        const bool = new GShapeBoolean(nodeId, options);
    
    
        let nInputs = -1;
    
        if (!ignore)
        {
            nInputs = parseInt(parse.move());
            consoleAssert(nInputs => 0 && nInputs <= 1, 'nInputs must be [0, 1]');
        }
    
    
        if (parse.settings.logRequests) 
            logReq(bool, parse, ignore);
    
    
        if (ignore) 
        {
            genParseNodeEnd(parse, bool);
            return parse.parsedNodes.find(n => n.nodeId == nodeId);
        }
    
    
        parse.nTab++;
    
    
        if (nInputs == 1)
            bool.input = genParse(parse);
    
    
        const nParamIds = genParseParamCount(parse);
    
        for (let i = 0; i < nParamIds; i++)
        {
            const paramId = genParseParamId(parse);
    
            parse.inParam = true;
    
            switch (paramId)
            {
            case 'children':  bool.children  = genParse(parse); break;
            case 'operation': bool.operation = genParse(parse); break;
            case 'props':     bool.props     = genParse(parse); break;
            }
        }
    
    
        parse.inParam = false;
        parse.nTab--;
    
    
        genParseNodeEnd(parse, bool);
        return bool;
    }
}