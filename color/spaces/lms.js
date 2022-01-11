function xyz2lms(xyz)
{
    return mulv3m3(xyz, CAT);//HPE);
}



function lms2xyz(lms)
{
    return mulv3m3(lms, invCAT);//invHPE);
}
