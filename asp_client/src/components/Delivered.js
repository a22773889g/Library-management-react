import React, { PureComponent } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
export default class Delivered extends PureComponent {
    render() {
        const value = this.props.dataItem[this.props.field];
        return (
            <td> {
                value ?<Tooltip title={value}><i className="deliver fas fa-truck"></i></Tooltip>: ''
                }
            </td>
        );
    }
}

