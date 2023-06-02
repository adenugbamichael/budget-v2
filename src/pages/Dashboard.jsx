/* eslint-disable react-refresh/only-export-components */
// rrd imports
import { useLoaderData } from "react-router-dom"

//  helper functions
import { createBudget, fetchData, waait } from "../helpers"
// components
import Intro from "../components/Intro"
import AddBudgetForm from "../components/AddBudgetForm"
import AddExpenseForm from "../components/AddExpenseForm"

// library import
import { toast } from "react-toastify"

// loader
export function dashboardLoader() {
  const userName = fetchData("userName")
  const budgets = fetchData("budgets")
  return { userName, budgets }
}

// action
export async function dashboardAction({ request }) {
  await waait()

  const data = await request.formData()
  const { _action, ...values } = Object.fromEntries(data)

  // new User submission
  if (_action === "newUser") {
    try {
      localStorage.setItem("userName", JSON.stringify(values.userName))
      return toast.success(`Welcome, ${values.userName}`)
    } catch (e) {
      throw new Error("There was a creating your account")
    }
  }
  if (_action === "createBudget") {
    try {
      createBudget({
        name: values.newBudget,
        amount: values.newBudgetAmount,
      })
      return toast.success("Budget created!")
    } catch (e) {
      throw new Error("There was a problem creating your budget.")
    }
  }
}

const Dashboard = () => {
  const { userName, budgets } = useLoaderData()

  return (
    <>
      {userName ? (
        <div className='dashboard'>
          <h1>
            Welcome back, <span className='accent'>{userName}</span>
          </h1>
          <div className='grid-sm'>
            {budgets && budgets.length > 0 ? (
              <div className='grid-lg'>
                <div className='flex-lg'>
                  <AddBudgetForm />
                  <AddExpenseForm budget={budgets} />
                </div>
              </div>
            ) : (
              <div className='grid-sm'>
                <p>Personal budgeting is the secret to financial freedom.</p>
                <p>Create a budget to get started!</p>
                <AddBudgetForm />
              </div>
            )}
          </div>
        </div>
      ) : (
        <Intro />
      )}
    </>
  )
}
export default Dashboard
