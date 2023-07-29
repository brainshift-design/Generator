function showSearchBox()
{
    search.style.display = 'block';

    searchIcon.innerHTML = iconSearch;

    searchText.value = '';

    searchText.focus();
    searchText.select();
}



function hideSearchBox()
{
    search.style.display  = 'none';
    searchItems.innerHTML = '';
}



function initSearchBox(query)
{
    const found = [];

    if (query != '')
    {
        for (const menu of menuBarMenus)
        {
            for (const item of menu.items)
            {
                if (item.name.toLowerCase().includes(query.toLowerCase()))
                    found.push(item);
            }
        }

        found.sort((_a, _b) => 
        {
            const a = _a.name.toLowerCase();
            const b = _b.name.toLowerCase();

            const ia = a.indexOf(query);
            const ib = b.indexOf(query);

            if (ia < ib) return -1;
            if (ia > ib) return  1;

            if (a < b) return -1;
            if (a > b) return  1;

            return 0;
        });
    }

    
    searchItems.innerHTML = '';


    for (const item of found)
    {
        const result     = createDiv('resultItem');
        const icon       = createDiv('resultIcon')

        result.innerHTML = item.name;
        icon  .innerHTML = item.icon;

        result.appendChild(
            darkMode
            ? icon
            : icon.replaceAll('white', 'black'));
        
        result.addEventListener('click', e =>
        {
            if (!shift) 
                hideSearchBox();

            const _e = 
            {
                shiftKey: e.shiftKey,
                ctrlKey:  getCtrlKey(e),
                altKey:   e.altKey
            };

            if (item.callback)
                item.callback(_e);
        });

        searchItems.appendChild(result);
    }
     

    searchResults.style.paddingBottom = 
           found.length > 0 
        && found.length < 10
        ? '8px'
        : 0;

    search.style.height = searchText.offsetHeight + searchResults.offsetHeight;


    updateSearchBox();
}



function updateSearchBox()
{

}



searchText.addEventListener('keydown', e =>
{
    e.stopPropagation();

    if (e.code == 'Escape')
        hideSearchBox();
});



searchText.addEventListener('input', e =>
{
    initSearchBox(searchText.value);
});