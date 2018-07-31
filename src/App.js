import React  from 'react';
import './App.css';
import {urlGetAllMembers} from './Api';
/*
const ComponentA = (props) => {
  return (<div> 
    Chao {props.name}
  </div>);
}
*/
class ComponentA extends React.Component { 
  constructor(props){
    super(props);
    this.state = {
      customers: []
    }
  }
  //HOC
  mapCustomersToList = () => {
    const list = this.state.customers.map(customer => {      
      return <li key={customer.username}>Name : {customer.username}Email : {customer.email}</li>
    });
    return (<ol>{list}</ol>);
  }
  componentDidMount = async () => {
    await console.log("didmount");
    try {
      let response = await fetch(
        urlGetAllMembers, {
          method: 'GET'          
        }
      );
      let responseJson = await response.json();      
      const updatedCustomers = responseJson["data"];
      
      this.setState({
        customers: updatedCustomers
      });
      console.log(`responseJson = ${JSON.stringify(responseJson["data"])}`);
      
      
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    console.log("render");
    
    return (
      <div>
        {this.state.name}
        {this.mapCustomersToList()}
        </div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h1>Hello</h1>
        <ComponentA name="Hang" />                
      </div>
    );
  }
}

export default App;
