function uiEndLoadState(msg)
{
    currentUser = msg.currentUser;
    productKey  = msg.productKey;

    uiGetPluginData('graph');

    //setInterval(autoSave, 2000);


    // initMenuSelect(menuSelect);
    // menuSelect.initMenu();

    //updateMenuSelectItems();
}



// function updateMenuSelectItems()
// {
//     let items = 
//     [
//         {value: 'graph0',     text: 'Untitled'      },
//         {value: 'new',        text: 'New graph'     },
//         {value: 'loadLocal',  text: 'Load from file'}
//     ];

//     checkAddMenuItemsSave     (items);
//     checkAddMenuItemProductKey(items);

//     menuSelect.updateItems(items);
// }



// function checkAddMenuItemsSave(menuSelectItems)
// {
//     if (validateProductKey(currentUser.id, productKey))
//     {
//         menuSelectItems.push(...
//         [
//             {value: 'duplicate',  text: 'Duplicate'      },
//             {value: 'saveLocal',  text: 'Save local copy'},
//             {value: 'delete',     text: 'Delete'         } 
//         ]);
//     }
// }



function checkAddMenuItemProductKey(menuSelectItems)
{
    if (!validateProductKey(currentUser.id, productKey))
        menuSelectItems.push({value: 'productKey', text: 'Enter product key'});
}



function removeMenuItemProductKey()
{
    let index = menuSelect.items.findIndex(item => item.value == 'productKey');
    removeAt(menuSelect.items, index);
    menuSelect.updateItems();
}



function uiNotify(text, prefix = 'Generator: ', delay = 4000)
{
    uiPostMessageToFigma({ 
        cmd:   'figNotify',
        text:   text,
        prefix: prefix,
        delay:  delay
    });        
}