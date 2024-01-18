class ColorCorrection
{
    name; // 'H', 'C', or 'L'
    max;
    value;
    
    constructor(name = '', max = 0, value = 0)//, locked = false)
    {
        this.name  = name;
        this.max   = max;
        this.value = value;
    }
}



async function findCorrection(parse,
                              nodeId,
                              color,
                              order, _c1, _c2, _c3,
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
        
    parse.totalProgress += 1024;


    dLoop:
    while (d > 1/1024)
    {
        if (parse.stopGenerate)//stop()) 
            break dLoop;

        let _closestColor = [...closestColor];


        for (let _order = 0; _order < 6; _order++)
        {
            if (parse.stopGenerate)//stop()) 
                break dLoop;

            closestColor = [..._closestColor];

            const [min1, min2, min3] = getMinCorrections(color[0], _order);
            const [max1, max2, max3] = getMaxCorrections(color[0], _order);

            let start1 = lerp(min1, closest1, 1-d),  end1 = lerp(max1, closest1, 1-d),
                start2 = lerp(min2, closest2, 1-d),  end2 = lerp(max2, closest2, 1-d),
                start3 = lerp(min3, closest3, 1-d),  end3 = lerp(max3, closest3, 1-d);
               
            // console.log('min1 =', min1);
            // console.log('max1 =', max1);
            // console.log('closest1 =', closest1);
            // console.log('locked1 =', locked1);
            // console.log('start1 =', start1);
            // console.log('_c1 =', _c1);
            
            if (locked1) { closest1 = _c1.toNumber(); start1 = closest1; end1 = closest1+Epsilon; }
            if (locked2) { closest2 = _c2.toNumber(); start2 = closest2; end2 = closest2+Epsilon; }
            if (locked3) { closest3 = _c3.toNumber(); start3 = closest3; end3 = closest3+Epsilon; }
            // console.log('closest1 =', closest1);
            // console.log('');
            

          [ closestColor,
            closestOklab,
            closestOrder,
            closest1,
            closest2,
            closest3,
            progress ] = await findCorrectionInOrder(
                parse,
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


        if (parse.stopGenerate)
            break;

        
        d /= 2;


        parse.currentProgress++;


        if (await checkStop(parse.requestId))
            break;
    }


    if (   /*!parse.stop()
        &&*/ !parse.stopGenerate)
    {
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
    }

    
    return [
        closestOrder,
        closest1,
        closest2,
        closest3 ];
}



async function findCorrectionInOrder(parse,
                                     nodeId,
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
        if (parse.stopGenerate)//stop()) 
            break cLoop;

        for (let m2 = start2; m2 < end2; m2 += (end2-start2)/nSteps2)
        {
            if (parse.stopGenerate)//stop()) 
                break cLoop;

            for (let m3 = start3; m3 < end3; m3 += (end3-start3)/nSteps3)
            {
                if (parse.stopGenerate)//stop()) 
                    break cLoop;

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

        
        if (parse.repeats.length == 1)
        {
            // const stopRequestId = await genGetValueFromUi('stopRequestId');

            // if (   parse.requestId == stopRequestId.value
            //     || curRequestIds.includes(parse.requestId)) 
            // { 
            //     parse.stopGenerate = true;
            //     break; 
            // }
        }


        genUpdateNodeProgress(parse, nodeId, progress / total, false);
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
    const oklab  = dataColor2array(dataColor2oklab(_color));
    const rgb    = oklab2rgb(oklab);

    return [_color, oklab, rgb];
}



function correctColor(color, order, c1, c2, c3)
{
    if (order < 0)
        return color;


    const [i1, i2, i3] = getCorrectionsInOrder(order);

                               color = correctChannel(color, i1, c1);
    if (!dataColorIsOk(color)) color = correctChannel(color, i2, c2);
    if (!dataColorIsOk(color)) color = correctChannel(color, i3, c3);


    // clip colors that are reasonably valid but stick over the fence
    
    let rgb = dataColor2rgb(color);

    if (rgbIsOk(rgb))
        rgb = invalid2validRgb(rgb);
    
        
    color = convertDataColorToSpace(
        rgb2dataColor(rgb),
        color[0]);

    
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
            margin -= Math.sign(margin) * d;
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
            margin -= Math.sign(margin) * d;
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
    consoleError('invalid correction order ' + order);
    return [0, 0, 0];
}



function getMinCorrections(space, order)
{
    const [c1, c2, c3] = getCorrectionsInOrder(order);

    let min;

    switch (space)
    {
        case 'hex':
        case 'rgb':    min = [0, 0, 0]; break;

        case 'hsv': 
        case 'hsl':    min = [0, 0, 0]; break;

        case 'hclok':
        case 'hclab':
        case 'hcluv': min = [0, 0, 0]; break;

        case 'oklab':
        case 'lab':
        case 'luv':    min = [0, -oppFactor[1]/2, -oppFactor[2]/2]; break;
        
        default:
            // should never get here
            consoleError('invalid validation order ' + order);
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

        case 'hclok':
        case 'hclab':
        case 'hcluv': max = [hclFactor[0]/2, hclFactor[1], hclFactor[2]]; break;

        case 'oklab':
        case 'lab':
        case 'luv':    max = [...oppFactor]; break;
        
        default:
            // should never get here
            consoleError('invalid validation order ' + order);
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

    if (   c1.closest <  Epsilon
        && c2.closest <  Epsilon
        && c3.closest >= Epsilon)
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
    else if (c1.closest >= Epsilon
          && c2.closest <  Epsilon)
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
    else if (c1.closest < Epsilon)
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



function getColorCorrections(colorSpace)
{
    switch (colorSpace)
    {
    case 'hex':
    case 'rgb':
        return [
            new ColorCorrection('R', rgbFactor[0]),
            new ColorCorrection('G', rgbFactor[1]),
            new ColorCorrection('B', rgbFactor[2]) ];

    case 'hsv':
        return [
            new ColorCorrection('H', hs_Factor[0]/2),
            new ColorCorrection('S', hs_Factor[1]),
            new ColorCorrection('V', hs_Factor[2]) ];

    case 'hsl':
        return [
            new ColorCorrection('H', hs_Factor[0]/2),
            new ColorCorrection('S', hs_Factor[1]),
            new ColorCorrection('L', hs_Factor[2]) ];

    case 'hclok':
    case 'hclab':
    case 'hcluv':
        return [
            new ColorCorrection('H', hclFactor[0]/2),
            new ColorCorrection('C', hclFactor[1]),
            new ColorCorrection('L', hclFactor[2]) ];

    case 'oklab': 
    case 'lab':
        return [
            new ColorCorrection('L', oppFactor[0]),
            new ColorCorrection('a', oppFactor[1]),
            new ColorCorrection('b', oppFactor[2]) ];

    case 'luv':
        return [
            new ColorCorrection('L', oppFactor[0]),
            new ColorCorrection('u', oppFactor[1]),
            new ColorCorrection('v', oppFactor[2]) ];
    }


    consoleError('invalid color space ' + colorSpace);
    return [
        new ColorCorrection(),
        new ColorCorrection(),
        new ColorCorrection() ];
}