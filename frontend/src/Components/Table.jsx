import React from "react";
import Reflux from "reflux";
import { MyContext } from "../Context/MyContext";
import { Store, Actions } from "../Store/EvaluationStore";
import { Multiselect } from "multiselect-react-dropdown";
import Table from "./tableData.jsx";

export default class TableComponent extends Reflux.Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = {
      dropdown1SelectedValues: [],
      dropdown1Options: [
        { name: "Destination", value: "destination", id: 1 },
        { name: "Price", value: "price", id: 2 },
        { name: "Booking Count", value: "total_booking_count", id: 3 },
      ],
      dropdown2SelectedValues: [],
      dropdown2Options: [
        { name: "Id", value: "id", id: 1 },
        { name: "Date", value: "date", id: 2 },
        { name: "Product Title", value: "product_title", id: 3 },
        { name: "Currency", value: "currency", id: 4 },
        { name: "Price", value: "price", id: 5 },
        { name: "Booking Count", value: "total_booking_count", id: 6 },
        { name: "Destination", value: "destination", id: 7 },
        { name: "Latitude Longitude", value: "lat_long", id: 8 },
        { name: "Segments", value: "segments", id: 9 },
        { name: "Ota", value: "ota", id: 10 },
      ],
      dropdown3SelectedValues: [],
      dropdown3Options: [],
      page: 1,
      tempPage: 1,
    };
    this.onSelect1 = this.onSelect1.bind(this);
    this.onSelectRemove2 = this.onSelectRemove2.bind(this);
    this.navigateToPage = this.navigateToPage.bind(this);
    this.changePage = this.changePage.bind(this);
    this.store = Store;
  }

  componentDidMount() {
    const { dropdown1SelectedValues = [], dropdown2SelectedValues = [] } =
      this.state;

    if (
      dropdown1SelectedValues.length > 0 &&
      dropdown2SelectedValues.length > 0
    ) {
      Actions.getData("price", 1, this.context);
    }
  }

  onSelect1(selectedList, selectedItem) {
    const { value } = selectedItem;
    Actions.getData(value, 1, this.context);
    this.setState({ dropdown1SelectedValues: selectedList });
  }

  onSelectRemove2(selectedList) {
    this.setState({ dropdown2SelectedValues: selectedList });
  }

  onSelect(selectedList, selectedItem) {
    console.log("selectedList --> ", selectedList);
    console.log("selectedItem --> ", selectedItem);
  }
  onRemove(selectedList, removedItem) {
    console.log("selectedList --> ", selectedList);
    console.log("removedItem --> ", removedItem);
  }

  navigateToPage(type) {
    const { tempPage, page, dropdown1SelectedValues = [] } = this.state;
    const { value } = dropdown1SelectedValues[0];

    if (type === "previous") {
      Actions.getData(value, page - 1, this.context);
      this.setState({ page: page - 1 });
    }
    if (type === "next") {
      Actions.getData(value, page + 1, this.context);
      this.setState({ page: page + 1 });
    }
    if (type === "page") {
      Actions.getData(value, tempPage, this.context);
      this.setState({ page: tempPage });
    }
  }

  changePage(e) {
    const page = e.target.value || 1;
    this.setState({ tempPage: parseInt(page) });
  }

  render() {
    const {
      data = {},
      dropdown1SelectedValues,
      dropdown1Options,
      dropdown2SelectedValues,
      dropdown2Options,
      dropdown3SelectedValues,
      dropdown3Options,
    } = this.state;

    const {
      current_page = 1,
      records = [],
      total_count,
      total_pages = 5,
    } = data;

    return (
      <React.Fragment>
        <div className="d-flex" style={{ placeContent: "center" }}>
          <div className="content-section" style={{ width: "1080px" }}>
            <div className="d-flex">
              <div className="me-5" style={{ width: "300px" }}>
                <div className="font-16">Sort</div>
                <Multiselect
                  singleSelect={true}
                  options={dropdown1Options}
                  selectedValues={dropdown1SelectedValues}
                  onSelect={this.onSelect1}
                  displayValue="name"
                />
              </div>

              <div className="me-5" style={{ width: "300px" }}>
                <div className="font-16">Columns To Show</div>
                <Multiselect
                  options={dropdown2Options}
                  selectedValues={dropdown2SelectedValues}
                  onSelect={this.onSelectRemove2}
                  onRemove={this.onSelectRemove2}
                  displayValue="name"
                />
              </div>

              <div style={{ width: "300px" }}>
                <div className="font-16">Condition</div>
                <Multiselect
                  options={dropdown3Options}
                  selectedValues={dropdown3SelectedValues}
                  onSelect={this.onSelect}
                  onRemove={this.onRemove}
                  displayValue="name"
                />
              </div>
            </div>

            <div className="pt-xl-5" style={{ textAlign: "center" }}>
              {records.length > 0 && dropdown2SelectedValues.length > 0 ? (
                <div>
                  <div>
                    <Table columns={dropdown2SelectedValues} rows={records} />

                    <div
                      className="d-flex pt-3"
                      style={{ placeContent: "center" }}
                    >
                      <div
                        class="me-4 cursor-pointer page-item page-link"
                        onClick={() => this.navigateToPage("previous")}
                      >
                        Previous
                      </div>
                      <div style={{ alignSelf: "center" }} className="me-4">
                        Page {current_page} of {total_pages}
                      </div>
                      <div
                        class="me-4 cursor-pointer page-item page-link"
                        onClick={() => this.navigateToPage("next")}
                      >
                        Next
                      </div>
                    </div>

                    <div
                      className="pt-3 d-flex"
                      style={{ placeContent: "center" }}
                    >
                      <input
                        style={{ width: "50px" }}
                        onChange={(e) => this.changePage(e)}
                        className="me-4"
                      />

                      <span
                        onClick={() => this.navigateToPage("page")}
                        className="cursor-pointer page-item page-link"
                      >
                        Go To Page
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <div>No Data To Show</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
