var snapshots = [];



function initSnapshots()
{
    const addSnapshot = createDiv('snapshotThumbnail addSnapshot');
    snapshotThumbs.appendChild(addSnapshot);


    if (settings.showSnapshots)
        snapshotBar.style.display = settings.showSnapshots ? 'block' : 'none';


    snapshotBar.addEventListener('pointermove', e =>
    {
        const margin        = 80;

        const totalWidth    = snapshotBar.offsetWidth;
        const snapshotWidth = snapshotThumbs.offsetWidth;

        const range         = Math.max(0, snapshotWidth - totalWidth);
        const offset        = Math.min(Math.max(0, range * smoothstep((e.clientX - margin) / (totalWidth - margin*2))), range);

        snapshotThumbs.style.left = (-offset) + 'px';
    });


    addSnapshot.addEventListener('click', () => uiSaveSnapshot());
}



function updateSnapshots()
{

}



function uiSaveSnapshot()
{
    if (!subscribed())
        return;


    const json = nodesToJson(
        graph.currentPage.nodes, 
        true, 
        false, 
        true, 
        true);

    
    const now   = Date.now();
    const index = snapshots.length + 1;

    snapshots.push(
    {
        graph:   json,
        index:   index,
        created: now,
        updated: now
    });


    const objectIds = lastObjects.map(o => o.objectId);

    uiQueueMessageToFigma({
        cmd:      'figSaveSnapshot',
        index:     index,
        objectIds: objectIds
    });
}