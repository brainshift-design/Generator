function initQuestionDialog()
{
    questionBack.addEventListener('pointerdown', e => 
    {
        e.preventDefault();
        e.stopImmediatePropagation();
    });

    qdoFigmaStore    .addEventListener('pointerdown', e => submitQuestionAndAnswer('found', 'figma store',    hideDialog(questionDialog)));
    qdoYoutube       .addEventListener('pointerdown', e => submitQuestionAndAnswer('found', 'youtube',        hideDialog(questionDialog)));
    qdoSocialMedia   .addEventListener('pointerdown', e => submitQuestionAndAnswer('found', 'social media',   hideDialog(questionDialog)));
    qdoRecommendation.addEventListener('pointerdown', e => submitQuestionAndAnswer('found', 'recommendation', hideDialog(questionDialog)));
    qdoChatOrForum   .addEventListener('pointerdown', e => submitQuestionAndAnswer('found', 'chat or forum',  hideDialog(questionDialog)));
    
    qdoWebSearch.addEventListener('pointerdown', e => 
    {
        questionDialogOptions  .style.display = 'none';
        questionWebSearchOption.style.display = 'block';
        questionWebSearchOption.style.width   = '420px';

        setTimeout(() => questionWebSearchReason.focus(), 100);
    });

    qdoOther.addEventListener('pointerdown', e => 
    {
        questionDialogOptions.style.display = 'none';
        questionOtherOption  .style.display = 'block';
        questionOtherOption  .style.width   = '420px';

        setTimeout(() => questionOtherReason.focus(), 100);
    });


    questionWebSearchOptionBack.addEventListener('pointerdown', e  => 
    {
        questionDialogOptions  .style.display = 'block';
        questionWebSearchOption.style.display = 'none';
        questionWebSearchOption.style.width   = '100%';
    });

    questionWebSearchReason.addEventListener('input', e =>
    {
        updateEmailValidate();
    });

    questionWebSearchReason.addEventListener('keydown', e =>
    {
        e.stopPropagation();

        if (e.code == 'Enter')
            submitWebSearchAnswer();
    });


    questionOtherOptionBack.addEventListener('pointerdown', e  => 
    {
        questionDialogOptions.style.display = 'block';
        questionOtherOption  .style.display = 'none';
        questionOtherOption  .style.width   = '100%';
    });

    questionOtherReason.addEventListener('input', e =>
    {
        updateEmailValidate();
    });

    questionOtherReason.addEventListener('keydown', e =>
    {
        e.stopPropagation();

        if (   e.code == 'Enter'
            && questionOtherReason.value.length > 0)
            submitQuestionAndAnswer('found', questionOtherReason.value, () => hideDialog(questionDialog));
    });


    updateQuestionValidate();
}



function updateQuestionValidate()
{
    if (questionOtherReason.value.length > 0)
    {
        validateOtherReason.style.opacity       = '100%';
        validateOtherReason.style.pointerEvents = 'all';
    }
    else
    {
        validateOtherReason.style.opacity       = '40%';
        validateOtherReason.style.pointerEvents = 'none';
    }
}



function submitWebSearchAnswer()
{
    submitQuestionAndAnswer(
        'found', 
          'web search' 
        + (questionWebSearchReason.value.length > 0 
           ? ': ' + questionWebSearchReason.value 
           : ''), 
        () => hideDialog(questionDialog));
}



function showQuestionDialog()
{
    showDialog(questionDialog, questionBack);
    //questionUserId.innerHTML = '<span style="user-select: none; color: var(--figma-color-bg-disabled-secondary);">Your Figma user ID:&nbsp;&nbsp;</span>' + currentUser.id;
}



function submitQuestionAndAnswer(question, answer, successFunc = null)
{
    postToServer(
    {
        action:   'submitQuestionAndAnswer',
        figmaId:   currentUser.id,
        question:  question,
        answer:    answer
    })
    .then(response =>
    {   
        if (successFunc)
            successFunc();
    })
    .catch(error =>
    {
        consoleError(error);
    });
}
