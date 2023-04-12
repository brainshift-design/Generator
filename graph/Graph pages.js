Graph.prototype.addPage = function(name)
{
    const page = new GraphPage(name);

    this.pages.push(page);

    
    pagesBar.insertBefore(page.button, btnAddPage);


    if (this.pageIndex < 0)
        this.pageIndex = 0;
};



Graph.prototype.updatePages = function()
{
    pagesBar.style.background = document.hasFocus() ? '#202020' : '#383838';
    pagesBar.style.display    = settings.showPages ? 'inline-block' : 'none';
    
    this.pages.forEach(p => p.update());
    
    updateAddButton(false);


    // for (const node of graph.nodes)
    // {
    //     const id = node.id.split('/');

    //     const pageId = id.length > 1 ? id[0]     : '';
    //     const nodeId = id.length > 1 ? id.at(-1) : id[0];

    //     node.div.style.display = pageId == graph.currentPage.id ? 'block' : 'none';
    // }
}



function updateAddButton(over)
{
    btnAddPage.style.background = over ? '#2c2c2c' : (document.hasFocus() ? '#202020' : '#383838');
    btnAddPlus.style.fill       = over ? '#ffffffe0' : 'rgba(255, 255, 255, 0.35)';
}



btnAddPage.addEventListener('pointerenter', e => updateAddButton(true ));
btnAddPage.addEventListener('pointerleave', e => updateAddButton(false));

btnAddPage.addEventListener('pointerup', e => 
{
    graph.addPage('Graph');
    graph.updatePages();
});