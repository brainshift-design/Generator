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
            console.log('this =', this);
            const space = this.space.eval(parse).copy();
            
            const c1 = this.c1 ? this.c1.eval(parse).copy() : null;
            const c2 = this.c2 ? this.c2.eval(parse).copy() : null;
            const c3 = this.c3 ? this.c3.eval(parse).copy() : null;

            
            if (this.input)
            {
                this.result = this.input.eval(parse).copy();

                console.assert(
                    this.result.type == COLOR_VALUE, 
                    'this.result.type must be COLOR_VALUE');

                if (this.result.isValid())
                {
                    const fromSpaceIndex = this.result.space.value;

                    this.result.space = space;
                    const toSpaceIndex = Math.min(Math.max(
                        0,
                        this.result.space.value),
                        OpColorSpaces.length-1);

                    this.convertColor(
                        colorSpace(fromSpaceIndex), 
                        colorSpace(  toSpaceIndex));
                        
                    this.result.space.value = toSpaceIndex;

                    if (this.c1) this.result.c1 = c1;
                    if (this.c2) this.result.c2 = c2;
                    if (this.c3) this.result.c3 = c3;
                }
            }
            else
            {
                this.result = new ColorValue(space, c1, c2, c3);


                const toSpaceIndex = Math.min(Math.max(
                    0,
                    this.result.space.value),
                    OpColorSpaces.length-1);
                
                this.result.space.value = toSpaceIndex;


                if (    this.convert
                    && !isNaN(this.convert.value)
                    &&  this.result.isValid())
                {
                    const fromSpace = this.convert.eval(parse).copy();

                    this.convertColor(
                        colorSpace(fromSpace.value), 
                        colorSpace(toSpaceIndex));
                }
            }


            console.assert(
                this.result.space.type == NUMBER_VALUE, 
                'this.result.type must be NUMBER_VALUE');

            this.result.space.value = Math.min(Math.max(
                0, 
                this.result.space.value), 
                OpColorSpaces.length-1);


            this.result.valid = true;
            this.valid        = true;


            genPushUpdateValue(parse, this.nodeId, 'value', this.result);

            genPushUpdateValue(parse, this.nodeId, 'space', this.result.space);
            genPushUpdateValue(parse, this.nodeId, 'c1',    this.result.c1   );
            genPushUpdateValue(parse, this.nodeId, 'c2',    this.result.c2   );
            genPushUpdateValue(parse, this.nodeId, 'c3',    this.result.c3   );
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

        color = getScaledDataColor(convertDataColorToSpace(color, toSpace));

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