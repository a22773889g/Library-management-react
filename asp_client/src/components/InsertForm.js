import React, { PureComponent } from 'react'
import { Input, NumericTextBox } from '@progress/kendo-react-inputs';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { DatePicker } from '@progress/kendo-react-dateinputs';
import { formatNumber } from '@telerik/kendo-intl';

export default class InsertForm extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            select: { text: "資料庫", value: "database" },
            BookId: "",
            BookCategory: "資料庫",
            BookName: "",
            BookAuthor: "",
            BookBoughtDate: new Date().getFullYear() + '-' + (parseInt(new Date().getMonth()) + 1) + '-' + new Date().getDate(),
            BookPublisher: "",
            BookDeliveredDate: "",
            BookPrice: 0,
            BookAmount: 0,
            BookTotal: 0,
            tempDate: new Date()
        }
    }

    changeValue = (e) => {
        const context = this
        if (e.target.name === "BookCategory") {
            this.setState({
                select: e.target.value,
                BookCategory: e.target.value.text
            });
        } else if (e.target.name === "BookBoughtDate" || e.target.name === "BookDeliveredDate") {
            if(e.target.name==="BookBoughtDate"){
                this.setState({
                    tempDate: new Date(e.target.value)
                })
            }
            this.setState({
                [e.target.name]: e.target.value.getFullYear() + '-' + (parseInt(e.target.value.getMonth()) + 1) + '-' + e.target.value.getDate()
            })
        } else {
            this.setState({
                [e.target.name]: e.target.value
            }, () => {
                if (e.target.name === "BookPrice" || e.target.name === "BookAmount") {
                    context.setState({
                        BookTotal: context.state.BookPrice * context.state.BookAmount
                    });
                }
            });
        }

    }
    render() {
        const category = [{ text: "資料庫", value: "database" }, { text: "網際網路", value: "internet" },
        { text: "語言", value: "language" }, { text: "系統", value: "system" }, { text: "家庭", value: "home" }]
        return (
            <div className="row example-wrapper">
                <div className="col-xs-12 col-sm-6 offset-sm-3 example-col">
                    <div className="card">
                        <img src={require(`../images/${this.state.select.value}.jpg`)} alt="somthing wrong" width="90%"/>
                        <div className="card-block">
                            <form className="k-form" onSubmit={
                                (e) => {
                                    e.preventDefault()
                                    this.props.addBook(
                                        {
                                            BookId: this.props.bookLength + 1,
                                            BookCategory: this.state.BookCategory,
                                            BookName: this.state.BookName,
                                            BookAuthor: this.state.BookAuthor,
                                            BookBoughtDate: this.state.BookBoughtDate,
                                            BookPublisher: this.state.BookPublisher,
                                            BookDeliveredDate: this.state.BookDeliveredDate,
                                            BookPrice: this.state.BookPrice,
                                            BookAmount: this.state.BookAmount,
                                            BookTotal: this.state.BookTotal
                                        }
                                    )
                                }}>
                                <fieldset>
                                    <div className="mb-3">
                                        <DropDownList
                                            style={{ width: '100%' }}
                                            data={category}
                                            label="書籍類別*"
                                            name="BookCategory"
                                            textField="text"
                                            dataItemKey="value"
                                            defaultValue={this.state.select}
                                            required={true}
                                            onChange={this.changeValue}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <Input
                                            name="BookName"
                                            style={{ width: '100%' }}
                                            label="書名*"
                                            required={true}
                                            onChange={this.changeValue}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <Input
                                            name="BookAuthor"
                                            style={{ width: '100%' }}
                                            label="作者*"
                                            required={true}
                                            onChange={this.changeValue}
                                        />
                                    </div>
                                    <span>購買日期*</span>
                                    <label className="k-form-field mt-3">
                                        <DatePicker
                                            width="100%"
                                            name="BookBoughtDate"
                                            format={"yyyy-MM-dd"}
                                            required={true}
                                            value={this.state.tempDate}
                                            onChange={this.changeValue}
                                        />
                                    </label>
                                    <span>送達日期</span>
                                    <label className="k-form-field mt-3">
                                        <DatePicker
                                            width="100%"
                                            name="BookDeliveredDate"
                                            format={"yyyy-MM-dd"}
                                            onChange={this.changeValue}
                                            min={this.state.tempDate}
                                        />
                                    </label>
                                    <div>
                                        <NumericTextBox
                                            name="BookPrice"
                                            width="100%"
                                            label="金額*"
                                            required={true}
                                            onChange={this.changeValue}
                                            defaultValue={0}
                                            min={0}
                                            format="n0"
                                        />
                                    </div>
                                    <div>
                                        <NumericTextBox
                                            name="BookAmount"
                                            width="100%"
                                            label="數量*"
                                            required={true}
                                            onChange={this.changeValue}
                                            defaultValue={0}
                                            min={0}
                                        />
                                    </div>
                                </fieldset>

                                <label style={{ textAlign: "right" }} >總計 {formatNumber(this.state.BookTotal, "n")} 元</label>
                                <input type="submit" className="k-button k-primary" value="新增" style={{ float: "right" }} />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
