import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Photo from 'App/Models/Photo'
import Location from 'App/Models/Location'
import StorePhotoValidator from 'App/Validators/StorePhotoValidator'
// import string from 'randomstring'
import Helpers from '@ioc:Adonis/Core/Helpers';
import Application from '@ioc:Adonis/Core/Application'
import path from 'path';
import Database from '@ioc:Adonis/Lucid/Database'
import { string } from '@ioc:Adonis/Core/Helpers'

export default class PhotosController {
    public async index ({response}: HttpContextContract) {
        const photos = await Photo.query()
        // console.log(photos)
        return response.json({
        data: {
            photos: photos
        }
        })
    }

    public async store({request, response, auth}: HttpContextContract){
        try{
            let {name, photo, latitude, longitude, provinsi, kabupaten_kota, kecamatan, desa, date, locationId} = await request.body()
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
                photo = request.file('photo', {
                    size: '2mb',
                    extnames: ['jpg','png','jpeg']
                })
    
                const nameFile = `${string.generateRandom(32)}.${photo.subtype}`
                await photo.move(Application.tmpPath('photo'),{
                    name: nameFile
                })
                const newPhoto = await Photo.create({
                    name: name,
                    photo: `photo/${nameFile}`,
                    locationId: location.id,
                    userId: auth?.user?.id
                },{client: trx})
            });
                
            return response.json({
                message: 'success insert photo'
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
        const photo = await Photo.query()
            .where('id', id)
            .preload('location')
            .firstOrFail()

        return response.json({
            message: 'success',
            photo: photo,
        })
    }

    // public async update({params, request, response, auth}: HttpContextContract) {
    //     const {id} = params
    //     const {name, photo: newPhoto, locationId} = request.body()

    //     const existingPhoto = await Photo.query().where({
    //         id: id,
    //         userId: auth?.user?.id
    //     }).firstOrFail()
    //     existingPhoto.merge({
    //         name: name,
    //         photo: newPhoto,
    //         locationId: locationId,
    //     }).save()

    //     return response.json({
    //         message: 'success update photo'
    //     })
    // }

    public async update({ params, request, response}: HttpContextContract) {
        const { id } = params;
        let { name, photo, locationId } = await request.body();
        photo = request.file('photo', {
            size: '2mb',
            extnames: ['jpg','png','jpeg']
        })
        try {
            const existingPhoto = await Photo.query()
                .where({
                    id: id,
                })
                .firstOrFail();
            if (photo !== null) {
                const nameFile = `${string.generateRandom(32)}-updated.${photo.subtype}`
                await photo.move(Application.tmpPath('photo'),{
                    name: nameFile
                })

                existingPhoto.merge({
                    name: name,
                    photo: `photo/${nameFile}`,
                    locationId: locationId,
                });
            } else {
                existingPhoto.merge({
                    name: name,
                    locationId: locationId,
                });
            }
    
            await existingPhoto.save();
    
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
    


    public async destroy({ params, response}: HttpContextContract) {
        const {id} = params

        const photo = await Photo.query()
            .where({
                id: id,
            }).firstOrFail()

            await photo.delete()

            return response.json({
                message: 'Success delete data'
            })
    }
}
