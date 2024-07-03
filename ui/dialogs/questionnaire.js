function initQuestionDialog()
{
    // initCheckbox(chkQuestionHideWhatsNew, 'Show what\'s new at startup', settings.showWhatsNew);
    // chkQuestionHideWhatsNew.addEventListener('change', () => uiSetLocalData('showWhatsNew', chkQuestionHideWhatsNew.checked ? (generatorVersion-1) : (generatorVersion)));

    questionBack.addEventListener('pointerdown', e => 
    {
        e.preventDefault();
        e.stopImmediatePropagation();
    });

    qdoFigmaStore    .addEventListener('pointerdown', e  => {});
    qdoRecommendation.addEventListener('pointerdown', e  => {});
    qdoSocialMedia   .addEventListener('pointerdown', e  => {});
    qdoChatOrForum   .addEventListener('pointerdown', e  => {});
    qdoWebSearch     .addEventListener('pointerdown', e  => {});

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



questionBack.addEventListener('pointerdown', () =>
{
    hideQuestionDialog();
});
