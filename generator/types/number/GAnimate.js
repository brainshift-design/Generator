class GAnimate
extends GNumberType
{
    from;
    to;
    curve;
    type;
    duration;
    position;



    constructor(nodeId, options)
    {
        super(NUMBER_ANIMATE, nodeId, options);
    }


    
    copy()
    {
        const copy = new GAnimate(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.from    ) copy.from     = this.from    .copy();
        if (this.to      ) copy.to       = this.to      .copy();
        if (this.curve   ) copy.curve    = this.curve   .copy();
        if (this.type    ) copy.type     = this.type    .copy();
        if (this.duration) copy.duration = this.duration.copy();
        if (this.position) copy.position = this.position.copy();

        return copy;
    }



    async eval(parse)
    {
        if (this.isCached())
            return this;

            
        const from     = (await this.from    .eval(parse)).toValue();
        const to       = (await this.to      .eval(parse)).toValue();
        const curve    = (await this.curve   .eval(parse)).toValue();
        const type     = (await this.type    .eval(parse)).toValue();
        const duration = (await this.duration.eval(parse)).toValue();
        const position = (await this.position.eval(parse)).toValue();
    

        this.value = new NumberValue(0);
        

        genPushUpdateValue(parse, this.nodeId, 'from',     from    );
        genPushUpdateValue(parse, this.nodeId, 'to',       to      );
        genPushUpdateValue(parse, this.nodeId, 'curve',    curve   );
        genPushUpdateValue(parse, this.nodeId, 'type',     type    );
        genPushUpdateValue(parse, this.nodeId, 'duration', duration);
        genPushUpdateValue(parse, this.nodeId, 'position', position);
        

        this.validate();

        return this;
    }
}
