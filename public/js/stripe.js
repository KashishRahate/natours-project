/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe(
  'pk_test_51OzkHeEZP4giZ0iVb1plshTkoIYfUBucFkLJubtUnsiJw7KLmWoPsiYw4XsqUcVpyD09kGHPsqEAt1xFb40irY3n004LrqRsDH',
);

export const bookTour = async (tourId) => {
  try {
    // 1) Get checkout session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
    console.log('Session:', session);
    if (!session || !session.data) {
      throw new Error('Invalid session data received');
    }

    // Check if session.data.session exists
    if (!session.data.session) {
      throw new Error('Invalid session object received');
    }

    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
