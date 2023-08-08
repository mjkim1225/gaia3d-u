
const trainColor = {
    "line1": "#0052A4",
    "line2": "#00A84D",
    "line3": "#EF7C1C",
    "line4": "#00A5DE",
    "line5": "#996CAC",
    "line6": "#CD7C2F",
    "line7": "#747F00",
    "line8": "#E6186C"
}

const railways = [
    {
        id: 0,
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
                color: trainColor["line1"],
                url: '/railway_1.geojson',
            },
            {
                id: 1,
                nameEng: "line2",
                nameKor: "서울 2호선",
                color: trainColor["line2"],
                url: '/railway_2.geojson',
            },
            {
                id: 2,
                nameEng: "line3",
                nameKor: "서울 3호선",
                color: trainColor["line3"],
                url: '/railway_3.geojson',
            },
            {
                id: 3,
                nameEng: "line4",
                nameKor: "서울 4호선",
                color: trainColor["line4"],
                url: '/railway_4.geojson',
            },
            {
                id: 4,
                nameEng: "line5",
                nameKor: "서울 5호선",
                color: trainColor["line5"],
                url: '/railway_5.geojson',
            },
            {
                id: 5,
                nameEng: "line6",
                nameKor: "서울 6호선",
                color: trainColor["line6"],
                url: '/railway_6.geojson',
            },
            {
                id: 6,
                nameEng: "line7",
                nameKor: "서울 7호선",
                color: trainColor["line7"],
                url: '/railway_7.geojson',
            },
            {
                id: 7,
                nameEng: "line8",
                nameKor: "서울 8호선",
                color: trainColor["line8"],
                url: '/railway_8.geojson',
            }
        ],
    }

]

export default railways;
