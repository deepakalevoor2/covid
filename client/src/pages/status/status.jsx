import React, { useState, useEffect } from "react";
import { Checkbox } from "@thumbtack/thumbprint-react";

import FormInput from "../../components/form-input/form-input.component";
import Search from "../search/search";
import CustomButton from "../../components/custom-button/custom-button.component";
import Dropdown from "../../components/dropdown/Dropdown";
import SearchPatient from "../../hooks/searchPatient";
//import Checkbox from "../../components/checkbox/checkbox";
import { updatePatient, isAuthenticated } from "../../apis";

import { StatusDiv } from "./status.styles";

const options = [
  {
    label: "Severe",
    value: "Severe",
  },
  {
    label: "Moderate",
    value: "Moderate",
  },
  {
    label: "Mild",
    value: "Mild",
  },
];

const PatientStatus = () => {
  const [selected, setSelected] = useState(options[0]);
  const [isChecked, setIsChecked] = React.useState(undefined);
  const [result, setResult] = useState({
    patient_id: "",
    patientId: "",
    patientName: "",
    bedNo: "",
    ventilator: "",
    currentStatus: "",
  });
  const { patientId, patientName, bedNo, currentStatus, ventilator } = result;
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
          ventilator: patient.ventilator,
          bedNo: patient.bedNo,
        });
        setSelected({ label: currentStatus, value: currentStatus });
        setIsChecked(ventilator);
      }
    },
    [patient, currentStatus, ventilator]
  );

  //setSelected({ label: currentStatus, value: currentStatus });
  //setIsChecked(ventilator);

  const [error, setError] = useState(false);

  const handleChange = (name) => (event) => {
    setResult({
      ...patient,
      [name]: event.target.value,
      currentStatus: selected.value,
      ventilator: isChecked,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    //console.log(patient, selected.value, isChecked);
    const name = { patientName, bedNo };
    const currentStatus = selected.value;
    const ventilator = isChecked === undefined ? "false" : isChecked;
    const updatedPatient = { ...name, currentStatus, ventilator };
    const { user, token } = isAuthenticated();
    console.log(updatedPatient);
    updatePatient(user._id, token, patientId, updatedPatient).then((data) => {
      if (data.error) {
        setError(true);
      } else {
        setError("");
      }
    });
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  return (
    <StatusDiv>
      <Search onFormSubmit={search} />
      <form className="status-form">
        <FormInput
          type="text"
          name="patientName"
          value={patientName}
          onChange={handleChange("patientName")}
          label="Patient Name"
          required
        />
        <Dropdown
          label="Current Status"
          options={options}
          selected={selected}
          onSelectedChange={setSelected}
        />
        <FormInput
          type="text"
          name="bedNo"
          value={bedNo}
          onChange={handleChange("bedNo")}
          label="Bed #"
          required
        />
        {/*<Checkbox
          type="text"
          label="Ventilator"
          isSelected=""
          onCheckboxChange=""
          required
        />*/}
        <Checkbox
          name="ventilator"
          isChecked={isChecked}
          onChange={setIsChecked}
        >
          Ventilator
        </Checkbox>
        <CustomButton onClick={onSubmit} type="submit">
          Submit
        </CustomButton>
      </form>
      {errorMessage()}
    </StatusDiv>
  );
};

export default PatientStatus;
