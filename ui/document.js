var documentBodyClient = null;
var enteredDragging    = false;


document.button0 = false;



document.addEventListener('pointerdown', function(e)
{
    if (e.button == 0)
        document.button0 = true;
}, 
true);



document.addEventListener('pointermove', function(e)
{
    if (enteredDragging)
    {
        e.preventDefault();
        return false;
    }
});



document.addEventListener('pointerup', function(e)
{
    if (e.button == 0)
        document.button0 = false;
},
true);



document.addEventListener('pointerup', function(e)
{
    enteredDragging = false;

    graphView.scrollbarX.moving = false;
    graphView.scrollbarY.moving = false;
});



window.addEventListener('focus', () => graph.updatePages());
window.addEventListener('blur',  () => graph.updatePages());

document.addEventListener('contextmenu', e => e.preventDefault());