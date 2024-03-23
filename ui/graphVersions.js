function initGraphVersions()
{
    for (let i = 0; i < 17; i++)
    {
        const thumb = createDiv('versionThumbnail');
        graphVersions.appendChild(thumb);
    }


    const addThumb = createDiv('versionThumbnail versionAddThumbnail');
    graphVersions.appendChild(addThumb);


    // for (let i = 0; i < graphVersions.children.length-1; i++)
    //     graphVersions.children[i].insertAdjacentHTML('afterend', '&nbsp;');
}