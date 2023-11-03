var subscription              = NULL;

var checkoutTimer           = -1;
var subscriptionDialogShown = false;



function initSubscriptionDialog()
{
    subscriptionDialog.addEventListener('pointerdown', e =>
    {
        if (   e.button == 0 
            || e.button == 2)
            hideAllMenus();
    });


    subEmail.addEventListener('pointerdown', e =>
    {
        e.stopPropagation();

        if (e.button == 2)
        {
            e.preventDefault();

            initTextMenu(subEmail);
            menuText.showAt(e.clientX, e.clientY, false, false);
        }
    });


    subLicenseKey.addEventListener('pointerdown', e =>
    {
        e.stopPropagation();

        if (e.button == 2)
        {
            e.preventDefault();

            initTextMenu(subLicenseKey);
            menuText.showAt(e.clientX, e.clientY, false, false);
        }
    });
}



function onValidateClick()
{
    // let checkoutSession = arrayToBase32(sign(hashLicenseString(
    //     currentUser.id + (new Date().getTime()).toString(),
    //     30), licenseKeys.private));


    const userId        = currentUser.id;
    const email         = subEmail.value.trim();
    const activationKey = subLicenseKey.value.trim();

    
    if (   email         == '' 
        || activationKey == '')
        return;


    postToServer(
    {
        action:       'activateSubscription',
        userId:        userId,
        email:         email,
        activationKey: activationKey
    })
    .then(response =>
    {    
        if (response)
        {
            if (   response.result == 0  // ok
                || response.result == 3) // user with ID found, also ok
            {
                subscriptionActive = true;

                updateSubscriptionDialog();
                enableFeatures(subscribed());

                uiNotify('✨   Thanks for subscribing to Generator !   ✨', {delay: 6000});

            }
            else if (response.result == 1)
            {
                uiError('Error: No subscription found for ' + email + '.');
            }
            else if (response.result == 2)
            {
                uiError('Error: This activation key has already been used.');
            }
        }
        else
            uiError('Error: Could not activate subscription.')
    })
    .catch(error =>
    {
        uiError('Error: Could not activate subscription.')
    });
}



function showSubscriptionDialog(showBack = true)
{
    subscriptionBack  .style.display = 'block';
    subscriptionDialog.style.display = 'block';

    subscriptionBack.style.backgroundColor = showBack ? '#0005' : 'transparent';
    
    //subscriptionUserId.innerHTML = '<span style="user-select: none; color: var(--figma-color-bg-disabled-secondary);">User ID:&nbsp;&nbsp;</span>' + currentUser.id;
    
    
    updateSubscriptionDialog();

    //subscriptionInputBack.innerHTML = license ? '' : '•'.repeat(13);
    
    // subscriptionInput.value         = subscription;
    // subscriptionInput.disabled      = license;
    
    // subscriptionInput.style.display = license ? 'none' : 'inline'

    //updateLicenseInfo(license);
    
    //subscriptionTextBack.style.display   = license ? 'none' : 'inline';
    // validateProductKeyButton.innerHTML = license ? 'Edit' : 'Validate';


    // if (license) setDisabledSubscriptionInput();
    // else         setDefaultSubscriptionInput();


    // updateLicenseInfo()
    //     // subscription != NULL
    //     // ? validateLicense(currentUser.id, subscription)
    //     // : null)
    // .then(() => 
    // {
    //     dialogShown             = true;
    //     subscriptionDialogShown = true;
    // });

    dialogShown             = true;
    subscriptionDialogShown = true;
}



