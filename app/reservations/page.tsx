import ClientOnly from "../components/ClientOnly"
import EmptyState from "../components/EmptyState"
import getCurrentUser from "../actions/getCurrentUser"
import getReservations from "../actions/getReservations"
import ReservationsClient from "./ReservationsClient"


const ReservationsView = async () => {

  const currentUser = await getCurrentUser()
  
  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState 
          title="Unauthorized"
          subtitle="You must be logged in to view reservations"
          />
      </ClientOnly>
    )
  }
  const reservations = await getReservations({
    authorId: currentUser.id
  })

  if(reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState 
          title="No reservations"
          subtitle="Looks like you don't have any reservations"
        />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <ReservationsClient 
        reservations={reservations}
        currentUser={currentUser}
      />
    </ClientOnly>
  )
}

export default ReservationsView