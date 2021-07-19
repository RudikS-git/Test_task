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
        const days = peopleLifeTime.map(it => `${it.day}d`);
        const counts = peopleLifeTime.map(it => it.count);

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
                <ChartSeriesItem type="bar" gap={2} spacing={0.25} data={counts} />
            </ChartSeries>
        </Chart>
    )
};

export default ChartBar;