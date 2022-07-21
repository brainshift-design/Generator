class GColor
extends GOperator
{
    input = null;

    space;
    c1;
    c2;
    c3;



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
        col.c1    = this.c1   .copy();
        col.c2    = this.c2   .copy();
        col.c3    = this.c3   .copy();

        return col;
    }



    eval(parse)
    {
        if (!this.valid)
        {
            this.result = new GColor(this.nodeId, this.active);


            if (this.input)
            {
                this.result = this.input.eval(parse).copy();
                

                console.assert(this.result.space.type == NUMBER_VALUE);
                const fromSpaceIndex = this.result.space.value;

                this.result.space = this.space.eval(parse).copy();
                console.assert(this.result.space.type == NUMBER_VALUE);
                const toSpaceIndex = this.result.space.value;


                this.convert(
                    colorSpace(fromSpaceIndex), 
                    colorSpace(toSpaceIndex));
                

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
            }


            console.assert(this.result.space.type == NUMBER_VALUE);
            this.result.space.value = Math.min(Math.max(
                0, 
                this.result.space.value), 
                OpColorSpaces.length-1);


            this.result.valid = true;
            this.valid        = true;


            genPushUpdateValue(parse, this.nodeId, 'space', this.result.space);
            genPushUpdateValue(parse, this.nodeId, 'c1',    this.result.c1   );
            genPushUpdateValue(parse, this.nodeId, 'c2',    this.result.c2   );
            genPushUpdateValue(parse, this.nodeId, 'c3',    this.result.c3   );
        }


        return this.result;
    }



    convert(fromSpace, toSpace)
    {
        let color = makeDataColor(
            fromSpace, 
            getNormalValue(this.result.c1.value, fromSpace, 0),
            getNormalValue(this.result.c2.value, fromSpace, 1),
            getNormalValue(this.result.c3.value, fromSpace, 2));

        color = convertDataColorToSpace(color, toSpace);
        color = getDataColor(color);

        this.result.c1.value = color[0];
        this.result.c2.value = color[1];
        this.result.c3.value = color[2];
    }



    get mustNotEval()
    {
        return this.space.mustNotEval
            && this.c1   .mustNotEval
            && this.c2   .mustNotEval
            && this.c3   .mustNotEval;
    }
}