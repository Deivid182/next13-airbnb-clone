import getCurrentUser from "./actions/getCurrentUser";
import { IListingParams, getListings } from "./actions/getListings";
import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import ListingCard from "./components/listings/ListingCard";

export const dynamic = "force-dynamic"

interface HomeProps {
  searchParams: IListingParams
}

const Home = async ({ searchParams } : HomeProps) => {

  const isEmpty = true;
  const listings = await getListings(searchParams)
  const currentUser = await getCurrentUser()

  if(!listings.length) {
    return (
      <ClientOnly>
        <EmptyState showReset/>
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <Container>
        <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {listings.map((listing) => (
            <ListingCard 
              data={listing}
              currentUser={currentUser} 
              key={listing.id}
            />
          ))}
        </div>
      </Container>
    </ClientOnly>
  )
}

export default Home;