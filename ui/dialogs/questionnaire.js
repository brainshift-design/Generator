function initQuestionDialog()
{
    // initCheckbox(chkQuestionHideWhatsNew, 'Show what\'s new at startup', settings.showWhatsNew);
    // chkQuestionHideWhatsNew.addEventListener('change', () => uiSetLocalData('showWhatsNew', chkQuestionHideWhatsNew.checked ? (generatorVersion-1) : (generatorVersion)));

    questionBack.addEventListener('pointerdown', e => 
    {
        e.preventDefault();
        e.stopImmediatePropagation();
    });

    qdoFigmaStore    .addEventListener('pointerdown', e => submitQuestionAndAnswer('found', 'figma store',    hideQuestionDialog));
    qdoRecommendation.addEventListener('pointerdown', e => submitQuestionAndAnswer('found', 'recommendation', hideQuestionDialog));
    qdoSocialMedia   .addEventListener('pointerdown', e => submitQuestionAndAnswer('found', 'social media',   hideQuestionDialog));
    qdoChatOrForum   .addEventListener('pointerdown', e => submitQuestionAndAnswer('found', 'chat or forum',  hideQuestionDialog));
    
    qdoWebSearch.addEventListener('pointerdown', e => 
    {
        questionDialogOptions  .style.display = 'none';
        questionWebSearchOption.style.display = 'block';

        setTimeout(() => questionWebSearchReason.focus(), 100);
    });

    qdoOther.addEventListener('pointerdown', e => 
    {
        questionDialogOptions.style.display = 'none';
        questionOtherOption  .style.display = 'block';

        setTimeout(() => questionOtherReason.focus(), 100);
    });


    questionWebSearchOptionBack.addEventListener('pointerdown', e  => 
    {
        questionDialogOptions  .style.display = 'block';
        questionWebSearchOption.style.display = 'none';
    });

    questionWebSearchReason.addEventListener('keydown', e =>
    {
        e.stopPropagation();

        updateQuestionValidate();

        if (e.code == 'Enter')
            submitWebSearchAnswer();
    });


    questionOtherOptionBack.addEventListener('pointerdown', e  => 
    {
        questionDialogOptions.style.display = 'block';
        questionOtherOption  .style.display = 'none';
    });

    questionOtherReason.addEventListener('keydown', e =>
    {
        e.stopPropagation();

        updateQuestionValidate();

        if (   e.code == 'Enter'
            && questionOtherReason.value.length > 0)
            submitQuestionAndAnswer('found', questionOtherReason.value, hideQuestionDialog);
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
        hideQuestionDialog);
}



function showQuestionDialog()
{
    questionBack  .style.display = 'block';
    questionDialog.style.display = 'block';

    //questionUserId.innerHTML = '<span style="user-select: none; color: var(--figma-color-bg-disabled-secondary);">Your Figma user ID:&nbsp;&nbsp;</span>' + currentUser.id;

    dialogShown = true;
}



function hideQuestionDialog()
{
    questionBack  .style.display = 'none';
    questionDialog.style.display = 'none';

    dialogShown = false;
}



function copyUserId()
{
    writeTextToClipboard(currentUser.id);
    selectElementText("debugUserId");
    uiNotify('Copied user ID');
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
