
import { useEffect, useState } from 'react'
import './App.css'
import ListExpenses from './Expense Tracker/Components/ListExpenses'
import Form from './components/Form'
import ExpenseFilter from './Expense Tracker/Components/ExpenseFilter'
import ExpenseForm from './Expense Tracker/Components/ExpenseForm'
import ListProducts from './components/ListProducts'
import axios, { CanceledError } from 'axios';

interface User{
  id: number,
  name: string,
}


function App() {
 
  const [selectedCategory, setSelectedCategory] = useState('');

  const [expenses, setExpenses] = useState([
    { id: 1, description: 'aaa', amount: 9, category: 'Furniture' },
    { id: 2, description: 'bba', amount: 9, category: 'Groceries' },
    
  ])

  const visibleCategory = selectedCategory ?
    expenses.filter((e) => e.category === selectedCategory) : expenses;
  //fetching data with axios 
  const [users, setUsers] = useState<User[]>([]);
  //handling error
  const [error, setError] = useState('');

  //showing a loading spinner
  const [isLoading, setLoading] = useState(false)


  useEffect(() => {

    const controller = new AbortController();
    setLoading(true);

    axios.get<User[]>('https://jsonplaceholder.typicode.com/users', {signal: controller.signal})
      .then((res) => {
        setUsers(res.data);
        setLoading(false)
      })
      .catch(err => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);

      })
    
      
  }, []);

  const deleteUser = (user: User) => {

    const originalUsers = [...users];

    //deleting user by id logic
    setUsers(users.filter(u => u.id !== user.id));

    //persisting the operation 
    axios.delete('https://jsonplaceholder.typicode.com/users' + user.id)
      .catch(err => {
        setError(err.message)
        setUsers(originalUsers);
    })
  }
 
  const addUser = () => {
    const newUser = { id: 0, name: 'Elton Ruiy' };
    const originalUsers = [...users];
    setUsers([newUser, ...users]);

    axios.post('https://jsonplaceholder.typicode.com/users' + newUser)
      .then(({ data: savedUser }) => setUsers([savedUser, ...users]))
      .catch(err => {
        setError(err.message);
        setUsers(originalUsers)
      })
  }
  
  const updateUser = (user: User) => {
    const originalUsers = [...users];
    const updatedUser = { ...user, name: user.name + '!' };
    setUsers(users.map(u => u.id === user.id? updatedUser: u))
    
    axios.patch('https://jsonplaceholder.typicode.com/users', )
  }

  return (
    <div className="App">

      {error && <p className='text-danger'>{error}</p>}
      {isLoading && <div className="spinner-border"></div>}
      <button className="btn btn-primary mb-3" onClick={addUser}>Add</button>
      
      <ul className='list-group'>
        {users.map((user) => <li key={user.id} className='list-group-item d-flex justify-content-between'>
          {user.name}
          <div>
            <button className="btn btn-outline-danger" onClick={() => deleteUser(user)}>Delete</button>
            <button className="btn btn-outline-secondary mx-1" onClick={()=> updateUser(user)}>Update</button>

          </div>
        </li>)}
      </ul>

      {/*<ExpenseForm onSubmit={(expense) => setExpenses([...expenses, { ...expense, id: expenses.length + 1 }])}/>

      <div className="mb-3">
        <ExpenseFilter onSelected={(category) => setSelectedCategory(category)}/>
      </div>
      <ListExpenses expenses={visibleCategory} onDelete={(id) =>
        setExpenses(expenses.filter(e => e.id !== id)}}/>*/}
      
   
    </div>
  )
}

export default App
