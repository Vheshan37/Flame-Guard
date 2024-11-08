# FlameGuard 🔥

![FlameGuard Logo](https://github.com/Vheshan37/Flame-Guard/blob/main/Assets/AppLogo.png?raw=true)

FlameGuard is an IoT-based fire detection and alert system that integrates hardware and software to provide real-time fire alerts, making fire safety monitoring more accessible and efficient. The system consists of three main components:

1. **Arduino Project** - Uses sensors like flame and smoke detectors with an Arduino Uno to detect fire and communicate alerts to the backend.
2. **Mobile App** - A React Native application where users can register and receive immediate fire alerts from their respective locations.
3. **Web Backend** - A Java-based web application, deployed on GlassFish with MySQL, to handle data processing, alert management, and user administration.

## 🔧 Tech Stack

**Languages & Frameworks:**
- **React Native (JavaScript)** for mobile app development, creating a seamless user experience across iOS and Android.
- **Java & Hibernate** for backend development, ensuring efficient data processing and ORM (Object-Relational Mapping).
- **Arduino (C++)** to handle sensor readings and communication protocols.

**Databases:**
- **MySQL** as the primary database for reliable and structured data storage.
- **HeidiSQL** and **MySQL Workbench** for database management and visualization.

**IDEs & Tools:**
- **Visual Studio Code** for coding React Native and web-related files.
- **NetBeans** for Java EE development, especially for the backend.
- **Arduino IDE** to program and configure the Arduino Uno and its sensors.
- **Figma** for mobile app interface design and prototyping.
- **GitHub Desktop** for version control and project collaboration.

## 📂 Project Structure

- `Arduino-Project/`: Contains code and setup for the Arduino microcontroller, including configurations for flame sensors and Wi-Fi connectivity via ESP32 for cloud communication.
- `Mobile-App/`: Codebase for the React Native application with user authentication, fire alert notifications, and integration with Firebase for real-time updates.
- `Web-Backend/`: Java EE backend application built with GlassFish and MySQL, which handles backend processes like user registration, device management, and fire alerts.

## 🚀 Getting Started

Each component has its own setup and usage instructions in its respective directory. Here’s an overview of getting started:

- **Arduino Project**: Follow instructions in `Arduino-Project/README.md` to set up the hardware, install required libraries, and configure the sensors.
- **Mobile App**: Instructions in `Mobile-App/README.md` guide you through installing dependencies, setting up Firebase, and running the React Native app.
- **Web Backend**: Set up the Java backend by following the `Web-Backend/README.md`, which includes setting up a GlassFish server, configuring MySQL, and deploying the backend application.

## 🛠️ Features
- **Real-Time Fire Detection**: Detects flame, smoke, or heat and triggers an alert immediately.
- **Push Notifications**: Alerts users and fire brigades via mobile notifications for quick response.
- **Location-Based Alerts**: Users are notified based on their registered location, ensuring relevant alerts.
- **User and Device Management**: Fire brigades and locations can create and manage their accounts.

## 📈 Project Goals
- **Safety**: Provide an affordable and effective solution for fire detection.
- **Accessibility**: Mobile alerts ensure users receive timely notifications, even if they’re offsite.
- **Scalability**: Built to handle a growing number of users and devices.

## License
This project is licensed under the [MIT License](LICENSE), allowing anyone to use, modify, and distribute FlameGuard under the same terms.
