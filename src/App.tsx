
import './App.css'
import ListExpenses from './Expense Tracker/Components/ListExpenses'
import Form from './components/Form'

function App() {
 
  const data = [
    { id: 1, description: 'aaa', amount: 9, category: 'furniture' },
    { id: 2, description: 'bba', amount: 9, category: 'furniture' },
    { id: 3, description: 'cca', amount: 9, category: 'furniture' },
    { id: 4, description: 'eea', amount: 9, category: 'furniture' },
  ]

  return (
    <div className="App">
      <ListExpenses expenses={data}  onDelete={(id) => console.log(id)}/>
    </div>
  )
}

export default App
