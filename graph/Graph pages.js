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
    let nodesJson = NULL;
    if (isEmpty(this.pages))
        nodesJson = uiCopyNodes(this.defaultPage.nodes.map(n => n.id));        


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


    if (this.pages.length == 1)
    {
        if (nodesJson != NULL)
            uiPasteNodes(nodesJson, false);

        this.pages[0]._zoom = this.defaultPage._zoom;
        this.pages[0]._pan  = this.defaultPage._pan;
    }
};



Graph.prototype.removePage = function(page)
{
    let nodesJson = NULL;
    if (this.pages.length == 1)
        nodesJson = uiCopyNodes(this.defaultPage.nodes.map(n => n.id));        


    removeFromArray(this.pages, page);

    pagesBar.removeChild(page.button);

    if (this.pageIndex >= this.pages.length)
        this.pageIndex--;


    if (nodesJson != NULL)
        uiPasteNodes(nodesJson, false);
};



Graph.prototype.updatePages = function()
{
    pagesBar.style.background = document.hasFocus() ? '#202020' : '#383838';
    pagesBar.style.display    = settings.showPages ? 'inline-block' : 'none';
    
    this.pages.forEach(p => p.update());
    

    updateAddButton(false);

    
    for (const node of graph.nodes)
    {
        const current = node.pageId == graph.currentPage.id;

        node.div.style.display = current ? 'block' : 'none';

        node.inputs .filter (i => i.connected)     .forEach(i => i.connection.wire.svg.style.display = current ? 'block' : 'none');
        node.outputs.forEach(o => o.connectedInputs.forEach(i => i.connection.wire.svg.style.display = current ? 'block' : 'none'));
    }


    graphView.updateNodeTransforms(graph.nodes.filter(n => n.pageId == graph.currentPage.id));
    graphView.updateNodes();


    pageName.innerHTML = 
        this.currentPage 
        ? (settings.showNodeId 
           ? this.currentPage.id
           : this.currentPage.name)
        : '';


    btnAddPage.style.top = isEmpty(graph.pages) ?  '0px' : '-2px';


    this.updatePageName();
        
    updateZoomIcon();
}



Graph.prototype.updatePageName = function()
{
    pageName   .style.display =
    btnPage.div.style.display =
          !isEmpty(graph.pages)
        && window.innerWidth > 590 
        ? 'inline-block' 
        : 'none';
};



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
    actionManager.do(new CreatePageAction());
});



function pageFromId(pageId)
{
    return graph.pages.find(p => p.id == pageId);
}