import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./index.css";
import { Transfer } from "antd";

const mockData = [
  {
    key: "1",
    title: "Overseas Securities Trading",
    description: "Overseas Securities Trading",
    disabled: false
  },
  {
    key: "2",
    title: "Structured Product Overseas",
    description: "Structured Product Overseas",
    disabled: false
  },
  {
    key: "3",
    title: "Global Structed Product",
    description: "Global Structed Product",
    disabled: false
  },
  {
    key: "4",
    title: "Bond Trading",
    description: "Bond Trading",
    disabled: false
  },
  {
    key: "5",
    title: "Overseas Private Banking",
    description: "Overseas Private Banking",
    disabled: false
  }
];
// for (let i = 0; i < 20; i++) {
//   mockData.push({
//     key: i.toString(),
//     title: `content${i + 1}`,
//     description: `description of content${i + 1}`,
//     disabled: i % 3 < 1,
//   });
// }

const oriTargetKeys = ["1", "2", "3"]; //mockData.filter(item => +item.key % 3 > 1).map(item => item.key);

class App extends React.Component {
  state = {
    targetKeys: oriTargetKeys,
    selectedKeys: [],
    disabled: false,
    dgid: ""
  };

  handleChange = (nextTargetKeys, direction, moveKeys) => {
    console.log("handleChange:", nextTargetKeys);
    this.setState({ targetKeys: nextTargetKeys });

    // let element = ReactDOM.findDOMNode(this);
    // let item = element.getElementsByClassName("dropzone" + moveKeys);
    // console.log("handleChange item:", item[0]);
    // item[0].draggable = true;
    // item[0].style.cursor = "move";

    console.log("targetKeys: ", nextTargetKeys);
    console.log("direction: ", direction);
    console.log("moveKeys: ", moveKeys);
  };

  handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    this.setState({
      selectedKeys: [...sourceSelectedKeys, ...targetSelectedKeys]
    });

    console.log("sourceSelectedKeys: ", sourceSelectedKeys);
    console.log("targetSelectedKeys: ", targetSelectedKeys);
  };

  handleScroll = (direction, e) => {
    console.log("direction:", direction);
    console.log("target:", e.target);
  };

  handleDisable = (disabled) => {
    this.setState({ disabled });
  };

  handleondragstart = ({ target }) => {
    console.log("handleondragstart:", target.id);
    // ev.dataTransfer.effectAllowed = "move";
    this.setState({ dgid: target.id });
  };

  handleondrop = ({ target }) => {
    console.log("droped!");
    console.log("drop id:", target.id);
    console.log("drag id:", this.state.dgid);
    target.parentElement.parentElement.style.backgroundColor = "inherit";
    if (
      this.state.dgid &&
      target.id &&
      target.className.startsWith("dropzone") &&
      this.state.targetKeys.indexOf(target.id) > -1 &&
      this.state.targetKeys.indexOf(this.state.dgid) > -1
    ) {
      console.log("target Keys:", this.state.targetKeys);
      console.log("^^^ - vvv");
      let tmpR = this.state.targetKeys;
      let dgi = tmpR.indexOf(this.state.dgid);
      let dpi = tmpR.indexOf(target.id);
      var tmp = tmpR[dgi];
      tmpR[dgi] = tmpR[dpi];
      tmpR[dpi] = tmp;
      console.log("reordered target:", tmpR);
      this.setState({ targetKeys: tmpR });

      //this.forceUpdate();
    }
  };

  handleondragover = (event) => {
    //console.log("handleondragover:", event);
    event.preventDefault();
    if (
      event.target.id !== this.state.dgid &&
      this.state.targetKeys.indexOf(event.target.id) > -1 &&
      this.state.targetKeys.indexOf(this.state.dgid) > -1
    ) {
      event.target.parentElement.parentElement.style.backgroundColor =
        "#f2f2f2";
      event.dataTransfer.dropEffect = "move";
    } else if (event.target.id === this.state.dgid) {
      event.dataTransfer.dropEffect = "move";
    } else {
      event.dataTransfer.dropEffect = "none";
    }

    //event.target.style.border = "4px dotted green";
    //event.persist();
  };

  handledragleave = (event) => {
    event.target.parentElement.parentElement.style.backgroundColor = "inherit";
  };

  renderItem = (item) => {
    const customLabel = (
      <span
        className={`dropzone` + item.key}
        id={item.key}
        draggable="true"
        onDragStart={this.handleondragstart}
        onDragOver={this.handleondragover}
        onDragLeave={this.handledragleave}
        onDrop={this.handleondrop}
      >
        {item.title}
      </span>
    );

    return {
      label: customLabel, // for displayed item
      value: item.title // for title and filter matching
    };
  };

  componentDidMount() {
    // let element = ReactDOM.findDOMNode(this);
    // for (let tl of this.state.targetKeys) {
    //   console.log("tl:", tl);
    //   let item = element.getElementsByClassName("dropzone" + tl);
    //   console.log("item:", item[0]);
    //   item[0].draggable = true;
    // }
  }

  render() {
    const { targetKeys, selectedKeys, disabled } = this.state;
    return (
      <>
        <Transfer
          dataSource={mockData}
          titles={["Credit Limit by Product", "Selected"]}
          targetKeys={targetKeys}
          selectedKeys={selectedKeys}
          onChange={this.handleChange}
          onSelectChange={this.handleSelectChange}
          onScroll={this.handleScroll}
          //render={(item) => item.title}
          disabled={disabled}
          oneWay
          showSearch="true"
          render={this.renderItem}
          listStyle={{
            width: 350,
            height: 300
          }}
          style={{ marginBottom: 16 }}
        />
      </>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("container"));
