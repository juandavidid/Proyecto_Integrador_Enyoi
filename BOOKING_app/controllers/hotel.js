import Hotel from "../models/Hotel.js"

export const createHotel = async (req, res, next) => {
    const newHotel = new Hotel(req.body)
    try {
        const savedHotel = await newHotel.save()
        res.status(200).json(savedHotel)
    } catch (err) {
        next(err);

    }
}

export const updateHotel = async (req, res, next) => {
    try {
        const updateHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(updateHotel)
    } catch (err) {
        next(err);

    }
}

export const deleteHotel = async (req, res, next) => {
    try {
        await Hotel.findByIdAndDelete(req.params.id)
        res.status(200).json("Hotal has been deleted")
    } catch (err) {
        next(err);

    }
}

export const getHotel = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id)
        res.status(200).json(hotel)
    } catch (err) {
        next(err);

    }
}

export const getHotels = async (req, res, next) => {

    const { featured, limit, ...otherFilters } = req.query; // Desestructuracion de Objetos
    try {


        // Crear un objeto de filtros
        let filters = { ...otherFilters };
        // Si el filtro 'featured' está presente, agregarlo a los filtros
        if (featured) {
            filters.featured = featured === 'true'; // Convertir a booleano
        }

        // Convertir 'limit' a número
        //const limitNumber = Number(limit);

        // Agregar mensajes de registro
        console.log('Filters:', filters);
        //console.log('Limit:', limitNumber);

        // Ejecutar la consulta con los filtros y límite
        const hotels = await Hotel.find(req.query).limit(req.query.limit);
        console.log(hotels)

        res.status(200).json(hotels);


        /*

        const  parametos= req.query
        const hotels = await Hotel.find(req.query).limit(3)
        console.log(req.query);
        console.log(hotels);
        res.status(200).json(hotels)
        */
    } catch (err) {
        next(err);

    }
}

export const countByCity = async (req, res, next) => {
    const cities = req.query.cities.split(",")
    try {
        const list = await Promise.all(cities.map(city => {
            return Hotel.countDocuments({ city: city })
        }))
        res.status(200).json(list)
    } catch (err) {
        next(err);

    }
}

export const countByType = async (req, res, next) => {

    try {
        const hotelCount = await Hotel.countDocuments({ type: "hotel" })
        const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
        const resortCount = await Hotel.countDocuments({ type: "resort" });
        const villaCount = await Hotel.countDocuments({ type: "villa" });
        const cabinCount = await Hotel.countDocuments({ type: "cabin" });
        /*
        const list = await Promise.all(cities.map(city => {
            return Hotel.countDocuments({ city: city })
        }))
        */
        res.status(200).json([
            { type: "hotel", count: hotelCount },
            { type: "apartments", count: apartmentCount },
            { type: "resorts", count: resortCount },
            { type: "villas", count: villaCount },
            { type: "cabins", count: cabinCount },

        ]);
    } catch (err) {
        next(err);

    }
}