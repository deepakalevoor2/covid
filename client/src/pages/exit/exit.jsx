import React, { useState, useEffect } from "react";
import { Checkbox } from "@thumbtack/thumbprint-react";

import CustomButton from "../../components/custom-button/custom-button.component";
import Search from "../search/search";
import SearchPatient from "../../hooks/searchPatient";
import { ExitDiv } from "./exit.styles";
import { dischargePatient, isAuthenticated } from "../../apis";

const Exit = () => {
  const [isChecked, setIsChecked] = React.useState(undefined);
  const [result, setResult] = useState({
    patient_id: "",
    patientId: "",
    patientName: "",
    bedNo: "",
    currentStatus: "",
  });
  const { patientId, patientName, bedNo, currentStatus } = result;
  const [patient, search] = SearchPatient("1055");
  useEffect(
    (result) => {
      if (patient) {
        setResult({
          ...result,
          patient_id: patient._id,
          patientId: patient.patientId,
          patientName: patient.patientName,
          currentStatus: patient.currentStatus,
          bedNo: patient.bedNo,
        });
      }
    },
    [patient]
  );
  const [error, setError] = useState(false);

  const onSubmit = (event) => {
    event.preventDefault();
    //console.log(patient, selected.value, isChecked);
    //const name = { patientName, bedNo };
    //const currentStatus = selected.value;
    const discharged = isChecked === undefined ? "false" : isChecked;
    const updatedPatient = { discharged };
    const { user, token } = isAuthenticated();
    console.log(updatedPatient);
    dischargePatient(user._id, token, patientId, updatedPatient).then(
      (data) => {
        if (data.error) {
          setError(true);
        } else {
          setError("");
        }
      }
    );
  };

  return (
    <ExitDiv>
      <Search onFormSubmit={search} />
      {/*<Checkbox
          type="text"
          label="Discharge formality"
          isSelected=""
          onCheckboxChange=""
          required
        />*/}
      <br></br>
      Patient Name: {patientName}
      <br></br>
      Current Status : {currentStatus}
      <br></br>
      Bed No : {bedNo}
      <br></br>
      <form className="entry-form">
        <Checkbox
          name="Discharge Formality"
          isChecked={isChecked}
          onChange={setIsChecked}
        >
          Discharge Formality
        </Checkbox>
        <CustomButton onClick={onSubmit} type="submit">
          Submit
        </CustomButton>
      </form>
    </ExitDiv>
  );
};

export default Exit;
