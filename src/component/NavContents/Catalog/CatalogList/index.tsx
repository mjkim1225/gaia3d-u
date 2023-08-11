import React from 'react';

import useCatalogListStore from "../../../../store/useCatalogListStore";

import Tileset3DCatalog from "../Tileset3D";

import LineCatalog from "../Line";
import {CatalogType} from "../../../../types";

const CatalogList = ({catalogList}) => {

    const {removeCatalogId} = useCatalogListStore();

    const remove = (id) => {
        removeCatalogId(id);
    }

    return (
        <>
            {
                catalogList.map((catalog: CatalogType) =>  {
                    if(catalog) {
                        const id = catalog.id;
                        return catalog.type === '3DTileset' ? (
                            <Tileset3DCatalog key={id} data={catalog} removeCatalogId={()=>remove(id)}/>
                        ) : catalog.type === 'line' ? (
                            <LineCatalog key={id} data={catalog} removeCatalogId={()=>remove(id)}/>
                        ) : null
                    }
                })
            }
        </>

    );
}

export default CatalogList;
