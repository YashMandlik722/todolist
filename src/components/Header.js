import { Component } from "react";
class Header extends Component{
    constructor(){
        super();
    }
    render(){
        return <>
          <div className="container-fluid bg-secondary p-2">
            <h3 className="text-white text-center">To-Do List</h3>
          </div>
        </>
    }
}
export default Header;