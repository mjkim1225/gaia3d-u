/**
 * @description
 * 서울 su
 * 제주 jj
 * 세종 sj
 * 부산 bs
 * 인천 ic
 * 울산 us
 * 경북 gb
 * 대구 dg
 * 충북 cb
 * 충남 cn
 * 대전 dj
 * 전북 jb
 * 전남 jn
 * 광주 gj
 * 강원 gw
 *
 * const cameraOptionsByLocation = {
 *     서울: {
 *         longitude: 126.9780,
 *         latitude: 37.5665,
 *         altitude: 1500,
 *         heading: 0,
 *         pitch: -40,
 *         roll: 0
 *     },
 *     제주: {
 *         longitude: 126.5219,
 *         latitude: 33.4996,
 *         altitude: 1500,
 *         heading: 0,
 *         pitch: -40,
 *         roll: 0
 *     },
 *     세종: {
 *         longitude: 127.2817,
 *         latitude: 36.4801,
 *         altitude: 1500,
 *         heading: 0,
 *         pitch: -40,
 *         roll: 0
 *     },
 *     부산: {
 *         longitude: 129.0756,
 *         latitude: 35.1796,
 *         altitude: 1500,
 *         heading: 0,
 *         pitch: -40,
 *         roll: 0
 *     },
 *     인천: {
 *         longitude: 126.7052,
 *         latitude: 37.4563,
 *         altitude: 1500,
 *         heading: 0,
 *         pitch: -40,
 *         roll: 0
 *     },
 *     울산: {
 *         longitude: 129.3114,
 *         latitude: 35.5384,
 *         altitude: 1500,
 *         heading: 0,
 *         pitch: -40,
 *         roll: 0
 *     },
 *     경북: {
 *         longitude: 128.5547,
 *         latitude: 36.4550,
 *         altitude: 1500,
 *         heading: 0,
 *         pitch: -40,
 *         roll: 0
 *     },
 *     대구: {
 *         longitude: 128.6018,
 *         latitude: 35.8714,
 *         altitude: 1500,
 *         heading: 0,
 *         pitch: -40,
 *         roll: 0
 *     },
 *     충북: {
 *         longitude: 127.7178,
 *         latitude: 36.6285,
 *         altitude: 1500,
 *         heading: 0,
 *         pitch: -40,
 *         roll: 0
 *     },
 *     충남: {
 *         longitude: 126.7052,
 *         latitude: 36.5184,
 *         altitude: 1500,
 *         heading: 0,
 *         pitch: -40,
 *         roll: 0
 *     },
 *     대전: {
 *         longitude: 127.3845,
 *         latitude: 36.3504,
 *         altitude: 1500,
 *         heading: 0,
 *         pitch: -40,
 *         roll: 0
 *     },
 *     전북: {
 *         longitude: 127.1530,
 *         latitude: 35.7167,
 *         altitude: 1500,
 *         heading: 0,
 *         pitch: -40,
 *         roll: 0
 *     },
 *     전남: {
 *         longitude: 126.9946,
 *         latitude: 34.8679,
 *         altitude: 1500,
 *         heading: 0,
 *         pitch: -40,
 *         roll: 0
 *     },
 *     광주: {
 *         longitude: 126.8769,
 *         latitude: 35.1605,
 *         altitude: 1500,
 *         heading: 0,
 *         pitch: -40,
 *         roll: 0
 *     },
 *     강원: {
 *         longitude: 128.2278,
 *         latitude: 37.8854,
 *         altitude: 1500,
 *         heading: 0,
 *         pitch: -40,
 *         roll: 0
 *     }
 * };
 *
 * console.log(cameraOptionsByLocation);
 */

