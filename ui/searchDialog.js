var searchIndex      = -1;
var searchMouseMoved = false;



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

    if (graphView._soloNode)
        graphView.unsoloNode();

    // if (   search.oldPan
    //     && search.oldZoom)
    // {
    //     graph.currentPage.setPanAndZoom(
    //         search.oldPan, 
    //         search.oldZoom);

    //     search.oldPan  = null;
    //     search.oldZoom = null;
    // }
}



function initSearchBox(query)
{
    search.found = [];
    search.nodes = false;


    if (query != '')
    {
        if (query.charAt(0) == '/')
        {
            query = query.substring(1);
            search.nodes = true;

            for (const node of graph.currentPage.nodes)
            {
                if (node.name.toLowerCase().includes(query.toLowerCase()))
                {
                    node.foundExact = 0;
                    search.found.push(node);
                }
                else if (includesSimilar(node.name.toLowerCase(), query.toLowerCase(), 1))
                {
                    node.foundExact = 1;
                    search.found.push(node);
                }
            }
        }
        else
        {
            search.nodes = false;

            for (const menu of menuBarMenus)
            {
                if (!menu) continue;
                
                for (const item of menu.items)
                {
                    if (   item.name.toLowerCase().includes(query.toLowerCase())
                        && item.callback)
                    {
                        item.foundExact = 0;
                        search.found.push(item);
                    }
                    else if (includesSimilar(item.name.toLowerCase(), query.toLowerCase(), 1)
                          && item.callback)
                    {
                        item.foundExact = 1;
                        search.found.push(item);
                    }
                }
            }
        }


        search.found.sort((_a, _b) => 
        {
            const a  = _a.name.toLowerCase().replaceAll(' . . .', '').replaceAll('. . . ', '').replaceAll('...', '');
            const b  = _b.name.toLowerCase().replaceAll(' . . .', '').replaceAll('. . . ', '').replaceAll('...', '');

            const ea = _a.foundExact;
            const eb = _b.foundExact;

            const qa = a.indexOf(query);
            const qb = b.indexOf(query);

            if (ea < eb) return -1;
            if (ea > eb) return  1;

            if (qa < qb) return -1;
            if (qa > qb) return  1;
 
            if (a  < b ) return -1;
            if (a  > b ) return  1;

            return 0;
        });
    }

    
    searchItems.innerHTML = '';

    searchIndex      = search.found.length > 0 ? 0 : -1;
    searchMouseMoved = false;


    for (let i = 0; i < search.found.length; i++)
    {
        const item   = search.found[i];

        const result = createDiv('resultItem'  );
        const icon   = createDiv('resultIcon'  );
        const legend = createDiv('resultLegend');


        result.innerHTML = 
            search.nodes 
            ? item.name 
            : item.searchName;


        icon.innerHTML = 
            darkMode
            ? item.icon
            : item.icon.replaceAll('white', 'black');

        
        let type = null;

             if (item.createType && item.createType != '') type = item.createType;
        else if (item.type       && item.type       != '') type = item.type;

        if (type) legend.style.background = rgb2style(rgbFromType(type, true));


        if (!search.nodes)
            result.callback = item.callback;


        result.index = i;

        result.appendChild(legend);
        result.appendChild(icon);
        
        result.addEventListener('click', e => selectSearchItem(result, e.shiftKey, getCtrlKey(e), e.altKey));

        result.addEventListener('pointerenter', e =>
        {
            if (searchMouseMoved)
            {
                searchIndex = result.index;
                updateSearchBox();
            }
        });

        result.addEventListener('pointermove', e =>
        {
            if (!searchMouseMoved)
            {
                searchIndex = result.index;
                updateSearchBox();
            }

            searchMouseMoved = true;
        });

        searchItems.appendChild(result);
    }
     

    searchResults.style.paddingBottom = 
           search.found.length > 0 
        && search.found.length < 10
        ? '8px'
        : 0;

    if (   query.length == 0
        || search.found.length > 0)
    {
        search.style.height = Math.min(
            searchText.offsetHeight + searchResults.offsetHeight,
            graphView.div.offsetHeight - search.offsetTop - 100);

        noSearchResults.style.display = 'none';
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
        altKey:   alt,
        search:   true
    };

    if (item)
    {
        if (item.callback)
            item.callback(e);
        else
        {
            if (!shift)
                graphView.selectedNodes = [];

            search.found[searchIndex].selected = true;
            search.found[searchIndex].updateBorder();
        }
    }

    searchIndex = -1;


    addMetricsEvent(METRICS_SEARCH, item.name);
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


    if (   search.nodes
        && searchIndex > -1)
    {
        graphView.soloNode(search.found[searchIndex]);
        graphView.zoomToNodes([search.found[searchIndex]], false, search.offsetTop + search.offsetHeight)
    }
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