class GLine
extends GShape
{
    constructor(nodeId, options)
    {
        super(LINE, nodeId, options);
    }



    copy()
    {
        const copy = new GLine(this.nodeId, this.options);

        copy.copyBase(this);

        return copy;
    }



    paramFromId(paramId)
    {
        switch (paramId)
        {
            case 'x':     return this.input ? this.value.x     : this.x;
            case 'y':     return this.input ? this.value.y     : this.y;
            case 'width': return this.input ? this.value.width : this.width;
        }

        return null;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;


        let input = this.input ? (await this.input.eval(parse)).toValue() : null;

        let [x, y, width, ] = await this.evalBaseParams(parse, false);
            

        if (input)
        {
            this.value        = input.toValue();
            this.value.nodeId = this.nodeId;
            this.value.copyCustomParams(input);

            if (x    )  this.value.x     = x;      else  x     = this.value.x;      
            if (y    )  this.value.y     = y;      else  y     = this.value.y;      
            if (width)  this.value.width = width;  else  width = this.value.width;  
        }
        else
        {
            this.value = new LineValue(
                this.nodeId, 
                x, 
                y, 
                width);
        }


        this.setUpdateValues(parse, 
        [
            ['x',      x     ],
            ['y',      y     ],
            ['width',  width ]
        ]);


        await this.evalShapeBase(parse);


        await this.evalObjects(parse);


        if (!this.x    ) this.x     = this.value.x    .copy();
        if (!this.y    ) this.y     = this.value.y    .copy();
        if (!this.width) this.width = this.value.width.copy();


        this.validate();

        return this;
    }



    async evalObjects(parse, options = {})
    {
        if (!this.options.enabled)
            return;
            

        this.value.objects = [];


        if (   super.baseIsValid()   
            && this.value.x    .isValid()
            && this.value.y    .isValid()
            && this.value.width.isValid()) 
        {
            let x = this.value.x    .value;
            let y = this.value.y    .value;
            let w = this.value.width.value;


            [x, y, w, , , ] = validateObjectRect(x, y, w, 0);


            if (w != 0)
            {
                const line = new FigmaLine(
                    this.nodeId,
                    this.nodeId,
                    this.nodeName,
                    x, y, w);

                line.createDefaultTransform(x, y);
                line.createDefaultTransformPoints(x, y, w, 0.01);
                
                this.value.objects.push(line);
            }
        }

        
        await super.evalObjects(parse);
    }



    toValue()
    {
        const line = new LineValue(
            this.nodeId,
            this.x     .toValue(),
            this.y     .toValue(),
            this.width .toValue());

        line.copyCustomParams(this.value);

        line.props   = this.props.toValue();
        line.objects = this.value.objects.map(o => o.copy());

        return line;
    }
}