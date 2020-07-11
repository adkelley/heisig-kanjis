# heisig-kanjis
The file heisig-kanjis.csv was cloned from 'sdcr/heisig-kanjis' and imported into Google Sheets.  In turn, using the Google Sheets API (V4), `node index.js <option> <compound>` takes
a kanji or kanji compound and returns the corresponding RTK keywords or numbers to the clipboard as a string.

## Setup
1. Import the file heisig-kanjis.csv into Google Sheets
2. Create your api endpoint and download your credentials to `api-keys.json`.  See this [tutorial](https://developers.google.com/sheets/api/quickstart/nodejs) for further details.

## Usage
```bash
$ node index.js <option> <compound>
```
where:
* <option>

   - **kw** will copy the corresponding Heisig keywords for <compound> to the clipboard (Mac)
   - **ix** will copy the RTK (6th edition) indices for <compound> to the clipboard (Mac)
* <compound> is a kanji character or compound.  For example, **新聞** is the kanji <compound> for newspaper

## CSV file format
The file heisig-kanjis.csv contains the kanji's featured in James Heisig's "Remembering the Kanji" 1 & 3. Import this file into Google Sheets
Each line of the CSV file is structured as follows:

Field name | description
--- | ---
*kanji* | the kanji itself
*id_5th_ed* | the kanji's number in RTK, 5th edition
*id_6th_ed* | the kanji's number in RTK, 6th edition
*keyword_5th_ed* | the kanji's keyword in RTK, 5th edition
*keyword_6th_ed* | the kanji's keyword in RTK, 6th edition
*components* | the kanji's components delimited by "; "
*on_reading* | the kanji's on-readings delimited by "; "
*kun_reading* | the kanji's kun-readings delimited by "; "

The components are available for most of the kanjis from RTK 1. However, for kanjis from RTK 3 most components are still missing.
**If you can help fill the gaps and fix mistakes, your support is very appreciated! Just send me a pull-request. THX** 

Credit for the initial listing goes to chrtokstd1 for creating [this spreadsheet](https://docs.google.com/spreadsheets/d/1Z0BUSie8wh0JqlUejezs3EqauJuF-zKEomOQnqm9J08/edit), to NihongoShark.com for creating this [Anki deck](https://ankiweb.net/shared/info/1956010956), and of course to James Heisig for creating [this awesome book](https://www.amazon.com/Remembering-Kanji-Complete-Japanese-Characters/dp/0824835921/ref=la_B000APGVBC_1_1?s=books&ie=UTF8&qid=1476214609&sr=1-1).
