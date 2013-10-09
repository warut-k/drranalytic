defaulServiceDataSources = [
                  {
                      id: 01, sid: "01ROOT", text: "ขอบเขตการปกครอง", expanded: false, spriteCssClass: "folder", items: [
                          { id: 0101, sid: "0101", text: "จังหวัด", layerType: "F", SURL: "http://192.168.3.177:6080/arcgis/rest/services/DRR_5/ThaiLandDefault/MapServer/0", queryFields: ["PROV_NAM_T"], outFields: ["OBJECTID", "PROV_CODE", "PROV_NAM_T", "PROV_NAM_E", "Shape_Length", "Shape_Area"] },
                          { id: 0102, sid: "0102", text: "อำเภอ", layerType: "F", SURL: "", queryFields: [] },
                          { id: 0103, sid: "0103", text: "ตำบล", layerType: "F", SURL: "", queryFields: [] },
                          { id: 0104, sid: "0104", text: "หมุ่บ้าน", layerType: "F", SURL: "", queryFields: [] }
                      ]
                  },
                  {
                      id: 02, sid: "02ROOT", text: "เส้นทางคมนาคม", expanded: false, spriteCssClass: "folder", items: [
                          { id: 0201, sid: "0201", text: "ถนน", layerType: "F", SURL: "http://192.168.3.177:6080/arcgis/rest/services/DRR_5/Route56IntersectFlood55/MapServer/2", queryFields: ["R_NAME_T"], outFields: ["OBJECTID,ROUTE_NO ,R_NAME_T,R_WIDTH,ROADTYPE ,ROADNAME ,DIRECTION "] },
                          { id: 0201, sid: "02011", text: "น้ำท่วม(สมมติ)", layerType: "F", SURL: "http://192.168.3.177:6080/arcgis/rest/services/DRR_5/Route56IntersectFlood55/MapServer/1", queryFields: [] },
                          { id: 0202, sid: "0202", text: "ทางรถไฟ", layerType: "F", SURL: "http://192.168.3.177:6080/arcgis/rest/services/DRR_5/Route56IntersectFlood55/MapServer/1", queryFields: [] },
                          { id: 0203, sid: "0203", text: "ทางรถไฟฟ้า", layerType: "F", SURL: "http://192.168.3.177:6080/arcgis/rest/services/DRR_5/Route56IntersectFlood55/MapServer/1", queryFields: [] },
                          { id: 0204, sid: "0204", text: "สะพาน", layerType: "DM", SURL: "", queryFields: [] },
                      ]
                  },
                  {
                      id: 03, sid: "03ROOT", text: "สถานที่สำคัญ", expanded: false, spriteCssClass: "folder", items: [
                          { id: 0301, sid: "0301", text: "ศูนย์ ทช.", layerType: "DM", SURL: "", queryFields: [] },
                          { id: 0302, sid: "0302", text: "ทชจ.", layerType: "DM", SURL: "", queryFields: [] },
                          { id: 0303, sid: "0303", text: "สทช.", layerType: "DM", SURL: "", queryFields: [] },
                          { id: 0304, sid: "0304", text: "สถานพยาบาล.", layerType: "DM", SURL: "", queryFields: [] },
                          { id: 0305, sid: "0305", text: "แหล่งท่องเที่ยว.", layerType: "DM", SURL: "", queryFields: [] },
                          { id: 0306, sid: "0306", text: "สถานีขนส่ง.", layerType: "DM", SURL: "", queryFields: [] },
                          { id: 0307, sid: "0307", text: "สถานีรถไฟ.", layerType: "DM", SURL: "", queryFields: [] },
                          { id: 0308, sid: "0308", text: "ทางแยก.", layerType: "DM", SURL: "", queryFields: [] },
                      ]
                  },
                  {
                      id: 04, sid: "04ROOT", text: "เขตป่าไม้", expanded: false, spriteCssClass: "folder", items: [
                          { id: 0401, sid: "0401", text: "ป่าสงวน", layerType: "DM", SURL: "", queryFields: [] },
                          { id: 0402, sid: "0402", text: "อุทยาน.", layerType: "DM", SURL: "", queryFields: [] },
                          { id: 0403, sid: "0403", text: "วนอุทยาน", layerType: "DM", SURL: "", queryFields: [] },
                          { id: 0404, sid: "0404", text: "เขตรักษาพันธู์สัตว์ป่า", layerType: "DM", SURL: "", queryFields: [] },
                          { id: 0405, sid: "0405", text: "เขตห้ามล่า.", layerType: "DM", SURL: "", queryFields: [] },
                          { id: 0406, sid: "0406", text: "ป่าชายเลน.", layerType: "DM", SURL: "", queryFields: [] },
                      ]
                  },
                  {
                      id: 05, sid: "05ROOT", text: "ทรัพยากรธรณี/ธรณีพิบัติ", expanded: false, spriteCssClass: "folder", items: [
                          { id: 0501, sid: "0501", text: "ข้อมูลธรณีวิทยา", layerType: "DM", SURL: "", queryFields: [] },
                          { id: 0502, sid: "0502", text: "ข้อมูลการเปลี่ยนแปลงชายฝั่ง", layerType: "DM", SURL: "", queryFields: [] },
                          { id: 0503, sid: "0503", text: "เขตเสี่ยงภัยแผ่นดิไหว.", layerType: "DM", SURL: "", queryFields: [] },
                          { id: 0504, sid: "0504", text: "เขตรอยเลื่อนมีพลัง", layerType: "DM", SURL: "", queryFields: [] },
                          { id: 0505, sid: "0505", text: "หมู่บ้านเสี่ยงภัยแผ่นดินถล่ม.", layerType: "DM", SURL: "", queryFields: [] },
                          { id: 0506, sid: "0506", text: "หมู่บ้านเสี่ยงภัยหลุมยุบ.", layerType: "DM", SURL: "", queryFields: [] },
                      ]
                  },
                  {
                      id: 06, sid: "06ROOT", text: "การใช้ประโยชน์ที่ดิน", expanded: false, spriteCssClass: "folder", items: [
                          { id: 0601, sid: "0601", text: "การใช้ประโยชน์ที่ดิน", layerType: "DM", SURL: "", queryFields: [] },
                      ]
                  },
                  {
                      id: 07, sid: "07ROOT", text: "ข้อมูลจากโครงการ GPS", expanded: false, spriteCssClass: "folder", items: [
                          { id: 0701, sid: "0701", text: "หมุดหลักฐาน", layerType: "DM", SURL: "", queryFields: [] },
                      ]
                  },
                  {
                      id: 08, sid: "08ROOT", text: "น้ำท่วมของ GISTDA", expanded: false, spriteCssClass: "folder", items: [
                          { id: 0801, sid: "0801", text: "น้ำท่วนในรอบ 7 วัน", layerType: "WMS", SURL: "", queryFields: [], outFields: [] },
                          { id: 0801, sid: "0802", text: "ระดับความรุนแรงของน้ำท่วมในรอบ 7 วัน", layerType: "WMS", SURL: "", queryFields: [], outFields: [] },
                          { id: 0801, sid: "0803", text: "ความถี่น้ำท่วมขังในรอบ 8 ปี", layerType: "WMS", SURL: "", queryFields: [], outFields: [] }
                      ]
                  }
];


geometerService = [{ url: "http://192.168.3.177:6080/arcgis/rest/services/Utilities/Geometry/GeometryServer" }];