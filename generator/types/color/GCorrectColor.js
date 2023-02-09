class GCorrectColor
extends GColorType
{
    input        = null;
     
    order        = null;
         
    margin1      = null;
    margin2      = null;
    margin3      = null;
 
    corrections  = [];



    constructor(nodeId, options)
    {
        super(CORRECT_COLOR, nodeId, options);
    }


    
    copy()
    {
        const copy = new GCorrectColor(this.nodeId, this.options);

        copy.copyBase(this);

        if (this.input) 
            copy.input = this.input.copy();

        if (this.order  ) copy.order   = this.order  .copy();
        if (this.margin1) copy.margin1 = this.margin1.copy();
        if (this.margin2) copy.margin2 = this.margin2.copy();
        if (this.margin3) copy.margin3 = this.margin3.copy();
        if (this.value  ) copy.value   = this.value  .copy();

        return copy;
    }



    eval(parse)
    {
        if (this.isCached())
            return this;


        const order   = this.order   ? this.order  .eval(parse).toValue().toInteger() : null;
        const margin1 = this.margin1 ? this.margin1.eval(parse).toValue()             : null;
        const margin2 = this.margin2 ? this.margin2.eval(parse).toValue()             : null;
        const margin3 = this.margin3 ? this.margin3.eval(parse).toValue()             : null;


        if (this.input)
        {
            const input = this.input.eval(parse).toValue();


            if (   isValid(this.order  ) && this.order  .isValid()
                && isValid(this.margin1) && this.margin1.isValid()
                && isValid(this.margin2) && this.margin2.isValid()
                && isValid(this.margin3) && this.margin3.isValid()
                && isValid(this.value  ) && this.value  .isValid())
            {
                genPushUpdateValue(parse, this.nodeId, 'order',   this.order  );
                genPushUpdateValue(parse, this.nodeId, 'margin1', this.margin1);
                genPushUpdateValue(parse, this.nodeId, 'margin2', this.margin2);
                genPushUpdateValue(parse, this.nodeId, 'margin3', this.margin3);
                genPushUpdateValue(parse, this.nodeId, 'value',   this.value  );
            }
            else
            {
                const rgb = input.toRgb();
                
                if (!rgbIsOk(rgb))
                    genQueueMessageToUI(
                    {
                        cmd:   'uiInitNodeProgress',
                        nodeId: this.nodeId
                    });


                const inputColor = input.toDataColor();


                const
            [ closestOklab,
                closestOrder,
                closest1,
                closest2,
                closest3 ] = findCorrection(
                    this.nodeId,
                    inputColor, 
                    order, margin1, margin2, margin3, 
                    this.order   != null,
                    this.margin1 != null, 
                    this.margin2 != null, 
                    this.margin3 != null); 

                     
                //if (!stopGenerate)
                //{
                    if (closestOrder >= 0 && closestOrder < 6)
                    {
                        this._color = correctColor(
                            inputColor,
                            closestOrder,
                            closest1,
                            closest2,
                            closest3);

                            
                        this.value = ColorValue.fromDataColor(this._color);

                        genPushUpdateValue(parse, this.nodeId, 'order',   new NumberValue(closestOrder));
                        genPushUpdateValue(parse, this.nodeId, 'margin1', new NumberValue(closest1    ));
                        genPushUpdateValue(parse, this.nodeId, 'margin2', new NumberValue(closest2    ));
                        genPushUpdateValue(parse, this.nodeId, 'margin3', new NumberValue(closest3    ));
                        genPushUpdateValue(parse, this.nodeId, 'value',   this.value);
                    }
                    else
                    {
                        this.value = ColorValue.NaN;

                        genPushUpdateValue(parse, this.nodeId, 'order',   NumberValue.NaN);
                        genPushUpdateValue(parse, this.nodeId, 'margin1', NumberValue.NaN);
                        genPushUpdateValue(parse, this.nodeId, 'margin2', NumberValue.NaN);
                        genPushUpdateValue(parse, this.nodeId, 'margin3', NumberValue.NaN);
                        genPushUpdateValue(parse, this.nodeId, 'value',   ColorValue .NaN);
                    }
                //}
            }
        }
        else
        {
            this.value = ColorValue.NaN;

            genPushUpdateValue(parse, this.nodeId, 'order',   NumberValue.NaN);
            genPushUpdateValue(parse, this.nodeId, 'margin1', NumberValue.NaN);
            genPushUpdateValue(parse, this.nodeId, 'margin2', NumberValue.NaN);
            genPushUpdateValue(parse, this.nodeId, 'margin3', NumberValue.NaN);
            genPushUpdateValue(parse, this.nodeId, 'value',   ColorValue .NaN);
        }


        this.validate();

        return this;
    }
}



