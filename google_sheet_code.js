function onSubmit() {
	/////////////////
	// Set it up
	/////////////////
	
	// new URLs
	var editUrl = '';
	var shortUrl = '';
	
	// URL column locations
	var editUrlColumn = 5;
	var shortUrlColumn = 4;
	
	// Form ID (edit view, NOT entry view)
	var form = FormApp.openById('1Bov1ZV-y_wkQ8UsXZLR9M1UdkN1xDLKQNDm3Uh-fOoE');

	// Sheet name
	var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Form Responses 1');
    
	
	/////////////////
	// Get edit URL
	/////////////////
	var responses = form.getResponses();
	var length = responses.length;
	var lastResponse = responses[length-1];
    editUrl = lastResponse.getEditResponseUrl();
    
    
	/////////////////
	// Target sheet for update
	/////////////////
	// Find target (last) row
	var targetRow = sheet.getLastRow();
	
	// Update Edit URL
	sheet.getRange(targetRow, editUrlColumn).setValue(editUrl);
	
	// Update Short URL
	sheet.getRange(targetRow, shortUrlColumn).setValue('short_stub');	


// End Script
}