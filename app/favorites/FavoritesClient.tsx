import { Listing, User } from "@prisma/client"
import ClientOnly from "../components/ClientOnly"
import Heading from "../components/Heading"
import ListingCard from "../components/listings/ListingCard"
import Container from "../components/Container"

interface FavoritesClientProps {
  currentUser?: User | null
  listings: Listing[]
}

const FavoritesClient: React.FC<FavoritesClientProps> = ({ currentUser, listings }) => {



  return (
    <Container>
      <Heading 
        title="Favorites"
        subtitle="These are your favorite listings"
      />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listing: any) => (
          <ListingCard 
            currentUser={currentUser}
            key={listing.id}
            data={listing}
          />
        ))}
      </div>
    </Container>
  )
}

export default FavoritesClient