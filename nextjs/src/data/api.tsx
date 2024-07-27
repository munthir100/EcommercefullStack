export default function getCountries() {
    return fetch('http://localhost:8000/api/countries', {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })
        .then(res => res.json())
        .then(data => {
            return data;
        })
        .catch(error => { throw new Error(error) });
}
