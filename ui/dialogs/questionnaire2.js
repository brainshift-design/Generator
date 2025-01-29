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
        hideDialog(question2Dialog);
    });
}



function showQuestion2Dialog()
{
    showDialog(question2Dialog, question2Back);
}
