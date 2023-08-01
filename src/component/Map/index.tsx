import React, { useEffect } from 'react';

import map from '../../map';

const mapId = 'cesiumContainer';
const Map = () => {

    useEffect(() => {
        const viewer = map.getViewer();
        const mapContainer = document.getElementById(mapId);

        if (viewer) {
            viewer.destroy();
        }
        if (mapContainer && mapContainer.hasChildNodes()) {
            mapContainer.firstChild? mapContainer.removeChild(mapContainer.firstChild) : null;
        }
        map.initMap(mapId);

    }, [mapId]);

    return <div id={mapId}/>

};

export default Map;
