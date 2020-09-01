let baseUri = 'http://localhost:5000'

window.onload = async (e) => {

    var cases = []
    var totalCases = 0
    var totalRecovered = 0
    var totalActive = 0
    var totalDeath = 0
    var country = 'World'

    var getGlobalCases = () => {

        return fetch(baseUri + '/cases').then((response) => {
            return response.json()
        }).then((res) => {
            cases = res
        })
            .catch((err) => {
                console.log(err)
            })
    }

    var activeCases = (country) => {
        return fetch(baseUri + '/' + country + '/active').then((response) => {
            return response.json()
        }).then((res) => {
            document.querySelector('#loading').innerHTML = ''
            totalActive = res
        })
            .catch((err) => {
                console.log(err)
            })
    }

    var recoveredCases = (country) => {
        return fetch(baseUri + '/' + country + '/recovered').then((response) => {
            return response.json()
        }).then((res) => {
            document.querySelector('#loading').innerHTML = ''
            totalRecovered = res
        })
            .catch((err) => {
                console.log(err)
            })
    }

    var deathCases = (country) => {
        return fetch(baseUri + '/' + country + '/deaths').then((response) => {
            return response.json()
        }).then((res) => {
            document.querySelector('#loading').innerHTML = ''
            totalDeath = res
        })
            .catch((err) => {
                console.log(err)
            })
    }

    var countryTotalCases = (country) => {
        return fetch(baseUri + '/' + country + '/cases').then((response) => {
            return response.json()
        }).then((res) => {
            document.querySelector('#loading').innerHTML = ''
            totalCases = res
        })
            .catch((err) => {
                console.log(err)
            })
    }

    await getGlobalCases()
    await activeCases(country)
    await recoveredCases(country)
    await deathCases(country)
    await countryTotalCases(country)

    document.querySelector('#loading').style.display = 'none'

    document.querySelector('#total-cases').innerHTML = totalCases
    document.querySelector('#total-recovered').innerHTML = totalRecovered
    document.querySelector('#total-active').innerHTML = totalActive
    document.querySelector('#total-deaths').innerHTML = totalDeath

    var tbody = document.querySelector('#td');
    for (var data of cases) {
        var tr = tbody.appendChild(document.createElement('tr'));
        tr.setAttribute('onclick', `getCountry('${data.country}')`)
        tr.appendChild(document.createElement('td')).innerHTML = data.country
        tr.appendChild(document.createElement('td')).innerHTML = data.active
        tr.appendChild(document.createElement('td')).innerHTML = data.recovered
        tr.appendChild(document.createElement('td')).innerHTML = data.deaths
        tr.appendChild(document.createElement('td')).innerHTML = data.cases
    }
}

function getCountry(country) {
    fetch(baseUri + '/cases/' + country).then((response) => {
        return response.json()
    }).then((res) => {
        console.log(res)
    })
        .catch((err) => {
            console.log(err)
        })
}