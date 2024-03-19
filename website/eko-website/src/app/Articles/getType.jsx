export default function getType() {
  const queryString = window.location.search;
  const parametresURL = new URLSearchParams(queryString);
  return parametresURL.get("type");
}
