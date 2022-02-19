function genFindCorrection(nodeId, inputColor)
{
    //const refRgb = invalid2validRgb(dataColor2array(convert2rgb(inputColor)));
    const refOklab = dataColor2array(convert2oklab(inputColor));

    let [ closestOklab, //closestRgb,
          closestOrder,
          closest1,
          closest2,
          closest3 ] = findCorrection(nodeId, inputColor, refOklab); //refRgb);


    if (closest1 == 0)
    {
        switch (closestOrder)
        {
            case 0: closestOrder = 3; break;
            case 1: closestOrder = 5; break;
            case 2: closestOrder = 1; break;
            case 3: closestOrder = 4; break;
            case 4: closestOrder = 0; break;
            case 5: closestOrder = 2; break;
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
        success:      closestOklab != null, //closestRgb != null,
        closestOrder: closestOrder,
        closest1:     closest1,
        closest2:     closest2,
        closest3:     closest3
    });
}



function findCorrection(nodeId, color, refOklab) //refRgb)
{
    let closestColor = [...color],
        closestOklab = null, //closestRgb   = null,
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

          [ closestColor,
            closestOklab, //closestRgb,
            closestOrder,
            closest1,
            closest2,
            closest3,
            progress ] = findCorrectionInOrder(
                nodeId,
                refOklab, //refRgb,
                order, 
                start1, start2, start3, 
                end1,   end2,   end3,
                [...closestColor],
                closestOklab, //closestRgb, 
                closestOrder,
                closest1, 
                closest2, 
                closest3, 
                nSteps,
                progress,
                total);
        }

        
        d /= 2;
    }


    return [
        closestOklab, //closestRgb,
        closestOrder,
        closest1,
        closest2,
        closest3 ];
}



function findCorrectionInOrder(nodeId,
                               refOklab, //refRgb,
                               order, 
                               start1, start2, start3, 
                               end1,   end2,   end3,
                               closestColor,
                               closestOklab, //closestRgb, 
                               closestOrder,
                               closest1, 
                               closest2, 
                               closest3,
                               nSteps,
                               progress,
                               total)
{
    const color = [...closestColor];


    for (let m1 = start1; m1 < end1; m1 += (end1-start1)/nSteps)
    {
        for (let m2 = start2; m2 < end2; m2 += (end2-start2)/nSteps)
        {
            for (let m3 = start3; m3 < end3; m3 += (end3-start3)/nSteps)
            {
                const _color = adjustColor(color, order, m1, m2, m3);
                const _oklab = dataColor2array(convert2oklab(_color));
                const _rgb   = oklab2rgb(_oklab);

                if (   isValidRgb(_rgb)
                    && (  !closestOklab //!closestRgb
                        || rgbDistance(refOklab, _oklab) < rgbDistance(refOklab, closestOklab)))
                        //|| rgbDistance(refRgb, _rgb) < rgbDistance(refRgb, closestRgb)))
                {
                    closestColor = _color;
                    //closestRgb   = _rgb;
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
        closestOklab, //closestRgb,
        closestOrder,
        closest1,
        closest2,
        closest3,
        progress ];
}