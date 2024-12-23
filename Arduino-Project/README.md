# IoT Fire Detection System 🔥🌡️

An **IoT-based Fire Detection System** using **ESP32** that monitors **flame, temperature**, and **gas** levels in real-time. Upon detecting a flame, the system checks the surrounding temperature and gas levels, sending data to a **server** and alerting the **Fire Department** via a **mobile app**. It also triggers a **buzzer** for immediate action. 🛑

---

## Components ⚙️

- **ESP32**: 🧠 Microcontroller for collecting and transmitting data.
- **Flame Sensor**: 🔥 Detects the presence of fire.
- **Humidity & Temperature Sensor (DHT11/DHT22)**: 🌡️ Monitors surrounding temperature.
- **Gas Sensor (MQ Series)**: 💨 Detects hazardous gases (e.g., smoke, carbon monoxide).
- **Buzzer**: 🔔 Emits an alarm for immediate notification.

---

## Features 🚀

- 🔥 **Flame Detection**: Real-time detection of flames using a **Flame Sensor**.
- 🌡️ **Temperature Monitoring**: Monitors the surrounding temperature using **DHT11/DHT22**.
- 💨 **Gas Detection**: Detects hazardous gases using the **MQ series Gas Sensor**.
- 📡 **Data Transmission**: Sends real-time data to a **server** for storage and processing.
- 🚨 **Alert System**: Sends alerts to the **Fire Department** mobile app and triggers a **Buzzer**.
- 🔗 **WebSocket Integration**: Continuous communication with the server and mobile app in real-time.

---

## Workflow 📝

1. **Flame Detection** 🔥: Flame Sensor detects the presence of fire.
2. **Temperature Check** 🌡️: If flame detected, measure the surrounding temperature.
3. **Gas Detection** 💨: Check for dangerous gases in the environment.
4. **Data Transmission** 📡: Send data to the server: `Time`, `Temperature`, `Gas`, `Address`, `FlameStatus`.
5. **Alert & Action** 🚨: If abnormal temperature or gas levels are detected, the **buzzer** sounds, and alerts are sent to the Fire Department mobile app.

---

## Installation & Setup 🔧

### Hardware Setup 🖥️

1. **Connect Sensors**:
   - **Flame Sensor** 🔥: Connect to a digital input pin on ESP32.
   - **DHT11/DHT22** 🌡️: Connect to a digital input pin.
   - **Gas Sensor (MQ)** 💨: Connect to an analog input pin.
   - **Buzzer** 🔔: Connect to a digital output pin.

### Software Setup 💻

1. **Arduino IDE**:
   - Install the **ESP32 board** and necessary libraries.
   - Upload the provided **ESP32 code**.
   - Ensure the **Wi-Fi credentials** are configured correctly.

2. **Java Servlet (Backend)**:
   - Set up the **server** to receive data from ESP32.
   - Implement **WebSocket** for real-time communication between the server and mobile app.
   - Send alerts and store data in a **database**.

---

## Future Enhancements 🌱

- 🤖 **Machine Learning**: Implement AI to predict fire risks based on environmental data.
- 🚒 **Mobile App**: Build an app to monitor alerts and data in real-time.
- 💨 **Enhanced Gas Detection**: Support additional gas sensors.

---

## License 📜

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
