var subscription = NULL;



function onSubscribeClick()
{

}



function showSubscriptionDialog()
{
    subscriptionBack  .style.display = 'block';
    subscriptionDialog.style.display = 'block';


    subscriptionUserId.innerHTML = '<span style="user-select: none; color: var(--figma-color-bg-disabled-secondary);">Your Figma user ID:</span><br/>' + currentUser.id;// + '<br/><span style="user-select: none; color: var(--figma-color-bg-disabled-secondary);">(You need it to subscribe. Double-click to copy.)</span>';    
    
    updateLicenseInfo();
    

    dialogShown = true;
}



function copyUserId()
{
    writeTextToClipboard(currentUser.id);
    selectElementText('subscriptionUserId');
    uiNotify('Copied user ID');
}



function hideSubscriptionDialog()
{
    subscriptionBack  .style.display = 'none';
    subscriptionDialog.style.display = 'none';

    dialogShown = false;
}



subscriptionClose.addEventListener('pointerdown', e => e.stopPropagation());



async function updateLicenseInfo()
{
    const trialDaysLeft = await checkRemainingTrialDays();


    if (trialDaysLeft > 0)
    {
        const daysLeft = 
            trialDaysLeft == 1
            ? 'Last day'
            : trialDaysLeft + ' ' + countString(trialDaysLeft, 'day') + ' left';

        licenseInfo.innerHTML            = daysLeft + ' of your free trial.';
     
        licenseInfo.style.top            = '55%';
        licenseInfo.style.transform      = 'translateX(-50%) translateY(-50%)';

        subscriptionUserId.style.display = 'none';
        btnSubscribe      .style.display = 'none';

        subscriptionClose .style.display = 'inline-block';        
    }
    else     
    {
        const expDays   = Math.abs  (trialDaysLeft);
        const expWeeks  = Math.round(expDays / 7);
        const expMonths = Math.round(expDays / 30.5);
        const expYears  = Math.round(expDays / 365)

        let expired;

             if (expYears  > 0) expired = 'expired ' + expYears  + ' ' + countString(expYears,  'year' ) + ' ago';
        else if (expMonths > 0) expired = 'expired ' + expMonths + ' ' + countString(expMonths, 'month') + ' ago';
        else if (expWeeks  > 0) expired = 'expired ' + expWeeks  + ' ' + countString(expWeeks,  'week' ) + ' ago';
        else if (expDays   > 1) expired = 'expired ' + expDays   + ' ' + countString(expDays,   'day'  ) + ' ago';
        else                    expired = 'has expired';


        licenseInfo.innerHTML            = 'Your free trial ' + expired + '.<br/><br/>Please subscribe to continue using Generator.';

        licenseInfo.style.top            = '60px';
        licenseInfo.style.transform      = 'translateX(-50%)';

        subscriptionUserId.style.display = 'block';
        btnSubscribe      .style.display = 'block';
    }
}
