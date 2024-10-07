function initQuestion3Dialog()
{
    question3Back.addEventListener('pointerdown', e => 
    {
        e.preventDefault();
        e.stopImmediatePropagation();
    });


    questionEmail.addEventListener('input', e =>
    {
        updateEmailValidate();
    });


    questionEmail.addEventListener('keydown', e =>
    {
        e.stopPropagation();
        
        if (e.code == 'Enter')
            submitQuestionAndAnswer('email', questionEmail.value, hideQuestion3Dialog);
    });


    updateEmailValidate();
}



function showQuestion3Dialog()
{
    showDialog(question3Dialog, question3Back);
    setTimeout(() => questionEmail.focus(), 100);
}



function updateEmailValidate()
{
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (   questionEmail.value.length > 0
        && emailPattern.test(questionEmail.value))
    {
        submitEmail.style.opacity       = '100%';
        submitEmail.style.pointerEvents = 'all';
    }
    else
    {
        submitEmail.style.opacity       = '40%';
        submitEmail.style.pointerEvents = 'none';
    }
}
