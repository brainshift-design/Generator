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



function genFindCorrection(nodeId, 
                           inputColor, 
                           param1,  param2,  param3, 
                           locked1, locked2, locked3)
{
    const refOklab = dataColor2array(convert2oklab(inputColor));

    let
  [ closestOklab,
    closestOrder,
    closest1,
    closest2,
    closest3 ] = findCorrection(
                     nodeId, 
                     inputColor, 
                     refOklab, 
                     param1,  param2,  param3, 
                     locked1, locked2, locked3); 

//   [ closestOrder,
//     closest1, closest2, closest3,
//     locked1,  locked2,  locked3 ] = reorderCorrection(
//                                         closestOrder,
//                                         closest1, closest2, closest3,
//                                         locked1,  locked2,  locked3);

    genQueueMessageToUI(
    {
        cmd:         'uiEndFindCorrection',
        nodeId:       nodeId,
        success:      closestOklab != null,
        closestOrder: closestOrder,
        closest1:     closest1,
        closest2:     closest2,
        closest3:     closest3
    });
}



function findCorrection(nodeId, 
                        color, 
                        refOklab, 
                        param1,  param2,  param3, 
                        locked1, locked2, locked3) 
{
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

    // console.log('closest1', closest1);
    // console.log('closest2', closest2);
    // console.log('closest3', closest3);
    // console.log('');

    while (c1 >= 0 && rgbEqual(getCorrectedColor(color, closestOrder, c1-1, closest2, closest3)[2], closestRgb)) c1--;
    while (c2 >= 0 && rgbEqual(getCorrectedColor(color, closestOrder, closest1, c2-1, closest3)[2], closestRgb)) c2--;
    while (c3 >= 0 && rgbEqual(getCorrectedColor(color, closestOrder, closest1, closest2, c3-1)[2], closestRgb)) c3--;

    closest1 = Math.max(0, c1);
    closest2 = Math.max(0, c2);
    closest3 = Math.max(0, c3);

    // console.log('closest1', closest1);
    // console.log('closest2', closest2);
    // console.log('closest3', closest3);
    // console.log('');

    
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

    // console.log('order', order);
    // console.log('-------------------')

    // console.log('locked1',  locked1);
    // console.log('start1',   start1);
    // console.log('end1',     end1);
    
    // console.log('locked2',  locked2);
    // console.log('start2',   start2);
    // console.log('end2',     end2);
    
    // console.log('locked3',  locked3);
    // console.log('start3',   start3);
    // console.log('end3',     end3);

    // console.log('-------------------')
    // console.log('')

    
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

                    console.log('order', order);
                    console.log('closest1', closest1);
                    console.log('closest2', closest2);
                    console.log('closest3', closest3);
                    console.log('');
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
