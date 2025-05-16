import { Header } from "components"

const Dashboard = () => {
  const user = {name : "Manoj"}
  return (
    <main className="dashboard wrapper">
      <Header 
      // @ts-ignore
      title={`Welcome ${user?.name ?? 'user'} 👋`}
      description = "Track activities , trends and popular destination"
      />
      dashboard page content

    </main>
  )
}

export default Dashboard
