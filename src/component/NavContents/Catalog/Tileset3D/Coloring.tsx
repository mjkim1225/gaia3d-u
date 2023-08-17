// Coloring.js
import React, {useEffect, useState} from 'react';
import { RadioGroup, FormControlLabel, Radio } from '@mui/material';
import ConditionTemplate from '../common/ConditionTemplate';

import buildingColor from "../../../../data/buildingFeatureColor";
import Legend from "../common/Legend";

const fieldList = Object.keys(buildingColor);


const Coloring = ({ tileset }) => {
    const [open, setOpen] = useState(true);
    const [selectField, setSelectField] = useState('DEFAULT');
    const [legendList, setLegendList] = useState<{id:number, title:string, color:string}[]>([]);

    const toggleContent = () => {
        setOpen(!open);
    };

    const handleOptionChange = (event) => {
        setSelectField(event.target.value);
    };

    useEffect(() => {
        tileset.setColorByField(selectField);

        const legend = buildingColor[selectField].legend;
        if(legend.length > 1) {
            // 범례 표시하기
            setLegendList(
                legend.map((item, index) => {
                    return {
                        id: index,
                        title: item.title,
                        color: item.color
                    }
                }
            ));
        } else {
            setLegendList([]);
        }

    }, [selectField]);

    return (
        <ConditionTemplate title="색으로 구분 (건축물)" open={open} toggleContent={toggleContent}>
            <RadioGroup value={selectField} onChange={handleOptionChange}>
                {
                    fieldList.map((field, index) => {
                        const data = buildingColor[field];
                        return (
                            <FormControlLabel key={index} value={field} control={<Radio />} label={data.name} />
                        );
                    })
                }
            </RadioGroup>
                {
                    legendList.length > 0 && <Legend dataList={legendList} />
                }
        </ConditionTemplate>
    );
};

export default Coloring;
