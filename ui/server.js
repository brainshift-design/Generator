async function checkTrialExists()
{
    const response = await postToServer(
    {
        action: 'getTrialExists',
        userId:  currentUser.id
    }); 

    console.assert(response, 'invalid response from server @ checkTrialExists()');
    return response ? response.result : false;
}



// async function checkTrialActive()
// {
//     const response = await postToServer(
//     {
//         action: 'getTrialActive',
//         userId:  currentUser.id
//     }); 

    
//     console.assert(response, 'invalid response from server @ checkTrialActive()');
//     return response ? response.result : false;
// }



// async function checkSubActive()
// {
//     const response = await postToServer(
//     {
//         action: 'getSubActive',
//         userId:  currentUser.id
//     }); 

    
//     console.assert(response, 'invalid response from server @ checkSubActive()');
//     return response ? response.result : false;
// }



async function checkSubOrTrialActive()
{
    const response = await postToServer(
    {
        action: 'getSubOrTrialActive',
        userId:  currentUser.id
    }); 

    
    console.assert(response, 'invalid response from server @ checkTrialOrSubActive()');
    return response ? response.result : false;
}



async function checkRemainingTrialDays()
{
    const response = await postToServer(
    {
        action: 'getRemainingTrialDays',
        userId:  currentUser.id
    }); 

    
    console.assert(response, 'invalid response from server @ checkRemainingTrialDays()');
    return response ? response.result : -1;
}



async function checkLastSub()
{
    const response = await postToServer(
    {
        action: 'getLastSub',
        userId:  currentUser.id
    });

    
    if (   response.daysLeft != undefined
        && response.tier     != undefined)
        return response;
    else
        return null;
}



async function startFreeTrial()
{
    const response = await postToServer(
    {
        action: 'createTrial',
        userId:  currentUser.id
    }); 

    
    console.assert(response, 'invalid response from server @ createTrial()');


    if (response.result)
        initGenerator();
}



async function postToServer(cmd)
{
    const response = await fetch(
        'https://brainshift.design/generator/license/',
        {
            method:  'POST',
            headers: { 'Content-Type': 'application/json' },
            body:    JSON.stringify(cmd)
        });


    if (response.ok)
        return response.json();

    else
    {
        uiNotify(response.status, {error: true});
        return null;
    }
}
