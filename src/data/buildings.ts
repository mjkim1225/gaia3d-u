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
        url: "http://192.168.10.3:8002/static/tile/tileset_all/su_tileset/tileset.json"
    },
    {
        id: 1,
        type: "3DTileset",
        nameKor: "제주시 3D 빌딩",
        nameEng: "jeju 3d buildings",
        cityKor: "제주시",
        cityEng: "jj",
        tileset: "jj_tileset",
        url: "http://192.168.10.3:8002/static/tile/tileset_all/jj_tileset/tileset.json"
    },
    {
        id: 2,
        type: "3DTileset",
        nameKor: "세종시 3D 빌딩",
        nameEng: "sejong 3d buildings",
        cityKor: "세종시",
        cityEng: "sj",
        tileset: "sj_tileset",
        url: "http://192.168.10.3:8002/static/tile/tileset_all/sj_tileset/tileset.json"
    },
    {
        id: 3,
        type: "3DTileset",
        nameKor: "부산시 3D 빌딩",
        nameEng: "busan 3d buildings",
        tileset: "bs_tileset",
        cityKor: "부산시",
        cityEng: "bs",
        url: "http://192.168.10.3:8002/static/tile/tileset_all/bs_tileset/tileset.json"
    },
    {
        id: 4,
        type: "3DTileset",
        nameKor: "인천시 3D 빌딩",
        nameEng: "incheon 3d buildings",
        cityKor: "인천시",
        cityEng: "ic",
        tileset: "ic_tileset",
        url: "http://192.168.10.3:8002/static/tile/tileset_all/ic_tileset/tileset.json"
    },
    {
        id: 5,
        type: "3DTileset",
        nameKor: "광주시 3D 빌딩",
        nameEng: "gwangju 3d buildings",
        cityKor: "광주시",
        cityEng: "gw",
        tileset: "gw_tileset",
        url: "http://192.168.10.3:8002/static/tile/tileset_all/gw_tileset/tileset.json"
    }
]


export default buildings;
