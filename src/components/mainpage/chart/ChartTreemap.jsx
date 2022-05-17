import React, { PureComponent, useEffect, useState } from 'react';
import { Treemap, ResponsiveContainer } from 'recharts';
import * as Api from '../../../api'
import errorHandler from '../../../errorHandler';

const COLORS = ['#8889DD', '#9FB4FF', '#8DC77B', '#A5D297', '#E2CF45', '#F8C12D'];

class CustomizedContent extends PureComponent {
  render() {
    const { root, depth, x, y, width, height, index, payload, colors, rank, name } = this.props;

    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          style={{
            fill: depth < 2 ? colors[Math.floor((index / root.children.length) * 6)] : 'none',
            stroke: '#fff',
            strokeWidth: 2 / (depth + 1e-10),
            strokeOpacity: 1 / (depth + 1e-10),
          }}
        />
        {depth === 1 ? (
          <text x={x + width / 2} y={y + height / 2 + 7} textAnchor="middle" fill="#fff" fontSize={30}>
            {name}
          </text>
        ) : null}
        {depth === 1 ? (
          <text x={x + 4} y={y + 18} fill="#fff" fontSize={20} fillOpacity={0.9}>
            {index + 1}
          </text>
        ) : null}
      </g>
    );
  }
}

export default function ChartTreemap({ active }) {
  const [data, setData] = useState(null)
  useEffect(()=>{
    try{
      Api.get("graph/treemap").then(res =>{
        setData(res.data)
      })
    } catch(err){
      errorHandler("tree map 오류", err.response.data)
      console.log(err);
    }
  },[])
      return (
        <>
        {data&&
          <ResponsiveContainer width="100%" height="100%">
          <Treemap
            width={400}
            height={200}
            data={data}
            dataKey="size"
            ratio={4 / 3}
            stroke="#fff"
            fill="#8884d8"
            isAnimationActive={active} 
            content={<CustomizedContent colors={COLORS} />}
          /> 
        </ResponsiveContainer>}
        </>
      );
}

