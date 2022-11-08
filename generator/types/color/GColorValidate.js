class GColorValidate
extends GColorType
{
    input = null;

    order;
    
    margin1;
    margin2;
    margin3;

    corrections = [];



    constructor(nodeId, options)
    {
        super(COLOR_VALIDATE, nodeId, options);
    }


    
    copy()
    {
        const val = new GColorValidate(this.nodeId, this.options);

        val.copyBase(this);

        if (this.input) 
            val.input = this.input.copy();

        val.order   = this.order  .copy();
        val.margin1 = this.margin1.copy();
        val.margin2 = this.margin2.copy();
        val.margin3 = this.margin3.copy();

        return val;
    }



    eval(parse)
    {
        if (this.valid)
            return this;


        this.order   = this.order  .eval(parse).copy();
        this.margin1 = this.margin1.eval(parse).copy();
        this.margin2 = this.margin2.eval(parse).copy();
        this.margin3 = this.margin3.eval(parse).copy();

        const order   = this.order  .toValue();
        const margin1 = this.margin1.toValue();
        const margin2 = this.margin2.toValue();
        const margin3 = this.margin3.toValue();

        
        if (this.input)
        {
            this.input = this.input.eval(parse).copy();
            const input = this.input.toValue();

            
            const rgb = input.toRgb();

            
            if (!rgbIsNaN(rgb))
            {
                const orderValue = Math.min(Math.max(0, order.value), 5);
                const inputColor = input.toDataColor();


                const
              [ closestOklab,
                closestOrder,
                closest1,
                closest2,
                closest3 ] = findCorrection(
                                 this.nodeId,
                                 inputColor, 
                                 margin1, margin2, margin3, 
                                 this.margin1.input, this.margin2.input, this.margin3.input); 


                this._color = validateColor(
                    inputColor,
                    closestOrder, 
                    closest1,
                    closest2,
                    closest3);

                const factor = getColorSpaceFactor(this._color[0]);

                this.value = ColorValue.create(
                    colorSpaceIndex(this._color[0]),
                    this._color[1] * factor[0],
                    this._color[2] * factor[1],
                    this._color[3] * factor[2]);


                genPushUpdateValue(parse, this.nodeId, 'order',   new NumberValue(closestOrder));
                genPushUpdateValue(parse, this.nodeId, 'margin1', new NumberValue(closest1));
                genPushUpdateValue(parse, this.nodeId, 'margin2', new NumberValue(closest2));
                genPushUpdateValue(parse, this.nodeId, 'margin3', new NumberValue(closest3));
            }
            else
                this.value = ColorValue.NaN;
        }
        else
            this.value = ColorValue.NaN;


        genPushUpdateValue(parse, this.nodeId, 'value', this.value);

        
        this.valid = true;

        return this;
    }
}



