*** Settings ***
Library           SeleniumLibrary
Library           OperatingSystem

*** Variables ***
${URL}                https://forms.gle/Gy9S9RUQpRBbBnTg8
${FIELD1_XPATH}      //*[@id='mG61Hd']/div[2]/div/div[2]/div[1]/div/div/div[2]/div/div[1]/div/div[1]/input
${FIELD2_XPATH}      //*[@id='mG61Hd']/div[2]/div/div[2]/div[2]/div/div/div[2]/div/div[1]/div/div[1]/input
${FIELD3_XPATH}      //*[@id='mG61Hd']/div[2]/div/div[2]/div[3]/div/div/div[2]/div/div[1]/div/div[1]/input
${CHECKBOX_DAY1_ID}  i18
${CHECKBOX_DAY3_ID}  i24
${RADIOBUTTON_ID}    i43
${CHECKBOX_CONFIRMATION_ID}   i54
${SEND_BUTTON_XPATH}  //*[@id='mG61Hd']/div[2]/div/div[3]/div[1]/div[1]/div/span/span
${ACTUAL_TEXT_XPATH}  /html/body/div[1]/div[2]/div[1]/div/div[4]/a
${EXPECTED_TEXT}      Edite a sua resposta

*** Test Cases ***
Submit Google Form
    Open Browser    ${URL}    chrome
    Sleep    3s
    Input Text    xpath=${FIELD1_XPATH}    Your answer here
    Input Text    xpath=${FIELD2_XPATH}    Youranswerhere@gmail.com
    Input Text    xpath=${FIELD3_XPATH}    Your long answer here
    Click Element    id=${CHECKBOX_DAY1_ID}
    Click Element    id=${CHECKBOX_DAY3_ID}
    Click Element    id=${RADIOBUTTON_ID}
    Click Element    id=${CHECKBOX_CONFIRMATION_ID}
    Click Element    xpath=${SEND_BUTTON_XPATH}
    ${actual_text}=    Get Text    xpath=${ACTUAL_TEXT_XPATH}
    Should Contain    ${actual_text}    ${EXPECTED_TEXT}
    Close Browser
