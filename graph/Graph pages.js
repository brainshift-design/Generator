Graph.prototype.createPage = function(name, add = true)
{
    const page = new GraphPage(
        name.substring(0, 1).toLowerCase() + name.substring(1),
        name);

    if (add)
        this.addPage(page);

    return page;
};



Graph.prototype.addPage = function(page)
{
    page.id = getNewNumberId(
        page.id,
        id => graph.pages.find(p => p.id == id));

    page.name = getNewNumberId(
        page.name, 
        name => graph.pages.find(p => p.name == name), 
        page.name, 
        ' ');

    this.pages.push(page);

    pagesBar.insertBefore(page.button, btnAddPage);

    this.pageIndex = this.pages.length-1;

    // console.log('add this.pageIndex =', this.pageIndex);        
};



Graph.prototype.removePage = function(page)
{
    removeFromArray(this.pages, page);

    pagesBar.removeChild(page.button);

    if (this.pageIndex >= this.pages.length)
        this.pageIndex--;

    // console.log('remove this.pageIndex =', this.pageIndex);        
    // console.log('this.currentPage.id =', this.currentPage.id);
};



Graph.prototype.updatePages = function()
{
    // console.log('Graph.updatePages()');        

    pagesBar.style.background = document.hasFocus() ? '#202020' : '#383838';
    pagesBar.style.display    = settings.showPages ? 'inline-block' : 'none';
    
    this.pages.forEach(p => p.update());

    if (this.pages.length > 0)
        this.pages[0].button.style.display = 'none';    

    
    updateAddButton(false);

    
    for (const node of graph.nodes)
    {
        const current = node.pageId == graph.currentPage.id;

        node.div.style.display = current ? 'block' : 'none';

        node.inputs .filter (i => i.connected)     .forEach(i => i.connection.wire.svg.style.display = current ? 'block' : 'none');
        node.outputs.forEach(o => o.connectedInputs.forEach(i => i.connection.wire.svg.style.display = current ? 'block' : 'none'));
    }


    const nodes = graph.nodes.filter(n => n.pageId == graph.currentPage.id);

    graphView.updateNodeTransforms(nodes);
    graphView.updateNodes();
    graphView.updateNodeWireTransforms(nodes);


    pageName.innerHTML = 
        this.currentPage 
        ? (settings.showNodeId 
           ? this.currentPage.id
           : this.currentPage.name)
        : '';


    btnAddPage.style.top = graph.pages.length == 1 ? '0px' : '-2px';


    this.updatePageName();

    // console.log('2 update this.pageIndex =', this.pageIndex);        
    updateZoomIcon();
};



Graph.prototype.updatePageName = function()
{
    const display =
           this.pages.length > 1
        && window.innerWidth > 590 
        ? 'inline-block' 
        : 'none';

    pageName.style.display = display;

    if (btnPage)
        btnPage.div.style.display = display;
};



Graph.prototype.updateSavedPages = function()
{
    // console.log('graph.currentPage.id =', graph.currentPage.id);
    uiSavePages(
        this.pages.map(p => p.id), 
        this.pages.map(p => p.toJson()),
        graph.currentPage.id);
};



function updateAddButton(over)
{
    btnAddPage.style.background = over ? '#2c2c2c' : (document.hasFocus() ? '#202020' : '#383838');
    btnAddPlus.style.fill       = over ? '#ffffffe0' : 'rgba(255, 255, 255, 0.35)';
}    



btnAddPage.addEventListener('pointerenter', e => updateAddButton(true ));
btnAddPage.addEventListener('pointerleave', e => updateAddButton(false));

btnAddPage.addEventListener('pointerup', e => 
{
    actionManager.do(new CreatePageAction());
});



function pageFromId(pageId)
{
    return graph.pages.find(p => p.id == pageId);
}