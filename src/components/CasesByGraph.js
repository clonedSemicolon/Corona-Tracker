import React ,{useState,useEffect} from 'react'
import '../componentsstyle/CasesByGraph.css'
import {Line} from "react-chartjs-2"
import numeral from "numeral";
import { Container, Row, Col } from 'react-bootstrap';

const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};

const buildChartData=(data,casesType="cases")=>{
  const chartData=[]
  let lastDataPoint

 for(let date in data.cases){
      if(lastDataPoint){
          const newDataPoint={
              x:date,
              y:data[casesType][date]-lastDataPoint
          }

          chartData.push(newDataPoint)
      }

     casesType==='active'? lastDataPoint=data[casesType] : lastDataPoint=data[casesType][date]
     console.log(data)
  }

  return chartData;
}

function CasesByGraph({casesType="cases"}) {

    const url="https://disease.sh/v3/covid-19/historical/all?lastdays=120"
    const [data, setData] = useState({})
    const {active,setactive}=useState({})
    useEffect(() => {

        const fetchData=async()=>{
            await fetch(url)
            .then(res=>res.json())
            .then(data=>{
                const chartData=buildChartData(data,casesType)
                setData(chartData)
             });     
        };

        fetchData()
           
    }, [casesType])

    
    

    return (
        
    <div className="chartByGraph">
    
      {data?.length > 0 && (
          
        <Line
          data={{
            datasets: [
              {
                fill:'origin',
                backgroundColor: "rgba(204, 16, 52, 0.5)",
                borderColor: "#CC1034",
                data: data,
                label:`${casesType}`
                
              },
            ],
          }}
          options={options}
        />
      )}
    </div>
    

    )
}

export default CasesByGraph
