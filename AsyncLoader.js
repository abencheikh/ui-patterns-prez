export default class AsyncLoader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: undefined,
    };
  }

  async fetchData(url: string) {
    if (url === '') return;
    try {
      const response = await axios.get(url);

      this.setState({
        isLoading: false,
        data: response.data,
      });
    } catch (e) {
      this.setState({
        isLoading: false,
        error: e.message,
      });
    }
  }

  componentDidMount() {
    this.fetchData(this.props.url);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.url !== this.props.url) {
      this.fetchData(nextProps.url);
    }
  }

  render() {
    const { isLoading, data, error } = this.state;
    return this.props.children({ isLoading, data, error });
  }
}