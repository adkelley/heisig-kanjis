const {google} = require ('googleapis');
const keys = require('./api-keys.json');

const client = new google.auth.JWT(
	keys.client_email, 
	null, 
	keys.private_key, 
	['https://www.googleapis.com/auth/spreadsheets.readonly']
);

client.authorize(function(err, tokens) {
	if (err) {
		console.log(err);
		return;
	} else {
		console.log('Connected');
		gsrun(client);
	}
});


// Given a kanji, return the keyword from RTK 6th Edition
function findKeyword(kanji, kanjis, keywords) {
	for (let i=0; i < kanjis.length; i++) {
		if (kanjis[i] === kanji) {
			return keywords[i];
		}
	}

	return '';
	
}

/*
** Given a kanji or kanji compound, return a string containing
** the keyword or all the keywords making up that compound, respectively
*/
function getKeywords(compound, kanjis, keywords) {
	const compoundKanjis = compound.split('');

	let currentValue = '';
	compoundKanjis.forEach(kanji => {
		currentValue += findKeyword(kanji, kanjis, keywords) + ', ';
	});
	
	return currentValue.slice(0, -2);
}


function pbcopy(data) {
	const proc = require('child_process').spawn('pbcopy');
	proc.stdin.write(data);
	proc.stdin.end();
}

async function gsrun(cl) {
	const gsapi = google.sheets({version: 'v4', auth: cl});
	// Column A: kanjis, Column E: keywords (6th edition)
	const opt = {
		spreadsheetId: '1woYl-4S7c37pyHQKFAplinGTc9TxQZN-gL8O61RfbSk',
		ranges: ['Heisig!A2:A3001', 'Heisig!E2:E3001'],
		majorDimension: 'COLUMNS'
	};

	const data = await gsapi.spreadsheets.values.batchGet(opt);
	const compound = process.argv[2];
	const kanjis = data.data.valueRanges[0].values[0];
	const keywords = data.data.valueRanges[1].values[0];

	const text = getKeywords(compound, kanjis, keywords);

	pbcopy(text);

	
}
