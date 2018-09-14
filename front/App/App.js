import React, {Component} from "react";
import ReactDOM from "react-dom";
import SomeTitle from "./components/SomeTitle";
import FormSendTask from "./components/FormSendTask";

let loc = window.location.href;
let urlApi = loc + 'api';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  fetchData() {
    fetch(urlApi)
    .then(response => response.json())
    .then(data => this.setState(data))
    .catch(err => console.log(err));
  }

  sendToApi(data, meth) {
    let request = new XMLHttpRequest();
    let json = JSON.stringify({
      id: data.id,
      title: data.title,
      text: data.text
    });

    console.log(json);

    request.open(meth, urlApi, true);
    request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    request.send(json);

    this.fetchData();
  }

  delData(e) {
    e.preventDefault();
    this.that.sendToApi(this, 'POST');
  }

  componentDidMount() {
    this.fetchData();
  }

  formSendBtn(e) {
    e.preventDefault();
    console.log(this.that.state);
    this.that.sendToApi({
      title: this.that.state.toSendTitle,
      text: this.that.state.toSendText
    }, 'POST');
  }

  formInputChange(e) {
    this.that.setState({toSendTitle: e.target.value});
  }

  formTextareaChange(e) {
    this.that.setState({toSendText: e.target.value});
  }

  getRowsContent() {
    let obj = this.state,
        size = Object.keys(obj).length,
        elem = [],
        { id, title, text } = obj;

    if(size > 0) {
      id.forEach((item, i)=>{
        if(id[i] != 0) {
          elem.push(
            <div className="task-wrapper" id="{ id }">
              <SomeTitle title={title[i]} />
              <p> {text[i]}</p>
              <a href="#" onClick={ this.delData.bind({id: id[i], that: this}) } >Delete it!</a>
            </div>);
        } else {
          elem.push(
            <div className="task-wrapper" id="{ id }">
              <SomeTitle title={title[i]} />
              <p> {text[i]}</p>
            </div>);
        }
      });
    }

    return elem;
  }

  render() {
    return (
      <div>
        <h2>React here!</h2>
        <div>
          { this.getRowsContent() }
          <FormSendTask
            formSend={this.formSendBtn.bind({that: this})}
            formInputChange={this.formInputChange.bind({that: this})}
            formTextareaChange={this.formTextareaChange.bind({that: this})} />
        </div>
      </div>
    );
  }
};

export default App;
ReactDOM.render(<App />, document.getElementById("root"));
