import BookingHeader from "./BookingHeader"

const DashboardPage = () => {

  return (
    <main className="pt-20 min-h-screen frost-bg">
      <section className="py-16">
        <div className="container mx-auto px-4">
          <BookingHeader />
        </div>
      </section>
    </main>
  )
}

export default DashboardPage