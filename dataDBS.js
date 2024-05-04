const obtenerPersonaje = async (id, number) => {
    try{
        const response = await fetch(`https://dragonball-api.com/api/characters/${id}`)
        const data = await response.json()
        console.log(data)

        if (!response.ok) {
            throw new Error('No se pudo obtener el personaje')
        }

        colocarPersonaje(data, number)
    } catch (error) {
        console.error(error)
    }
}

const btnRotar = () => {
    let primerPersonaje = Math.floor(Math.random() * 78)
    let segundoPersonaje = Math.floor(Math.random() * 78)

    while (primerPersonaje === segundoPersonaje || (primerPersonaje > 45 && primerPersonaje < 62) || (segundoPersonaje > 45 && segundoPersonaje < 62)) {
        primerPersonaje = Math.floor(Math.random() * 78)
        segundoPersonaje = Math.floor(Math.random() * 78)
    }

    obtenerPersonaje(primerPersonaje, 1)
    obtenerPersonaje(segundoPersonaje, 2)
    console.log(primerPersonaje, segundoPersonaje);
}

btnRotar()

let listaPersonajes = document.getElementById('personajes')

const colocarPersonaje = (data, number) => {
    let item = listaPersonajes.querySelector(`#per-${number}`)

    let transformation = Math.floor(Math.random() * data.transformations.length)

    if (transformation > 0) {
        item.getElementsByTagName('img')[0].setAttribute('src', data.transformations[transformation].image)
        item.getElementsByTagName('p')[0].innerText = data.transformations[transformation].name
        item.getElementsByTagName('p')[1].innerHTML = `<strong>Ki:</strong> ${data.transformations[transformation].ki}`
    } else {
        item.getElementsByTagName('img')[0].setAttribute('src', data.image)
        item.getElementsByTagName('p')[0].innerText = data.name
        item.getElementsByTagName('p')[1].innerHTML = `<strong>Ki:</strong> ${data.ki === 'unknown' ? 'Desconocido' : data.ki}`
    }
}