const buildings = [
    {
        id: 0,
        type: "3DTileset",
        nameKor: "서울시 3D 빌딩",
        nameEng: "seoul 3d buildings",
        cityKor: "서울시",
        cityEng: "su",
        tileset: "su_tileset",
        url: `${ASSET_SERVER}/static/tile/tileset_all/su_tileset/tileset.json`,
        cameraOption: {
            longitude: 126.9780,
            latitude: 37.5665,
            altitude: 1500,
            heading: 0,
            pitch: -40,
            roll: 0
        }
    },
    {
        id: 1,
        type: "3DTileset",
        nameKor: "제주시 3D 빌딩",
        nameEng: "jeju 3d buildings",
        cityKor: "제주시",
        cityEng: "jj",
        tileset: "jj_tileset",
        url: `${ASSET_SERVER}/static/tile/tileset_all/jj_tileset/tileset.json`,
        cameraOption: {
            longitude: 126.5219,
            latitude: 33.4796,
            altitude: 1500,
            heading: 0,
            pitch: -40,
            roll: 0
        }
    },
    {
        id: 2,
        type: "3DTileset",
        nameKor: "세종시 3D 빌딩",
        nameEng: "sejong 3d buildings",
        cityKor: "세종시",
        cityEng: "sj",
        tileset: "sj_tileset",
        url: `${ASSET_SERVER}/static/tile/tileset_all/sj_tileset/tileset.json`,
        cameraOption: {
            longitude: 127.2517,
            latitude: 36.5001,
            altitude: 1500,
            heading: 0,
            pitch: -40,
            roll: 0
        }
    },
    {
        id: 3,
        type: "3DTileset",
        nameKor: "부산시 3D 빌딩",
        nameEng: "busan 3d buildings",
        tileset: "bs_tileset",
        cityKor: "부산시",
        cityEng: "bs",
        url: `${ASSET_SERVER}/static/tile/tileset_all/bs_tileset/tileset.json`,
        cameraOption: {
            longitude: 129.0756,
            latitude: 35.1796,
            altitude: 1500,
            heading: 0,
            pitch: -40,
            roll: 0
        }
    },
    {
        id: 4,
        type: "3DTileset",
        nameKor: "인천시 3D 빌딩",
        nameEng: "incheon 3d buildings",
        cityKor: "인천시",
        cityEng: "ic",
        tileset: "ic_tileset",
        url: `${ASSET_SERVER}/static/tile/tileset_all/ic_tileset/tileset.json`,
        cameraOption: {
            longitude: 126.7052,
            latitude: 37.4563,
            altitude: 1500,
            heading: 0,
            pitch: -40,
            roll: 0
        }
    },
    {
        id: 5,
        type: "3DTileset",
        nameKor: "대전시 3D 빌딩",
        nameEng: "daejeon 3d buildings",
        cityKor: "대전시",
        cityEng: "dj",
        tileset: "dj_tileset",
        url: `${ASSET_SERVER}/static/tile/tileset_all/dj_tileset/tileset.json`,
        cameraOption: {
            longitude: 127.3845,
            latitude: 36.3504,
            altitude: 1500,
            heading: 0,
            pitch: -40,
            roll: 0
        }
    },
    {
        id: 6,
        type: "3DTileset",
        nameKor: "대구시 3D 빌딩",
        nameEng: "daegu 3d buildings",
        cityKor: "대구시",
        cityEng: "dg",
        tileset: "dg_tileset",
        url: `${ASSET_SERVER}/static/tile/tileset_all/dg_tileset/tileset.json`,
        cameraOption: {
            longitude: 128.6014,
            latitude: 35.8714,
            altitude: 1500,
            heading: 0,
            pitch: -40,
            roll: 0
        }
    },
    {
        id: 7,
        type: "3DTileset",
        nameKor: "울산시 3D 빌딩",
        nameEng: "ulsan 3d buildings",
        cityKor: "울산시",
        cityEng: "us",
        tileset: "us_tileset",
        url: `${ASSET_SERVER}/static/tile/tileset_all/us_tileset/tileset.json`,
        cameraOption: {
            longitude: 129.3114,
            latitude: 35.5384,
            altitude: 1500,
            heading: 0,
            pitch: -40,
            roll: 0
        }
    },
    {
        id: 8,
        type: "3DTileset",
        nameKor: "광주시 3D 빌딩",
        nameEng: "gwangju 3d buildings",
        cityKor: "광주시",
        cityEng: "gj",
        tileset: "gj_tileset",
        url: `${ASSET_SERVER}/static/tile/tileset_all/gj_tileset/tileset.json`,
        cameraOption: {
            longitude: 126.8514,
            latitude: 35.1606,
            altitude: 1500,
            heading: 0,
            pitch: -40,
            roll: 0
        }
    },
    {
        id: 9,
        type: "3DTileset",
        nameKor: "강원도 3D 빌딩",
        nameEng: "gangwon 3d buildings",
        cityKor: "강원도",
        cityEng: "gw",
        tileset: "gw_tileset",
        url: `${ASSET_SERVER}/static/tile/tileset_all/gw_tileset/tileset.json`,
        cameraOption: {
            longitude: 128.2052,
            latitude: 37.5556,
            altitude: 1500,
            heading: 0,
            pitch: -40,
            roll: 0
        }
    },
    {
        id: 10,
        type: "3DTileset",
        nameKor: "충청북도 3D 빌딩",
        nameEng: "chungbuk 3d buildings",
        cityKor: "충청북도",
        cityEng: "cb",
        tileset: "cb_tileset",
        url: `${ASSET_SERVER}/static/tile/tileset_all/cb_tileset/tileset.json`,
        cameraOption: {
            longitude: 127.8174,
            latitude: 36.8006,
            altitude: 1500,
            heading: 0,
            pitch: -40,
            roll: 0
        }
    },
    {
        id: 11,
        type: "3DTileset",
        nameKor: "충청남도 3D 빌딩",
        nameEng: "chungnam 3d buildings",
        cityKor: "충청남도",
        cityEng: "cn",
        tileset: "cn_tileset",
        url: `${ASSET_SERVER}/static/tile/tileset_all/cn_tileset/tileset.json`,
        cameraOption: {
            longitude: 126.7174,
            latitude: 36.3006,
            altitude: 1500,
            heading: 0,
            pitch: -40,
            roll: 0
        }
    },
    {
        id: 12,
        type: "3DTileset",
        nameKor: "전라북도 3D 빌딩",
        nameEng: "jeonbuk 3d buildings",
        cityKor: "전라북도",
        cityEng: "jb",
        tileset: "jb_tileset",
        url: `${ASSET_SERVER}/static/tile/tileset_all/jb_tileset/tileset.json`,
        cameraOption: {
            longitude: 126.7174,
            latitude: 35.5006,
            altitude: 1500,
            heading: 0,
            pitch: -40,
            roll: 0
        }
    },
    {
        id: 13,
        type: "3DTileset",
        nameKor: "전라남도 3D 빌딩",
        nameEng: "jeonnam 3d buildings",
        cityKor: "전라남도",
        cityEng: "jn",
        tileset: "jn_tileset",
        url: `${ASSET_SERVER}/static/tile/tileset_all/jn_tileset/tileset.json`,
        cameraOption: {
            longitude: 126.7174,
            latitude: 35.3006,
            altitude: 1500,
            heading: 0,
            pitch: -40,
            roll: 0
        }
    },
    {
        id: 14,
        type: "3DTileset",
        nameKor: "경상북도 3D 빌딩",
        nameEng: "gyeongbuk 3d buildings",
        cityKor: "경상북도",
        cityEng: "gb",
        tileset: "gb_tileset",
        url: `${ASSET_SERVER}/static/tile/tileset_all/gb_tileset/tileset.json`,
        cameraOption: {
            longitude: 128.7174,
            latitude: 36.8006,
            altitude: 1500,
            heading: 0,
            pitch: -40,
            roll: 0
        }
    },
]


export default buildings;
