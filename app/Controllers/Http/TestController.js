'use strict'

class TestController {

    async google2({ request, view, response, auth }) {
        console.log("google2");

        return view.render('test')
    }

    async google({ request, view, response, auth }) {


        console.log("google");
        const Helpers = use('Helpers')
        const fs = require('fs');
        const readline = require('readline');
        const { google } = require('googleapis');

        var credentialFile = Helpers.publicPath('credentials.json');

        // If modifying these scopes, delete token.json.
        // const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
        const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
        // The file token.json stores the user's access and refresh tokens, and is
        // created automatically when the authorization flow completes for the first
        // time.
        const TOKEN_PATH = Helpers.publicPath('token.json');

        // Load client secrets from a local file.
        fs.readFile(credentialFile, (err, content) => {
            if (err) return console.log('Error loading client secret file:', err);
            // Authorize a client with credentials, then call the Google Sheets API.
            authorize(JSON.parse(content), calDemo);
            authorize(JSON.parse(content), updateDemo);
           
        });

        function authorize(credentials, callback) {
            const { client_secret, client_id, redirect_uris } = credentials.installed;
            const oAuth2Client = new google.auth.OAuth2(
                client_id, client_secret, redirect_uris[0]);

            // Check if we have previously stored a token.
            fs.readFile(TOKEN_PATH, (err, token) => {
                if (err) return getNewToken(oAuth2Client, callback);
                oAuth2Client.setCredentials(JSON.parse(token));
                callback(oAuth2Client);
            });
        }

        function getNewToken(oAuth2Client, callback) {
            const authUrl = oAuth2Client.generateAuthUrl({
                access_type: 'offline',
                scope: SCOPES,
            });
            console.log('Authorize this app by visiting this url:', authUrl);
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout,
            });
            rl.question('Enter the code from that page here: ', (code) => {
                rl.close();
                oAuth2Client.getToken(code, (err, token) => {
                    if (err) return console.error('Error while trying to retrieve access token', err);
                    oAuth2Client.setCredentials(token);
                    // Store the token to disk for later program executions
                    fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                        if (err) return console.error(err);
                        console.log('Token stored to', TOKEN_PATH);
                    });
                    callback(oAuth2Client);
                });
            });
        }

        function updateDemo(auth) {
            const sheets = google.sheets({ version: 'v4', auth });

            sheets.spreadsheets.values.update({
                spreadsheetId: '1YQ_6xnHiPYn7DqRxG02PoDm8DQj1X7udg4tOm1zLgbg',  // TODO: Update placeholder value.            
                // The ranges to retrieve from the spreadsheet.
                range: 'Sheet1!A1:C1',  // TODO: Update placeholder value.
                includeValuesInResponse : true,
                valueInputOption : 'RAW',
                resource : {
                    "values": [
                      [
                        1
                      ]
                    ]
                  },
              }, (err, result) => {
                if (err) {
                  // Handle error
                  console.log(err);
                } else {
                    // console.log(result.data);
                    console.log('%d cells updated.', result.data.updatedCells);
                    calDemo(auth);
                }
              }); 
        }

        function calDemo(auth) {
            const sheets = google.sheets({ version: 'v4', auth });

            sheets.spreadsheets.values.get({
                spreadsheetId: '1YQ_6xnHiPYn7DqRxG02PoDm8DQj1X7udg4tOm1zLgbg',  // TODO: Update placeholder value.            
                // The ranges to retrieve from the spreadsheet.
                range: 'Sheet1!A1:C1',  // TODO: Update placeholder value.
              }, (err, result) => {
                if (err) {
                  // Handle error
                  console.log(err);
                } else {
                    const rows = result.data.values;
                    if (rows.length) {
                        console.log('A + B = C');
                        // Print columns A and E, which correspond to indices 0 and 4.
                        rows.map((row) => {
                            console.log(`${row[0]} + ${row[1]} = ${row[2]}`);
                        });
                    } else {
                        console.log('No data found.');
                    }                   
                }
              });           
        }
        function listMajors(auth) {
            const sheets = google.sheets({ version: 'v4', auth });
            sheets.spreadsheets.values.get({
                spreadsheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
                range: 'Class Data!A2:E',
            }, (err, res) => {
                if (err) return console.log('The API returned an error: ' + err);
                const rows = res.data.values;
                if (rows.length) {
                    console.log('Name, Major:');
                    // Print columns A and E, which correspond to indices 0 and 4.
                    rows.map((row) => {
                        console.log(`${row[0]}, ${row[4]}`);
                    });
                } else {
                    console.log('No data found.');
                }
            });
        }

        return view.render('test')
    }

    async xlsx({ request, view, response, auth }) {

        const Helpers = use('Helpers')
        // let fileName = 'test.xlsx';
        let fileName = 'test.xlsm';
        let fileNameNew = 'test2.xlsm';

        // const mixManifest = require(Helpers.publicPath('mix-manifest.json'))
        var XLSX = use('xlsx');
        var workbook = XLSX.readFile(Helpers.publicPath(fileName), { type: 'binary' });
        console.log("xlsx");

        var first_sheet_name = workbook.SheetNames[0];
        console.log(first_sheet_name);

        /* Get worksheet */
        var worksheet = workbook.Sheets[first_sheet_name];

        /* Find desired cell */
        var a = worksheet['A1'];
        var b = worksheet['B1'];
        var c = worksheet['C1'];

        console.log("a:" + a.v);
        console.log("b:" + b.v);
        console.log("c:" + c.v);
        console.log("***********");
        a.v = 1;
        XLSX.writeFile(workbook, Helpers.publicPath(fileNameNew));
        var workbookNew = XLSX.readFile(Helpers.publicPath(fileNameNew), { type: 'binary' });
        var worksheetNew = workbookNew.Sheets[workbookNew.SheetNames[0]];
        // var workbook = XLSX.readFile(Helpers.publicPath('test.xlsx'));
        // var worksheet = workbook.Sheets[first_sheet_name];
        var c = worksheet['C1'];
        console.log("a:" + a.v);
        console.log("b:" + b.v);
        // worksheetNew['C1'].f = 'A1+B1';
        console.log("c:" + worksheetNew['C1'].v);

        // var desired_cell = worksheet[address_of_cell];

        // /* Get the value */
        // var desired_value = (desired_cell ? desired_cell.v : undefined);

        // console.log(address_of_cell+":"+desired_value);
        console.log("end");
        return view.render('test')
    }

}

module.exports = TestController
