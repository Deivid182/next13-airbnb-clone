import EmptyState from "../components/EmptyState"
import ClientOnly from "../components/ClientOnly"
import getCurrentUser from "../actions/getCurrentUser"
import getFavoriteListings from "../actions/getFavoriteListings"
import FavoritesClient from "./FavoritesClient"

const FavoritesView = async () => {

  const currentUser = await getCurrentUser()
  const listings = await getFavoriteListings()

  if(listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState 
          title="No favorites yet"
          subtitle="Try to add some to your favorites and then come back"
        />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <FavoritesClient 
        currentUser={currentUser}
        listings={listings}
      />
    </ClientOnly>
  )

}

export default FavoritesView