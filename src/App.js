import React, { Component } from "react";
import "./App.css";
import data from "./contacts.json";

class App extends Component {
  state = {
    producers: data.slice(0, 5),
  };
  handleRandom = () => {
    let randomProducer = Math.floor(Math.random() * data.length);
    let element = data[randomProducer];
    console.log(element);
    this.setState({
      producers: [element, ...this.state.producers],
    });
  };
  handlePopularity = () => {
    const { producers } = this.state;
    let clonedProducersPop = JSON.parse(JSON.stringify(producers));
    clonedProducersPop.sort((a, b) => {
      if (a.popularity > b.popularity) {
        return 1;
      } else if (a.popularity < b.popularity) {
        return -1;
      } else {
        return 0;
      }
    });
    this.setState({
      producers: clonedProducersPop,
    });
  };
  handleSortName = () => {
    const { producers } = this.state;
    let clonedProducers = JSON.parse(JSON.stringify(producers));

    clonedProducers.sort((a, b) => {
      if (a.name > b.name) {
        return 1;
      } else if (a.name < b.name) {
        return -1;
      } else {
        return 0;
      }
    });
    this.setState({
      producers: clonedProducers,
    });
  };
  handleDelete = (prodId) =>{
    const { producers } = this.state;
    let filteredProducers = producers.filter((singleProd)=>{
      return singleProd.id !== prodId
    })
    this.setState({
      producers: filteredProducers
    })
  }
  render() {
    return (
      <div>
        <h1>Iron Contacts</h1>
        <button onClick={this.handleRandom}>Add a celebrity</button>
        <button onClick={this.handleSortName}>Sort by Name</button>
        <button onClick={this.handlePopularity}>Sort by Popularity</button>
        <ul>
          {this.state.producers.map((singleProducer, index) => {
            return (
              <div>
                <li>
                  <img src={singleProducer.pictureUrl}></img>
                  Name : {singleProducer.name}
                  Popularity : {singleProducer.popularity}
                  <button onClick={()=>{this.handleDelete(singleProducer.id)}}>Delete</button>
                </li>
              </div>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default App;
