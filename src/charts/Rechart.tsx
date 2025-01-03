import { useState } from "react";
import { Data } from "../utils/Data";
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";

export const Rechart = () => {

    const [chartData] = useState(Data);
    return(
        <LineChart width={500} height={300} data={chartData}>
        <XAxis dataKey="month"/>
        <YAxis/>
        <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
        <Line type="monotone" dataKey="target" stroke="#8884d8" />
        <Line type="monotone" dataKey="actual" stroke="#82ca9d" />
        <Tooltip/>
      </LineChart>
    )
}