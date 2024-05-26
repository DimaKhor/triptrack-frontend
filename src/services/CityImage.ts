import axios from "axios";

export default class CityImage {
    static async GetCityPhoto(city: string, apiKey: string) {
        try {
            const response = await axios.get('https://api.unsplash.com/search/photos', {
                params: {
                    query: `${city} city architecture`,
                    client_id: apiKey,
                }
            });
            const photos = response.data.results;
            if (photos.length > 0) {
                return photos[0].urls.regular;
            } else {
                throw new Error('Изображение не найдено');
            }
        } catch (error) {
            console.error('Ошибка при получении изображения города:', error);
            throw error;
        }
    }
}