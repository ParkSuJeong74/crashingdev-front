import React, {useEffect, useState} from "react"
import { ComposedChart, XAxis,  YAxis, Tooltip, Legend, CartesianGrid, Area, Bar, Line} from 'recharts';
import * as Api from '../../../api'
import errorHandler from "../../../errorHandler";

function ChartComposed({active}){

  const [data, setData] = useState(null)
  useEffect(()=>{
    try{
      Api.get("graph/composed").then(res =>{
        setData(res.data)
      })
    } catch(err){
      errorHandler("composed chart 오류", err.response.data)
      console.log(err);
    }
  },[])
  
  
    return (
      <ComposedChart width={730} height={250} data={data}>
        <XAxis dataKey="year" />
        <YAxis type="number" domain={[3, 7]}/>
        <Tooltip />
        <Legend />
        <CartesianGrid stroke="#f5f5f5" />
        <Area isAnimationActive={active} type="monotone" dataKey="health" fill="#8884d8" stroke="#8884d8" />
        <Bar isAnimationActive={active} dataKey="happinessScore" barSize={20} fill="#413ea0" />
        <Line isAnimationActive={active} type="monotone" dataKey="socialSupport" stroke="#ff66ff" />
        <Line isAnimationActive={active} type="monotone" dataKey="gdp" stroke="#9900cc" />
      </ComposedChart>
    )
}

export default ChartComposed
