import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Video from 'App/Models/Video'
import Location from 'App/Models/Location'
import StorePhotoValidator from 'App/Validators/StorePhotoValidator'
import Helpers from '@ioc:Adonis/Core/Helpers';
import Application from '@ioc:Adonis/Core/Application'
import path from 'path';
import Database from '@ioc:Adonis/Lucid/Database'
import { string } from '@ioc:Adonis/Core/Helpers'

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

            const nameFile = `${string.generateRandom(32)}.${video.subtype}`
                await video.move(Application.tmpPath('photo'),{
                    name: nameFile
                })

            const newVideo = await Video.create({
                description: description,
                video: `photo/${nameFile}`,
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
        let {video, description, locationId} = await request.body()
        video = request.file('video', {
            size: '10mb',
            extnames: ['mp4', 'mov', 'avi']
        })
        try {
    
            const existingVideo = await Video.query()
                .where({
                    id: id,
                })
                .firstOrFail();
    
            if (video !== null) {
                // await newPhoto.move(Application.tmpPath('photo'));
    
                // const shortenedPath = path.relative(Application.tmpPath('photo'), newPhoto.filePath);
                const nameFile = `${string.generateRandom(32)}.${video.subtype}`
                await video.move(Application.tmpPath('photo'),{
                    name: nameFile
                })

                existingVideo.merge({
                    description: description,
                    video: `photo/${nameFile}`,
                    locationId: locationId,
                });
            } else {
                existingVideo.merge({
                    description: description,
                    locationId: locationId,
                });
            }
    
            await existingVideo.save();
    
            return response.json({
                message: 'success update video'
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
            }).firstOrFail()

            await video.delete()

            return response.json({
                message: 'Success delete data'
            })
    }
}
