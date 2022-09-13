const mqtt = require("mqtt");
const { storeData, getDataLampu,getDataButtonManual,getDataPump } = require("./dataHandler");

// const { storeDataLampu } = require("./dataHandler");
const { storeDataSuhu } = require("./dataHandler");
const { storeDataKelembapanTanah } = require("./dataHandler");
const { storeDataKeruhAir } = require("./dataHandler");
const { storeDataWaterLevel } = require("./dataHandler");
// const { storeDataButtonManual } = require("./dataHandler");

const client = mqtt.connect(process.env.MQTT_HOST)

client.on('connect',()=> {
    console.log("MQTT Broker connected");
    client.subscribe('intern-KIREI/IOT',() => console.log('intern-KIREI/IOT subscribed'));
    client.subscribe('intern-KIREI/IOT/KeruhAir',() => console.log('intern-KIREI/IOT/KeruhAir subscribed'));
    client.subscribe('intern-KIREI/IOT/ButtonManual',() => console.log('intern-KIREI/IOT/ButtonManual subscribed'));
    client.subscribe('intern-KIREI/IOT/Lampu',() => console.log('intern-KIREI/IOT/Lampu subscribed'));
    client.subscribe('intern-KIREI/IOT/KelembapanTanah',() => console.log('intern-KIREI/IOT/KelembapanTanah subscribed'));
    client.subscribe('intern-KIREI/IOT/WaterLevel',() => console.log('intern-KIREI/IOT/WaterLevel subscribed'));
    client.subscribe('intern-KIREI/IOT/Suhu',() => console.log('intern-KIREI/IOT/Suhu subscribed'));
    client.subscribe('intern-KIREI/IOT/Pump',() => console.log('intern-KIREI/IOT/Pump subscribed'));
})

//Device message should be in JSON string format
client.on('message',(topic,payload) => {
    if(topic === 'intern-KIREI/IOT'){
        storeData(payload)
    }else if(topic === 'intern-KIREI/IOT/KeruhAir'){
        storeDataKeruhAir(payload)
    }else if(topic === 'intern-KIREI/IOT/ButtonManual'){
        // storeDataLampu(payload)
        getDataButtonManual(payload)
    }
    else if(topic === 'intern-KIREI/IOT/Lampu'){
        // storeDataLampu(payload)
        getDataLampu(payload)
    }else if(topic === 'intern-KIREI/IOT/Pump'){
        // storeDataLampu(payload)
        getDataPump(payload)
    }else if(topic === 'intern-KIREI/IOT/KelembapanTanah'){
        storeDataKelembapanTanah(payload)
    }
    else if(topic === 'intern-KIREI/IOT/WaterLevel'){
        storeDataWaterLevel(payload)
    }
    else if(topic === 'intern-KIREI/IOT/Suhu'){
        storeDataSuhu(payload)
    }
})

module.exports = client