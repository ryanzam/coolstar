import { getUserBookings } from "@/app/api/booking";
import BookingHeader from "../../../../components/booking/BookingHeader"
import BookingCard from "@/components/booking/BookingCard";
import { requireAuth } from "@/app/api/auth";
import { redirect } from "next/navigation";

const DashboardCustomersPage = async () => {

  const session = await requireAuth();

  if (!session?.user) {
    redirect("/signin")
  }

  const bookings = await getUserBookings(session.user.id);

  const newBookings = bookings?.data?.filter(booking => booking.status === 'PENDING') || [];
  const oldBookings = bookings?.data?.filter(booking => booking.status !== 'PENDING') || [];

  const getNewBookings = () => {
    if (newBookings.length === 0) {
      return <BookingHeader title="No new bookings" description="Book a service" />
    }
    return (
      newBookings.map((booking: any) => (
        <BookingCard key={booking.id} booking={booking} />
      ))
    )
  }

  return (
    <main className="pt-10 min-h-screen frost-bg">
      <section className="py-16">
        <div className="container mx-auto px-4">
          {bookings?.data && bookings?.data?.length > 0 ? (
            <div className="flex gap-8 flex-col">
              <div>
                <p className="font-semibold pb-2">Your booking (s)</p>
                {getNewBookings()}
              </div>

              <div>
                <p className="font-semibold pb-2">Past booking (s)</p>
                <div className="flex flex-col gap-3">
                  {oldBookings.map((booking: any) => (
                    <BookingCard key={booking.id} booking={booking} />
                  ))}
                </div>
              </div>
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