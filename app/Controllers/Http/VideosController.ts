import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Video from 'App/Models/Video'
import Location from 'App/Models/Location'
import Application from '@ioc:Adonis/Core/Application'
import path from 'path';

export default class VideosController {
    public async index ({response}: HttpContextContract) {
        const videos = await Video.query()
        return response.json({
        data: {
            videos: videos
        }
        })
    }

    public async store({request, response, auth}: HttpContextContract){
        
        try{
            let {video, description, latitude, longitude, provinsi, kabupaten_kota, kecamatan, desa, date, locationId} = await request.body()
            let location = await Location.query().where('latitude', latitude).andWhere('longitude', longitude).first()
            // Pengecekan apakah locationId ada dan valid
            const result = await Database.transaction(async (trx) => {
            if (!location) {
                location = await Location.create({
                    latitude: latitude,
                    longitude: longitude,
                    provinsi: provinsi,
                    kabupaten_kota: kabupaten_kota,
                    kecamatan: kecamatan,
                    desa: desa,
                    date: date,
                    userId: auth?.user?.id
                },{client: trx});
            }
            video = request.file('video', {
                size: '10mb',
                extnames: ['mp4', 'mov', 'avi']
            })

            // await video.move(Application.tmpPath('video'))

            // const shortenedPath = path.relative(Application.tmpPath('video'), video.filePath);

            const nameFile = `${string.generateRandom(32)}.${video.subtype}`
                await video.move(Application.tmpPath('video'),{
                    name: nameFile
                })

            const newVideo = await Video.create({
                description: description,
                video: `video/${nameFile}`,
                locationId: location.id,
                userId: auth?.user?.id
            },{client: trx})
        });
            return response.json({
                message: 'success insert video'
            })
        }
        catch (error) {
            return response.status(500).json({
                message: 'Internal Server Error',
                error: error.message,
            })
        }

    }

    public async show({params, response}: HttpContextContract) {
        const {id} = params
        const video = await Video.query()
            .where('id', id)
            .preload('location')
            .firstOrFail()

        return response.json({
            message: 'success',
            video: video,
        })
    }

    public async update({params, request, response, auth}: HttpContextContract) {
        const {id} = params
        const {video_url, description, locationId} = request.body()

        try {
    
            const existingVideo = await Video.query()
                .where({
                    id: id,
                    userId: auth?.user?.id
                })
                .firstOrFail();
    
            if (newVideo) {
                // await newPhoto.move(Application.tmpPath('photo'));
    
                // const shortenedPath = path.relative(Application.tmpPath('photo'), newPhoto.filePath);
                const nameFile = `${string.generateRandom(32)}.${video.subtype}`
                await video.move(Application.tmpPath('video'),{
                    name: nameFile
                })

                existingPhoto.merge({
                    description: description,
                    video: `video/${nameFile}`,
                    locationId: location.id,
                });
            } else {
                existingPhoto.merge({
                    description: description,
                    locationId: location.id,
                });
            }
    
            await existingVideo.save();
    
            return response.json({
                message: 'success update photo'
            });
        } catch (error) {
            return response.status(500).json({
                message: 'Internal Server Error',
                error: error.message,
            });
        }
    }


    public async destroy({ params, response, auth}: HttpContextContract) {
        const {id} = params

        const video = await Video.query()
            .where({
                id: id,
                userId: auth?.user?.id
            }).firstOrFail()

            await video.delete()

            return response.json({
                message: 'Success delete data'
            })
    }
}
