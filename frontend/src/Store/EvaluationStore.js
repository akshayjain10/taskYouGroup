import Reflux from "reflux";

export const Actions = Reflux.createActions(["getData", "clearData"]);

export class Store extends Reflux.Store {
  constructor() {
    super();
    this.listenables = Actions;
    this.state = {
      error: "",
      data: {},
    };
  }

  getData = async (sortValue, page, context) => {
    this.setState({ data: [] });
    const { fetchData } = context;
    const response = await fetchData("api/data", {
      method: "post",
      body: JSON.stringify({ page: parseInt(page), sort: sortValue }),
    });
    const { error, result = {} } = response;
    if (error) {
      this.setState({
        error: "Something went wrong and try again",
        data: [],
      });
      return;
    }
    this.setState({ data: result });
  };

  clearData() {
    this.setState({
      error: "",
      data: {},
    });
  }
}
