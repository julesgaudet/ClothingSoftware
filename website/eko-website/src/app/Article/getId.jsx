export default function Article() {
    const router = useRouter();
    const queryString = window.location.search;
    const parametresURL = new URLSearchParams(queryString);
    const id = parametresURL.get("id");
}