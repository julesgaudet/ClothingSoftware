export default function getBrand() {
  const queryString = window.location.search;
  const parametresURL = new URLSearchParams(queryString);
  return parametresURL.get("brand");
}
