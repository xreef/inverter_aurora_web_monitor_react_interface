# ABB (ex PowerOne now Fimer) Aurora inverter web monitor

I would like to monitor the status of my ABB Aurora inverter (formerly Power One now Fimer). So with a WeMos D1 mini I create a monitoring station with web interface, notifications and more.

<div>
<a href="https://www.mischianti.org/forums/forum/mischiantis-projects/abb-ex-power-one-aurora-web-inverter-monitor-wim/"><img
  src="https://github.com/xreef/LoRa_E32_Series_Library/raw/master/resources/buttonSupportForumEnglish.png" alt="Support forum ABB (ex Power One) Aurora Web Inverter Monitor (WIM)"
   align="right"></a>
</div>
<div>
<a href="https://www.mischianti.org/it/forums/forum/i-progetti-di-mischianti/abb-ex-power-one-aurora-web-inverter-monitor-wim/"><img
  src="https://github.com/xreef/LoRa_E32_Series_Library/raw/master/resources/buttonSupportForumItaliano.png" alt="Forum supporto ABB (ex Power One) Aurora Web Inverter Monitor (WIM)"
  align="right"></a>
</div>



#
#

by [Renzo Mischianti]

[![Watch the video](https://img.youtube.com/vi/uInRM3YqIv0/hqdefault.jpg)](https://www.youtube.com/watch?v=uInRM3YqIv0)

![ABB Aurora Web Inverter Monitor Station Introduction](https://www.mischianti.org/wp-content/uploads/2020/06/ABB-Aurora-Web-Inverter-Centraline-Logging-Introduction-1024x586.jpg)

Library dependencies
-----------------------------------------------------


ArduinoJson
ArduinoThread
aurora_communication_protocol
DNSServer
EMailSender
ESP8266mDNS
ESP8266SdFat
ESP8266WebServer
ESP8266WiFi
Hash
NTPClient
SD
SDFS
SPI
TimeLib
Timezone
WebSockets
WiFiManager
Wire

Inverter Aurora ABB (ex PowerOne now Fimer) supported
-----------------------------------------------------

Here a partial list of Aurora PV series supported

-   PVI-2000
-   PVI-2000-OUTD
-   PVI-3600
-   PVI-3.6-OUTD
-   PVI-5000-OUTD
-   PVI-6000-OUTD
-   3-phase interface (3G74)
-   PVI-CENTRAL-50 module
-   PVI-4.2-OUTD
-   PVI-3.6-OUTD
-   PVI-3.3-OUTD
-   **PVI-3.0-OUTD**
-   PVI-12.5-OUTD
-   PVI-10.0-OUTD
-   PVI-4.6-I-OUTD
-   PVI-3.8-I-OUTD
-   PVI-12.0-I-OUTD (output 480 VAC)
-   PVI-10.0-I-OUTD (output 480 VAC)
-   PVI-12.0-I-OUTD (output 208 VAC)
-   PVI-10.0-I-OUTD (output 208 VAC)
-   PVI-12.0-I-OUTD (output 380 VAC)
-   PVI-10.0-I-OUTD (output 380 VAC)
-   PVI-12.0-I-OUTD (output 600 VAC)
-   PVI-10.0-I-OUTD (output 600 VAC)”
-   PVI-CENTRAL-250
-   PVI-10.0-I-OUTD (output 480 VAC current limit 12 A)
-   TRIO-27.6-TL-OUTD
-   TRIO-20-TL
-   UNO-2.0-I
-   UNO-2.5-I
-   PVI-CENTRAL-350 Liquid Cooled (control board)
-   PVI-CENTRAL-350 Liquid Cooled (display board)
-   PVI-CENTRAL-350 Liquid Cooled (AC gathering)

My inverter is in bold.

Thanks
------
<ol><li><a rel="noreferrer noopener" href="https://www.mischianti.org/2019/05/15/abb-ex-power-one-aurora-web-inverter-monitor-wim-project-introduction-1/" target="_blank">ABB Aurora Web Inverter Monitor (WIM): project introduction</a></li><li><a rel="noreferrer noopener" href="https://www.mischianti.org/2020/09/01/abb-aurora-web-inverter-monitor-wim-wiring-arduino-to-rs-485-2/" target="_blank">ABB Aurora Web Inverter Monitor (WIM): wiring Arduino to RS-485</a></li><li><a rel="noreferrer noopener" href="https://www.mischianti.org/2020/09/11/abb-aurora-web-inverter-monitor-wim-storage-devices-3/" target="_blank">ABB Aurora Web Inverter Monitor (WIM): storage devices</a></li><li><a rel="noreferrer noopener" href="https://www.mischianti.org/it/2020/09/30/abb-aurora-web-inverter-monitor-wim-notifiche-e-debug-4/" target="_blank">ABB Aurora Web Inverter Monitor (WIM): debug and notification</a></li><li><a rel="noreferrer noopener" href="https://www.mischianti.org/2020/10/05/abb-aurora-web-inverter-centraline-wic-set-time-and-manage-battery-ups-part-5/" target="_blank">ABB Aurora Web Inverter Monitor (WIM): set time and UPS</a></li><li><a rel="noreferrer noopener" href="https://www.mischianti.org/2021/01/04/abb-power-one-aurora-web-inverter-monitor-wim-wifi-configuration-and-rest-server-6/" target="_blank">ABB Aurora Web Inverter Monitor (WIM): WIFI configuration and REST Server</a></li><li><a rel="noreferrer noopener" href="https://www.mischianti.org/2021/01/12/abb-aurora-web-inverter-monitor-wim-websocket-and-web-server-7/" target="_blank">ABB Aurora Web Inverter Monitor (WIM): WebSocket and Web Server</a></li><li><a rel="noreferrer noopener" href="https://www.mischianti.org/2021/01/18/abb-aurora-web-inverter-monitor-wim-wiring-and-pcb-soldering-8/" target="_blank">ABB Aurora Web Inverter Monitor (WIM): Wiring and PCB soldering</a></li><li><a rel="noreferrer noopener" href="https://www.mischianti.org/2021/01/24/abb-aurora-web-inverter-monitor-wim-upload-the-sketch-and-front-end-9/" target="_blank">ABB Aurora Web Inverter Monitor (WIM): upload the sketch and front end</a></li><li><a rel="noreferrer noopener" href="https://www.mischianti.org/2021/02/03/abb-aurora-web-inverter-monitor-wim-3d-printed-case-to-complete-project-10/" target="_blank">ABB Aurora web inverter Monitor (WIM): 3D printed case to complete project</a></li><li><a href="https://www.mischianti.org/2021/02/09/abb-power-one-aurora-web-inverter-monitor-wim-repair-e013-error-11/" target="_blank" rel="noreferrer noopener">ABB Aurora web inverter monitor (WIM): repair E013 error<br></a></li></ol>