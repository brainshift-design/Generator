class GColor
extends GOperator
{
    input   = null;

    space   = null;
    c1      = null;
    c2      = null;
    c3      = null;

    convert = null;



    constructor(nodeId, active)
    {
        super(COLOR, nodeId, active);
    }


    
    copy()
    {
        const col = new GColor(this.nodeId, this.active);

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
            this.input.eval(parse);


            if (color.isValid())
            {
                color = new ColorValue(
                    this.input.space, 
                    this.input.c1, 
                    this.input.c2, 
                    this.input.c3);

                const fromSpaceIndex = color.space.value;

                color.space = space;

                const toSpaceIndex = Math.min(Math.max(
                    0,
                    color.space.value),
                    OpColorSpaces.length-1);

                this.convertColor(
                    colorSpace(fromSpaceIndex), 
                    colorSpace(  toSpaceIndex));

                color.space.value = toSpaceIndex;
            }


            if (this.c1) color.c1 = c1;
            if (this.c2) color.c2 = c2;
            if (this.c3) color.c3 = c3;
        }
        else
        {
            color = new ColorValue(
                this.space, 
                this.c1, 
                this.c2, 
                this.c3);

            const toSpaceIndex = Math.min(Math.max(
                0,
                color.space.value),
                OpColorSpaces.length-1);

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


        console.assert(
            color.space.type == NUMBER_VALUE, 
            'this.result.type must be NUMBER_VALUE');

        color.space.value = Math.min(Math.max(
            0, 
            color.space.value), 
            OpColorSpaces.length-1);


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



    get mustNotEval()
    {
        return this.space.mustNotEval
            && this.c1   .mustNotEval
            && this.c2   .mustNotEval
            && this.c3   .mustNotEval;
    }
}