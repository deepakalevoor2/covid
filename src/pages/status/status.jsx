import React, { useState } from "react";

import FormInput from "../../components/form-input/form-input.component";
import CustomButton from "../../components/custom-button/custom-button.component";
import Dropdown from "../../components/dropdown/Dropdown";
import Checkbox from "../../components/checkbox/checkbox";

import { StatusDiv } from "./status.styles";

const options = [
  {
    label: "Severe",
    value: "severe",
  },
  {
    label: "Moderate",
    value: "moderate",
  },
  {
    label: "Mild",
    value: "mild",
  },
];

const PatientStatus = () => {
  const [selected, setSelected] = useState(options[0]);
  return (
    <StatusDiv>
      <form className="entry-form">
        z
        <FormInput
          type="text"
          name="patientName"
          value=""
          onChange=""
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
          value=""
          onChange=""
          label="Bed #"
          required
        />
        <Checkbox
          type="text"
          label="Ventilator"
          isSelected=""
          onCheckboxChange=""
          required
        />
        <CustomButton type="submit">Submit</CustomButton>
      </form>
    </StatusDiv>
  );
};

export default PatientStatus;
