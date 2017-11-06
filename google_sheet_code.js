function assignEditUrls() {
	/*
		*  0. Config
		*  1. Create edit url
		*  2. Create short url
		*  3. Update sheet with new urls
		*  4. Send emails (respondent, receiver)
	*/
	
	/* ============================================================
		Instructions and set up:
		This script needs to be installed on the Google sheet
		that is receiving the form responses.
		Tools > Script Editor
	
		Paste into editor. Save project. Set trigger.
		Edit > Current Project's Triggers
		Select function name (assignEditUrls)
		Set to run on form submit
	
		Set config variables.
	============================================================ */
	
	
	/* ============================================================
	*  0. Config
	============================================================ */
	// Form ID (edit view, NOT entry view)
	var formId = '1IFjn1cuMWwhIT_5bDn48qPP62AFVviIX0rkbCN69Rh8';
	
	// Sheet Name
	var sheetName = 'Form Responses 1';
	
	// Column locations
	var respondentEmail = 4
	var editUrlColumn = 14;
	var shortUrlColumn = 13;
	
	// Bitly token
	var bitlyToken = 'f87fa6ed7f234ae668993d954cd4e9aab6509a28';
	
	
	
	/* ============================================================
	*  1. Create edit url
	============================================================ */
	// Connect to form
	var form = FormApp.openById(formId);
	
	// Get form responses
	var responses = form.getResponses();
    
	// Find out how many responses there are
	var length = responses.length;
    
	// Get the last response
	var lastResponse = responses[length-1];
    
	// Create the editUrl from the last response
	var editUrl = lastResponse.getEditResponseUrl();
	
	
	/* ============================================================
	*  2. Create short url
	============================================================ */
	// Set up fetchUrl
	var fetchUrl = 'https://api-ssl.bitly.com/v3/shorten?';
	fetchUrl += 'access_token=' + bitlyToken;
	fetchUrl += '&longUrl=' + editUrl;
	fetchUrl += '&format=txt';
	
	// Go get short link
	var response = UrlFetchApp.fetch(fetchUrl, {'muteHttpExceptions': true});
    
	// Make response a string
	var shortUrl = response.getContentText();
    
	// Trim any excess whitespace
	shortUrl = shortUrl.trim();
	

	/* ============================================================
	*  3. Update sheet
	============================================================ */
	// Connect to sheet
	var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
	
	// Find response (last) row
	var responseRow = sheet.getLastRow();
	
	// Update Edit URL
	sheet.getRange(responseRow, editUrlColumn).setValue(editUrl);
	
	// Update Short URL
	sheet.getRange(responseRow, shortUrlColumn).setValue(shortUrl);
	
	
	/* ============================================================
	*  4. Send emails
	(Note: This sends emails to respondent only.
	Emails to the sheet owner are enabled via Sheet -> Tools -> Notification Rules)
	============================================================ */
	var emailAddress = sheet.getRange(responseRow, respondentEmail).getValue();

	var emailSubject = "Winter Camp Regristration Received!";
	var emailBody = "Thanks for your registration!<br><br>You can use <a href='"+shortUrl+"'>"+shortUrl+"</a> to edit your information. Use it as often as needed--we want to keep your information current!<br><br>";
	emailBody += "If you have any questions or comments, please don't hesitate to contact us. Give us a call at (530) 268-2539 or shoot an email to info@norcalwintercamp.com.<br><br>";
	emailBody += "We'll see you soon!";
	
	// Send email
	MailApp.sendEmail({
		to: emailAddress,
		subject: emailSubject,
		htmlBody: emailBody
	});
	
	// Stub; just a place to stop the debugger
	Logger.log("done");


// End script
}