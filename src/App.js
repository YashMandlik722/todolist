import { Component } from "react";
import Header from "./components/Header";
import data from "./data";

class App extends Component{
  constructor(){
    super();
    this.state = {
      tasklist : data.sort((a, b) => a.priority.priorityNo - b.priority.priorityNo) ,
      isActive : [true,false],
      priorityList : [{priorityNo : 1,priorityName : "High"},{priorityNo : 2,priorityName : "Medium"},{priorityNo : 3 ,priorityName : "Low"}]
    }
    this.isTotal = true;
    this.isDeactive = false;
    this.isPriority = "";

    this.totalTask = data;
    this.activeTask = this.totalTask.filter((data)=>{return data.isActive == "Active"});
    this.deactiveTask = this.totalTask.filter((data)=>{return data.isActive == "Deactive"});

  }
  

  //Adding Task
  addTask = ()=>{
    let title = this.title.value;
    // let priority = this.priority.value;

    let priorityObj = this.priority.value == "High" ? {priorityNo : 1,priorityName : "High"}:this.priority.value=="Medium"?{priorityNo : 2,priorityName : "Medium"}:{priorityNo : 3,priorityName : "Low"}

    const d = new Date();
    let day = d.getDate();
    let month = d.getMonth();
    let year = d.getFullYear();
    let date = day + "/" + (month+1) + "/" + year;
    let newTask = {
      title : title,
      date,
      priority : priorityObj,
      isActive : "Active"
    }

    // console.log(newTask);
    this.totalTask = [...this.totalTask,newTask];
    this.isTotal = true;
    this.setState({tasklist : [...this.totalTask].sort((a, b) => a.priority.priorityNo - b.priority.priorityNo)});

  }

  //Filtering on priority
  filterTask = (status)=>{
    this.isPriority = "";
    if(status == "Total"){
      this.isTotal = true;
      this.isDeactive = false;
      this.setState({tasklist : [...this.totalTask].sort((a, b) => a.priority.priorityNo - b.priority.priorityNo)});
    }else{
      this.isTotal = false;
      if(status == "Active"){
        this.isDeactive = false;
        this.setState({tasklist : [...this.activeTask].sort((a, b) => a.priority.priorityNo - b.priority.priorityNo)});
      }else{
        this.isDeactive = true;
        this.setState({tasklist : [...this.deactiveTask].sort((a, b) => a.priority.priorityNo - b.priority.priorityNo)});
      }
      // let filteredTask = this.totalTask.filter((task)=>{return task.isActive==status})
      
    }
  }

  //changing status
  changeStatus = (index)=>{
    // window.alert(index + " " + toChange)
    
    if(this.state.tasklist[index].isActive == "Active"){
      this.state.tasklist[index].isActive = "Deactive";
      let title = this.state.tasklist[index].title;
      let activeIndex = this.activeTask.findIndex((x)=>x.title==title)

      let changedTask = this.activeTask[activeIndex];

      this.activeTask.splice(activeIndex,1);
      this.deactiveTask.push(changedTask);
      if(this.isTotal)
      this.setState({tasklist : this.totalTask.sort((a, b) => a.priority.priorityNo - b.priority.priorityNo)});
      else
      this.setState({tasklist : this.activeTask.sort((a, b) => a.priority.priorityNo - b.priority.priorityNo)});
      // window.alert(changedTask.title);
    }else{
      this.state.tasklist[index].isActive = "Active";
      let title = this.state.tasklist[index].title;
      let deActiveIndex = this.deactiveTask.findIndex((x)=>x.title==title)

      let changedTask = this.deactiveTask[deActiveIndex];

      this.deactiveTask.splice(deActiveIndex,1);
      this.activeTask.push(changedTask);
      if(this.isTotal)
      this.setState({tasklist : this.totalTask.sort((a, b) => a.priority.priorityNo - b.priority.priorityNo)});
      else
      this.setState({tasklist : this.deactiveTask.sort((a, b) => a.priority.priorityNo - b.priority.priorityNo)});
    }
    // window.alert(this.state.tasklist[index].isActive)
    
    // this.state.tasklist[index].isActive = "Active";

    
  }

