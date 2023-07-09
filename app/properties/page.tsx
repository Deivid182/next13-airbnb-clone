import ClientOnly from "../components/ClientOnly"
import EmptyState from "../components/EmptyState"
import getCurrentUser from "../actions/getCurrentUser"
import getReservations from "../actions/getReservations"
import PropertiesClient from "./PropertiesClient"
import { getListings } from "../actions/getListings"


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
  const listings = await getListings({
    userId: currentUser.id
  })

  if(listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState 
          title="No properties found"
          subtitle="Looks like you don't have any property"
        />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <PropertiesClient 
        listings={listings}
        currentUser={currentUser}
      />
    </ClientOnly>
  )
}

export default ReservationsView