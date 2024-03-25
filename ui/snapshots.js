function initSnapshots()
{
    for (let i = 0; i < 20; i++)
    {
        const thumb = createDiv('snapshotThumbnail');
        snapshotThumbs.appendChild(thumb);
    }


    const addThumb = createDiv('snapshotThumbnail addSnapshot');
    snapshotThumbs.appendChild(addThumb);


    snapshotBar.addEventListener('pointermove', e =>
    {
        const margin        = 40;

        const totalWidth    = snapshotBar.offsetWidth;
        const snapshotWidth = snapshotThumbs.offsetWidth;

        const range         = Math.max(0, snapshotWidth - totalWidth);
        const offset        = Math.min(Math.max(0, range * smoothstep((e.clientX - margin) / (totalWidth - margin*2))), range);

        snapshotThumbs.style.left = (-offset) + 'px';
    });
}



function updateSnapshots()
{

}