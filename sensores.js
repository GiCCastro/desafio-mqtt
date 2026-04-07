import mqtt from "mqtt";

const brokerUrl = "mqtt://localhost:1883";

const client = mqtt.connect(brokerUrl, {
  clientId: "sensores_estufa_giovana"
});

client.on("connect", () => {
  console.log("--- Sensores Publicando no Mosquitto Local ---");

  // Sensor 1: Temperatura - a cada 5 segundos
  setInterval(() => {
    client.publish("estufa/temp/ambiente", `Temp: 25°C`, { qos: 0 });
    console.log(">> Enviado: Temperatura (QoS 0)");
  }, 5000);

  // Sensor 2: Nível Água - a cada 30 segundos
  setInterval(() => {
    client.publish("estufa/agua/nivel", `Nível: 80%`, { qos: 1 });
    console.log(">> Enviado: Nível Água (QoS 1)");
  }, 30000);

  // Sensor 3: Incêndio - simulando detecção a cada 45 segundos
  setInterval(() => {
    client.publish("estufa/alerta/incendio", `FOGO!`, { qos: 2 });
    console.log(">> Enviado: INCÊNDIO (QoS 2)");
  }, 45000);
});