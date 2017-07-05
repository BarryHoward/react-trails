import React from 'react';
import './index.css';

//handsontable imports

import 'handsontable/dist/handsontable.full.js';
import 'handsontable/dist/handsontable.full.css';
import HotTable from 'react-handsontable';

class Table extends React.Component {

  constructor(){
    super();
    this.state = {
      contacts_table: [{}],
      display_columns: null,
      column_header: null
    }
  }


  render() {
    return (
      <div id="table">
          <HotTable root="hot" ref="hot" settings={{
              data: this.props.data,
              dropdownMenu: true,
              stretchH: 'all',
              afterChange: this.props.tableChange
          }} />
      </div>
    );
  }


}

export {Table}