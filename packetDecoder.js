module.exports = function (esp3Packet) {

	var telegram = {
		"RORG": esp3Packet.data[0],
		"data": esp3Packet.data[1],
		"senderID": new Buffer([esp3Packet.data[2], esp3Packet.data[3], esp3Packet.data[4], esp3Packet.data[5]]),
		"status": esp3Packet.data[6]
	};

	if (telegram.RORG !== 0xF6) {
		return "I don't understand \"0x" + telegram.RORG.toString(16) + "\", i can show only Rocker Switch \"0xf6\" telegrams!";
	}

	// see RPS Telegram in "EnOcean Equipment Profiles (EEP)"
	var rockersFirstAction = (telegram.data >>> 5);          // 11100000 >> 5              | Shortcut : R1
	var isPress = ((telegram.data >> 4) & 1) ;               // 00010000                   | Shortcut : EB  -> 0 = released or 1 = pressed
	var rockersSecondAction = ((telegram.data >> 1) & 0x07); // (00001110 >> 1) & 00000111 | Shortcut : R2
	var secondActionIsPresent = ((telegram.data) & 1);       // 00000001                   | Shortcut : EB

	// see Statusfield for RPS in "EnOcean Equipment Profiles (EEP)"
	var T21 = (telegram.status & 0x20) == 0x20;              // 00100000                   | 0 = PTM1xx or 1 = PTM2xx
	var NU = (telegram.status & 0x10) == 0x10;               // 00010000                   | 0 = unassigned or 1 = normal

	var buttonName = {
		0: "AI",
		1: "A0",
		2: "BI",
		3: "B0",
		4: "CI",
		5: "C0",
		6: "DI",
		7: "D0"
	};

	var pushedButtons = "";

	if (NU == 1) {
		pushedButtons += buttonName[rockersFirstAction];
	} else {
		pushedButtons += "no";
	}
	if (secondActionIsPresent == 1) {
		pushedButtons += " & " + buttonName[rockersSecondAction];
	}

	return {
		senderId: telegram.senderID.toString("hex"),
		isPress: isPress,
		buttons: pushedButtons
	};
}