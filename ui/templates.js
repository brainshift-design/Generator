const presetTemplates = 
[
    {name: 'Fills/Color fill',        graph: templateColorFill      },
    {name: 'Fills/Color stroke',      graph: templateColorStroke    },
    {name: 'Fills/Filled stroke',     graph: templateFilledStroke   },
    {name: 'Fills/Filled color stop', graph: templateFilledColorStop},

    {name: 'Random seeds',            graph: templateRandomSeeds    }
];


var userTemplates = [];



function updateUserTemplatesFromDB()
{
    postToServer(
    {
        action: 'getAllUserTemplates',
        userId:  currentUser.id
    })
    .then(response =>
    {
        userTemplates = response.userTemplates.map(t => 
        { 
            t.graph = decodeURIComponent(t.graph); 
            return t; 
        });
    })
    .catch(e =>
    {
        console.error(e);
        throw e;
    });
}



function initTemplateMenu(e)
{
    menuTemplate.clearItems();

    menuItemSaveTemplate = new MenuItem('Save as template...', null, {icon: iconManageTemplates,        callback: () => showSaveAsTemplateDialog()});    //menuItemManageTemplates = new MenuItem('Manage templates...', null, {icon: iconManageTemplates});

    const sub = subscribed();
    enableMenuItem(menuItemSaveTemplate,    graphView.selectedNodes.length > 0, sub);
    enableMenuItem(menuItemManageTemplates, true, sub);

    menuTemplate.addItems([
        menuItemSaveTemplate]);//,
        //new MenuItem('', null, {separator: true}),
        //menuItemManageTemplates]);

    initTemplateMenuTemplates(presetTemplates, true,  false);
    initTemplateMenuTemplates(userTemplates,   false, true ); // don't show user template names in metrics
}



function initTemplateMenuTemplates(templates, showNames, modifiers)
{
    if (templates.length > 0)
        menuTemplate.addItems([new MenuItem('', null, {separator: true})]);


    for (let i = 0; i < templates.length; i++)
    {
        const template  = templates[i];
        const nameParts = template.name.split('/');

        let curMenu = menuTemplate;
        
        if (nameParts.length > 1)
        {
            for (let j = 0; j < nameParts.length; j++)
            {
                if (j < nameParts.length-1)
                {
                    if (curMenu.items.at(-1).name != nameParts[j])
                    {
                        const newMenu  = new Menu(nameParts[j], true, false);
                        const menuItem = new MenuItem(nameParts[j], null, {childMenu: newMenu});

                        curMenu.addItems([menuItem]);
                        curMenu = newMenu;
                    }
                    else 
                        curMenu = curMenu.items.at(-1).childMenu;
                }

                if (j == nameParts.length-1)
                {
                    const modMenu = new Menu('Modify template', false, false);
                    modMenu.minWidth      = 104;
                    modMenu.forceMinWidth = true;
                    modMenu.addItems([new AdjustMenuItem(i, {callback: adjustTemplateMenu})]);
                    
                    const item = new MenuItem(nameParts[j], null, 
                    {
                        icon:      iconTemplate,
                        callback:  () => loadTemplate(template.graph, showNames ? template.name : ''),
                        childMenu: modifiers ? modMenu : null
                    });

                    if (modifiers)
                        item.replaceExpand = '<svg width="2" height="5" viewBox="0 -1 2 5" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="2" height="1" fill="white"/><rect y="3" width="2" height="1" fill="white"/></svg>';

                    curMenu.addItems([item]);
                }
            }
        }
        else
        {
            const modMenu = new Menu('Modify template', false, false);
            modMenu.minWidth      = 104;
            modMenu.forceMinWidth = true;
            modMenu.addItems([new AdjustMenuItem(i, {callback: adjustTemplateMenu})]);
            
            const item = new MenuItem(template.name, null,
            {
                icon:      iconTemplate,
                callback:  () => loadTemplate(template.graph, showNames ? template.name : ''),
                childMenu: modifiers ? modMenu : null
            });

            if (modifiers)
                item.replaceExpand = '<svg width="2" height="5" viewBox="0 -1 2 5" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="2" height="1" fill="white"/><rect y="3" width="2" height="1" fill="white"/></svg>';

            curMenu.addItems([item]);
        }
    }
}



function adjustTemplateMenu(e, thisMenu, action, template)
{
    const curMenu = thisMenu.parentItem.parentMenu;
    
    if (action == 0) // up
    {
        const index = userTemplates.indexOf(template);
        moveInArray(userTemplates, index, Math.max(0, index - 1));
        
        updateTemplateMenu(menuTemplate);
        curMenu.update(curMenu.div.offsetLeft + 6, curMenu.div.offsetTop - 4, true);

        updateTemplateOrderOnServer();
    }
    else if (action == 1) // down
    {
        const index = userTemplates.indexOf(template);
        moveInArray(userTemplates, index, Math.min(index + 1, userTemplates.length-1));
        
        updateTemplateMenu(menuTemplate);
        curMenu.update(curMenu.div.offsetLeft + 6, curMenu.div.offsetTop - 4, true);

        updateTemplateOrderOnServer();
    }
    else if (action == 2) // rename
    {
        hideAllMenus();

        showSaveAsTemplateDialog();

        saveAsTemplateInput.value = template.name;
        saveAsTemplateInput.select();

        saveAsTemplateDialog.copiedJson   = template.graph;
        saveAsTemplateDialog.nameToDelete = template.name;

        saveAsTemplateTitleText.innerHTML = 'Rename template';
    }
    else if (action == 3) // delete
    {
        if (userTemplates.find(t => t.name == template.name))
        {
            return postToServer(
            {
                action: 'deleteTemplate',
                userId:  currentUser.id,
                name:    template.name
            })
            .then(response =>
            {
                hideAllMenus();
                updateUserTemplatesFromDB();
            })
            .catch(e =>
            {
                console.error(e);
                throw e;
            });
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



function updateTemplateMenu(menu)
{
    // const x = menu.x;
    // const y = menu.y;
    
    // hideAllMenus();
    menu.initMenu()
    menu.update();//showAt(x, y);

    // item.mouseOver = true;
    // item.update();
}



function updateTemplateOrderOnServer()
{
    postToServer(
    {
        action: 'updateTemplateOrder',
        userId:  currentUser.id,
        names:   JSON.stringify(userTemplates.map(t => t.name))
    })
    .then(response =>
    {   

    })
    .catch(error =>
    {
        consoleError(error);
    });
}