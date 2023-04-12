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

    this.pageIndex = this.pages.length-1;
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


    for (const node of graph.nodes)
        node.div.style.display = node.pageId == graph.currentPage.id ? 'block' : 'none';


    graphView.updateNodeTransforms(graph.nodes.filter(n => n.pageId == graph.currentPage.id));
    graphView.updateNodes();


    updateZoomIcon();
}



Graph.prototype.updateSavedPages = function()
{
    uiSavePages(
        this.pages.map(p => p.id), 
        this.pages.map(p => p.toJson()),
        graph.currentPage.id);
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
    graph.updateSavedPages();
});