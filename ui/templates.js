const presetTemplates = 
[
    {name: 'Fills/Color fill',        graph: templateColorFill      },
    {name: 'Fills/Color stroke',      graph: templateColorStroke    },
    {name: 'Fills/Filled stroke',     graph: templateFilledStroke   },
    {name: 'Fills/Filled color stop', graph: templateFilledColorStop},

    {name: 'Random seeds',            graph: templateRandomSeeds    }
];


var userTemplates = [];



function initTemplateMenu(e)
{
    menuTemplate.clearItems();

    menuItemSaveTemplate    = new MenuItem('Save as template...', null, {icon: iconTemplate,        callback: () => showSaveAsTemplateDialog()});
    menuItemManageTemplates = new MenuItem('Manage templates...', null, {icon: iconManageTemplates});

    const sub = subscribed();
    enableMenuItem(menuItemSaveTemplate,    graphView.selectedNodes.length > 0, sub);
    enableMenuItem(menuItemManageTemplates, true, sub);

    menuTemplate.addItems([
        menuItemSaveTemplate,
        new MenuItem('', null, {separator: true}),
        menuItemManageTemplates]);

    initTemplateMenuTemplates(presetTemplates, true );
    initTemplateMenuTemplates(userTemplates,   false); // don't show user template names in metrics
}



function initTemplateMenuTemplates(templates, showNames)
{
    if (templates.length > 0)
        menuTemplate.addItems([new MenuItem('', null, {separator: true})]);


    for (let i = 0; i < templates.length; i++)
    {
        const template  = templates[i];
        const nameParts = template.name.split('/');

        let curMenu = menuTemplate;
        
        for (let j = 0; j < nameParts.length; j++)
        {
            if (j < nameParts.length-1)
            {
                if (!curMenu.items.find(item => item.name == nameParts[j]))
                {
                    const newMenu  = new Menu(nameParts[j], false, false);
                    const menuItem = new MenuItem(nameParts[j], null, {childMenu: newMenu});
                    curMenu.addItems([menuItem]);
                    curMenu = newMenu;
                }
                else if (nameParts.length > 1)
                    curMenu = curMenu.items.find(item => item.name == nameParts[j]).childMenu;
            }

            if (j == nameParts.length-1)
                curMenu.addItems([new MenuItem(nameParts[j], null, {callback: () => loadTemplate(template.graph, showNames ? template.name : '')})]);
        }
    }
}



function loadTemplate(templateGraph, templateName)
{
    hideAllMenus();

    const ex = (graphView.div.offsetWidth ) / 2;
    const ey = (graphView.div.offsetHeight) / 2 + getTopHeight();

    const x  = (ex - graph.currentPage.pan.x) / graph.currentPage.zoom;
    const y  = (ey - graph.currentPage.pan.y) / graph.currentPage.zoom;

    actionManager.do(new PasteNodesAction(templateGraph, false, false, true, x, y));

    addMetricsEvent(METRICS_LOAD_TEMPLATE, templateName);
}
