function initQuestionDialog()
{
    // initCheckbox(chkQuestionHideWhatsNew, 'Show what\'s new at startup', settings.showWhatsNew);
    // chkQuestionHideWhatsNew.addEventListener('change', () => uiSetLocalData('showWhatsNew', chkQuestionHideWhatsNew.checked ? (generatorVersion-1) : (generatorVersion)));

    questionBack.addEventListener('pointerdown', e => 
    {
        e.preventDefault();
        e.stopImmediatePropagation();
    });

    qdoFigmaStore    .addEventListener('pointerdown', e  => submitQuestionAndAnswer('found', 'figma store',    hideQuestionDialog));
    qdoRecommendation.addEventListener('pointerdown', e  => submitQuestionAndAnswer('found', 'recommendation', hideQuestionDialog));
    qdoSocialMedia   .addEventListener('pointerdown', e  => submitQuestionAndAnswer('found', 'social media',   hideQuestionDialog));
    qdoChatOrForum   .addEventListener('pointerdown', e  => submitQuestionAndAnswer('found', 'chat or forum',  hideQuestionDialog));
    qdoWebSearch     .addEventListener('pointerdown', e  => submitQuestionAndAnswer('found', 'web search',     hideQuestionDialog));

    qdoOther.addEventListener('pointerdown', e  => 
    {
        questionDialogOptions.style.display = 'none';
        questionOtherOption  .style.display = 'block';

        setTimeout(() => questionOtherReason.focus(), 100);
    });

    questionOtherOptionBack.addEventListener('pointerdown', e  => 
    {
        questionDialogOptions.style.display = 'block';
        questionOtherOption  .style.display = 'none';
    });


    questionOtherReason.addEventListener('keydown', e =>
    {
        e.stopPropagation();
        
        if (e.code == 'Enter')
        {
            submitQuestionAndAnswer('found', questionOtherReason.value, hideQuestionDialog);
        }
    });
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
