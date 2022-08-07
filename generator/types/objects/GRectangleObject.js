class GRectangleObject
extends GObject
{
    x      = 0;
    y      = 0;
    width  = 0.01;
    height = 0.01;
    angle  = 0;
    round  = 0;



    // copy()
    // {
    //     const rect = new GRectangleObject();

    //     rect.x      = this.x; 
    //     rect.y      = this.y; 
    //     rect.width  = this.width; 
    //     rect.height = this.height; 
    //     rect.angle  = this.angle; 
    //     rect.round  = this.round;
    // }



    // isValid()
    // {
    //     return this.x     .isValid()
    //         && this.y     .isValid()
    //         && this.width .isValid()
    //         && this.height.isValid()
    //         && this.angle .isValid()
    //         && this.round .isValid();
    // }



    toString()
    {
        return '';

        // return this.isValid()
        //     ?         this.x     .toString()
        //       + ' ' + this.y     .toString()
        //       + ' ' + this.width .toString()
        //       + ' ' + this.height.toString()
        //       + ' ' + this.angle .toString()
        //       + ' ' + this.round .toString()
        //     : INVALID;
    }
}