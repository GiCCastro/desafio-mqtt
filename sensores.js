import mqtt from "mqtt";

// O Publisher também precisa da URL da nuvem e das credenciais!
const brokerUrl = "5fa10436a0924bf6beaf1c0ca2ff10e0.s1.eu.hivemq.cloud"

const options = {
  port: 8883,
  clientId: "sensores_estufa_giovana", // clientId diferente da central!
  username: "giovana", 
  password: "Giovana123",
};

const client = mqtt.connect(brokerUrl, options);

let envios = { temp: 0, nivel: 0, fogo: 0 };

client.on("connect", () => {
  console.log("--- Sensores ONLINE no HiveMQ Cloud ---");

  setInterval(() => {
    envios.temp++;
    client.publish("estufa/temp", `Temp: ${(20 + Math.random() * 5).toFixed(1)}°C`, { qos: 0 });
  }, 2000);

  setInterval(() => {
    envios.nivel++;
    client.publish("estufa/nivel", `Nível: ${Math.floor(Math.random() * 100)}%`, { qos: 1 });
  }, 5000);

  setInterval(() => {
    envios.fogo++;
    client.publish("estufa/fogo", `ALERTA DE FOGO #${envios.fogo}`, { qos: 2 });
  }, 15000);
});

client.on("error", (err) => console.log("Erro nos Sensores: ", err));