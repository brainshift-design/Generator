class GColor
extends GColorType
{
    input   = null;

    space   = null;
    c1      = null;
    c2      = null;
    c3      = null;

    convert = null;

    hasInputs;



    constructor(nodeId, options)
    {
        super(COLOR, nodeId, options);
    }


    
    copy()
    {
        const copy = new GColor(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.input) 
            copy.input = this.input.copy();

        copy.space = this.space.copy();

        if (this.c1) copy.c1 = this.c1.copy();
        if (this.c2) copy.c2 = this.c2.copy();
        if (this.c3) copy.c3 = this.c3.copy();

        if (this.convert) 
            copy.convert = this.convert.copy();

        return copy;
    }



    eval(parse)
    {
        if (this.valid)//this.isCached())
            return this;

            
        const space = this.space ? this.space.eval(parse).toValue().toInteger() : null; 
        let   c1    = this.c1    ? this.c1   .eval(parse).toValue()             : null;
        let   c2    = this.c2    ? this.c2   .eval(parse).toValue()             : null;
        let   c3    = this.c3    ? this.c3   .eval(parse).toValue()             : null;


        if (this.input)
        {
            const input = this.input.eval(parse).toValue();

            
            if (input.isValid())
            {
                this.value = new ColorValue(
                    input.space,
                    input.c1, 
                    input.c2, 
                    input.c3);
                    
                const fromSpaceIndex = input.space.value;

                const toSpaceIndex = Math.min(Math.max(
                    0,
                    Math.round(space.value)), // round because a value can come in with decimals (TODO fix this)
                    colorSpaceCount(parse)-1);


                this.convertColor(
                    this.value,
                    colorSpace(fromSpaceIndex), 
                    colorSpace(  toSpaceIndex));

                this.value.space.value = toSpaceIndex;


                if (this.options.enabled)
                {
                    if (!this.c1) { this.c1 = this.value.c1.copy(); c1 = this.c1.toValue(); }
                    if (!this.c2) { this.c2 = this.value.c2.copy(); c2 = this.c2.toValue(); }
                    if (!this.c3) { this.c3 = this.value.c3.copy(); c3 = this.c3.toValue(); }
                
                    if (c1) this.value.c1 = c1;
                    if (c2) this.value.c2 = c2;
                    if (c3) this.value.c3 = c3;
                }
            }
            else
                this.value = ColorValue.NaN;


            if (!this.convert)
                this.convert = NumberValue.NaN;
        }
        else
        {
            this.value = new ColorValue(space, c1, c2, c3);


            const toSpaceIndex = Math.min(Math.max(
                0,
                Math.round(this.value.space.value)), // round because a value can come in with decimals (TODO fix this)
                colorSpaceCount(parse)-1);

            this.value.space.value = toSpaceIndex;

            if (    this.convert
                &&  this.convert.isValid()
                &&  this.convert.value > -1
                &&  this.value.isValid()
                && !this.hasInputs)
            {
                this.convert.eval(parse);

                this.convertColor(
                    this.value,
                    colorSpace(this.convert.value), 
                    colorSpace(toSpaceIndex));
            }


            if (this.options.enabled)
            {
                this.c1 = this.value.c1.copy();
                this.c2 = this.value.c2.copy();
                this.c3 = this.value.c3.copy();
            }
        }


        if (!this.value.space.isValid())
            this.value = new ColorValue(
                this.space.toValue(),
                NumberValue.NaN,
                NumberValue.NaN,
                NumberValue.NaN);


        // if (this.options.enabled)
        // {
            genPushUpdateValue(parse, this.nodeId, 'convert', this.convert          );
            genPushUpdateValue(parse, this.nodeId, 'space',   this.value.space, true);
            genPushUpdateValue(parse, this.nodeId, 'c1',      this.value.c1         );
            genPushUpdateValue(parse, this.nodeId, 'c2',      this.value.c2         );
            genPushUpdateValue(parse, this.nodeId, 'c3',      this.value.c3         );
        // }


        this.validate();

        return this;
    }



    convertColor(color, fromSpace, toSpace)
    {
        let col = [
            fromSpace, 
            getNormalColorValue(color.c1.value, fromSpace, 0),
            getNormalColorValue(color.c2.value, fromSpace, 1),
            getNormalColorValue(color.c3.value, fromSpace, 2)];

        col = getScaledDataColor(convertDataColorToSpace(col, toSpace));

        color.c1.value = col[1];
        color.c2.value = col[2];
        color.c3.value = col[3];
    }



    isValid()
    {
        return this.space.isValid()
            && this.c1   .isValid()
            && this.c2   .isValid()
            && this.c3   .isValid();
    }



    // toValue()
    // {
    //     return new ColorValue(
    //         this.space ? this.space.toValue() : NumberValue.NaN,
    //         this.c1    ? this.c1   .toValue() : NumberValue.NaN,
    //         this.c2    ? this.c2   .toValue() : NumberValue.NaN,
    //         this.c3    ? this.c3   .toValue() : NumberValue.NaN);
    // }
}