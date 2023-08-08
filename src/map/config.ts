/*
* map config
* */

import * as Cesium from 'cesium';
import {CameraOption} from "./types";

const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzYTM3ODhlNC1jOWUxLTRhOTYtYTgwZC1iMDA3OGJiMTQwZDciLCJpZCI6MTI5NDU5LCJpYXQiOjE2ODIwNTc4NjN9.GC-W9QfAFa9rXMh2Ow2rSC5UvLcwtS_qjWJ1v454z1A';

const DEFAULT_CAMERA_OPTION: CameraOption = {
    longitude: 126.98465233162544,
    latitude: 37.35324873000187,
    altitude: 15000,
    heading: 0.0,
    pitch: -40.0,
    roll: 0.0
};

const SHADOW_MODE = {
    DISABLED: Cesium.ShadowMode.DISABLED,
    ENABLED: Cesium.ShadowMode.ENABLED,
    CAST_ONLY: Cesium.ShadowMode.CAST_ONLY,
    RECEIVE_ONLY: Cesium.ShadowMode.RECEIVE_ONLY,
}

const Cesium3DTileStyle = (() => {
    const style
        : {
            color: {
                conditions: string[][]
            },
            show: {
                conditions: string[][]
            },
            setColor: (color: string) => void,
            addShow: (field: string, condition: string) => void,
            get: () => Cesium.Cesium3DTileStyle
        }
        =
        {
            color: {
                conditions: [["true", "color('lightgrey')"]]
            },
            show: {
                conditions: []
            },
            setColor: function(color) {
                this.color = {
                    conditions: [["true", color]]
                };
            },
            addShow: function(field, condition) {
                const conditions = this.show.conditions;
                let pushed = false;
                for (let i = 0; i < conditions.length; i++) {
                    if(conditions[i][1].indexOf(field) > -1 ) {
                        conditions[i] = ['true', condition];
                        pushed = true;
                        break;
                    }
                }
                if(!pushed) this.show.conditions.push(['true', condition]);
            },
            get: function() {
                const showCondition = this.show.conditions;
                let show = {
                    conditions: [["false","false"]]
                };
                if(showCondition.length > 0) {
                    const wholeConditions = this.show.conditions
                        .filter(([condition]) => condition)
                        .map(([, condition]) => condition)
                        .join(' && ');
                    show = {
                        conditions: [["true", wholeConditions]]
                    }
                }

                return new Cesium.Cesium3DTileStyle({
                    color: this.color,
                    show: show
                });
            }
        };

    return style;
})();

const CLIPPING_OPTIONS = {
    BOX_SIZE: 700,
    DIRECTIONS: {
        TOP: 0,
        BOTTOM: 1,
        RIGHT: 2,
        LEFT: 3,
        FRONT: 4,
        BACK: 5,
    },
    naming: (tilesetIndex, direction) => `${tilesetIndex}-${direction}`,
    parsingDirection: (name) => name.split('-')[1],
}

export default {
    ACCESS_TOKEN,
    DEFAULT_CAMERA_OPTION,
    SHADOW_MODE,
    Cesium3DTileStyle,
    CLIPPING_OPTIONS,
};
