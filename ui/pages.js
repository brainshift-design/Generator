var graphPages   = [];

var curPageIndex  = 0;
var overPageIndex = -1;

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


    btn.addEventListener('pointerenter', e => { overPageIndex = graphPages.indexOf(page); updatePages(); });
    btn.addEventListener('pointerleave', e => { overPageIndex = -1;                       updatePages(); });
    btn.addEventListener('pointerdown' , e => { curPageIndex  = graphPages.indexOf(page); updatePages(); });

    btnClose.addEventListener('pointerenter', e => { btnClose.style.opacity = 1;    });
    btnClose.addEventListener('pointerleave', e => { btnClose.style.opacity = 0.7; });
    btnClose.addEventListener('pointerup'   , e => { /*nothing for now, TODO*/ updatePages(); });


    graphPages.push(page);
    pagesBar.appendChild(page.button);


    updatePages();
}



function updatePage(page)
{
    const index     = Array.prototype.indexOf.call(pagesBar.childNodes, page.button);

    const isCurrent = 
           index ==  curPageIndex
        || index == overPageIndex;

    pagesBar.style.background        = document.hasFocus() ? '#202020' : '#3b3b3b';

    
    page.btnIcon .innerHTML          = iconPage;
    page.btnName .innerHTML          = page.name;
    page.btnClose.innerHTML          = iconPageClose;
    
    page.button  .style.background   = isCurrent ? '#2c2c2c' : (document.hasFocus() ? '#202020' : '#3b3b3b');
    
    page.button  .style.outline      = '1px solid ' + (document.hasFocus() ? (isCurrent ? '#ffffff20' : '#ffffff19') : (isCurrent ? '#ffffff28' : '#ffffff19'));

    page.btnIcon .style.opacity      = isCurrent ? 1 : 0.35;
    page.btnName .style.color        = isCurrent ? '#fffffff0' : '#fff6';
    page.btnName .style.fontWeight   = isCurrent ? 600 : 500;
    page.btnClose.style.display      = isCurrent ? 'inline-block' : 'none';
    page.btnClose.style.opacity      = 0.7;
}



function updatePages()
{
    pagesBar.style.display = 
        settings.showPages
        ? 'flex'
        : 'none';
        
    for (const page of graphPages)
        updatePage(page);
}