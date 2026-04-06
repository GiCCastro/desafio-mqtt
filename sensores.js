import mqtt from "mqtt";

const client = mqtt.connect("mqtt://localhost:1883");

let envios = { temp: 0, nivel: 0, fogo: 0 };

client.on("connect", () => {
  console.log("--- Sensores da Estufa Iniciados ---");

  // Sensor 1: Temperatura (QoS 0) - Alta frequência, baixa criticidade
  setInterval(() => {
    envios.temp++;
    const msg = `Temp: ${(20 + Math.random() * 5).toFixed(1)}°C (Envio #${envios.temp})`;
    client.publish("estufa/temp", msg, { qos: 0 });
    console.log(`[QoS 0] Temperatura enviada. Total: ${envios.temp}`);
  }, 2000);

  // Sensor 2: Nível de Água (QoS 1) - Importante, garante entrega
  setInterval(() => {
    envios.nivel++;
    const msg = `Nível: ${Math.floor(Math.random() * 100)}% (Envio #${envios.nivel})`;
    client.publish("estufa/nivel", msg, { qos: 1 });
    console.log(`[QoS 1] Nível enviado. Total: ${envios.nivel}`);
  }, 5000);

  // Sensor 3: Incêndio (QoS 2) - Crítico, exatamente uma vez
  // Simulado a cada 15 segundos para o teste de estresse
  setInterval(() => {
    envios.fogo++;
    const msg = `ALERTA DE FOGO #${envios.fogo}`;
    client.publish("estufa/fogo", msg, { qos: 2 });
    console.log(`[QoS 2] !!! ALERTA DE INCÊNDIO ENVIADO !!! Total: ${envios.fogo}`);
  }, 15000);
});