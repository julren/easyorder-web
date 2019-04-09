import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';

class CategoriesMenu extends Component {

        state = {  };
        
        
        render() {
            const ={}
        
            return (
            <Menu fluid vertical tabular>
            {categoryDocs.map(categoryDoc => (
              <Menu.Item
                key={categoryDoc.id}
                name={categoryDoc.data().name}
                active={selectedCategoryDoc.id === categoryDoc.id}
                onClick={() => this.onSelectCategory(categoryDoc)}
              />
            ))}
          </Menu>
        );
    }
}

export default CategoriesMenu;