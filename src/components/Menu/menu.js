import React, { Component } from "react";
import { Image, Segment, Header } from "semantic-ui-react";
import {
  Button,
  Checkbox,
  Dropdown,
  Form,
  Input,
  TextArea
} from "formik-semantic-ui";
import ShowPropsInUI from "../../utils/ShowPropsInUI";
import MenuList from "./MenuList/menuList";
import { FieldArray } from "formik";

class Menu extends Component {
  state = {
    menu: {
      title: "",
      author: "",
      content: [
        {
          sectionTitle: "starters",
          sectionItems: [
            {
              name: "Salat",
              price: 8
            },
            {
              name: "suppe",
              price: 5
            },
            {
              name: "Brot",
              price: 6
            }
          ]
        },
        {
          sectionTitle: "main",
          sectionItems: [
            {
              name: "pizza",
              price: 8
            },
            {
              name: "pasta",
              price: 5
            }
          ]
        }
      ]
    }
  };
  handleAdd = () => {
    this.setState(previousState => {
      console.log("previousState", previousState);
      const newState = previousState.menu.starters.push({
        name: "...newww",
        price: 0
      });
      console.log("newState", newState);

      return newState;
    });
  };

  handleStateChange = newState => {
    this.setState(newState);
  };
  handleSubmit = (values, formikApi) => {
    console.log(values, formikApi);
    formikApi.setSubmitting(false);
  };

  render() {
    return (
      <div>
        <h1>Speisekarte</h1>
        <Segment color="green">
          {/* <MenuList menu={this.state.menu} onChange={this.handleStateChange} />
          <Button onClick={this.handleAdd}>Add</Button> */}

          <Form
            initialValues={this.state.menu}
            onSubmit={this.handleSubmit}
            render={({ values }) => (
              <div>
                <ShowPropsInUI props={values} />
                <MenuSectionList menu={values} />
                <Button.Submit>Submit</Button.Submit>
              </div>
            )}
          />
        </Segment>
      </div>
    );
  }
}

const MenuSectionList = props => {
  const menu = props.menu;
  const menuContent = menu.content;

  return menuContent.map((section, menuContentIndex) => (
    <React.Fragment key={menuContentIndex}>
      <h2>
        <Input name={`content[${menuContentIndex}].sectionTitle`} />
      </h2>
      <MenuSection
        sectionItems={section.sectionItems}
        menuContentIndex={menuContentIndex}
      />
    </React.Fragment>
  ));
};

const MenuSection = props => {
  const sectionItems = props.sectionItems;
  const menuContentIndex = props.menuContentIndex;
  // Input fields need the position of a field in the values object
  // in the "name" property of an iput field
  // e.g. <Input name="content[0].sectionitems[2].name"/>
  const formNameRef = `content[${menuContentIndex}]`;

  return (
    <FieldArray
      name={`${formNameRef}.sectionItems`}
      render={arrayHelpers => (
        <div>
          {sectionItems.map((sectionItem, sectionItemsIndex) => (
            <div key={sectionItemsIndex}>
              <Form.Group widths="3">
                <Input
                  label="First Name"
                  name={`${formNameRef}.sectionItems[${sectionItemsIndex}].name`}
                />
                <Input
                  label="Last Name"
                  name={`${formNameRef}.sectionItems[${sectionItemsIndex}].price`}
                />
                <Button
                  onClick={() =>
                    arrayHelpers.insert(sectionItemsIndex + 1, {
                      name: "",
                      price: 0
                    })
                  }
                >
                  +
                </Button>
                <Button onClick={() => arrayHelpers.remove(sectionItemsIndex)}>
                  -
                </Button>
              </Form.Group>
            </div>
          ))}
        </div>
      )}
    />
  );
};

export default Menu;
