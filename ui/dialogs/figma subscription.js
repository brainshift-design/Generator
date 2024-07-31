function uiFigmaManageSubscription()
{
    uiGetValueFromFigma('figSubscribe').then(response =>
    {
        subscriptionActive = response.value == 'PAID';

        uiSetLocalData(
            'pro', 
            subscriptionActive);

        if (!settings.debugMode)
            enableFeatures(subscribed());
    })
    .catch(error =>
    {
        uiError('Error while checking for subscription.');
        //finalizeInit(eulaAgreed, false);
    });
}
