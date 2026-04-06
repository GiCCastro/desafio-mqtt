import mqtt from "mqtt";

const brokerUrl = "5fa10436a0924bf6beaf1c0ca2ff10e0.s1.eu.hivemq.cloud"

// Configurações cruciais para a Parte 2 do desafio (Teste de Estresse)
const options = {
  port: 8883, 
  clientId: "monitor_estufa_giovana", 
  clean: false,
  
  username: "giovana", 
  password: "Giovana123",
  
  connectTimeout: 4000,
  reconnectPeriod: 1000,
};

const client = mqtt.connect(brokerUrl, options);

let recebidos = { temp: 0, nivel: 0, fogo: 0 };

//teste de conexão

client.on("connect", (connack) => {
  console.log("-----------------------------------------");
  console.log(`Central Conectada! Sessão Recuperada: ${connack.sessionPresent}`);
  console.log("-----------------------------------------");

  // Subscrever com os níveis de QoS corretos
  client.subscribe("estufa/temp", { qos: 0 });
  client.subscribe("estufa/nivel", { qos: 1 });
  client.subscribe("estufa/fogo", { qos: 2 });
});

client.on("error", (err) => {
    console.log("Erro na conexão: ", err);
});

client.on("message", (topic, message) => {
  const msg = message.toString();

  if (topic === "estufa/temp") recebidos.temp++;
  if (topic === "estufa/nivel") recebidos.nivel++;
  if (topic === "estufa/fogo") recebidos.fogo++;

  console.log(`\n[RECEBIDO] Tópico: ${topic}`);
  console.log(`Conteúdo: ${msg}`);
  
  // Tabela em tempo real para o teu relatório
  console.table([
    { Sensor: "Temperatura (QoS 0)", Recebidas: recebidos.temp },
    { Sensor: "Nível Água (QoS 1)", Recebidas: recebidos.nivel },
    { Sensor: "Incêndio (QoS 2)", Recebidas: recebidos.fogo }
  ]);
});