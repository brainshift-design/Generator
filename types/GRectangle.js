class GRectangle
{
    x;
    y;
    width;
    height;
    angle;
    round;



    constructor()//x, y, width, height, angle, round)
    {
        this.x      = new GNumber(  0);
        this.y      = new GNumber(  0);
        this.width  = new GNumber(100);
        this.height = new GNumber(100);
        this.angle  = new GNumber(  0);
        this.round  = new GNumber(  0);
    }


    
    get valid()
    {
        return this.x     .valid
            && this.y     .valid
            && this.width .valid
            && this.height.valid
            && this.angle .valid
            && this.round .valid;
    }


    
    // toString()
    // {
    //     return isNaN(this.value)
    //         ? '?'
    //         : numToString(this.value, this.decimals);    
    // }
}



// function parseGnum(str)
// {
//     return str == '?'
//         ? new GNumber(Number.NaN, 0)
//         : new GNumber(
//               parseFloat(str),
//               decCount(str));
// }
