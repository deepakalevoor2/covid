import React, { useState, useEffect } from "react";
// import {
//   getPatientCountBySeverity,
//   getPatientCountByVentilator,
// } from "../../apis";
import { API } from "../../backend";
import { HomePageContainer } from "./homepage.styles";

const HomePage = () => {
  const totalBeds = 150;
  const totalVentilators = 50;
  const [result, setResult] = useState([]);
  const [count, setCount] = useState(0);
  const [ventilatorCount, setVentilatorCount] = useState(0);
  //   const [severityResult, setSeverityResult] = useState({
  //     currentStatus: "",
  //     patientCount: "",
  //   });
  //const { currentStatus, patientCount } = severityResult;

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    fetch(`${API}/ptcountseverity`, { signal: signal, method: "GET" })
      .then((results) => results.json())
      .then((data) => {
        //console.log(data);
        setResult(data);
      });

    fetch(`${API}/ptcount`, { signal: signal, method: "GET" })
      .then((results) => results.json())
      .then((data) => {
        //console.log(data);
        setCount(data[0].ptCount);
      });

    fetch(`${API}/ptcountventilator`, { signal: signal, method: "GET" })
      .then((results) => results.json())
      .then((data) => {
        //console.log(data);
        setVentilatorCount(data[0].ptCount);
      });

    return function cleanup() {
      abortController.abort();
    };
  }, []);
  //setResult(...result,{item.id:"Free",ptCount:})
  //console.log(result);
  //result.map((item) => console.log(item));
  //console.log(count);
  return (
    <HomePageContainer>
      <h1>Beds</h1>
      {result.map((item) => (
        <div key={item._id}>
          <h4>{item._id}</h4>
          <h6>{item.ptCount}</h6>
        </div>
      ))}
      <div>
        <h4>Free</h4>
        <h6>{totalBeds - count}</h6>
      </div>
      <h1>Ventilators</h1>
      <div>
        <h4>Used</h4>
        <h6>{ventilatorCount}</h6>
      </div>
      <div>
        <h4>Free</h4>
        <h6>{totalVentilators - ventilatorCount}</h6>
      </div>
    </HomePageContainer>
  );
};

export default HomePage;
