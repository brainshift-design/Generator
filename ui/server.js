function checkTrialExists()
{
    return postToServer(
        {
            action: 'getTrialExists',
            userId:  currentUser.id
        })
        .then(response =>
        { 
            consoleAssert(response, 'invalid response from server @ checkTrialExists()');
            return response ? response.result : false;
        })
        .catch(e =>
        {
            console.error(e);
            throw e;
        });
}



function checkSubActive()
{
    return postToServer(
        {
            action: 'getSubActive',
            userId:  currentUser.id
        })
        .then(response => 
        {
            consoleAssert(response, 'invalid response from server @ checkSubActive()');
            return response ? response.result : false;
        })
        .catch(e =>
        {
            console.error(e);
            throw e;
        });
}



function checkSubOrTrialActive()
{
    return postToServer(
        {
            action: 'getSubOrTrialActive',
            userId:  currentUser.id
        })
        .then(response => 
        {
            consoleAssert(response, 'invalid response from server @ checkSubOrTrialActive()');
            return response ? response.result : false;
        })
        .catch(e =>
        {
            console.error(e);
            throw e;
        });
}



function checkRemainingTrialDays()
{
    return postToServer(
        {
            action: 'getRemainingTrialDays',
            userId:  currentUser.id
        })
        .then(response => 
        {
            consoleAssert(response, 'invalid response from server @ checkRemainingTrialDays()');
            return response ? response.result : -1;
        })
        .catch(e =>
        {
            console.error(e);
            throw e;
        });
}



function checkLastSub()
{
    return postToServer(
        {
            action: 'getLastSub',
            userId:  currentUser.id
        })
        .then(response =>
        {
            if (   response.daysLeft != undefined
                && response.tier     != undefined)
                return response;
            else
                return null;
        })
        .catch(e =>
        {
            console.error(e);
            throw e;
        });
}



function manageLastSub(userId, enable)
{
    return postToServer(
        {
            action: 'manageLastSub',
            userId:  userId,
            state:   enable ? 1 : 0
        })
        .then(response =>
        {
            return response;
        })
        .catch(e =>
        {
            console.error(e);
            throw e;
        });
}



function startFreeTrial()
{
    uiSetLocalData('eula', 'true');


    // postToServer(
    // {
    //     action: 'createTrial',
    //     userId:  currentUser.id
    // })
    // .then(response =>
    // {
    //     consoleAssert(response, 'invalid response from server @ createTrial()');

    //     if (response.result)
           initGenerator();
    // })
    // .catch(e =>
    // {
    //     console.error(e);
    //     throw e;
    // });
}



function postToServer(cmd)
{
    return fetch(
        'https://brainshift.design/generator/license/',
        {
            method:  'POST',
            headers: { 'Content-Type': 'application/json' },
            body:    JSON.stringify(cmd)
        })
        .then(response => 
        { 
            if (!response.ok)
            {
                uiNotify(response.status, {error: true});
                throw new Error('fetch() failed with status ' + response.status);
            }
            
            return response.json();
        })
        .then(json => { return json; })
        .catch(e =>
        {
            console.error(e);
            throw e;
        });
}