function updateSubscriptionDialog()
{
    if (subscribed())
    {
        licenseInfo             .style.display = 'block';
        subEmail                .style.display = 'none';
        subLicenseKey           .style.display = 'none';
        validateProductKeyButton.style.display = 'none';
        subscribeWebsite        .style.display = 'none';

        checkRemainingSubscriptionDays().then(result =>
        {
            console.log('result =', result);
            licenseInfo.innerHTML = formatDaysLeft(result) + ' of your Pro subscription.';
        });
    }
    else
    {
        licenseInfo             .style.display = 'none';
        subEmail                .style.display = 'block';
        subLicenseKey           .style.display = 'block';
        validateProductKeyButton.style.display = 'block';
        subscribeWebsite        .style.display = 'block';
    }
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



subscriptionClose.addEventListener('pointerdown', e => e.stopPropagation());

subscriptionBack .addEventListener('pointerdown', e => 
{ 
         if (e.button == 0) hideSubscriptionDialog(); 
    else if (e.button == 2) hideAllMenus();
});


// subscriptionInput.addEventListener('pointerdown', e => 
// { 
//     // if (!subscriptionInput.disabled)
//     // {
//     //     setDefaultSubscriptionInput(); 

//     //     const sub = 
//     //            subscription != NULL
//     //         && (      subscriptionInput.selectionStart == subscriptionInput.selectionEnd
//     //                && subscriptionInput.value == subscription
//     //             || getSelectedText(subscriptionInput) == subscription);

//     //     if (e.button == 2)
//     //     {
//     //         e.preventDefault();
//     //         e.stopPropagation();

//     //         updateElementDisplay(menuItemLicenseSep1  .div, sub);
//     //         updateElementDisplay(menuItemLicenseRemove.div, sub);

//     //         menuRemoveLicense.showAt(e.clientX, e.clientY, false, false);
//     //     }
//     // }
// });



subEmail.addEventListener('keydown', e =>
{
    // if (e.code == 'Escape')
    //     subscriptionInput.blur();

    //e.preventDefault();
    e.stopPropagation();
});



subLicenseKey.addEventListener('keydown', e =>
{
    // if (e.code == 'Escape')
    //     subscriptionInput.blur();

    //e.preventDefault();
    e.stopPropagation();
});



// subscriptionInput.addEventListener('input', () =>
// {
//     // let val = subscriptionInput.value;
    
//     // val = val.toUpperCase();
//     // val = val.replace(/[^12345679ABCDEFGHJKLMNPQRSTUVWXYZ]/g, '');
//     // val = val.substring(0, Math.min(val.length, 13));
    
//     // subscriptionInput.value = val;

//     // updateSubscriptionDots();
// });



function updateSubscriptionDots()
{
    // subscriptionInputBack.innerHTML = 
    //       '&nbsp;'.repeat(subscriptionInput.value.length)
    //     + '•'.repeat(13 - subscriptionInput.value.length);
}



function setBadSubscriptionInput()
{
    // subscriptionInput.style.outline   = '2px dashed #e00';        
    // subscriptionTextBack.style.display = 'none';
}



function setDefaultSubscriptionInput()
{
    // subscriptionInput.style.outline    = 'none';
    // subscriptionTextBack.style.display = 'inline';
}



function setDisabledSubscriptionInput()
{
    // subscriptionInput.style.outline   = 'none';
}



function updateLicenseInfo(license)
{
    if (license)
    {
        const strPrep =
                    license.lastYear
            + '-' + license.lastMonth.toString().padStart(2, '0')
            + '-' + license.lastDay  .toString().padStart(2, '0');

        const date    = new Date(Date.parse(strPrep));
        const strDate = date.toLocaleString('en-UK', {dateStyle: 'medium'});

        // licenseWatermark    .style.display    = 'none';//'block';
        // licenseWatermark    .style.outline    = '2px dashed var(--figma-color-text-disabled)';
        // licenseWatermark    .style.background = 'transparent';//darkMode ? '#ffffff0f' : '#0000000a';
        // licenseWatermarkPath.style.fill       = 'transparent';//darkMode ? '#2e2e2e50' : '#ffffff80';

        licenseInfo.innerHTML = '<span style="user-select: one; color: ' + (darkMode ? '#fffa' : '#000c') + ';">License valid until:&nbsp;&thinsp;</span><span style="font-weight: 700">' + strDate.replaceAll('/', '&hairsp;/&hairsp;') + '</span>';

        subscribeWebsite.style.display = 'none';
    }
    else
    {
        // licenseWatermark.style.display = 'none';
        licenseInfo.innerHTML = '';

        subscribeWebsite.style.display = 'inline-block';
    }
}



// function startupValidateLicense()
// {
//     if (!validateLicense(currentUser.id, subscription))
//     {
//         subscription = NULL;
//         uiSetLocalData('subscription', NULL);
//     }
// }



// async function updateLicenseInfo()
// {
//     const lastSub       = await checkLastSub();
//     const trialDaysLeft = await checkRemainingTrialDays();


//     if (   lastSub
//         && lastSub.daysLeft > 0)
//     {
//         const daysLeft = formatDaysLeft(lastSub.daysLeft);

//         licenseInfo.innerHTML            = daysLeft + ' of your Pro subscription.';
     
//         licenseInfo.style.top            = '55%';
//         licenseInfo.style.transform      = 'translateX(-50%) translateY(-50%)';

//         // aboutUserId.style.display = 'none';
//         btnSubscribe      .style.display = 'none';

//         if (checkoutTimer >= 0)
//             clearInterval(checkoutTimer);
//     }
//     else     
//     {
//         const daysLeft =
//             lastSub
//             ? formatDaysLeft(lastSub.daysLeft)
//             : trialDaysLeft;

//         const expDays   = Math.abs  (daysLeft);
//         const expWeeks  = Math.round(expDays / 7);
//         const expMonths = Math.round(expDays / 30.5);
//         const expYears  = Math.round(expDays / 365)

//         let expired;

//              if (expYears  > 0) expired = 'expired ' + expYears  + ' ' + countString(expYears,  'year' ) + ' ago';
//         else if (expMonths > 0) expired = 'expired ' + expMonths + ' ' + countString(expMonths, 'month') + ' ago';
//         else if (expWeeks  > 0) expired = 'expired ' + expWeeks  + ' ' + countString(expWeeks,  'week' ) + ' ago';
//         else if (expDays   > 1) expired = 'expired ' + expDays   + ' ' + countString(expDays,   'day'  ) + ' ago';
//         else                    expired = 'has expired';


//         const subOrTrial = lastSub ? 'subscription' : 'free trial';

//         //licenseInfo.innerHTML            = 'Your ' + subOrTrial + ' ' + expired + '.<br/><br/>Please subscribe to continue using Generator.';
        
//         licenseInfo.innerHTML            = 'If Generator is useful to you,<br/>subscribe to access Pro features<br/>and support further development.';

//         licenseInfo.style.top            = '70px';
//         licenseInfo.style.transform      = 'translateX(-50%)';

//         // aboutUserId.style.display = 'none';
//         btnSubscribe      .style.display = 'block';
//     }
// }



function formatDaysLeft(daysLeft)
{
    return daysLeft == 1
        ? 'Last day'
        :  daysLeft + ' ' + countString(daysLeft, 'day') + ' remaining';
}