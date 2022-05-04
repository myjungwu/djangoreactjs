import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService'
import Dialog from 'react-bootstrap-dialog';
class ListEmployeeComponent extends Component {
    //state객체
    state = {
        //상태변수  
        employees: []
    }

    //Life Cycle Method
    componentDidMount() {
        EmployeeService.getEmployees() //Promise
            .then((res) => {
                console.log(res.data);
                this.setState({ employees: res.data });
            }).catch(error => {
                console.log("==> getEmployees Error Occurred ");
                console.log(JSON.stringify(error));
            });
    }

    //Event Handler Method
    deleteEmployee = (id) => {
        this.dialog.show({
            title: 'Employee Delete',
            body: 'Are you sure you want to delete it?',
            actions: [
              Dialog.CancelAction(),
              Dialog.OKAction(
                () => {
                    console.log('Remove action will be executed!')
                    EmployeeService.deleteEmployee(id)
                    .then( res => {
                        this.setState({employees: this.state.employees.filter(employee => employee.id !== id)});
                    })
                    .catch(error => {
                        console.log("==> deleteEmployee Error Occurred ");
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                    });
                }
              )
            ],
            bsSize: 'small',
            onHide: (dialog) => {
              dialog.hide()
              console.log('closed by clicking background.')
            }
          });
    }//deleteEmployee

    viewEmployee = (id) => {
        this.props.history.push(`/view-employee/${id}`);
    }//viewEmployee

    //수정
    editEmployee = (id) => {
        this.props.history.push(`/add-employee/${id}`);
    }//editEmployee
    
    //등록
    addEmployee =() => {
        this.props.history.push('/add-employee/_add');
    }//addEmployee

    render() {
        const { addEmployee, editEmployee, deleteEmployee, viewEmployee } = this;
        const { employees } = this.state;

        return (
            <div>
                <Dialog ref={(el) => { this.dialog = el }} />
                <h2 className="text-center">Employees List</h2>
                <div className="row">
                    <button className="btn btn-primary" onClick={addEmployee}>Add Employee</button>
                </div>
                <br></br>
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th> Employee First Name</th>
                                <th> Employee Last Name</th>
                                <th> Employee Email Id</th>
                                <th> Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                employees.map(
                                    employee =>
                                        <tr key={employee.id}>
                                            <td> {employee.firstName} </td>
                                            <td> {employee.lastName}</td>
                                            <td> {employee.emailId}</td>
                                            <td>
                                                <button onClick={() => editEmployee(employee.id)} className="btn btn-info">Update </button>
                                                <button style={{ marginLeft: "10px" }} onClick={() => deleteEmployee(employee.id)} className="btn btn-danger">Delete </button>
                                                <button style={{ marginLeft: "10px" }} onClick={() => viewEmployee(employee.id)} className="btn btn-info">View </button>
                                            </td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>

                </div>

            </div>
        )
    }
}

export default ListEmployeeComponent
