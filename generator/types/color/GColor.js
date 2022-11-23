class GColor
extends GColorType
{
    input   = null;

    space   = null;
    c1      = null;
    c2      = null;
    c3      = null;

    convert = null;



    constructor(nodeId, options)
    {
        super(COLOR, nodeId, options);
    }


    
    copy()
    {
        const col = new GColor(this.nodeId, this.options);

        col.copyBase(this);

        if (this.input) 
            col.input = this.input.copy();

        col.space = this.space.copy();

        if (this.c1) col.c1 = this.c1.copy();
        if (this.c2) col.c2 = this.c2.copy();
        if (this.c3) col.c3 = this.c3.copy();

        if (this.convert) 
            col.convert = this.convert.copy();

        return col;
    }



    eval(parse)
    {
        if (this.valid)
            return this;

        
        if (this.space) this.space = this.space.eval(parse).copy();
        if (this.c1   ) this.c1    = this.c1   .eval(parse).copy();
        if (this.c2   ) this.c2    = this.c2   .eval(parse).copy();
        if (this.c3   ) this.c3    = this.c3   .eval(parse).copy();


        if (this.input)
        {
            this.input = this.input.eval(parse).copy();
            const input = this.input.toValue();


            if (input.isValid())
            {
                this.value = new ColorValue(
                    input.space,
                    input.c1.copy(), 
                    input.c2.copy(), 
                    input.c3.copy());
                    

                const fromSpaceIndex = input.space.value;

                const toSpaceIndex = Math.min(Math.max(
                    0,
                    Math.round(this.space.toValue().value)), // round because a value can come in with decimals (TODO fix this)
                    colorSpaceCount(parse)-1);


                this.convertColor(
                    this.value,
                    colorSpace(fromSpaceIndex), 
                    colorSpace(  toSpaceIndex));

                this.value.space.value = toSpaceIndex;

                
                // fake disabled status by checking for it during param eval (easiest way to do it)

                if (this.options.enabled)
                {
                    if (this.c1) this.value.c1 = this.c1.toValue();
                    if (this.c2) this.value.c2 = this.c2.toValue();
                    if (this.c3) this.value.c3 = this.c3.toValue();
                }
            }
            else
                this.value = ColorValue.NaN;
        }
        else
        {
            this.value = new ColorValue(
                this.space.toValue(), 
                this.c1   .toValue(), 
                this.c2   .toValue(), 
                this.c3   .toValue());

            const toSpaceIndex = Math.min(Math.max(
                0,
                Math.round(this.value.space.value)), // round because a value can come in with decimals (TODO fix this)
                colorSpaceCount(parse)-1);

            this.value.space.value = toSpaceIndex;

            if (   this.convert
                && this.convert.isValid()
                && this.convert.value > -1
                && this.value.isValid())
            {
                this.convert.eval(parse);

                this.convertColor(
                    this.value,
                    colorSpace(this.convert.value), 
                    colorSpace(toSpaceIndex));
            }
        }


        this.space = this.value.space;
        this.c1    = this.value.c1;
        this.c2    = this.value.c2;
        this.c3    = this.value.c3;


        // if (this.options.enabled)
        // {
            if (this.space) genPushUpdateValue(parse, this.nodeId, 'space', this.space.toValue(), true);
            if (this.c1   ) genPushUpdateValue(parse, this.nodeId, 'c1',    this.c1   .toValue());
            if (this.c2   ) genPushUpdateValue(parse, this.nodeId, 'c2',    this.c2   .toValue());
            if (this.c3   ) genPushUpdateValue(parse, this.nodeId, 'c3',    this.c3   .toValue());
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



    toValue()
    {
        return new ColorValue(
            this.space ? this.space.toValue() : NumberValue.NaN,
            this.c1    ? this.c1   .toValue() : NumberValue.NaN,
            this.c2    ? this.c2   .toValue() : NumberValue.NaN,
            this.c3    ? this.c3   .toValue() : NumberValue.NaN);
    }
}