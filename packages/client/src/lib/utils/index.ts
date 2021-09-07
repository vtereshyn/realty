import { GOOGLE_MAP_SCRIPT_BASE_URL } from '../constants';

export const logout = () =>
  Promise.resolve().then(() => localStorage.setItem('token', ''));

export async function geocodeLatLng(args: { lat: number; lng: number }) {
  const geocoder = new google.maps.Geocoder();
  const { results } = await geocoder.geocode({ location: args });
  return results[0].formatted_address;
}

export function loadGoogleMapScript() {
  const scripts = Array.prototype.slice.call(document.scripts);

  if (scripts.some(script => script.src === GOOGLE_MAP_SCRIPT_BASE_URL)) {
    return Promise.resolve();
  }

  const el = document.createElement('script');
  el.src = GOOGLE_MAP_SCRIPT_BASE_URL;

  document.body.appendChild(el);

  return new Promise(resolve => {
    el.addEventListener('load', () => resolve({}));
  });
}
