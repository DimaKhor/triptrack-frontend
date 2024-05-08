// PlaceService.ts

import axios from "axios";

export default class PlaceService {
    static async GetListLocations(location: string, limit: number) {
        return await axios.get('https://nominatim.openstreetmap.org/search', {
            params: {
                q: location,
                format: 'json',
                limit: limit,
            }
        })
    }
}
