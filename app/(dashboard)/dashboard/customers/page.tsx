import { getUserBookings } from "@/app/api/booking";
import BookingHeader from "../../../../components/booking/BookingHeader"
import BookingCard from "@/components/booking/BookingCard";

interface DashboardCustomersPageProps {
  user: any
}

const DashboardCustomersPage = async ({ user }: DashboardCustomersPageProps) => {

  const bookings = await getUserBookings(user.id);

  return (
    <main className="pt-20 min-h-screen frost-bg">
      <section className="py-16">
        <div className="container mx-auto px-4">
          {bookings?.data && bookings?.data?.length > 0 ? (
            <div>
              {bookings.data.map((booking: any) => (
                <BookingCard key={booking.id} booking={booking} />
              ))}
            </div>
          ) : (
            <BookingHeader />
          )}

        </div>
      </section>
    </main>
  )
}

export default DashboardCustomersPage