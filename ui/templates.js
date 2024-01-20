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

    menuItemSaveTemplate    = new MenuItem('Save as template...', null, {icon: iconTemplate,        callback: () => showSaveAsTemplateDialog()});    //menuItemManageTemplates = new MenuItem('Manage templates...', null, {icon: iconManageTemplates});

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
            {
                const modMenu = new Menu('Modify template', false, false);
                modMenu.minWidth      = 104;
                modMenu.forceMinWidth = true;
                modMenu.addItems([new AdjustMenuItem(i, {callback: adjustTemplateMenu})]);
                
                const item = new MenuItem(nameParts[j], null, 
                {
                    callback:  () => loadTemplate(template.graph, showNames ? template.name : ''),
                    childMenu: modifiers ? modMenu : null
                });

                if (modifiers)
                    item.replaceExpand = '<svg width="2" height="5" viewBox="0 -1 2 5" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="2" height="1" fill="white"/><rect y="3" width="2" height="1" fill="white"/></svg>';

                curMenu.addItems([item]);
            }
        }
    }
}



function adjustTemplateMenu(e, thisMenu, action, template)
{
    if (action == 0) // up
    {
        return postToServer(
        {
            action: 'moveTemplateUp',
            userId: currentUser.id,
            name:   template.name
        })
        .then(response =>
        {
            // const templateParts = [];

            // for (let i = 0; i < userTemplates.length; i++)
            //     templateParts.push(userTemplates[i].name.split('/'));


            const nameParts = template.name.split('/');
            
            let curMenu = menuTemplate;
            for (let i = 0; i < nameParts.length; i++)
            {
                const found = curMenu.items.find(item => item.name == nameParts[i]);

                if (   i < nameParts.length-1
                    && found)
                    curMenu = found.childMenu;

                if (   i == nameParts.length-1
                    && found)
                {
                    const index = curMenu.items.indexOf(found);
                    
                    if (index > 0)
                    {
                        moveInArray(curMenu.items, index, Math.max(curMenu == menuTemplate ? 6 : 0, action-1));

                        curMenu.divItems.insertBefore(
                            found.div, 
                            curMenu.divItems.children[index-1]);

                        curMenu.update();
                    }
                }
            }
        })
        .catch(e =>
        {
            console.error(e);
            throw e;
        });
    }
    else if (action == 1) // down
    {
    // return postToServer(
    //     {
    //         action: 'moveTemplateDown',
    //         userId: currentUser.id,
    //         name:   template.name
    //     })
    //     .then(response =>
    //     {
    //         const nameParts = template.name.split('/');

    //         let curMenu = menuTemplate;
    //         for (let i = 0; i < nameParts.length; i++)
    //         {
    //             const found = curMenu.items.find(item => item.name == nameParts[i]);

    //             if (   i < nameParts.length-1
    //                 && found)
    //                 curMenu = found.childMenu;

    //             if (   i == nameParts.length-1
    //                 && found)
    //             {
    //                 const index = curMenu.items.indexOf(found);
                    
    //                 moveInArray(curMenu.items, index, Math.min(index+1, curMenu.items.length-1));

    //                 curMenu.divItems.insertBefore(
    //                     found.div, 
    //                     curMenu.divItems.children[index+1]);

    //                 curMenu.update();
    //             }
    //         }
    //     })
    //     .catch(e =>
    //     {
    //         console.error(e);
    //         throw e;
    //     });
    }
    else if (action == 2) // rename
    {
        hideAllMenus();

        showSaveAsTemplateDialog();

        saveAsTemplateInput.value = template.name;
        saveAsTemplateInput.select();

        saveAsTemplateDialog.copiedJson   = template.graph;
        saveAsTemplateDialog.nameToDelete = template.name;
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
                const temp     = userTemplates.find(t => t.name == template.name);
                const menuItem = menuTemplate.items.find(item => item.name == template.name);

                removeFromArray(userTemplates, temp);

                const parent = menuItem.parentMenu;

                parent.removeItem(menuItem);
                parent.update();

                thisMenu.hide();

                if (   userTemplates.length == 0
                    && menuTemplate.items.length == 4)
                    menuTemplate.removeItemAt(3);
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
