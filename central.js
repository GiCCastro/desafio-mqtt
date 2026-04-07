import mqtt from "mqtt";

// Conexão local com o container Docker do Mosquitto
const brokerUrl = "mqtt://localhost:1883";

const options = {
  clientId: "monitor_estufa_giovana", 
  clean: false, // OBRIGATÓRIO para o teste de estresse do QoS 1 e 2
  connectTimeout: 4000,
  reconnectPeriod: 1000,
};

const client = mqtt.connect(brokerUrl, options);

let recebidos = { temp: 0, nivel: 0, fogo: 0 };

client.on("connect", (connack) => {
  console.log("-----------------------------------------");
  console.log(`Central Conectada ao Mosquitto Local!`);
  console.log(`Sessão Recuperada: ${connack.sessionPresent}`);
  console.log("-----------------------------------------");

  // Tópicos exatos da imagem de requisitos
  client.subscribe("estufa/temp/ambiente", { qos: 0 });
  client.subscribe("estufa/agua/nivel", { qos: 1 });
  client.subscribe("estufa/alerta/incendio", { qos: 2 });
});

client.on("message", (topic, message) => {
  if (topic === "estufa/temp/ambiente") recebidos.temp++;
  if (topic === "estufa/agua/nivel") recebidos.nivel++;
  if (topic === "estufa/alerta/incendio") recebidos.fogo++;

  console.clear();
  console.log(`[RECEBIDO] Tópico: ${topic}`);
  console.table([
    { Sensor: "Temperatura (QoS 0)", Recebidas: recebidos.temp },
    { Sensor: "Nível Água (QoS 1)", Recebidas: recebidos.nivel },
    { Sensor: "Incêndio (QoS 2)", Recebidas: recebidos.fogo }
  ]);
});