import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";

import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";


import React from 'react'
import TripsClient from "./TripsClient";

const TripsView = async () => {

  const currentUser = await getCurrentUser();

  if(!currentUser) {
    return (
      <ClientOnly>
        <EmptyState 
          title="You must be logged in to view your trips"
          subtitle="Come back later"
        />
      </ClientOnly>
    )
  }

  const reservations = await getReservations({
    userId: currentUser.id
  });

  if(!reservations) {
    return (
      <ClientOnly>
        <EmptyState 
          title="You have no reservations"
          subtitle="Come back later when you have some"
        />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <TripsClient 
        reservations={reservations}
        currentUser={currentUser}
      />
    </ClientOnly>
  )
}

export default TripsView