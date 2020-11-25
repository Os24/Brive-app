import React, { useState } from 'react'
import RecordRTC from 'recordrtc'
import './EmployeeTable.css'

function EmployeeTable() {
    const [employeeName, setEmployeeName] = useState('');
    const [employeeLastName, setEmployeeLastName] = useState('');
    const [company, setCompany] = useState('');
    const [salary, setSalary] = useState('');
    const [employeeId, setEmployeeId] = useState('');
    const [enableEditing, setEnableEditng] = useState(false)
    const [searchItem, setSearchItem] = useState('')
    const [searchResults, setSearchResults] = useState([]);
    const [changeCurrency, setChangeCurrency] = useState(false)
    const [currencyUSD, SetCurrencyUSD] = useState('')
    const [employees, setEmployees] = useState([{
        company: 'Another company',
        name: 'Oscar',
        lastName: 'Lopez',
        salary: '16900.6734',

    }, {
        company: 'Brive',
        name: 'Adriana',
        lastName: 'Martinez',
        salary: '8900',
    }, {
        company: 'Random Company',
        name: 'Mario',
        lastName: 'Mendoza',
        salary: '68000.34322',
    }])
    
    const addEmployee = event => {
        event.preventDefault()
        const newEmployee = [...employees, {
            name: employeeName,
            company,
            salary,
            lastName: employeeLastName
        }]
        setEmployees(newEmployee)
        setEmployeeName('');
        setEmployeeLastName('');
        setCompany('');
        setSalary('');
    }
    const editEmployee = event => {
        event.preventDefault()
        const editEmployee = employees.map((employee, i) =>
            i === employeeId ?
                {
                    name: employeeName,
                    salary,
                    lastName: employeeLastName,
                    company,
                } : employee
        )
        setEmployees(editEmployee)
        setEmployeeName('');
        setEmployeeLastName('');
        setCompany('');
        setSalary('');
        setEnableEditng(false)
    }

    const handleEdit = (item, i) => {
        const { name, lastName, salary, company } = item
        setEmployeeName(name);
        setEmployeeLastName(lastName);
        setSalary(salary)
        setCompany(company)
        setEnableEditng(true)
        setEmployeeId(i)
    }

    const handleAddPhoto = () => {
        console.log("well hello")
    }

    const searchBy = event => {
        setSearchItem(event.target.value)
      
    }
    const filteredEmployees = employees.filter(employee =>
        employee.name.toLowerCase().includes(searchItem.toLowerCase()) ||
        employee.company.toLowerCase().includes(searchItem.toLowerCase())
    )
    
    const changeCurrencytoUSD = () => {
        if (!changeCurrency) {
            setChangeCurrency(true)
            const usdSalaries = employees.map(employee =>
                (employee.salary / 21.6))
            SetCurrencyUSD(usdSalaries)
        } else {
            setChangeCurrency(false)
            const usdSalaries = employees.map(employee =>
                (employee.salary * 21.6))
            SetCurrencyUSD(usdSalaries)
        }
    }

    return (
        <div>
            <section className='table-section'>
                <picture>
                    <img
                        src="https://f.hubspotusercontent10.net/hubfs/5506418/logo_brive.png" alt="brive-logo" />
                </picture>
                <h2>Tabla de empleados</h2>
                <input type="text"
                    name="search"
                    onChange={e => searchBy(e)}
                    value={searchItem}
                    placeholder='Buscar por nombre o empresa'
                />
                <table>
                    <thead>
                        <tr>
                            <th>Empresa</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Salario</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredEmployees.length !== 0 ?
                            filteredEmployees.map((employee, i) =>
                                    (<tr key={i}>
                                        <th>{employee.company}</th>
                                        <td>{employee.name}</td>
                                        <td>{employee.lastName}</td>
                                        <td className={employee.salary <= 9999 ? 'red' : 'green'}>
                                            {new Intl.NumberFormat('en-US',
                                                {
                                                    style: 'currency',
                                                    currency: 'USD'
                                                })
                                                .format(changeCurrency ? currencyUSD[i] : employee.salary)}
                                        </td>
                                        <td>
                                            <button onClick={() => handleEdit(employee, i)}>Editar</button>
                                        </td>
                                        <td>
                                            <button onClick={() => handleAddPhoto(employee)}>Agregar foto</button>
                                        </td>
                                    </tr>)
                                ) : employees.map((employee, i) =>
                                    (<tr key={i}>
                                        <th>{employee.company}</th>
                                        <td>{employee.name}</td>
                                        <td>{employee.lastName}</td>
                                        <td className={employee.salary <= 9999 ? 'red' : 'green'}>
                                            {new Intl.NumberFormat('en-US',
                                                {
                                                    style: 'currency',
                                                    currency: 'USD'
                                                })
                                                .format(changeCurrency ? currencyUSD[i] : employee.salary)}
                                        </td>
                                        <td>
                                            <button onClick={() => handleEdit(employee, i)}>Editar</button>
                                        </td>
                                        <td>
                                            <button onClick={() => handleAddPhoto(employee)}>Agregar foto</button>
                                        </td>
                                    </tr>)
                                )
                        }
                    </tbody>
                </table>
                <div className="currency-container">
                    <button onClick={() => changeCurrencytoUSD()}>{changeCurrency ? 'salario en MXN' : 'Salario en USD'}</button>
                    <h4>Total de empleados:{employees.length}</h4>
                </div>
            </section>
            <section>
                <div className="form-section">
                    <form onSubmit={enableEditing ? editEmployee : addEmployee}>

                        <label >Compañia:</label>
                        <br />
                        <input
                            type="text"
                            name="company"
                            onChange={e => setCompany(e.target.value)}
                            value={company}
                            disabled={enableEditing}
                        />
                        <br />
                        <label >Nombre:</label>
                        <br />
                        <input
                            type="text"
                            name="employeeName"
                            onChange={e => setEmployeeName(e.target.value)}
                            value={employeeName}
                        />
                        <br />
                        <label >Apellido:</label>
                        <br />
                        <input
                            type="text"
                            name="employeeLastName"
                            onChange={e => setEmployeeLastName(e.target.value)}
                            value={employeeLastName}
                        />
                        <br />
                        <label >Salario:</label>
                        <br />
                        <input
                            type="text"
                            name="salary"
                            onChange={e => setSalary(e.target.value)}
                            value={salary}
                        />
                        <br />

                        <button type="submit">{enableEditing ? 'Editar empleado' : 'Agregar empleado'}</button>
                    </form>
                </div>
            </section>
        </div>
    )
}

export default EmployeeTable


