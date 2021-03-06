//import axios from 'axios';
import axios from './axios/axios.js';

const EMPLOYEE_API_URL = '/employees';

class EmployeeService {
    //목록조회
    getEmployees(){
        return axios.get(`${EMPLOYEE_API_URL}`);
    }
    //등록
    createEmployee(employee){
        return axios.post(`${EMPLOYEE_API_URL}/`, employee);
    }
    //1개조회
    getEmployeeById(employeeId){
        return axios.get(`${EMPLOYEE_API_URL}/${employeeId}`);
    }
    //수정
    updateEmployee(employee, employeeId){
        return axios.put(`${EMPLOYEE_API_URL}/${employeeId}/`, employee);
    }
    //삭제
    deleteEmployee(employeeId){
        return axios.delete(`${EMPLOYEE_API_URL}/${employeeId}/`);
    }
}

export default new EmployeeService()