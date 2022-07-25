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
        if (!this.valid)
        {
            this.result = new GColorValue();


            if (this.input)
            {
                this.result = this.input.eval(parse).copy();
                console.assert(this.result.type == COLOR_VALUE);
                const fromSpaceIndex = this.result.space.value;

                this.result.space = this.space.eval(parse).copy();
                const toSpaceIndex = Math.min(Math.max(
                    0,
                    this.result.space.value),
                    OpColorSpaces.length-1);

                if (this.c1) this.result.c1 = this.c1.eval(parse).copy();
                if (this.c2) this.result.c2 = this.c2.eval(parse).copy();
                if (this.c3) this.result.c3 = this.c3.eval(parse).copy();


                this.convertColor(
                    colorSpace(fromSpaceIndex), 
                    colorSpace(  toSpaceIndex));
                    
                this.result.space.value = toSpaceIndex;

                if (this.c1) this.result.c1 = this.c1.eval(parse).copy();
                if (this.c2) this.result.c2 = this.c2.eval(parse).copy();
                if (this.c3) this.result.c3 = this.c3.eval(parse).copy();
            }
            else
            {
                this.result.space = this.space.eval(parse).copy();
                this.result.c1    = this.c1   .eval(parse).copy();
                this.result.c2    = this.c2   .eval(parse).copy();
                this.result.c3    = this.c3   .eval(parse).copy();


                const toSpaceIndex = Math.min(Math.max(
                    0,
                    this.result.space.value),
                    OpColorSpaces.length-1);
                
                this.result.space.value = toSpaceIndex;


                if (   this.convert
                    && !isNaN(this.convert.value))
                {
                    const fromSpace = this.convert.eval(parse).copy();

                    this.convertColor(
                        colorSpace(fromSpace.value), 
                        colorSpace(toSpaceIndex));
                }
            }


            console.assert(this.result.space.type == NUMBER_VALUE);
            this.result.space.value = Math.min(Math.max(
                0, 
                this.result.space.value), 
                OpColorSpaces.length-1);


            this.result.valid = true;
            this.valid        = true;


            genPushUpdateValue(parse, this.nodeId, COLOR_VALUE, this.result);
        }


        return this.result;
    }



    convertColor(fromSpace, toSpace)
    {
        let color = makeDataColor(
            fromSpace, 
            getNormalColorValue(this.result.c1.value, fromSpace, 0),
            getNormalColorValue(this.result.c2.value, fromSpace, 1),
            getNormalColorValue(this.result.c3.value, fromSpace, 2));

        color = getDataColor(convertDataColorToSpace(color, toSpace));

        this.result.c1.value = color[1];
        this.result.c2.value = color[2];
        this.result.c3.value = color[3];
    }



    get mustNotEval()
    {
        return this.space.mustNotEval
            && this.c1   .mustNotEval
            && this.c2   .mustNotEval
            && this.c3   .mustNotEval;
    }
}