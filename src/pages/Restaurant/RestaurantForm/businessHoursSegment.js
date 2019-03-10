import React from "react";
import { FieldArray } from "formik";
import { Table, Header, Container } from "semantic-ui-react";
import { Dropdown, Input, Form } from "formik-semantic-ui";
import { WEEKDAYS } from "../../../utils/globalConstants";

const BusinessHoursSegment = props => {
  const businessHours = props.formValues.businessHours;
  return (
    <FieldArray
      name="businessHours"
      render={arrayHelpers => (
        <Container style={{ marginBottom: "5em" }}>
          <Header dividing as="h3" color="blue">
            Öffnungszeiten
          </Header>
          <Table basic="very">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Tag</Table.HeaderCell>
                <Table.HeaderCell>Von</Table.HeaderCell>
                <Table.HeaderCell>Bis</Table.HeaderCell>
                <Table.HeaderCell textAlign="right">Aktion</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {businessHours.map((item, index) => (
                <Table.Row key={index}>
                  <Table.Cell>
                    <Dropdown
                      name={`businessHours[${index}].day`}
                      options={WEEKDAYS}
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <Input
                      name={`businessHours[${index}].openingHour`}
                      inputProps={{
                        label: { basic: true, content: "Uhr" },
                        labelPosition: "right"
                      }}
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <Input
                      name={`businessHours[${index}].closingHour`}
                      inputProps={{
                        label: { basic: true, content: "Uhr" },
                        labelPosition: "right"
                      }}
                    />
                  </Table.Cell>

                  <Table.Cell textAlign="right">
                    <Form.Button
                      type="button"
                      basic
                      color="red"
                      icon="trash"
                      onClick={() => arrayHelpers.remove(index)}
                    />
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          <Form.Button
            type="button"
            color="green"
            basic
            content="Hinzufügen"
            onClick={() =>
              arrayHelpers.push({
                day: "",
                openingHour: "",
                closingHour: ""
              })
            }
          />
        </Container>
      )}
    />
  );
};

export default BusinessHoursSegment;
