import * as Cesium from 'cesium';
import config from "../config";

export default class Gaia3DTileset {
    private viewer: Cesium.Viewer | null;
    private tilesetObj: Cesium.Cesium3DTileset | null = null;
    private color: { conditions: string[][] };
    private show: { conditions: string[][] };

    constructor(viewer: Cesium.Viewer | null, url: string) {
        this.viewer = viewer;
        this.color = {
            conditions: [["true", "color('lightgrey')"]],
        };
        this.show = {
            conditions: [],
        };

        Cesium.Cesium3DTileset.fromUrl(
            url
        ).then((tileset) => {
            tileset.customShader = new Cesium.CustomShader({
                lightingModel: Cesium.LightingModel.UNLIT
            })

            tileset.style = this.getStyle();
            this.viewer?.scene.primitives.add(tileset);
            this.tilesetObj = tileset;
        })
    }

    toggle() {
        if(this.tilesetObj) {
            this.tilesetObj.show = !this.tilesetObj.show;
        }
    }

    remove() {
        if(this.tilesetObj) {
            this.viewer?.scene.primitives.remove(this.tilesetObj);
        }
    }

    setTransparency (transparency: number) {
        if(this.tilesetObj) {
            this.setStyleColor(`color('lightgrey', ${transparency})`);
            this.tilesetObj.style = this.getStyle();
        }
    }

    setShadowMode (mode: keyof typeof config.SHADOW_MODE) {
        if(this.tilesetObj) {
            this.tilesetObj.shadows = config.SHADOW_MODE[mode];
        }
    }

    setStyleColor(color: string) {
        if(this.tilesetObj) {
            this.color = {
                conditions: [["true", color]],
            };
            this.tilesetObj.style = this.getStyle();
        }
    }

    addStyleShow(field: string, condition: string) {
        if(this.tilesetObj) {
            const conditions = this.show.conditions;
            let pushed = false;
            for (let i = 0; i < conditions.length; i++) {
                if (conditions[i][1].indexOf(field) > -1) {
                    conditions[i] = ['true', condition];
                    pushed = true;
                    break;
                }
            }
            if (!pushed) this.show.conditions.push(['true', condition]);

            this.tilesetObj.style = this.getStyle();
        }
    }

    getStyle() {
        const showCondition = this.show.conditions;
        let show = {
            conditions: [["false", "false"]],
        };

        if (showCondition.length > 0) {
            const wholeConditions = showCondition
                .map(([, condition]) => condition)
                .join(' && ');
            show = {
                conditions: [["true", wholeConditions]],
            };
        }

        return new Cesium.Cesium3DTileStyle({
            color: this.color,
            show: show,
        });
    }
}
