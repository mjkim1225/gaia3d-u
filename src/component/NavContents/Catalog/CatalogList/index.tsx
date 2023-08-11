import React from 'react';

import Tileset3DCatalog from "../Tileset3D";

const CatalogList = ({gaiaObjList, removeData}) => {

    const remove = (id) => {
        removeData(id);
    }

    return (
        <>
            {
                gaiaObjList.map((gaiaObj) =>  {
                    if(gaiaObj) {
                        const id = gaiaObj.id;
                        const catalog = gaiaObj.catalog;
                        return catalog.type === '3DTileset' ? (
                            <Tileset3DCatalog key={id} data={catalog} tileset={gaiaObj.gaiaObj} removeCatalogId={()=>remove(id)}/>
                        ) : catalog.type === 'line' ? (
                            <div>test</div>
                        ) : null
                    }
                })
            }
        </>

    );
}

export default CatalogList;
