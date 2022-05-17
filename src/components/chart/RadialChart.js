import { RadialBarChart, Tooltip, Legend, RadialBar} from 'recharts';

function RadialChart({data}){
    
    return (
        <RadialBarChart 
            width={900} 
            height={450} 
            innerRadius="10%" 
            outerRadius="80%" 
            data={data} 
            startAngle={180} 
            endAngle={0}
            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        >
        <RadialBar width={700} minAngle={15} label={{ fill: '#666', position: 'insideStart' }} background clockWise={true} dataKey='uv' />
        <Legend value={data?.name} iconSize={40} width={240} height={140} layout='vertical' verticalAlign='start' align="right" wrapperStyle={{fontSize: "20px"}} />
        <Tooltip />
        </RadialBarChart>
    )
} 
export default RadialChart
