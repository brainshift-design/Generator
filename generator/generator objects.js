const OBJ_RECT = 1;


var  _resetObjId = 0;
var  _nextObjId  = _resetObjId;

const MAX_OBJECTS = 0x10000;
const gObjects    = new Array(MAX_OBJECTS);
var   ngObjects   = 0;


/*  object format

    type
    object id (unique numeric)
    node uid (unique numeric)

    object data
    .
    .
    .
*/


function newObjectId()
{
    var id = _nextObjId;

    var looped = false;

    while (id < MAX_OBJECTS
        && !!gObjects[id])
    {
        id++;

        if (id == MAX_OBJECTS)
        {
            if (looped)
                return -1;

            id     = 0
            looped = true;
        }
    }

    _nextObjId == id + 1;
    
    return id;
}