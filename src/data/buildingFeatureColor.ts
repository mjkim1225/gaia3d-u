// const buildingMap = {
//     DEFAULT: [{ color: '#FFFFFF', code: 'default', title: '기본' }],
//     BLDH_HGT:
//         {
//             name: '건물높이',
//             legend: [
//                 { color: '#FFFFFF', min: 0, max: 12, title: '0' },
//                 { color: '#D3D3D3', min: 12, max: 31, title: '12' },
//                 { color: '#C0C0C0', min: 31, max: 60, title: '31' },
//                 { color: '#808080', min: 60, max: 120, title: '60' },
//                 { color: '#A9A9A9', min: 120, max: 180, title: '120' },
//                 { color: '#000000', min: 180, max: 999999, title: '180' },
//             ]
//         },
//     BPRP_SE:
//         {
//             name: '건물용도 구분',
//             legend: [
//                 { color: '#FFFAFA', code: 'BDU001', title: '주거용단독주택' },
//                 { color: '#4682B4', code: 'BDU002', title: '주거용공동주택' },
//                 { color: '#D2B48C', code: 'BDU003', title: '제1종근린생활시설' },
//                 { color: '#008080', code: 'BDU004', title: '제2종근린생활시설' },
//                 { color: '#D8BFD8', code: 'BDU005', title: '문화및집회시설' },
//                 { color: '#FF6347', code: 'BDU006', title: '종교시설' },
//                 { color: '#40E0D0', code: 'BDU007', title: '판매시설' },
//                 { color: '#EE82EE', code: 'BDU008', title: '운수시설' },
//                 { color: '#F5DEB3', code: 'BDU009', title: '의료시설' },
//                 { color: '#9ACD32', code: 'BDU010', title: '교육연구시설' },
//                 { color: '#F5F5F5', code: 'BDU011', title: '노유자(노인및어린이)시설' },
//                 { color: '#6A5ACD', code: 'BDU012', title: '수련시설' },
//                 { color: '#87CEEB', code: 'BDU013', title: '운동시설' },
//                 { color: '#C0C0C0', code: 'BDU014', title: '업무시설' },
//                 { color: '#A0522D', code: 'BDU015', title: '숙박시설' },
//                 { color: '#FFF5EE', code: 'BDU016', title: '위락시설' },
//                 { color: '#2E8B57', code: 'BDU017', title: '공장' },
//                 { color: '#F4A460', code: 'BDU018', title: '창고시설' },
//                 { color: '#FA8072', code: 'BDU019', title: '위험물저장및처리시설' },
//                 { color: '#4169E1', code: 'BDU020', title: '자동차관련시설' },
//                 { color: '#BC8F8F', code: 'BDU021', title: '동물및식물관련시설' },
//                 { color: '#FF0000', code: 'BDU022', title: '분뇨및쓰레기처리시설' },
//                 { color: '#800080', code: 'BDU023', title: '교정및군사시설' },
//                 { color: '#B0E0E6', code: 'BDU024', title: '방송통신시설' },
//                 { color: '#DDA0DD', code: 'BDU025', title: '발전시설' },
//                 { color: '#FFC0CB', code: 'BDU026', title: '묘지관련시설' },
//                 { color: '#CD853F', code: 'BDU027', title: '관광휴게시설' },
//                 { color: '#FFDAB9', code: 'BDU028', title: '장례시설' },
//                 { color: '#DB7093', code: 'BDU029', title: '야영장시설' },
//                 { color: '#DAA520', code: 'BDU999', title: '기타시설' }
//             ]
//         },
//     BULD_SE: {
//         name: '건물 구분',
//         legend: [
//             { color: '#FFFAFA', code: 'BDC001', title: '일반주택' },
//             { color: '#EEE8AA', code: 'BDC002', title: '연립주택' },
//             { color: '#FFDAB9', code: 'BDC003', title: '일반주택' },
//             { color: '#FA8072', code: 'BDC004', title: '주택외건물' },
//             { color: '#D8BFD8', code: 'BDC005', title: '무벽건물' },
//             { color: '#87CEEB', code: 'BDC006', title: '온실' },
//             { color: '#CD853F', code: 'BDC007', title: '공사중건물' },
//             { color: '#F4A460', code: 'BDC008', title: '가건물' }
//         ]
//     },
//     USECON_DE: {
//         name: '사용승인 일',
//         legend: [
//             { color: '#FFFFFF', min: 0, max: 10000000, title: '기록없음' },
//             { color: '#F99C88', min: 10000000, max: 19600000, title: '1960년 이전' },
//             { color: '#F9C488', min: 19600000, max: 19700000, title: '1960년대' },
//             { color: '#F9D588', min: 19700000, max: 19800000, title: '1970년대' },
//             { color: '#F9EB88', min: 19800000, max: 19900000, title: '1980년대' },
//             { color: '#BDF988', min: 19900000, max: 20000000, title: '1990년대' },
//             { color: '#8BF988', min: 20000000, max: 20100000, title: '2000년대' },
//             { color: '#88F9F7', min: 20100000, max: 20200000, title: '2010년대' },
//             { color: '#88D2F9', min: 20200000, max: 99990000, title: '2020년 이후' }
//         ]
//     }
// };
//
//
// export default {
//     get3DTileStyle(type){
//         if(type === 'DEFAULT'){
//             return new Cesium.Cesium3DTileStyle({
//                 color: {
//                     conditions: [["true", "color('"+ buildingMap.DEFAULT[0].color +"')"]]
//                 },
//             });
//         }else if(type === 'USECON_DE'){
//             let conditions = [];
//             buildingMap[type].forEach(e => {
//                 conditions.push([""+ e.min +" <= ${DATE} && ${DATE} < " + e.max + "", "color('" + e.color + "')"])
//             })
//
//             return new Cesium.Cesium3DTileStyle({
//                 defines : {
//                     DATE : "Number(${USECON_DE}) < 10000 ? Number(${USECON_DE} + '0000') : Number(${USECON_DE})"
//                 },
//                 color: {
//                     conditions: conditions
//                 },
//             });
//         }else{
//             let conditions = [];
//             buildingMap[type].forEach(e => {
//                 conditions.push(["${"+ type +"} === '" + e.code + "'", "color('" + e.color + "')"])
//             })
//             return new Cesium.Cesium3DTileStyle({
//                 color: {
//                     conditions: conditions
//                 },
//             });
//         }
//
//     },
//
//     getColor(type, code){
//         let color = '';
//         if(type == 'DEFAULT'){
//             color = buildingMap.DEFAULT[0].color;
//         }else if(type == 'USECON_DE'){
//             if(code == '0')
//                 return 'WHITE';
//             buildingMap[type].forEach(e => {
//                 if(e.min < String(code).padEnd(8, "0") && String(code).padEnd(8, "0") < e.max){
//                     color = e.color;
//                 }
//             });
//         }else{
//             buildingMap[type].forEach(e => {
//                 if(e.code == code){
//                     color = e.color;
//                 }
//             });
//         }
//         return color;
//     },
//
//     getTitle(type, code){
//         let title = '';
//         if(type == 'DEFAULT')
//             return '기본'
//         buildingMap[type].forEach(e => {
//             if(e.code == code){
//                 title = e.title;
//             }
//         });
//         return title;
//     },
//
//     getBuildingMap(type) {
//         return buildingMap[type];
//     }
// };
//
//
// /**
//  * export default {
//  *     DEFAULT: [{ color: '#FFFFFF', code: 'default', title: '기본' }],
//  *     BPRP_SE: [
//  *         { color: '#FFFAFA', code: 'BDU001', title: '주거용단독주택' },
//  *         { color: '#4682B4', code: 'BDU002', title: '주거용공동주택' },
//  *         { color: '#D2B48C', code: 'BDU003', title: '제1종근린생활시설' },
//  *         { color: '#008080', code: 'BDU004', title: '제2종근린생활시설' },
//  *         { color: '#D8BFD8', code: 'BDU005', title: '문화및집회시설' },
//  *         { color: '#FF6347', code: 'BDU006', title: '종교시설' },
//  *         { color: '#40E0D0', code: 'BDU007', title: '판매시설' },
//  *         { color: '#EE82EE', code: 'BDU008', title: '운수시설' },
//  *         { color: '#F5DEB3', code: 'BDU009', title: '의료시설' },
//  *         { color: '#9ACD32', code: 'BDU010', title: '교육연구시설' },
//  *         { color: '#F5F5F5', code: 'BDU011', title: '노유자(노인및어린이)시설' },
//  *         { color: '#6A5ACD', code: 'BDU012', title: '수련시설' },
//  *         { color: '#87CEEB', code: 'BDU013', title: '운동시설' },
//  *         { color: '#C0C0C0', code: 'BDU014', title: '업무시설' },
//  *         { color: '#A0522D', code: 'BDU015', title: '숙박시설' },
//  *         { color: '#FFF5EE', code: 'BDU016', title: '위락시설' },
//  *         { color: '#2E8B57', code: 'BDU017', title: '공장' },
//  *         { color: '#F4A460', code: 'BDU018', title: '창고시설' },
//  *         { color: '#FA8072', code: 'BDU019', title: '위험물저장및처리시설' },
//  *         { color: '#4169E1', code: 'BDU020', title: '자동차관련시설' },
//  *         { color: '#BC8F8F', code: 'BDU021', title: '동물및식물관련시설' },
//  *         { color: '#FF0000', code: 'BDU022', title: '분뇨및쓰레기처리시설' },
//  *         { color: '#800080', code: 'BDU023', title: '교정및군사시설' },
//  *         { color: '#B0E0E6', code: 'BDU024', title: '방송통신시설' },
//  *         { color: '#DDA0DD', code: 'BDU025', title: '발전시설' },
//  *         { color: '#FFC0CB', code: 'BDU026', title: '묘지관련시설' },
//  *         { color: '#CD853F', code: 'BDU027', title: '관광휴게시설' },
//  *         { color: '#FFDAB9', code: 'BDU028', title: '장례시설' },
//  *         { color: '#DB7093', code: 'BDU029', title: '야영장시설' },
//  *         { color: '#DAA520', code: 'BDU030', title: 'lightgrey' },
//  *         { color: '#D3D3D3', code: 'BDU999', title: '기타시설' }
//  *     ],
//  *     BULD_SE: [
//  *         { color: '#FFFAFA', code: 'BDC001', title: '일반주택' },
//  *         { color: '#EEE8AA', code: 'BDC002', title: '연립주택' },
//  *         { color: '#FFDAB9', code: 'BDC003', title: '일반주택' },
//  *         { color: '#FA8072', code: 'BDC004', title: '주택외건물' },
//  *         { color: '#D8BFD8', code: 'BDC005', title: '무벽건물' },
//  *         { color: '#87CEEB', code: 'BDC006', title: '온실' },
//  *         { color: '#CD853F', code: 'BDC007', title: '공사중건물' },
//  *         { color: '#F4A460', code: 'BDC008', title: '가건물' }
//  *     ],
//  *     USECON_DE: [
//  *         { color: '#FFFFFF', min: 0, max: 10000000, title: '기록없음' },
//  *         { color: '#F99C88', min: 10000000, max: 19600000, title: '1960년 이전' },
//  *         { color: '#F9C488', min: 19600000, max: 19700000, title: '1960년대' },
//  *         { color: '#F9D588', min: 19700000, max: 19800000, title: '1970년대' },
//  *         { color: '#F9EB88', min: 19800000, max: 19900000, title: '1980년대' },
//  *         { color: '#BDF988', min: 19900000, max: 20000000, title: '1990년대' },
//  *         { color: '#8BF988', min: 20000000, max: 20100000, title: '2000년대' },
//  *         { color: '#88F9F7', min: 20100000, max: 20200000, title: '2010년대' },
//  *         { color: '#88D2F9', min: 20200000, max: 99990000, title: '2020년 이후' }
//  *     ]
//  * }
//  */
