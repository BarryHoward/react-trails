import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//handsontable imports
import moment from 'moment';
import numbro from 'numbro';
import pikaday from 'pikaday';
import Zeroclipboard from 'zeroclipboard';
import Handsontable from 'handsontable';
import HotTable from 'react-handsontable';
import 'handsontable/dist/handsontable.full.css';


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