function genFindCorrection(nodeId, inputColor, param1, param2, param3, locked1, locked2, locked3)
{
    const refOklab = dataColor2array(convert2oklab(inputColor));

    let [ closestOklab,
          closestOrder,
          closest1,
          closest2,
          closest3 ] = findCorrection(nodeId, inputColor, refOklab, param1, param2, param3, locked1, locked2, locked3); 


    if (closest1 == 0)
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

        const temp = closest1;
        closest1 = closest2;
        closest2 = closest3;
        closest3 = temp;
    }


    genPostMessageToUi(
    {
        msg:         'uiEndFindCorrection',
        nodeId:       nodeId,
        success:      closestOklab != null,
        closestOrder: closestOrder,
        closest1:     closest1,
        closest2:     closest2,
        closest3:     closest3
    });
}



function findCorrection(nodeId, color, refOklab, param1, param2, param3, locked1, locked2, locked3) 
{
    let closestColor = [...color],
        closestOklab = null, 
        closestOrder = -1,
        closest1     = -1,
        closest2     = -1,
        closest3     = -1;


    let nSteps = 2;

    let progress = 0,
        total    = 6 * Math.pow(nSteps, Tau);


    let d = 1;

    while (d > 1/1024)
    {
        let _closestColor = [...closestColor];


        for (let order = 0; order < 6; order++)
        {
            closestColor = [..._closestColor];

            const [max1, max2, max3] = getValidateMax(order);

            let start1 = lerp(0, closest1, 1-d),
                start2 = lerp(0, closest2, 1-d),
                start3 = lerp(0, closest3, 1-d);

            let end1 = lerp(max1, closest1, 1-d),
                end2 = lerp(max2, closest2, 1-d),
                end3 = lerp(max3, closest3, 1-d);

            if (locked1) { closest1 = param1; start1 = closest1; end1 = start1+0.001; }
            if (locked2) { closest2 = param2; start2 = closest2; end2 = start2+0.001; }
            if (locked3) { closest3 = param3; start3 = closest3; end3 = start3+0.001; }

            // console.log('start1', start1);
            // console.log('start2', start2);
            // console.log('start3', start3);

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
                start1, start2, start3, 
                end1,   end2,   end3,
                [...closestColor],
                closestOklab, 
                closestOrder,
                closest1, 
                closest2, 
                closest3, 
                locked1 ? 1 : nSteps,
                locked2 ? 1 : nSteps,
                locked3 ? 1 : nSteps,
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

    closest1 = c1;
    closest2 = c2;
    closest3 = c3;


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
                               start1, start2, start3, 
                               end1,   end2,   end3,
                               closestColor,
                               closestOklab,
                               closestOrder,
                               closest1, 
                               closest2, 
                               closest3,
                               nSteps1,
                               nSteps2,
                               nSteps3,
                               progress,
                               total)
{
    const color = [...closestColor];


    for (let m1 = start1; m1 < end1; m1 += (end1-start1)/nSteps1)
    {
        for (let m2 = start2; m2 < end2; m2 += (end2-start2)/nSteps2)
        {
            for (let m3 = start3; m3 < end3; m3 += (end3-start3)/nSteps3)
            {
                const [_color, _oklab, _rgb] = getCorrectedColor(color, order, m1, m2, m3);

                if (   isValidRgb(_rgb)
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

        genPostMessageToUi(
        {
            msg:     'uiUpdateFindCorrection',
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
    const _color = adjustColor(color, order, m1, m2, m3);
    const _oklab = dataColor2array(convert2oklab(_color));
    const _rgb   = oklab2rgb(_oklab);

    return [_color, _oklab, _rgb];
}