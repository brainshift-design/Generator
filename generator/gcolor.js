function genFindCorrection(nodeId, inputColor)
{
    const refRgb = invalid2validRgb(dataColor2array(convert2rgb(inputColor)));

    let [ closestRgb,
          closestOrder,
          closest1,
          closest2,
          closest3 ] = findCorrection(nodeId, inputColor, refRgb);

    genPostMessageToUi(
    {
        msg:         'uiEndFindCorrection',
        nodeId:       nodeId,
        success:      closestRgb != null,
        closestOrder: closestOrder,
        closest1:     closest1,
        closest2:     closest2,
        closest3:     closest3
    });
}



function findCorrection(nodeId, color, refRgb)
{
    let closestRgb   = null,
        closestOrder = -1,
        closest1     = -1,
        closest2     = -1,
        closest3     = -1;


    let nSteps   = 10;

    let progress = 0,
        total    = 6 * nSteps * nSteps * nSteps;


    for (let order = 0; order < 6; order++)
    {
        const [max1, max2, max3] = getValidateMax(order);

        let start1 = 0,
            start2 = 0,
            start3 = 0;

        let end1 = max1,
            end2 = max2,
            end3 = max3;

        [ closestRgb,
          closestOrder,
          closest1,
          closest2,
          closest3,
          progress ] = findCorrectionInOrder(
              nodeId,
              color,
              refRgb,
              order, 
              max1,   max2,   max3, 
              start1, start2, start3, 
              end1,   end2,   end3,
              closestRgb, 
              closestOrder,
              closest1, 
              closest2, 
              closest3, 
              10,
              progress,
              total);
    }


    return [
        closestRgb,
        closestOrder,
        closest1,
        closest2,
        closest3 ];
}



function findCorrectionInOrder(nodeId,
                               color,
                               refRgb,
                               order, 
                               max1,   max2,   max3, 
                               start1, start2, start3, 
                               end1,   end2,   end3,
                               closestRgb, 
                               closestOrder,
                               closest1, 
                               closest2, 
                               closest3,
                               nSteps,
                               progress,
                               total)
{
    for (let m1 = start1; m1 < end1; m1 += max1/nSteps)
    {
        for (let m2 = start2; m2 < end2; m2 += max2/nSteps)
        {
            for (let m3 = start3; m3 < end3; m3 += max3/nSteps)
            {
                const _color = adjustColor(color, order, m1, m2, m3);
                const _rgb   = dataColor2array(convert2rgb(_color));

                if (   isValidRgb(_rgb)
                    && (  !closestRgb
                        || rgbDistance(refRgb, _rgb) < rgbDistance(refRgb, closestRgb)))
                {
                    closestRgb   = _rgb;
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
        closestRgb,
        closestOrder,
        closest1,
        closest2,
        closest3,
        progress ];
}