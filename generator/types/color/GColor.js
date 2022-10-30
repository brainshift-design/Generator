class GColor
extends GOperator
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



    // isValid()
    // {
    //     return this.space.isValid()
    //         && this.c1   .isValid()
    //         && this.c2   .isValid()
    //         && this.c3   .isValid();
    // }



    eval(parse)
    {
        if (this.valid)
            return this;


        if (this.space) this.space = this.space.eval(parse).copy();
        if (this.c1   ) this.c1    = this.c1   .eval(parse).copy();
        if (this.c2   ) this.c2    = this.c2   .eval(parse).copy();
        if (this.c3   ) this.c3    = this.c3   .eval(parse).copy();


        let color;


        if (this.input)
        {
            const isParam = this.input instanceof GParam;

            this.input = this.input.eval(parse).copy();

            const input = 
                isParam
                ? this.input.node[this.input.paramId]
                : this.input.toValue();

            if (input.isValid())
            {
                const space =
                    isParam
                    ? input.space.copy()
                    : this.input.space.toValue();

                color = new ColorValue(
                    space, 
                    input.c1.copy(), 
                    input.c2.copy(), 
                    input.c3.copy());

                const fromSpaceIndex = color.space.value;

                color.space = this.space;

                const toSpaceIndex = Math.min(Math.max(
                    0,
                    color.space.toValue().value),
                    colorSpaceCount(parse)-1);

                this.convertColor(
                    color,
                    colorSpace(fromSpaceIndex), 
                    colorSpace(  toSpaceIndex));

                color.space.value = toSpaceIndex;

                
                // fake disabled status by checking for it during param eval (easiest way to do it)

                if (this.options.enabled)
                {
                    if (this.c1) color.c1 = this.c1.toValue();
                    if (this.c2) color.c2 = this.c2.toValue();
                    if (this.c3) color.c3 = this.c3.toValue();
                }
            }
        }
        else
        {
            color = new ColorValue(
                this.space.toValue(), 
                this.c1   .toValue(), 
                this.c2   .toValue(), 
                this.c3   .toValue());

            const toSpaceIndex = Math.min(Math.max(
                0,
                color.space.value),
                colorSpaceCount(parse)-1);

            color.space.value = toSpaceIndex;

            
            if (    this.convert
                && !isNaN(this.convert.value)
                &&  color.isValid())
            {
                this.convert.eval(parse);

                this.convertColor(
                    color,
                    colorSpace(this.convert.value), 
                    colorSpace(toSpaceIndex));
            }
        }


        this.space = color.space;
        this.c1    = color.c1;
        this.c2    = color.c2;
        this.c3    = color.c3;


        // if (this.options.enabled)
        // {
            if (this.space) genPushUpdateValue(parse, this.nodeId, 'space', this.space.toValue());
            if (this.c1   ) genPushUpdateValue(parse, this.nodeId, 'c1',    this.c1   .toValue());
            if (this.c2   ) genPushUpdateValue(parse, this.nodeId, 'c2',    this.c2   .toValue());
            if (this.c3   ) genPushUpdateValue(parse, this.nodeId, 'c3',    this.c3   .toValue());
        // }


        this.valid = true;

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



    toValue()
    {
        return new ColorValue(
            this.space ? this.space.toValue() : NumberValue.NaN,
            this.c1    ? this.c1   .toValue() : NumberValue.NaN,
            this.c2    ? this.c2   .toValue() : NumberValue.NaN,
            this.c3    ? this.c3   .toValue() : NumberValue.NaN);
    }
}