import * as React from 'react';

import Tileset3DCatalog from "../Tileset3D";
import LineCatalog from "../Line";

const CatalogContent = ({ dataList }) => {

    return (
        <>
            {
                dataList.map((data) =>  {
                    return data.type === '3DTileset' ? (
                        <Tileset3DCatalog key={dataList.indexOf(data)} data={data} />
                    ) : data.type === 'line' ? (
                        <LineCatalog key={dataList.indexOf(data)} data={data} />
                    ) : null
                })
            }
        </>
    );
};
export default CatalogContent;