function findCorrection(nodeId,
                        color,
                        order,       margin1, margin2, margin3,
                        lockedOrder, locked1, locked2, locked3) 
{
    const refOklab = dataColor2array(dataColor2oklab(color));

    
    let closestColor = [...color],
        closestOklab = null, 
        closestOrder = order ? order.value : -1,
        closest1     = -1,
        closest2     = -1,
        closest3     = -1;


    let progress = 0,
        total    = 6 * Math.pow(2, Tau);


    let d = 1;

    dLoop:
    while (d > 1/1024)
    {
        //if (stopGenerate) break dLoop;

        let _closestColor = [...closestColor];


        for (let _order = 0; _order < 6; _order++)
        {
            //if (stopGenerate) break dLoop;

            closestColor = [..._closestColor];

            const [min1, min2, min3] = getMinCorrections(color[0], _order);
            const [max1, max2, max3] = getMaxCorrections(color[0], _order);

            let start1 = lerp(min1, closest1, 1-d),  end1 = lerp(max1, closest1, 1-d),
                start2 = lerp(min2, closest2, 1-d),  end2 = lerp(max2, closest2, 1-d),
                start3 = lerp(min3, closest3, 1-d),  end3 = lerp(max3, closest3, 1-d);
               
                
            if (locked1) { closest1 = margin1.toNumber(); start1 = closest1; end1 = closest1+Eps; }
            if (locked2) { closest2 = margin2.toNumber(); start2 = closest2; end2 = closest2+Eps; }
            if (locked3) { closest3 = margin3.toNumber(); start3 = closest3; end3 = closest3+Eps; }
            

          [ closestColor,
            closestOklab,
            closestOrder,
            closest1,
            closest2,
            closest3,
            progress ] = findCorrectionInOrder(
                nodeId,
                refOklab,
                _order, 
                lockedOrder, 
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


    //if (!stopGenerate)
    //{
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
    //}

    
    //stopGenerate = false;


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
                               lockedOrder, 
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


    cLoop:
    for (let m1 = start1; m1 < end1; m1 += (end1-start1)/nSteps1)
    {
        //if (stopGenerate) break cLoop;

        for (let m2 = start2; m2 < end2; m2 += (end2-start2)/nSteps2)
        {
            //if (stopGenerate) break cLoop;

            for (let m3 = start3; m3 < end3; m3 += (end3-start3)/nSteps3)
            {
                //if (stopGenerate) break cLoop;

                const [_color, _oklab, _rgb] = getCorrectedColor(color, order, m1, m2, m3);

                if (   rgbIsOk(_rgb)
                    && (  !closestOklab
                        || rgbDistance(refOklab, _oklab) < rgbDistance(refOklab, closestOklab)))
                {
                    closestColor = _color;
                    closestOklab = _oklab;
                    
                    if (!lockedOrder)
                        closestOrder = order;

                    closest1     = m1;
                    closest2     = m2;
                    closest3     = m3;
                }

                progress++;
            }
        }

        //if (!stopGenerate)
            genQueueMessageToUI(
            {
                cmd:     'uiUpdateNodeProgress',
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
    const _color = correctColor(color, order, m1, m2, m3);
    const _oklab = dataColor2array(dataColor2oklab(_color));
    const _rgb   = oklab2rgb(_oklab);

    return [_color, _oklab, _rgb];
}



function correctColor(color, order, margin1, margin2, margin3)
{
    if (order < 0)
        return color;


    const [i1, i2, i3] = getCorrectionsInOrder(order);

                               color = correctChannel(color, i1, margin1);
    if (!dataColorIsOk(color)) color = correctChannel(color, i2, margin2);
    if (!dataColorIsOk(color)) color = correctChannel(color, i3, margin3);

    return color;
}



function correctChannel(color, iChan, margin)
{
    const factor = colorSpaceFactor(color[0]);

    margin /= factor[iChan];


    const savedColor = [...color];
    const savedValue = color[iChan+1];

    const d = 0.001;


    let _c  = savedValue,
         c_ = savedValue;

    let _valid  = dataColorIsOk(color);
    let  valid_ = _valid;


    let stackOverflowProtect = 1/d;


    while (   !_valid
           && ! valid_
           && stackOverflowProtect-- > 0)
    {
        _c  -= d;  _valid  = isColorOk(_c , iChan, savedColor);
         c_ += d;   valid_ = isColorOk( c_, iChan, savedColor);
    }


    stackOverflowProtect = 1/d;
    color = [...savedColor];


    if (_valid) 
    { 
        _valid = dataColorIsOk(color);
        _c     = savedValue;

        while (   !_valid
               && margin > 0
               && stackOverflowProtect-- > 0)
        {
            _c -= d; 
            _valid = isColorOk(_c, iChan, savedColor);
            margin -= d;
        }

        color[iChan+1] = _c;
    }
    else if (valid_)
    { 
        valid_ = dataColorIsOk(color);
        c_     = savedValue;

        while (   !valid_
               && margin > 0
               && stackOverflowProtect-- > 0)
        {
            c_ += d; 
            valid_ = isColorOk(c_, iChan, savedColor);
            margin -= d;
        }

        color[iChan+1] = c_;
    }


    return color;
}



function isColorOk(c, iChan, savedColor)
{
    let color = [...savedColor];
    color[iChan+1] = c; 
    return dataColorIsOk(color);
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
    console.assert(false, 'invalid correction order ' + order);
    return [0, 0, 0];
}



function getMinCorrections(space, order)
{
    const [c1, c2, c3] = getCorrectionsInOrder(order);

    let min;

    switch (space)
    {
        case 'hex':
        case 'rgb':    min = [0, 0, 0]; break

        case 'hsv': 
        case 'hsl':    min = [0, 0, 0]; break;

        case 'hclokl':
        case 'hcllab':
        case 'hclluv': min = [0, 0, 0]; break;

        case 'oklab':
        case 'lab':
        case 'luv':    min = [0, -oppFactor[1]/2, -oppFactor[2]/2]; break;
        
        default:
            // should never get here
            console.assert(false, 'invalid validation order ' + order);
            return [0, 0, 0];
    }

    return [min[c1], min[c2], min[c3]];
}



function getMaxCorrections(space, order)
{
    const [c1, c2, c3] = getCorrectionsInOrder(order);

    let max;

    switch (space)
    {
        case 'hex':
        case 'rgb':    max = [...rgbFactor]; break;

        case 'hsv': 
        case 'hsl':    max = [hs_Factor[0]/2, hs_Factor[1], hs_Factor[2]]; break;

        case 'hclokl':
        case 'hcllab':
        case 'hclluv': max = [hclFactor[0]/2, hclFactor[1], hclFactor[2]]; break;

        case 'oklab':
        case 'lab':
        case 'luv':    max = [...oppFactor]; break;
        
        default:
            // should never get here
            console.assert(false, 'invalid validation order ' + order);
            return [0, 0, 0];
    }

    return [max[c1], max[c2], max[c3]];
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
