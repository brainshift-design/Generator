class   ValueParam
extends Parameter
{
    constructor(name, min, max)
    {
        super('value');

        this._control = document.createElement('div');

        initSlider(
            this._control,
            100,  // width
            20,   // height
            name, 
            min,
            max,
            50,   // default
            0.01, // drag scale
            1,    // wheel step
            0,    // decimals
            0,    // acceleration
            '');  // suffix
    }
}