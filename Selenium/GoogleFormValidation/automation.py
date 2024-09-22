from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
import time
import my_selectors, assert_messages

# Initialize the driver using WebDriver Manager
service = Service(ChromeDriverManager().install())
driver = webdriver.Chrome(service=service)

# Open the Google Form
driver.get('https://forms.gle/Gy9S9RUQpRBbBnTg8')

# Wait for the page to load
time.sleep(3)

# Fill in the form fields using selectors from the selectors file
field1 = driver.find_element(By.XPATH, my_selectors.FIELD1_XPATH)
field1.send_keys('Your answer here')

field2 = driver.find_element(By.XPATH, my_selectors.FIELD2_XPATH)
field2.send_keys('Youranswerhere@gmail.com')

field3 = driver.find_element(By.XPATH, my_selectors.FIELD3_XPATH)
field3.send_keys('Your long answer here')

# Check the checkboxes
checkbox_day1 = driver.find_element(By.ID, my_selectors.CHECKBOX_DAY1_ID)
checkbox_day1.click()

checkbox_day3 = driver.find_element(By.ID, my_selectors.CHECKBOX_DAY3_ID)
checkbox_day3.click()

# Select the radio button
radiobutton = driver.find_element(By.XPATH, my_selectors.RADIOBUTTON_XPATH)
radiobutton.click()

# Check the confirmation checkbox
checkbox_confirmation = driver.find_element(By.ID, my_selectors.CHECKBOX_CONFIRMATION_ID)
checkbox_confirmation.click()

# Click the send button
send_button = driver.find_element(By.XPATH, my_selectors.SEND_BUTTON_XPATH)
send_button.click()

# Check if the expected text is present in an element.
expected_text = assert_messages.FORM_SENDING
actual_text = driver.find_element(By.XPATH, my_selectors.ACTUAL_TEXT_XPATH).text

try:
    assert expected_text in actual_text, f"Expected text '{expected_text}' not found in '{actual_text}'!"
    print("Test passed: The form was sent.")
except AssertionError as e:
    print(f"Test failed: {e}")

# Close the driver
driver.quit()