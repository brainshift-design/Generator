var subscriptionActive = false;



function checkActiveSubscription(userId)
{
    return postToServer(
    {
        action: 'checkActiveSubscription',
        userId:  userId
    })
    .then(response =>
    {
        return response.result;
    })
    .catch(e =>
    {
        console.error(e);
        throw e;
    });
}



// function getSubscriptionIsActive()
// {
//     let subResult = 0;

//     uiGetValueFromFigma('getPaidStatus')
//         .then(response =>
//         {
//             console.log('response.value =', response.value);
//             subResult = response.value == 'PAID' ? 2 : 0;
//             console.log('subResult =', subResult);
//         });

//     return subResult;
// }



// function getSubscriptionIsActive()
// {
//     let subResult = 0;

//     try
//     {
//         checkActiveSubscription(currentUser.id).then(result =>
//         {
//             subResult = result;
//         })
//         .catch(error =>
//         {
//             uiError('Error while checking for subscription.');
//         });
//     }
//     catch (e)
//     {
//         console.error('Error connecting to license server...');
//         console.error(e);
//     }

//     return subResult;
// }



function subscribed()
{
    return subscriptionActive;
}