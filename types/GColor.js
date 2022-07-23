class GColor
extends GOperator
{
    input = null;
    //value;

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

                console.assert(this.result.space.type == NUMBER_VALUE);
                const fromSpaceIndex = this.result.space.value;

                this.result.space = this.space.eval(parse).copy();
                console.assert(this.result.space.type == NUMBER_VALUE);
                const toSpaceIndex = this.result.space.value;


                this.convertColor(
                    colorSpace(fromSpaceIndex), 
                    colorSpace(  toSpaceIndex));
                

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

                
                if (   this.convert
                    && !isNaN(this.convert.value))
                {
                    const convert = this.convert.eval(parse).copy();

                    console.assert(convert.type == NUMBER_VALUE);
                    console.assert(this.result.space.type == NUMBER_VALUE);

                    this.convertColor(
                        colorSpace(convert.value), 
                        colorSpace(this.result.space.value));
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
            

            // genPushUpdateValue(parse, this.nodeId, 'space', this.result.space);
            // genPushUpdateValue(parse, this.nodeId, 'c1',    this.result.c1   );
            // genPushUpdateValue(parse, this.nodeId, 'c2',    this.result.c2   );
            // genPushUpdateValue(parse, this.nodeId, 'c3',    this.result.c3   );
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