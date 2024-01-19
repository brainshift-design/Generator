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

    menuTemplate.addItems([
        new MenuItem('Save to template...', null, {icon: iconTemplate}),
        new MenuItem('',                    null, {separator: true}),
        new MenuItem('Manage templates...', null, {icon: iconManageTemplates})]);

    initTemplateMenuTemplates(presetTemplates);
    initTemplateMenuTemplates(userTemplates);
}



function initTemplateMenuTemplates(templates)
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
                if (!curMenu.items.find(i => i.name == nameParts[j]))
                {
                    const newMenu  = new Menu(nameParts[j], false, false);
                    const menuItem = new MenuItem(nameParts[j], null, {childMenu: newMenu});
                    curMenu.addItems([menuItem]);
                    curMenu = newMenu;
                }
                else if (nameParts.length > 1)
                    curMenu = curMenu.items.find(i => i.name == nameParts[j]).childMenu;
            }

            if (j == nameParts.length-1)
                curMenu.addItems([new MenuItem(nameParts[j], null, {})]);
        }
    }
}