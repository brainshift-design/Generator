function showSearchBox()
{
    search.style.display = 'block';

    searchIcon.innerHTML = iconSearch;

    searchText.focus();
    searchText.select();
}



function hideSearchBox()
{
    search.style.display = 'none';
}