function initQuestion3Dialog()
{
    question3Back.addEventListener('pointerdown', e => 
    {
        e.preventDefault();
        e.stopImmediatePropagation();
    });
}



function showQuestion3Dialog()
{
    question3Back  .style.display = 'block';
    question3Dialog.style.display = 'block';

    dialogShown = true;
}



function hideQuestion3Dialog()
{
    question3Back  .style.display = 'none';
    question3Dialog.style.display = 'none';

    dialogShown = false;
}
