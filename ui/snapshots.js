// var snapshots = [];



// function initSnapshots()
// {
//     // for (let i = 0; i < 20; i++)
//     // {
//     //     const thumb = createDiv('snapshotThumbnail');
//     //     snapshotThumbs.appendChild(thumb);
//     // }


//     if (settings.showSnapshots)
//     {
//         snapshotBar.style.display = settings.showSnapshots ? 'block' : 'none';
//         graphView.updateScrollWithBounds();
//     }


//     snapshotBar.addEventListener('pointermove', e =>
//     {
//         const margin        = 80;

//         const totalWidth    = snapshotBar.offsetWidth;
//         const snapshotWidth = snapshotThumbs.offsetWidth;

//         const range         = Math.max(0, snapshotWidth - totalWidth);
//         const offset        = Math.min(Math.max(0, range * smoothstep((e.clientX - margin) / (totalWidth - margin*2))), range);

//         snapshotThumbs.style.left = (-offset) + 'px';
//     });
// }



// function updateSnapshots()
// {

// }



// function updateSnapshotByIndex(index)
// {

// }



// function showSnapshots()
// {
//     snapshotBar.style.display = 'block';
//     //graphView.updateScrollWithBounds();
// }



// function hideSnapshots()
// {
//     snapshotBar.style.display = 'none';
//     //graphView.updateScrollWithBounds();

//     updateSettingAndMenu('showSnapshots', true, !settings.showSnapshots);
// }



// function uiSaveSnapshot()
// {
//     if (!subscribed())
//         return;


//     const json = nodesToJson(
//         graph.currentPage.nodes, 
//         true, 
//         false, 
//         true, 
//         true);

    
//     const now   = Date.now();
//     const index = snapshots.length;

//     snapshots.push(
//     {
//         graph:      json,
//         index:      index,
//         created:    now,
//         updated:    now,
//         iconWidth:  0,
//         iconHeight: 0,
//         icon:       []
//     });

    
//     const thumb = createSnapshotThumbnail();

//     snapshotThumbs.insertBefore(thumb, addSnapshotButton);


//     const objectIds = lastObjects.map(o => o[FO_OBJECT_ID]);

//     uiQueueMessageToFigma({
//         cmd:      'figSaveSnapshot',
//         index:     index,
//         objectIds: objectIds
//     });
// }



// function createSnapshotThumbnail()
// {
//     const thumb     = createDiv('snapshotThumbnail');
//     const thumbIcon = createCanvas('snapshotIcon');

//     thumb.appendChild(thumbIcon);

//     thumb.addEventListener('mousedown',  function(event) { if (event.button === 0) this.classList.add   ('left-active'); });
//     thumb.addEventListener('mouseup',    function(event) { if (event.button === 0) this.classList.remove('left-active'); });
//     thumb.addEventListener('mouseleave', function(event) { this.classList.remove('left-active');                         });    

//     return thumb;
// }



// function uiReturnFigSaveSnapshot(msg)
// {
//     consoleAssert(msg.index < snapshots.length, 'snapshot index exceeds snapshot count');

//     snapshots[msg.index].iconWidth  = msg.iconWidth;
//     snapshots[msg.index].iconHeight = msg.iconHeight;
//     snapshots[msg.index].icon       = msg.icon;

//     updateSnapshotByIndex(msg.index);
// }