import CountrySingleViewer from "./CountrySingleViewer"

const CountryViewer = (props) => {
    const countries = props.countries
    if (countries.length < 1) {
        return (
            <h2>No Data to be shown for now</h2>
        )
    }
    if (countries.length > 10) {
        return (
            <h2>To many matches, specify another filter</h2>
        )
    }
    if (countries.length === 1) {
        const data = countries[0]
        return (
            <CountrySingleViewer country_data={data} />
        )
    }

    if (props.countries.length < 10) {
        return (
            <div>
                <h2>Your search result</h2>
                <ul>
                    {
                        countries.map((value, i) => <li key={i}>{value.name.official} <button onClick={()=>props.loadSpecificCountry(value.name.official)}>Show more</button></li>)
                    }
                </ul>
            </div>
        )
    }

    return (
        <h2>Please be more specific with your search query</h2>
    )
}

export default CountryViewer