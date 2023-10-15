import React from "react";
import "./FormProgressBar.css";
import ProgressIndicator from "./ProgressIndicator/ProgressIndicator";

interface FormProgressBarProps {
  totalSteps: number;
  currentStep: number;
  stepTitles: string[];
}

const FormProgressBar = (props: FormProgressBarProps) => {
  return (
    <React.Fragment>
      <div className="form__progress__bar">
        {props.stepTitles.map((title, index) => (
          <ProgressIndicator
            fill={index < props.currentStep}
            number={index + 1}
            title={title}
            renderLeftLine={index !== 0}
            renderRightLine={index + 1 < props.totalSteps}
            fillRightLine={props.currentStep > index + 1}
            isHighlighed={index === props.currentStep - 1}
            key={index}
          />
        ))}
      </div>
    </React.Fragment>
  );
};

export default FormProgressBar;
