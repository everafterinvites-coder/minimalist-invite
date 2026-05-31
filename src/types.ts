/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface RSVPResponse {
  id: string;
  fullName: string;
  email: string;
  isAttending: boolean;
  hasPlusOne: boolean;
  plusOneName?: string;
  dietaryRestrictions?: string;
  diningPreference?: 'beef' | 'salmon' | 'vegan' | 'none';
  songRequest?: string;
  message?: string;
  submittedAt: string;
}

export interface ScheduleEvent {
  time: string;
  title: string;
  description: string;
  note?: string;
}

export interface Accommodation {
  name: string;
  description: string;
  distance: string;
  priceRange: string;
  promoCode?: string;
  websiteUrl: string;
}
