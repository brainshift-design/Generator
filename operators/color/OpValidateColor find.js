function validateColor(color, order, margin1, margin2, margin3)
{
    let i1, i2, i3;
    
         if (order == 0) { i1 = 0; i2 = 1; i3 = 2; } // HCL
    else if (order == 1) { i1 = 1; i2 = 0; i3 = 2; } // CHL
    else if (order == 2) { i1 = 1; i2 = 2; i3 = 0; } // CLH
    else if (order == 3) { i1 = 0; i2 = 2; i3 = 1; } // HLC
    else if (order == 4) { i1 = 2; i2 = 0; i3 = 1; } // LHC
    else if (order == 5) { i1 = 2; i2 = 1; i3 = 0; } // LCH
 
                                           color = validateChannel(color, i1, margin1);
    if (!isRgbValid(dataColor2rgb(color))) color = validateChannel(color, i2, margin2);
    if (!isRgbValid(dataColor2rgb(color))) color = validateChannel(color, i3, margin3);

    return color;
}



function validateChannel(color, iChan, margin)
{
    const factor = getColorSpaceFactor(color[0]);

    margin /= factor[iChan];


    const savedColor = [...color];
    const savedValue = color[iChan+1];

    const d = 0.001;


    let _c  = savedValue,
         c_ = savedValue;

    let _valid  = isRgbValid(dataColor2rgb(color));
    let  valid_ = _valid;


    let stackOverflowProtect = 1/d;


    while (   !_valid
           && ! valid_
           && stackOverflowProtect-- > 0)
    {
        _c -= d;  _valid = isColorValid(_c, iChan, savedColor);
        c_ += d;  valid_ = isColorValid(c_, iChan, savedColor);
    }


    stackOverflowProtect = 1/d;
    color = [...savedColor];


    if (_valid) 
    { 
        _valid = isRgbValid(dataColor2rgb(color));
        _c     = savedValue;

        while (   !_valid
               && margin > 0
               && stackOverflowProtect-- > 0)
        {
            _c -= d; 
            _valid = isColorValid(_c, iChan, savedColor);
            margin -= d;
        }

        color[iChan+1] = _c;
    }
    else if (valid_)
    { 
        valid_ = isRgbValid(dataColor2rgb(color));
        c_     = savedValue;

        while (   !valid_
               && margin > 0
               && stackOverflowProtect-- > 0)
        {
            c_ += d; 
            valid_ = isColorValid(c_, iChan, savedColor);
            margin -= d;
        }

        color[iChan+1] = c_;
    }


    return color;
}



function isColorValid(c, iChan, savedColor)
{
    let color = [...savedColor];
    color[iChan+1] = c; 
    return isRgbValid(dataColor2rgb(color));
}



function getValidateMax(order)
{
    switch (order)
    {
        case 0: return [180, 100, 100]; // HCL
        case 1: return [100, 180, 100]; // CHL
        case 2: return [100, 100, 180]; // CLH
        case 3: return [180, 100, 100]; // HLC
        case 4: return [100, 180, 100]; // LHC
        case 5: return [100, 100, 180]; // LCH
    }

    // should never get here
    return [0, 0, 0];
}