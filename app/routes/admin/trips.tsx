import { Header } from "components"

const Trips = () => {
  return (
     <main className="all-users wrapper">
      <Header
        //@ts-ignore
        title={`Trips`}
        description="view and edite AI-generator travel plans "
        ctaText="create a trip"
        ctaUrl="./create"
      />
      </main>

  )
}

export default Trips