  filterTaskOnPriority = (priority)=>{
    if(this.isTotal){
      if(priority == "High"){
        this.isPriority = "High";
        this.setState({tasklist : this.totalTask.filter((data)=>{return data.priority.priorityNo == 1})});
      }else if(priority == "Medium"){
        this.isPriority = "Medium";
        this.setState({tasklist : this.totalTask.filter((data)=>{return data.priority.priorityNo == 2})});
      }else{
        this.isPriority = "Low";
        this.setState({tasklist : this.totalTask.filter((data)=>{return data.priority.priorityNo == 3})});
      }
    }else{
        if(this.isDeactive){
          if(priority == "High"){
            this.isPriority = "High";
            this.setState({tasklist : this.deactiveTask.filter((data)=>{return data.priority.priorityNo == 1})});
          }else if(priority == "Medium"){
            this.isPriority = "Medium";
            this.setState({tasklist : this.deactiveTask.filter((data)=>{return data.priority.priorityNo == 2})});
          }else{
            this.isPriority = "Low";
            this.setState({tasklist : this.deactiveTask.filter((data)=>{return data.priority.priorityNo == 3})});
          }
        }else{
          if(priority == "High"){
            this.isPriority = "High";
            this.setState({tasklist : this.activeTask.filter((data)=>{return data.priority.priorityNo == 1})});
          }else if(priority == "Medium"){
            this.isPriority = "Medium";
            this.setState({tasklist : this.activeTask.filter((data)=>{return data.priority.priorityNo == 2})});
          }else{
            this.isPriority = "Low";
            this.setState({tasklist : this.activeTask.filter((data)=>{return data.priority.priorityNo == 3})});
          }
        }
      
    }
  }

  render(){
    return <>
      <Header/>
      
      <div className="container row mt-3">
        <div className="col-md-6">
          <input ref={(titleInput)=>this.title=titleInput} type="text" className="form-control" placeholder="Enter Task Title"/>
          <button className="btn btn-primary mt-3" onClick={()=>{this.addTask()}}>Add Task</button>
        </div>

        <div className="col-md-6">
        <select ref={(priorityInput)=>this.priority = priorityInput} className="form-control">
            <option>Select Priority</option>
            {this.state.priorityList.map((task,index)=><option key={index}>{task.priorityName}</option>)}
          </select>
        </div>
      </div>

      <div className="container row mt-3">
      <div className="col-md-4">
      <button className={this.isPriority == "High"?"btn btn-danger m-2":"btn btn-outline-danger m-2"} onClick={()=>{this.filterTaskOnPriority("High")}}>High({this.totalTask.filter((task)=>{return task.priority.priorityName=="High"}).length})</button>
      <button className={this.isPriority == "Medium"?"btn btn-warning m-2":"btn btn-outline-warning m-2"} onClick={()=>{this.filterTaskOnPriority("Medium")}}>Medium({this.totalTask.filter((task)=>{return task.priority.priorityName=="Medium"}).length})</button>
      <button className={this.isPriority == "Low"?"btn btn-success m-2":"btn btn-outline-success m-2"} onClick={()=>{this.filterTaskOnPriority("Low")}}>Low({this.totalTask.filter((task)=>{return task.priority.priorityName=="Low"}).length})</button>
      </div>

      <div className="col-md-4">
      <button className={!this.isDeactive && !this.isTotal?"btn btn-dark m-2":"btn btn-outline-dark m-2"} onClick={()=>{this.filterTask("Active")}}>Active({this.totalTask.filter((task)=>{return task.isActive=="Active"}).length})</button>
      <button className={this.isDeactive?"btn btn-dark m-2":"btn btn-outline-dark m-2"} onClick={()=>{this.filterTask("Deactive")}}>Deactive({this.totalTask.filter((task)=>{return task.isActive=="Deactive"}).length})</button>
      
      </div>

      <div className="col-md-4">
      <button className={this.isTotal?"btn btn-secondary m-2":"btn btn-outline-secondary m-2"} onClick={()=>{this.filterTask("Total")}}>Total({this.totalTask.length})</button>
      </div>

      </div>

      <div>
      <table className="table mt-3">
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Title</th>
            <th>Date</th>
            <th>Priority</th>
            <th>Status</th>
            
            {this.isTotal ? <th>Change Status</th> :<th>Operation</th>}
          </tr>
        </thead>
        
        <tbody>
          
          {this.state.tasklist.map((task,index)=>  <tr className={task.priority.priorityNo == 1?"bg-danger":task.priority.priorityNo==2?"bg-warning":"bg-success"} key={index}>
            <td>{index + 1}</td>
            <td>{task.title}</td>
            <td>{task.date}</td>
            <td>{task.priority.priorityName}</td>
            <td>{task.isActive}</td>
            
            {this.isTotal ? <td><button className="btn btn-info" onClick={()=>{this.changeStatus(index)}}>Change-Status</button></td> :<td>{task.isActive == "Active" ? <button className="btn btn-info" onClick={()=>{this.changeStatus(index)}}>Deactivate</button> : <button className="btn btn-info" onClick={()=>{this.changeStatus(index)}}>Activate</button>}</td>}
            
            
          </tr>)}
        </tbody>
      </table>
      </div>
    </>
  }
}
export default App;