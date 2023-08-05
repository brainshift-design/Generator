var searchIndex = -1;



function showSearchBox()
{
    hideAllMenus();

    search.style.display = 'block';

    search.oldPan  = clone(graph.currentPage.pan);
    search.oldZoom = graph.currentPage.zoom;

    searchIcon.innerHTML = iconSearch;

    searchText.value = '';
    searchIndex      = -1;

    searchText.focus();
    searchText.select();

    initSearchBox('');
}



function hideSearchBox()
{
    search.style.display  = 'none';
    searchItems.innerHTML = '';
}



function initSearchBox(query)
{
    const found = [];
    
    
    search.nodes = false;

    if (query != '')
    {
        if (query.charAt(0) == '/')
        {
            search.nodes = true;

            for (const node of graph.currentPage.nodes)
            {
                if (node.name.toLowerCase().includes(query.toLowerCase()))
                    found.push(node);
            }
        }
        else
        {
            for (const menu of menuBarMenus)
            {
                for (const item of menu.items)
                {
                    if (   item.name.toLowerCase().includes(query.toLowerCase())
                        && item.callback)
                        found.push(item);
                }
            }
        }


        found.sort((_a, _b) => 
        {
            const a = _a.name.toLowerCase().replaceAll(' . . .', '').replaceAll('. . . ', '').replaceAll('...', '');
            const b = _b.name.toLowerCase().replaceAll(' . . .', '').replaceAll('. . . ', '').replaceAll('...', '');

            const qa = a.indexOf(query);
            const qb = b.indexOf(query);

            if (qa < qb) return -1;
            if (qa > qb) return  1;

            if (a < b) return -1;
            if (a > b) return  1;

            return 0;
        });
    }

    
    searchItems.innerHTML = '';

    searchIndex = found.length > 0 ? 0 : -1;


    for (let i = 0; i < found.length; i++)
    {
        const item   = found[i];

        const result = createDiv('resultItem');
        const icon   = createDiv('resultIcon')
        const legend = createDiv('resultLegend')


        result.innerHTML = item.searchName;

        icon.innerHTML = 
            darkMode
            ? item.icon
            : item.icon.replaceAll('white', 'black');


        if (item.createType != '')
            legend.style.background = rgb2style(rgbFromType(item.createType, true));

        if (!search.nodes)
            result.callback = item.callback;

        result.index = i;

        result.appendChild(legend);
        result.appendChild(icon);
        
        result.addEventListener('click', e => selectSearchItem(result, e.shiftKey, getCtrlKey(e), e.altKey));

        result.addEventListener('pointerenter', e =>
        {
            searchIndex = result.index;
            updateSearchBox();

            if (search.nodes)
                graphView.zoomToNode(found[searchIndex])
        });

        searchItems.appendChild(result);
    }
     

    searchResults.style.paddingBottom = 
           found.length > 0 
        && found.length < 10
        ? '8px'
        : 0;

    if (   query.length == 0
        || found.length > 0)
    {
        search.style.height = Math.min(
            searchText.offsetHeight + searchResults.offsetHeight,
            graphView.div.offsetHeight - search.offsetTop - 40);
    }
    else
    {
        search.style.height = searchText.offsetHeight + 40;
        noSearchResults.style.display = 'inline';
    }


    updateSearchBox();
}



function selectSearchItem(item, shift, ctrl, alt)
{
    if (!shift) 
        hideSearchBox();

    const e = 
    {
        shiftKey: shift,
        ctrlKey:  ctrl,
        altKey:   alt
    };

    if (   item
        && item.callback)
        item.callback(e);

    searchIndex = -1;
}



function updateSearchBox()
{
    for (let i = 0; i < searchItems.children.length; i++)
    {
        const item = searchItems.children[i];

        item.style.background = 
            item.index == searchIndex
            ? (darkMode ? '#383838' : '#f5f5f5')
            : 'transparent';
    }


    const vpos = searchIndex * 32;

    if (vpos < searchResults.scrollTop)
        searchResults.scrollTop = vpos;

    if (vpos > searchResults.scrollTop + searchResults.offsetHeight - 32)
        searchResults.scrollTop = vpos + 32 - searchResults.offsetHeight;
}



searchText.addEventListener('keydown', e =>
{
    e.stopPropagation();

    if (e.code == 'Escape')
        hideSearchBox();

    else if (e.code == 'ArrowDown')
    {
        searchIndex =
            searchIndex < searchItems.children.length-1
            ? searchIndex + 1
            : 0;

        e.preventDefault();
        updateSearchBox();
    }

    else if (e.code == 'ArrowUp')
    {
        searchIndex = 
            searchIndex > 0
            ? searchIndex - 1
            : searchItems.children.length-1;

        e.preventDefault();
        updateSearchBox();
    }

    else if (   e.code == 'Enter' 
             || e.code == 'NumpadEnter')
        selectSearchItem(searchItems.children[searchIndex], e.shiftKey, getCtrlKey(e), e.altKey)
});



searchText.addEventListener('input', e =>
{
    initSearchBox(searchText.value);
});