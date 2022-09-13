const Sensor = require("../db/Models/Sensor");
const KeruhAir = require("../db/Models/Air");
const Lampu = require("../db/Models/Lampu");
const OnOffManual = require("../db/Models/OnOffManual");
const Pump = require("../db/Models/Pump");
const KelembapanTanah = require("../db/Models/Tanah");
const WaterLevel = require("../db/Models/Water");
const Suhu = require("../db/Models/Suhu");

module.exports = {
    storeData: async (payload) => {
        const rawData = payload.toString()
        try {
            const dataJson = await JSON.parse(rawData)
            const newData = await new Sensor(dataJson).save()
        } catch (error) {
            console.error(`Error ${error.message}`)
        }
    },
    storeDataSuhu: async(payload) => {
        const rawData = payload.toString()
        try {
            const dataJson = await JSON.parse(rawData)
            const newData = await new Suhu(dataJson).save()
        } catch (error) {
            console.error(`Error ${error.message}`)
        }
    },
    storeDataLampu: async(payload) => {
        const rawData = payload.toString()
        
        try {
            const dataJson = await JSON.parse(rawData)

            const newData = await Lampu.findOneAndUpdate(
                {
                    _id: "629313a43ffa59bdedee89e7",
                },
                dataJson
            );
        } catch (error) {
            console.error(`Error ${error.message}`)
        }
    },
    getDataLampu: async(payload) => {
        // const rawData = payload.toString()
        try {
            // const dataJson = await JSON.parse(rawData)
            const newData = await Lampu.findOne().select('lampu1 lampu2');
            console.log(newData)
        } catch (error) {
            console.error(`Error ${error.message}`)
        }
    },
    getDataButtonManual: async(payload) => {
        // const rawData = payload.toString()
        try {
            // const dataJson = await JSON.parse(rawData)
            const newData = await OnOffManual.findOne().select('statusKontrol');
            console.log(newData)
        } catch (error) {
            console.error(`Error ${error.message}`)
        }
    },
    getDataPump: async(payload) => {
        // const rawData = payload.toString()
        try {
            // const dataJson = await JSON.parse(rawData)
            const newData = await Pump.findOne().select('pump1 pump2');
            console.log(newData)
        } catch (error) {
            console.error(`Error ${error.message}`)
        }
    },
    storeDataKelembapanTanah: async(payload) => {
        const rawData = payload.toString()
        try {
            const dataJson = await JSON.parse(rawData)
            const newData = await new KelembapanTanah(dataJson).save()
        } catch (error) {
            console.error(`Error ${error.message}`)
        }
    },
    storeDataWaterLevel: async(payload) => {
        const rawData = payload.toString()
        try {
            const dataJson = await JSON.parse(rawData)
            const newData = await new WaterLevel(dataJson).save()
        } catch (error) {
            console.error(`Error ${error.message}`)
        }
    },
    storeDataKeruhAir: async(payload) => {
        const rawData = payload.toString()
        try {
            const dataJson = await JSON.parse(rawData)
            const newData = await new KeruhAir(dataJson).save()
        } catch (error) {
            console.error(`Error ${error.message}`)
        }
    },
    
}