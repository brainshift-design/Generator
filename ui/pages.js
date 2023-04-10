var graphPages   = [];
var curPageIndex = 0;

addPage('page1', 'Page 1');
addPage('page2', 'Page 2');
addPage('page3', 'Page 3');
addPage('page4', 'Page 4');



function curPage()
{
    return graphPages[curPageIndex];
}



function addPage(id, name)
{
    const btn      = createDiv('page');
    
    const btnIcon  = createDiv('pageIcon');
    const btnName  = createDiv('pageName');
    const btnClose = createDiv('pageClose');

    btn.appendChild(btnIcon);
    btn.appendChild(btnName);
    btn.appendChild(btnClose);


    const page =
    {
        id:       id, 
        name:     name,
        button:   btn,
        btnIcon:  btnIcon,
        btnName:  btnName,
        btnClose: btnClose
    };

    graphPages.push(page);
    pagesBar.appendChild(page.button);


    updatePages();
}



function updatePage(page)
{
    const isCurrent = curPageIndex == Array.prototype.indexOf.call(pagesBar.childNodes, page.button);

    page.btnIcon.innerHTML = iconPage;
    page.btnName.innerHTML = page.name;

    page.btnIcon.style.opacity    = isCurrent ? 1 : 0.35;
    page.btnName.style.color      = isCurrent ? '#fff'    : '666';
    page.button .style.background = isCurrent ? '#2c2c2c' : '#222';
}



function updatePages()
{
    for (const page of graphPages)
        updatePage(page);
}