function validateColor(color, order, margin1, margin2, margin3)
{
    const [i1, i2, i3] = getCorrectionsInOrder(order);

                                  color = validateChannel(color, i1, margin1);
    if (!dataColorIsValid(color)) color = validateChannel(color, i2, margin2);
    if (!dataColorIsValid(color)) color = validateChannel(color, i3, margin3);

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

    let _valid  = dataColorIsValid(color);
    let  valid_ = _valid;


    let stackOverflowProtect = 1/d;


    while (   !_valid
           && ! valid_
           && stackOverflowProtect-- > 0)
    {
        _c  -= d;  _valid  = isColorValid(_c , iChan, savedColor);
         c_ += d;   valid_ = isColorValid( c_, iChan, savedColor);
    }


    stackOverflowProtect = 1/d;
    color = [...savedColor];


    if (_valid) 
    { 
        _valid = dataColorIsValid(color);
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
        valid_ = dataColorIsValid(color);
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
    return dataColorIsValid(color);
}



function getCorrectionsInOrder(order)
{
    switch (order)
    {
        case 0: return [0, 1, 2];
        case 1: return [1, 0, 2];
        case 2: return [1, 2, 0];
        case 3: return [0, 2, 1];
        case 4: return [2, 0, 1];
        case 5: return [2, 1, 0];
    }

    // should never get here
    console.assert(false, 'invalid validation order');
    return [0, 0, 0];
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
    console.assert(false, 'invalid validation order');
    return [0, 0, 0];
}



function findCorrection(nodeId,
                        color,
                        param1,  param2,  param3,
                        locked1, locked2, locked3) 
{
    const refOklab = dataColor2array(convert2oklab(color));


    let closestColor = [...color],
        closestOklab = null, 
        closestOrder = -1,
        closest1     = -1,
        closest2     = -1,
        closest3     = -1;


    let progress = 0,
        total    = 6 * Math.pow(2, Tau);


    let d = 1;

    while (d > 1/1024)
    {
        let _closestColor = [...closestColor];


        for (let order = 0; order < 6; order++)
        {
            closestColor = [..._closestColor];

            const [max1, max2, max3] = getValidateMax(order);

            let start1 = lerp(0, closest1, 1-d),  end1 = lerp(max1, closest1, 1-d),
                start2 = lerp(0, closest2, 1-d),  end2 = lerp(max2, closest2, 1-d),
                start3 = lerp(0, closest3, 1-d),  end3 = lerp(max3, closest3, 1-d);
               
                
            if (locked1) { closest1 = param1; start1 = closest1; end1 = start1+Eps; }
            if (locked2) { closest2 = param2; start2 = closest2; end2 = start2+Eps; }
            if (locked3) { closest3 = param3; start3 = closest3; end3 = start3+Eps; }
            

          [ closestColor,
            closestOklab,
            closestOrder,
            closest1,
            closest2,
            closest3,
            progress ] = findCorrectionInOrder(
                nodeId,
                refOklab,
                order, 
                locked1,  locked2,  locked3,
                closest1, closest2, closest3,
                start1,   start2,   start3, 
                end1,     end2,     end3,
                [...closestColor],
                closestOklab, 
                closestOrder,
                progress,
                total);
        }

        
        d /= 2;
    }


    // reduce closest to necessary minimums

    const closestRgb = getCorrectedColor(color, closestOrder, closest1, closest2, closest3)[2];

    let c1 = closest1;
    let c2 = closest2;
    let c3 = closest3;

    while (c1 >= 0 && rgbEqual(getCorrectedColor(color, closestOrder, c1-1, closest2, closest3)[2], closestRgb)) c1--;
    while (c2 >= 0 && rgbEqual(getCorrectedColor(color, closestOrder, closest1, c2-1, closest3)[2], closestRgb)) c2--;
    while (c3 >= 0 && rgbEqual(getCorrectedColor(color, closestOrder, closest1, closest2, c3-1)[2], closestRgb)) c3--;

    closest1 = Math.max(0, c1);
    closest2 = Math.max(0, c2);
    closest3 = Math.max(0, c3);

    
    return [
        closestOklab,
        closestOrder,
        closest1,
        closest2,
        closest3 ];
}



function findCorrectionInOrder(nodeId,
                               refOklab,
                               order, 
                               locked1,  locked2,  locked3,
                               closest1, closest2, closest3,
                               start1,   start2,   start3, 
                               end1,     end2,     end3,
                               closestColor,
                               closestOklab,
                               closestOrder,
                               progress,
                               total)
{
    const color = [...closestColor];
    
    let nSteps1 = locked1 ? 1 : 2;
    let nSteps2 = locked2 ? 1 : 2;
    let nSteps3 = locked3 ? 1 : 2;


    for (let m1 = start1; m1 < end1; m1 += (end1-start1)/nSteps1)
    {
        for (let m2 = start2; m2 < end2; m2 += (end2-start2)/nSteps2)
        {
            for (let m3 = start3; m3 < end3; m3 += (end3-start3)/nSteps3)
            {
                const [_color, _oklab, _rgb] = getCorrectedColor(color, order, m1, m2, m3);

                if (   rgbIsValid(_rgb)
                    && (  !closestOklab
                        || rgbDistance(refOklab, _oklab) < rgbDistance(refOklab, closestOklab)))
                {
                    closestColor = _color;
                    closestOklab = _oklab;
                    closestOrder = order;
                    closest1     = m1;
                    closest2     = m2;
                    closest3     = m3;
                }

                progress++;
            }
        }

        genQueueMessageToUI(
        {
            cmd:     'uiUpdateFindCorrection',
            nodeId:   nodeId,
            progress: progress / total
        });
    }


    return [
        closestColor,
        closestOklab,
        closestOrder,
        closest1,
        closest2,
        closest3,
        progress ];
}



function getCorrectedColor(color, order, m1, m2, m3)
{
    const _color = validateColor(color, order, m1, m2, m3);
    const _oklab = dataColor2array(convert2oklab(_color));
    const _rgb   = oklab2rgb(_oklab);

    return [_color, _oklab, _rgb];
}



function reorderCorrection(closestOrder,
                           closest1, closest2, closest3,
                           locked1,  locked2,  locked3)
{
    let c1 = { closest: closest1, locked: locked1 };
    let c2 = { closest: closest2, locked: locked2 };
    let c3 = { closest: closest3, locked: locked3 };

    if (   c1.closest <  Eps
        && c2.closest <  Eps
        && c3.closest >= Eps)
    {
        switch (closestOrder)
        {
            case 0: closestOrder = 4; break;
            case 1: closestOrder = 5; break;
            case 2: closestOrder = 0; break;
            case 3: closestOrder = 1; break;
            case 4: closestOrder = 2; break;
            case 5: closestOrder = 3; break;
        }

        const tmp = c2;
        c1 = c3;
        c2 = c1;
        c3 = tmp;
    }
    else if (c1.closest >= Eps
          && c2.closest <  Eps)
    {
        switch (closestOrder)
        {
            case 0: closestOrder = 3; break;
            case 1: closestOrder = 2; break;
            case 2: closestOrder = 1; break;
            case 3: closestOrder = 0; break;
            case 4: closestOrder = 5; break;
            case 5: closestOrder = 4; break;
        }

        const tmp = c2;
        c2 = c3;
        c3 = tmp;
    }
    else if (c1.closest < Eps)
    {
        switch (closestOrder)
        {
            case 0: closestOrder = 2; break;
            case 1: closestOrder = 3; break;
            case 2: closestOrder = 4; break;
            case 3: closestOrder = 5; break;
            case 4: closestOrder = 0; break;
            case 5: closestOrder = 1; break;
        }

        const tmp = c1;
        c1 = c2;
        c2 = c3;
        c3 = tmp;
    }


    return [
        closestOrder,
        c1.closest, c2.closest, c3.closest,
        c1.locked,  c2.locked,  c3.locked ];
}
