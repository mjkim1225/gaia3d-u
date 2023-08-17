import * as Cesium from 'cesium';
import config from "../config";
import buildingColor from "../../data/buildingFeatureColor";

export default class Gaia3DTileset {
    private readonly viewer: Cesium.Viewer | null;
    private tilesetObj: Cesium.Cesium3DTileset | null = null;
    private color: { conditions: string[][] };
    private show: { conditions: string[][] };

    private transparency: number = 1;

    constructor(viewer: Cesium.Viewer | null, url: string) {
        this.viewer = viewer;
        this.color = {
            conditions: [],
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
            this.setColorByField('DEFAULT');

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

    setShadowMode (mode: keyof typeof config.SHADOW_MODE) {
        if(this.tilesetObj) {
            this.tilesetObj.shadows = config.SHADOW_MODE[mode];
        }
    }

    setTransparency (transparency: number) {
        this.transparency = transparency;
        if(this.tilesetObj) {
            const conditions = this.color.conditions;
            for (let i = 0; i < conditions.length; i++) {
                conditions[i][1] = conditions[i][1].replace(/color\('([#A-Fa-f0-9]+)'\)/, "color('$1', " + transparency + ")");
                conditions[i][1] = conditions[i][1].replace(/color\('([#A-Fa-f0-9]+)',\s*(\d+(\.\d+)?)\)/, "color('$1', " + transparency + ")");
            }
            this.color = {
                conditions
            }

            this.tilesetObj.style = this.getStyle();
        }
    }

    setColorByField(field: string) {
        if(this.tilesetObj) {
            let conditions = this.color.conditions;
            if(field === 'USECON_DE' || field == 'BLDH_HGT'){
                conditions = [];
                buildingColor[field].legend.forEach(e => {
                    conditions.push([""+ e.min +" <= ${"+ field +"} && ${"+ field +"} < " + e.max + "", "color('" + e.color + `', ${this.transparency})`])
                })

            }else if(field === 'BPRP_SE' || field == 'BULD_SE'){
                conditions = [];
                buildingColor[field].legend.forEach(e => {
                    conditions.push(["${"+ field +"} === '" + e.code + "'", "color('" + e.color + `', ${this.transparency})`])
                })
            }else {
                conditions = [["true", "color('"+ buildingColor.DEFAULT.legend[0].color + `', ${this.transparency})`]];
            }

            this.color = {
                conditions
            }
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
        const showConditions = this.show.conditions;
        let show = {
            conditions: [["false", "false"]],
        };

        if (showConditions.length > 0) {
            const wholeConditions = showConditions
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

    createClippingPlanes() {
        alert("준비중입니다.");
    }

}


/**
 * 3d tileset 필드
 *
 * 필드 명칭 필드 내용 속성 타입 길이
 * NF_ID 고유식별자 아이디 VARCHAR 17
 * MOLIT_UFID 국토부 UFID VARCHAR 17
 * BPRP_SE 건물용도 구분 VARCHAR 6 ( 종교시설 / 공장 /창고시설 ...) (✓)
 * BULD_NM 건물 명칭 VARCHAR 200
 * BATC_NM 건물부속 명칭 VARCHAR 200
 * BULD_SE 건물 구분 VARCHAR 6 ( 알반주택/ 연립주택/ 주택외건물 ...) (✓)
 * BFLR_CO 건물층 수 NUMERIC 3
 * PNU_NO PNU 번호 VARCHAR 19
 * USECON_DE 사용승인 일 VARCHAR 8 (✓)
 * RNCODE_DC 도로명코드 설명 VARCHAR 7
 * BLDMN_NO 건물본번 번호 NUMERIC 5
 * BLDSL_NO 건물부번 번호 NUMERIC 5
 * BLDSUB_BO 건물 부분 번호 NUMERIC 2
 * PHY_LV 물리적 위상 수준 NUMERIC 2
 * BLDH_MN 건축물 최저높이 NUMERIC 5,2
 * BLDH_MX 건축물 최고높이 NUMERIC 5,2
 * BLDH_BV 기준높이 NUMERIC 5,2
 * BLDFH_MX 시설물 최고높이 NUMERIC 5,2
 * REFNF_ID 참조 NFID VARCHAR 17
 * CSCHG_SE 수정상태 구분 VARCHAR 6
 * OBJECT_GT 객체 지오메트리 MULTIPOLYGON
 * OBCHG_DT 객체변동 일시 TIMESTAMP
 * MESRMTH_SE 수정측량방법 구분 VARCHAR 1
 * RSREG_DT 성과등록 일시 TIMESTAMP
 * MNENT_NM 제작업체 명 VARCHAR 100
 * DBREG_DT 데이터베이스등록 일시 TIMESTAMP
 * BLDH_HGT : 14.64488 (빌딩 높이로 사용한다) **** 새로만든데이터 (✓)
 *
 * 예시
 * Longitude : 2.258210484254907
 * Latitude : 0.620378574165031
 * Height : 5.002119
 * Name : BLD01000000389TG3
 * NF_ID : BLD01000000389TG3
 * MOLIT_UFID : B00100000009XXKIK
 * BPRP_SE : BDU010
 * BULD_NM : 0
 * BATC_NM : 양정초교가온누리관
 * BULD_SE : BDC004
 * BFLR_CO : 4
 * PNU_NO : 3120012400104700000
 * USECON_DE : 0
 * RNCODE_DC : 4316217
 * BLDMN_NO : 11
 * BLDSL_NO : 0
 * BLDH_MN : 5.002119
 * BLDH_MX : 0
 * BLDH_BV : 19.646999
 * BLDFH_MX : 0
 * REFNF_ID : ARB0400000000V6XE
 * OBCHG_DT : 2021-08-31
 * MESRMTH_SE : P
 * RSREG_DT : 2021-08-31
 * CSCHG_SE : CSC999
 * MNENT_NM : (주)한양지에스티
 * DBREG_DT : 2021-08-31
 * CTPT_NF_ID : BLD06000000389TG8
 */
