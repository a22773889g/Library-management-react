import React, { PureComponent } from 'react'
import { Input, NumericTextBox } from '@progress/kendo-react-inputs';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { DatePicker } from '@progress/kendo-react-dateinputs';
import { formatNumber } from '@telerik/kendo-intl';
import { IntlProvider, load, LocalizationProvider } from '@progress/kendo-react-intl';
import likelySubtags from 'cldr-core/supplemental/likelySubtags.json';
import currencyData from 'cldr-core/supplemental/currencyData.json';
import weekData from 'cldr-core/supplemental/weekData.json';

import numbers from 'cldr-numbers-full/main/zh/numbers.json';
import caGregorian from 'cldr-dates-full/main/zh/ca-gregorian.json';
import dateFields from 'cldr-dates-full/main/zh/dateFields.json';
import timeZoneNames from 'cldr-dates-full/main/zh/timeZoneNames.json';

load(
    likelySubtags,
    currencyData,
    weekData, numbers,
    caGregorian,
    dateFields,
    timeZoneNames
);
export default class InsertForm extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            select: { text: "資料庫", value: "database" },
            bookId: "",
            bookCategory: "資料庫",
            bookName: "",
            bookAuthor: "",
            bookBoughtDate: new Date().getFullYear() + '-' + (parseInt(new Date().getMonth()) + 1) + '-' + new Date().getDate(),
            bookPublisher: "",
            bookDeliveredDate: "",
            bookPrice: 0,
            bookAmount: 0,
            bookTotal: 0,
            tempDate: new Date()
        }
    }

    changeValue = (e) => {
        const context = this
        if (e.target.name === "bookCategory") {
            this.setState({
                select: e.target.value,
                bookCategory: e.target.value.text
            });
        } else if (e.target.name === "bookBoughtDate" || e.target.name === "bookDeliveredDate") {
            if (e.target.name === "bookBoughtDate") {
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
                if (e.target.name === "bookPrice" || e.target.name === "bookAmount") {
                    context.setState({
                        bookTotal: context.state.bookPrice * context.state.bookAmount
                    });
                }
            });
        }

    }
    render() {
        const category = [{ text: "資料庫", value: "database" }, { text: "網際網路", value: "internet" },
        { text: "語言", value: "language" }, { text: "系統", value: "system" }, { text: "家庭", value: "home" }]
        return (
            <LocalizationProvider language={'zh'}>
                <IntlProvider locale={'zh'}>
                    <div className="row example-wrapper">
                        <div className="col-xs-12 col-sm-6 offset-sm-3 example-col">
                            <div className="card">
                                <img src={require(`../images/${this.state.select.value}.jpg`)} alt="somthing wrong" width="90%" />
                                <div className="card-block">
                                    <form className="k-form" onSubmit={
                                        (e) => {
                                            e.preventDefault()
                                            this.props.addBook(
                                                {
                                                    bookId: this.props.bookLength + 1,
                                                    bookCategory: this.state.bookCategory,
                                                    bookName: this.state.bookName,
                                                    bookAuthor: this.state.bookAuthor,
                                                    bookBoughtDate: this.state.bookBoughtDate,
                                                    bookPublisher: this.state.bookPublisher,
                                                    bookDeliveredDate: this.state.bookDeliveredDate,
                                                    bookPrice: this.state.bookPrice,
                                                    bookAmount: this.state.bookAmount,
                                                    bookTotal: this.state.bookTotal
                                                }
                                            )
                                        }}>
                                        <fieldset>
                                            <label htmlFor="bookCategory">書籍類別<span style={{ color: "red" }}>*</span></label>
                                            <div className="mb-3">
                                                <DropDownList
                                                    style={{ width: '100%' }}
                                                    data={category}
                                                    name="bookCategory"
                                                    textField="text"
                                                    dataItemKey="value"
                                                    defaultValue={this.state.select}
                                                    required={true}
                                                    onChange={this.changeValue}
                                                />
                                            </div>
                                            <label htmlFor="bookName">書名<span style={{ color: "red" }}>*</span></label>
                                            <div className="mb-3">
                                                <Input
                                                    name="bookName"
                                                    style={{ width: '100%' }}
                                                    required={true}
                                                    onChange={this.changeValue}
                                                />
                                            </div>
                                            <label htmlFor="bookAuthor">作者<span style={{ color: "red" }}>*</span></label>
                                            <div className="mb-3">
                                                <Input
                                                    name="bookAuthor"
                                                    style={{ width: '100%' }}
                                                    required={true}
                                                    onChange={this.changeValue}
                                                />
                                            </div>
                                            <span>購買日期<span style={{ color: "red" }}>*</span></span>
                                            <label className="k-form-field mt-3">
                                                <DatePicker
                                                    width="100%"
                                                    name="bookBoughtDate"
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
                                                    name="bookDeliveredDate"
                                                    format={"yyyy-MM-dd"}
                                                    onChange={this.changeValue}
                                                    min={this.state.tempDate}
                                                />
                                            </label>
                                            <label htmlFor="bookPrice">金額<span style={{ color: "red" }}>*</span></label>
                                            <div>
                                                <NumericTextBox
                                                    name="bookPrice"
                                                    width="100%"
                                                    required={true}
                                                    onChange={this.changeValue}
                                                    min={0}
                                                    format="n0"
                                                />
                                            </div>
                                            <label htmlFor="bookAmount">數量<span style={{ color: "red" }}>*</span></label>
                                            <div>
                                                <NumericTextBox
                                                    name="bookAmount"
                                                    width="100%"
                                                    required={true}
                                                    onChange={this.changeValue}
                                                    format="n0"
                                                    min={0}
                                                />
                                            </div>
                                        </fieldset>

                                        <label style={{ textAlign: "right" }} >總計 {formatNumber(this.state.bookTotal, "n")} 元</label>
                                        <input type="submit" className="k-button k-primary" value="新增" style={{ float: "right" }} />
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </IntlProvider>
            </LocalizationProvider>
        )
    }
}
