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


// Given a kanji, return the keyword or index from RTK 6th Edition
function findResult(kanji, kanjis, results) {
	let result = '';

	for (let i=0; i < kanjis.length; i++) {
		if (kanjis[i] === kanji) {
			result = results[i];
			break;
		}
	}

	return result;
	
}

/*
** Given a kanji or kanji compound, return a string containing
** the result or all the results making up that kanji or compound,
** respectively. results are a keyword(s) or index(es)
*/
function getResults(compound, kanjis, results) {
	const compoundKanjis = compound.split('');

	let currentValue = '';
	compoundKanjis.forEach(kanji => {
		currentValue += findResult(kanji, kanjis, results) + ', ';
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
	// Column A: kanjis, Column C: Index Column E: keywords (6th edition)
	const opt = {
		spreadsheetId: '1woYl-4S7c37pyHQKFAplinGTc9TxQZN-gL8O61RfbSk',
		ranges: ['Heisig!A2:A3001', 'Heisig!C2:C3001', 'Heisig!E2:E3001'],
		majorDimension: 'COLUMNS'
	};
	const data = await gsapi.spreadsheets.values.batchGet(opt);
	const kanjis = data.data.valueRanges[0].values[0];
	const indices = data.data.valueRanges[1].values[0];
	const keywords = data.data.valueRanges[2].values[0];

	const option  = process.argv[2];
	const compound = process.argv[3];

	switch (option) {
		case 'kw': {
			pbcopy(getResults(compound, kanjis, keywords));
			break;
		}
		case 'ix': {
			pbcopy(getResults(compound, kanjis, indices));
			break;
		}
		default: {
			console.log('Error: invalid option');
			pbcopy('');
		}
	}
}
