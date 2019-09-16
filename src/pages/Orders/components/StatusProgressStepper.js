import React from "react";
import { Step } from "semantic-ui-react";
import PropTypes from "prop-types";

const StatusProgressStepper = props => {
  const { status } = props;

  return (
    <Step.Group ordered fluid>
      <Step active={status === "open"} completed={status !== "open"}>
        <Step.Content>
          <Step.Title>Offen</Step.Title>
        </Step.Content>
      </Step>

      <Step
        active={status === "inProgress"}
        completed={status === "readyForServing" || status === "archived"}
      >
        <Step.Content>
          <Step.Title>In Bearbeitung</Step.Title>
        </Step.Content>
      </Step>

      <Step
        active={status === "readyForServing"}
        completed={status === "archived"}
      >
        <Step.Content>
          <Step.Title>Servierbereit</Step.Title>
        </Step.Content>
      </Step>

      <Step completed={status === "archived"}>
        <Step.Content>
          <Step.Title>Archiviert</Step.Title>
        </Step.Content>
      </Step>
    </Step.Group>
  );
};

export default StatusProgressStepper;
