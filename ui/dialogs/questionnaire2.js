function initQuestion2Dialog()
{
    question2Back.addEventListener('pointerdown', e => 
    {
        e.preventDefault();
        e.stopImmediatePropagation();
    });

    btnShareX.addEventListener('click', e => 
    {
        const message = encodeURIComponent('Check out #Generator plugin for @Figma!');
        const url     = 'https://www.figma.com/community/plugin/899028246731755335';

        window.open(
            `https://twitter.com/intent/tweet?text=${message}&url=${url}`, 
            '_blank');

        addMetricsEvent(METRICS_SHARE_ON_X);
        hideQuestion2Dialog();
    });
}



function showQuestion2Dialog()
{
    question2Back  .style.display = 'block';
    question2Dialog.style.display = 'block';

    dialogShown = true;
}



function hideQuestion2Dialog()
{
    question2Back  .style.display = 'none';
    question2Dialog.style.display = 'none';

    dialogShown = false;
}
