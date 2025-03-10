pins.onKeyboardEvent(function (zeichenCode, zeichenText, isASCII) {
    if (isASCII) {
        basic.setLedColor(0x0000ff)
        basic.showString(zeichenText)
        rs232.sendeAsc(zeichenCode)
    }
})
function Konfiguration () {
    rs232.comment("'calliope-net/rs232-kp-lcd-41' asynchrone serielle Datenübertragung mit Licht")
    rs232.comment("3 Erweiterungen: calliope-net/rs232, calliope-net/pins, calliope-net/lcd-16x2")
}
let asciiCode = 0
lcd16x2rgb.initLCD(lcd16x2rgb.lcd16x2_eADDR(lcd16x2rgb.eADDR_LCD.LCD_16x2_x3E))
rs232.setPins(DigitalPin.C17, AnalogPin.C16, 150)
rs232.setTakt(400)
let eZeichen = "#"
basic.showString(eZeichen)
loops.everyInterval(500, function () {
    rs232.comment("Sender Schleife")
    pins.raiseKeypadEvent(true)
    if (eZeichen.length == 1) {
        lcd16x2rgb.writeLCD(lcd16x2rgb.lcd16x2_eADDR(lcd16x2rgb.eADDR_LCD.LCD_16x2_x3E), eZeichen)
        eZeichen = ""
    }
})
loops.everyInterval(500, function () {
    rs232.comment("Empfänger Schleife")
    asciiCode = rs232.empfange1Zeichen()
    basic.setLedColor(0xff0000)
    eZeichen = rs232.ascToChr(asciiCode)
    basic.showString(eZeichen)
})
