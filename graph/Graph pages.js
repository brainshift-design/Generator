Graph.prototype.createPage = function(name)
{
    this.addPage(new GraphPage(
        name.substring(0, 1).toLowerCase() + name.substring(1),
        name));
};



Graph.prototype.addPage = function(page)
{
    page.id = getNewNumberId(
        graph.pages, 
        id => graph.pages.find(p => p.id == id), 
        page.id);

    page.name = getNewNumberId(
        graph.pages, 
        name => graph.pages.find(p => p.name == name), 
        page.name, 
        page.name, 
        ' ');

    this.pages.push(page);

    pagesBar.insertBefore(page.button, btnAddPage);

    this.pageIndex++;
};



Graph.prototype.removePage = function(page)
{
    removeFromArray(this.pages, page);

    pagesBar.removeChild(page.button);

    if (this.pageIndex >= this.pages.length)
        this.pageIndex--;
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
    graph.createPage('Graph');
    graph.updatePages();

    uiSavePages(
        [graph.pages.at(-1).id], 
        [graph.pages.at(-1).toJson()]);
});