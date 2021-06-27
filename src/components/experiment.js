import React from "react";
import DataTable from 'react-data-table-component';
import * as XLSX from 'xlsx';
import * as d3 from 'd3';
import CSVReader from 'react-csv-reader';
import Chart from 'chart.js/auto';
import * as dfd from "danfojs/src/index";


function Experiment(){
  const [columns, setColumns] = React.useState([]);
  const [domdata, setData] = React.useState([]);
  React.useEffect(()=>{
    console.log(domdata);
  });

  function max(){
    dfd.read_csv("https://raw.githubusercontent.com/aryxns/1clickML/main/sales.csv")
    .then(df => {
    df.plot("chart").bar()
    //do something with the CSV file
    df.head().print()

    }).catch(err=>{
      console.log(err);
    })
  }

  function drawChart() {
    console.log("chart called")
    const data = [12, 5, 6, 6, 9, 10];
    
    const svg = d3.select("#chart").append("svg").attr("width", 700).attr("height", 300);
      svg.selectAll("rect")
    .data(domdata[1])
    .enter()
    .append("rect")
    .attr("x", (d, i) => i * 70)
    .attr("y", 0)
    .attr("width", 25)
    .attr("height", (d, i) => d * 10)
    .attr("fill", "green");               
  };

  function drawPie() {
    var ctx = document.getElementById("myChart").getContext('2d');
    var myChart = new Chart(ctx, {
      type: 'pie',
      data: domdata
    });
  }

//  const processData = dataString => {
//     const dataStringLines = dataString.split(/\r\n|\n/);
//     const headers = dataStringLines[0].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
 
//     const list = [];
//     for (let i = 1; i < dataStringLines.length; i++) {
//       const row = dataStringLines[i].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
//       if (headers && row.length == headers.length) {
//         const obj = {};
//         for (let j = 0; j < headers.length; j++) {
//           let d = row[j];
//           if (d.length > 0) {
//             if (d[0] == '"')
//               d = d.substring(1, d.length - 1);
//             if (d[d.length - 1] == '"')
//               d = d.substring(d.length - 2, 1);
//           }
//           if (headers[j]) {
//             obj[headers[j]] = d;
//           }
//         }
 
//         // remove the blank rows
//         if (Object.values(obj).filter(x => x).length > 0) {
//           list.push(obj);
//         }
//       }
//     }
 
//     // prepare columns list from headers
//     const columns = headers.map(c => ({
//       name: c,
//       selector: c,
//     }));
 
//     setData(list);
//     setColumns(columns);
//   }
 
//   // handle file upload
//   const handleFileUpload = e => {
//     const file = e.target.files[0];
//     const reader = new FileReader();
//     reader.onload = (evt) => {
//       /* Parse data */
//       const bstr = evt.target.result;
//       const wb = XLSX.read(bstr, { type: 'binary' });
//       /* Get first worksheet */
//       const wsname = wb.SheetNames[0];
//       const ws = wb.Sheets[wsname];
//       /* Convert array of arrays */
//       const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
//       processData(data);
//     };
//     reader.readAsBinaryString(file);
//   };
  // <h3>Read CSV file in React</h3>
    //   <input
    //     type="file"
    //     accept=".csv,.xlsx,.xls"
    //     onChange={handleFileUpload}
    //   />
    //   <DataTable
    //     pagination
    //     highlightOnHover
    //     columns={columns}
    //     data={data}
    //   />
  return(
    <div className="w-screen">
    <div className="m-10 grid justify-items-center">
  <h1 className="text-2xl">1-click ML</h1>   
  <div className="mt-5 rounded-lg"><CSVReader onFileLoaded={(data, fileInfo) => {setData(data)}} /></div>
  <select className="bg-gray-100 rounded-lg mt-5 w-80">
  <option>Bar Chart</option>
  <option>Pie Chart</option>
  </select>
  <button className="mt-5 bg-blue-400 text-white p-2" onClick={max}>Chart</button>
  <div id="chart" className="mt-10 w-3/5 bg-gray-400">
  <canvas className="w-80 h-80" id="myChart"></canvas>
  </div>
  </div>
  </div>)
};

export default Experiment;