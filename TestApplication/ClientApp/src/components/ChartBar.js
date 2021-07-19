import React, { useState, useEffect } from 'react';

import {
    Chart,
    ChartTitle,
    ChartSeries,
    ChartSeriesItem,
    ChartCategoryAxis,
    ChartCategoryAxisTitle,
    ChartCategoryAxisItem,
} from "@progress/kendo-react-charts";

import 'hammerjs';

import '@progress/kendo-theme-default/dist/all.css';

const ChartBar = ({peopleLifeTime}) => {
    
    const [days, setDays] = useState([]);
    const [counts, setCounts] = useState([])
        
    useEffect(() => {
        const newPeopleLifeTime = [...peopleLifeTime];
        
        if(newPeopleLifeTime[newPeopleLifeTime.length - 1]) {
            for(let i = 0; i < peopleLifeTime[peopleLifeTime.length - 1].day; i++) {
                if(peopleLifeTime.findIndex(it => it.day == i) == -1) {
                    newPeopleLifeTime.push({day: i, count: 0})
                }
            }
        }

        newPeopleLifeTime.sort((a, b) => a.day-b.day);
        
        const days = newPeopleLifeTime.map(it => `${it.day}d`);
        const counts = newPeopleLifeTime.map(it => it.count);

        setDays(days);
        setCounts(counts);
    }, [peopleLifeTime])
    
    return (
        <Chart>
            <ChartTitle text="People Life time" />
            <ChartCategoryAxis>
                <ChartCategoryAxisItem categories={days}>
                    <ChartCategoryAxisTitle text="Days" />
                </ChartCategoryAxisItem>
            </ChartCategoryAxis>
            <ChartSeries>
                <ChartSeriesItem color="#4A9DFF" gap={1} spacing={0.1} data={counts} />
            </ChartSeries>
        </Chart>

    )
};

export default ChartBar;