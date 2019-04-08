import React, { PureComponent } from 'react';
import swal from 'sweetalert';
export default class Remove extends PureComponent {
    render() {
        return (
            <td> 
                <button
                    className="k-button k-grid-remove-command"
                    onClick={() => swal({
                        title: "確定刪除「"+this.props.dataItem.BookName+"」嗎?",
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                      })
                      .then((willDelete) => {
                        if (willDelete) {
                            this.props.remove(this.props.dataItem)
                            swal({
                                title: "已成功刪除",
                                icon: "success",
                            });
                        }
                      })
                }>
                    刪除
                </button>
            </td>
        );
    }
}

