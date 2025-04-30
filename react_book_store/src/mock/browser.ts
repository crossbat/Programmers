import { setupWorker } from 'msw/browser'
import { addReview, reviewsById } from "./reviews";

const handlers = [reviewsById, addReview];

export const worker = setupWorker(...handlers)
