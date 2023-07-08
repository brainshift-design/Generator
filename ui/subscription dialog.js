var subscription            = NULL;
var checkoutTimer           = -1;
var subscriptionDialogShown = false;



function onSubscribeClick()
{
    let checkoutSession = arrayToBase32(sign(hashLicenseString(
        currentUser.id + (new Date().getTime()).toString(),
        30), licenseKeys.private));


    const response = postToServer(
    {
        action: 'createCheckout',
        userId:  currentUser.id,
        session: checkoutSession
    }); 
    

    if (   response
        && response.result)
    {
        window.open('https://brainshift.design/generator/checkout.html?' + checkoutSession, '_blank');

        checkoutTimer = setInterval(() => 
        {
            checkLastSub().then(lastSub =>
            {
                if (   lastSub
                    && lastSub.daysLeft > 0)
                    uiRestartGenerator(false);
            });
        }, 
        4000);
    }
    else
    {
        console.error('Could not create create Generator checkout session.')
    }
}



function showSubscriptionDialog(showBack = true)
{
    subscriptionBack  .style.display = 'block';
    subscriptionDialog.style.display = 'block';

    subscriptionBack.style.backgroundColor = showBack ? '#0005' : 'transparent';
    
    updateLicenseInfo(
        subscription != NULL
        ? validateLicense(currentUser.id, subscription)
        : null)
    .then(() => 
    {
        dialogShown             = true;
        subscriptionDialogShown = true;
    });
}



function hideSubscriptionDialog()
{
    if (checkoutTimer >= 0)
        clearInterval(checkoutTimer);

    subscriptionBack  .style.display = 'none';
    subscriptionDialog.style.display = 'none';

    dialogShown             = false;
    subscriptionDialogShown = false;
}



subscriptionClose.addEventListener('pointerdown', e => e.stopPropagation());



async function updateLicenseInfo()
{
    const lastSub       = await checkLastSub();
    const trialDaysLeft = await checkRemainingTrialDays();


    if (   lastSub
        && lastSub.daysLeft > 0)
    {
        const daysLeft = formatDaysLeft(lastSub.daysLeft);

        licenseInfo.innerHTML            = daysLeft + ' of your subscription.';
     
        licenseInfo.style.top            = '55%';
        licenseInfo.style.transform      = 'translateX(-50%) translateY(-50%)';

        // aboutUserId.style.display = 'none';
        btnSubscribe      .style.display = 'none';

        subscriptionClose.style.display  = 'inline-block';

        if (checkoutTimer >= 0)
            clearInterval(checkoutTimer);
    }
    else if (trialDaysLeft > 0)
    {
        const daysLeft = formatDaysLeft(trialDaysLeft);

        licenseInfo.innerHTML            = daysLeft + ' of your free trial.';
     
        licenseInfo.style.top            = '40%';
        licenseInfo.style.transform      = 'translateX(-50%) translateY(-50%)';

        // aboutUserId.style.display = 'none';
        btnSubscribe      .style.display = 'block';
        btnSubscribe      .style.top     = '148px';

        subscriptionClose.style.display  = 'inline-block';

        if (checkoutTimer >= 0)
            clearInterval(checkoutTimer);
    }
    else     
    {
        const daysLeft =
            lastSub
            ? formatDaysLeft(lastSub.daysLeft)
            : trialDaysLeft;

        const expDays   = Math.abs  (daysLeft);
        const expWeeks  = Math.round(expDays / 7);
        const expMonths = Math.round(expDays / 30.5);
        const expYears  = Math.round(expDays / 365)

        let expired;

             if (expYears  > 0) expired = 'expired ' + expYears  + ' ' + countString(expYears,  'year' ) + ' ago';
        else if (expMonths > 0) expired = 'expired ' + expMonths + ' ' + countString(expMonths, 'month') + ' ago';
        else if (expWeeks  > 0) expired = 'expired ' + expWeeks  + ' ' + countString(expWeeks,  'week' ) + ' ago';
        else if (expDays   > 1) expired = 'expired ' + expDays   + ' ' + countString(expDays,   'day'  ) + ' ago';
        else                    expired = 'has expired';


        const subOrTrial = lastSub ? 'subscription' : 'free trial';

        licenseInfo.innerHTML            = 'Your ' + subOrTrial + ' ' + expired + '.<br/><br/>Please subscribe to continue using Generator.';

        licenseInfo.style.top            = '70px';
        licenseInfo.style.transform      = 'translateX(-50%)';

        // aboutUserId.style.display = 'none';
        btnSubscribe      .style.display = 'block';

        subscriptionClose.style.display  = 'none';
    }
}



function formatDaysLeft(daysLeft)
{
    return daysLeft == 1
        ? 'Last day'
        :  daysLeft + ' ' + countString(daysLeft, 'day') + ' left';

}