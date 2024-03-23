function initSnapshots()
{
    for (let i = 0; i < 20; i++)
    {
        const thumb = createDiv('snapshotThumbnail');
        snapshotBar.appendChild(thumb);
    }


    const addThumb = createDiv('snapshotThumbnail addSnapshot');
    snapshotBar.appendChild(addThumb);


    // for (let i = 0; i < snapshotBar.children.length-1; i++)
    //     snapshotBar.children[i].insertAdjacentHTML('afterend', '&nbsp;');
}



function updateSnapshots()
{

}