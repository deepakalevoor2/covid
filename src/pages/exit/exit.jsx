import React from "react";

import CustomButton from "../../components/custom-button/custom-button.component";
import Checkbox from "../../components/checkbox/checkbox";

import { ExitDiv } from "./exit.styles";

const Exit = () => {
  return (
    <ExitDiv>
      <form className="entry-form">
        <Checkbox
          type="text"
          label="Discharge formality"
          isSelected=""
          onCheckboxChange=""
          required
        />
        <CustomButton type="submit">Submit</CustomButton>
      </form>
    </ExitDiv>
  );
};

export default Exit;
