/*

Author: R U Bharti
Description: 
Here is the three language constants i.e. English, Hindi, Marathi
And inside these constants, there is the objects according to the screens

##################################################################################
# ⚠️ NOTE :                                                                     #
#                                                                               #
#     🔴 Dictionary word starts from capital letter is the exact word with      #
#     removed space and adding 'Text' word in last                              #
#     👉 Eg.: Over Speed => OverSpeedText                                       #
#                                                                               #
#     🔴 Dictionary word starts from small letter is new created key name.      #
#     👉 Eg.: projectName, logoutHeading, logoutSubHeading, etc.                #
#                                                                               #
#    ⚡Kindly follow these methods to create dictionary word⚡                  #
#                                                                                #
##################################################################################

*/

export const englishDictionary = {

    // 📗 Basic Words Dictionary
    basicWord: {
        projectName: "Vahan Shakti",
        YesText: "Yes",
        NoText: "No",
        BackText: "Back",
        SearchText: "Search",
        FromDateText:"From Date",
        UptoDateText:"Upto Date",
        ActionText: "Action"
    }
}

export const hindiDictionary = {

    // 📗 Basic Words Dictionary
    basicWord: {
        projectName: "वाहन शक्ति",
        YesText: "हाँ",
        NoText: "नहीं",
        BackText: "पीछे",
        SearchText: "खोज",
        FromDateText:"तिथि से",
        UptoDateText:"तिथि तक",
        ActionText: "कार्रवाई"
    }
}

export const marathiDictionary = {

    // 📗 Basic Words Dictionary
    basicWord: {
        projectName: "वाहन शक्ति",
        YesText: "होय",
        NoText: "नाही",
        BackText: "मागे",
        SearchText: "शोधा",
        FromDateText:"या तारखेपासून",
        UptoDateText:"अद्ययावत",
        ActionText: "कृती"
    }
}

// Export in TranslationProvider.jsx