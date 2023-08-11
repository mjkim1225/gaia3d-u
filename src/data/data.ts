const data = [
    {
        id: 1000,
        type: "3DTileset",
        nameKor: "서울시 3D 빌딩",
        nameEng: "seoul 3d buildings",
        cityKor: "서울시",
        cityEng: "su",
        tileset: "su_tileset",
        // @ts-ignore
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
        id: 1001,
        type: "3DTileset",
        nameKor: "제주시 3D 빌딩",
        nameEng: "jeju 3d buildings",
        cityKor: "제주시",
        cityEng: "jj",
        tileset: "jj_tileset",
        // @ts-ignore
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
        id: 1002,
        type: "3DTileset",
        nameKor: "세종시 3D 빌딩",
        nameEng: "sejong 3d buildings",
        cityKor: "세종시",
        cityEng: "sj",
        tileset: "sj_tileset",
        // @ts-ignore
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
        id: 1003,
        type: "3DTileset",
        nameKor: "부산시 3D 빌딩",
        nameEng: "busan 3d buildings",
        tileset: "bs_tileset",
        cityKor: "부산시",
        cityEng: "bs",
        // @ts-ignore
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
        id: 1004,
        type: "3DTileset",
        nameKor: "인천시 3D 빌딩",
        nameEng: "incheon 3d buildings",
        cityKor: "인천시",
        cityEng: "ic",
        tileset: "ic_tileset",
        // @ts-ignore
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
        id: 1005,
        type: "3DTileset",
        nameKor: "대전시 3D 빌딩",
        nameEng: "daejeon 3d buildings",
        cityKor: "대전시",
        cityEng: "dj",
        tileset: "dj_tileset",
        // @ts-ignore
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
        id: 1006,
        type: "3DTileset",
        nameKor: "대구시 3D 빌딩",
        nameEng: "daegu 3d buildings",
        cityKor: "대구시",
        cityEng: "dg",
        tileset: "dg_tileset",
        // @ts-ignore
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
        id: 1007,
        type: "3DTileset",
        nameKor: "울산시 3D 빌딩",
        nameEng: "ulsan 3d buildings",
        cityKor: "울산시",
        cityEng: "us",
        tileset: "us_tileset",
        // @ts-ignore
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
        id: 1008,
        type: "3DTileset",
        nameKor: "광주시 3D 빌딩",
        nameEng: "gwangju 3d buildings",
        cityKor: "광주시",
        cityEng: "gj",
        tileset: "gj_tileset",
        // @ts-ignore
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
        id: 1009,
        type: "3DTileset",
        nameKor: "강원도 3D 빌딩",
        nameEng: "gangwon 3d buildings",
        cityKor: "강원도",
        cityEng: "gw",
        tileset: "gw_tileset",
        // @ts-ignore
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
        id: 1010,
        type: "3DTileset",
        nameKor: "충청북도 3D 빌딩",
        nameEng: "chungbuk 3d buildings",
        cityKor: "충청북도",
        cityEng: "cb",
        tileset: "cb_tileset",
        // @ts-ignore
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
        id: 1011,
        type: "3DTileset",
        nameKor: "충청남도 3D 빌딩",
        nameEng: "chungnam 3d buildings",
        cityKor: "충청남도",
        cityEng: "cn",
        tileset: "cn_tileset",
        // @ts-ignore
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
        id: 1012,
        type: "3DTileset",
        nameKor: "전라북도 3D 빌딩",
        nameEng: "jeonbuk 3d buildings",
        cityKor: "전라북도",
        cityEng: "jb",
        tileset: "jb_tileset",
        // @ts-ignore
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
        id: 1013,
        type: "3DTileset",
        nameKor: "전라남도 3D 빌딩",
        nameEng: "jeonnam 3d buildings",
        cityKor: "전라남도",
        cityEng: "jn",
        tileset: "jn_tileset",
        // @ts-ignore
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
        id: 1014,
        type: "3DTileset",
        nameKor: "경상북도 3D 빌딩",
        nameEng: "gyeongbuk 3d buildings",
        cityKor: "경상북도",
        cityEng: "gb",
        tileset: "gb_tileset",
        // @ts-ignore
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
    {
        id: 2000,
        type: "line",
        nameKor: "서울 수도권 지하철",
        nameEng: "seoul subway",
        cityKor: "서울시",
        cityEng: "seoul",
        cameraOption: {
            longitude: 126.98465233162544,
            latitude: 37.35324873000187,
            altitude: 15000,
            heading: 0.0,
            pitch: -40.0,
            roll: 0.0
        },
        dataList: [
            {
                id: 0,
                nameEng: "line1",
                nameKor: "서울 1호선",
                color: "#0052A4",
                url: '/railway_1.geojson',
            },
            {
                id: 1,
                nameEng: "line2",
                nameKor: "서울 2호선",
                color: "#00A84D",
                url: '/railway_2.geojson',
            },
            {
                id: 2,
                nameEng: "line3",
                nameKor: "서울 3호선",
                color: "#EF7C1C",
                url: '/railway_3.geojson',
            },
            {
                id: 3,
                nameEng: "line4",
                nameKor: "서울 4호선",
                color: "#00A5DE",
                url: '/railway_4.geojson',
            },
            {
                id: 4,
                nameEng: "line5",
                nameKor: "서울 5호선",
                color: "#996CAC",
                url: '/railway_5.geojson',
            },
            {
                id: 5,
                nameEng: "line6",
                nameKor: "서울 6호선",
                color: "#CD7C2F",
                url: '/railway_6.geojson',
            },
            {
                id: 6,
                nameEng: "line7",
                nameKor: "서울 7호선",
                color: "#747F00",
                url: '/railway_7.geojson',
            },
            {
                id: 7,
                nameEng: "line8",
                nameKor: "서울 8호선",
                color: "#E6186C",
                url: '/railway_8.geojson',
            }
        ],
    }
]

export default data;
