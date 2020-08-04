import React, { useState, useEffect } from "react";
import { Checkbox } from "@thumbtack/thumbprint-react";

import FormInput from "../../components/form-input/form-input.component";
import Search from "../search/search";
import CustomButton from "../../components/custom-button/custom-button.component";
import Dropdown from "../../components/dropdown/Dropdown";
import SearchPatient from "../../hooks/searchPatient";
//import Checkbox from "../../components/checkbox/checkbox";
import { getPatient } from "../../apis";

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
  const [patient, search] = SearchPatient("1055");
  const [result, setResult] = useState({
    patient_id: "",
    patientId: "",
    patientName: "",
    bedNo: "",
    ventilator: "",
    currentStatus: "",
  });

  const {
    patient_id,
    patientId,
    patientName,
    bedNo,
    ventilator,
    currentStatus,
  } = result;

  useEffect(
    () => {
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
        console.log("selected is", selected);
        console.log("currentStatus is", currentStatus);
      }
    },
    [patient],
    currentStatus,
    result,
    selected,
    ventilator
  );

  const handleChange = (name) => (event) => {
    setResult({ ...patient, [name]: event.target.value });
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
          isChecked={ventilator}
          onChange={setIsChecked}
        >
          Ventilator
        </Checkbox>
        <CustomButton type="submit">Submit</CustomButton>
      </form>
    </StatusDiv>
  );
};

export default PatientStatus;
