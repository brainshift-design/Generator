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

        if (this.input) 
            col.input = this.input.copy();

        col.space = this.space.copy();

        if (this.convert) 
            col.convert = this.convert.copy();

        if (this.c1) col.c1 = this.c1.copy();
        if (this.c2) col.c2 = this.c2.copy();
        if (this.c3) col.c3 = this.c3.copy();

        return col;
    }



    isValid()
    {
        return this.space.isValid()
            && this.c1   .isValid()
            && this.c2   .isValid()
            && this.c3   .isValid();
    }



    eval(parse)
    {
        if (this.valid)
            return;


        if (this.space) this.space.eval(parse);
        if (this.c1   ) this.c1   .eval(parse);
        if (this.c2   ) this.c2   .eval(parse);
        if (this.c3   ) this.c3   .eval(parse);


        let color;


        if (this.input)
        {
            const isParam = this.input instanceof GParam;

            this.input.eval(parse);

            const input = 
                isParam
                ? this.input.node[this.input.paramId]
                : this.input.toValue();

            if (input.isValid())
            {
                const space =
                    isParam
                    ? input.space
                    : this.input.space.toValue();

                color = new ColorValue(
                    space, 
                    input.c1, 
                    input.c2, 
                    input.c3);

                const fromSpaceIndex = color.space.value;

                color.space = this.space;

                const toSpaceIndex = Math.min(Math.max(
                    0,
                    color.space.value),
                    colorSpaceCount(parse)-1);

                this.convertColor(
                    color,
                    colorSpace(fromSpaceIndex), 
                    colorSpace(  toSpaceIndex));

                color.space.value = toSpaceIndex;

                
                if (this.c1) color.c1 = this.c1.toValue();
                if (this.c2) color.c2 = this.c2.toValue();
                if (this.c3) color.c3 = this.c3.toValue();
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


        genPushUpdateValue(parse, this.nodeId, 'space', color.space);
        genPushUpdateValue(parse, this.nodeId, 'c1',    color.c1   );
        genPushUpdateValue(parse, this.nodeId, 'c2',    color.c2   );
        genPushUpdateValue(parse, this.nodeId, 'c3',    color.c3   );


        this.valid = true;
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
            this.space ? this.space.toValue() : this.input.space.toValue(),
            this.c1    ? this.c1   .toValue() : this.input.c1   .toValue(),
            this.c2    ? this.c2   .toValue() : this.input.c2   .toValue(),
            this.c3    ? this.c3   .toValue() : this.input.c3   .toValue());
    }
}