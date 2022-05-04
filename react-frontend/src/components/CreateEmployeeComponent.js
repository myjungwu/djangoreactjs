import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService';
import Dialog from 'react-bootstrap-dialog';

class CreateEmployeeComponent extends Component {
    //state객체
    state = {
        //수정할 때 사용하는 id
        id: this.props.match.params.id,
        firstName: '',
        lastName: '',
        emailId: ''
    }

    // constructor(props) {
    //     super(props)

    //     this.state = {
    //         // step 2
    //         id: this.props.match.params.id,
    //         firstName: '',
    //         lastName: '',
    //         emailId: ''
    //     }
    //     this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
    //     this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
    //     this.saveOrUpdateEmployee = this.saveOrUpdateEmployee.bind(this);
    // }

    //LifeCycle Method
    componentDidMount(){
        console.log("등록 or 수정 " +  this.state.id);
        //등록
        if(this.state.id === '_add'){
            return
        //수정    
        }else{
            EmployeeService.getEmployeeById(this.state.id)
            .then( (res) =>{
                const employee = res.data;
                const { firstName, lastName, emailId } = employee;

                this.setState({firstName,lastName, emailId});
            })
            .catch(error => {
                console.log("==> getEmployeeById Error Occurred ");
                console.log(JSON.stringify(error));
            });
        }        
    }
    saveOrUpdateEmployee = (e) => {
        const { firstName, lastName, emailId } = this.state;

        e.preventDefault();
        let employee = { firstName, lastName, emailId };
        console.log('employee => ' + JSON.stringify(employee));

        // 등록
        if(this.state.id === '_add'){
            EmployeeService.createEmployee(employee)
            .then(res =>{
                this.props.history.push('/employees');
            })
            .catch(error => {
                console.log("==> createEmployee Error Occurred ");
                //console.log(JSON.stringify(error));
                console.log(error.response.status);
                if(error.response.status === 400){
                    this.dialog.showAlert('입력항목 확인하세요! '+ JSON.stringify(error.response.data));
                }
            });
        }else{
            EmployeeService.updateEmployee(employee, this.state.id)
            .then( res => {
                this.props.history.push('/employees');
            })
            .catch(error => {
                console.log("==> updateEmployee Error Occurred ");
                console.log(JSON.stringify(error));
            });
        }
    }//saveOrUpdateEmployee
    
    changeEmployeeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }//changeEmployeeHandler

    cancel = () => {
        this.props.history.push('/employees');
    }

    getTitle = () => {
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add Employee</h3>
        }else{
            return <h3 className="text-center">Update Employee</h3>
        }
    }
    render() {
        const { firstName, lastName, emailId } = this.state;
        const { changeEmployeeHandler, getTitle, cancel, saveOrUpdateEmployee } = this;

        return (
            <div>
                <Dialog ref={(el) => { this.dialog = el }} />
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                {
                                    getTitle()
                                }
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> First Name: </label>
                                            <input placeholder="First Name" name="firstName" className="form-control" 
                                                value={firstName} onChange={changeEmployeeHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Last Name: </label>
                                            <input placeholder="Last Name" name="lastName" className="form-control" 
                                                value={lastName} onChange={changeEmployeeHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Email Id: </label>
                                            <input placeholder="Email Address" name="emailId" className="form-control" 
                                                value={emailId} onChange={changeEmployeeHandler}/>
                                        </div>

                                        <button className="btn btn-success" onClick={saveOrUpdateEmployee}>Save</button>
                                        <button className="btn btn-danger" onClick={cancel} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default CreateEmployeeComponent
