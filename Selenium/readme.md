# Form Automation with Selenium

This project automates the filling and submission of a Google Form using Python and Selenium.

## Prerequisites

Before you begin, ensure you have the following installed:

- Python (version 3.6 or higher)
- Google Chrome (or another browser of your choice)

## Installation Step-by-Step

1. **Install Python**:
   - Download Python [here](https://www.python.org/downloads/) and follow the installation instructions.
   - Make sure to check the "Add Python to PATH" option during installation.

2. **Create a Virtual Environment (optional)**:
   - Open your terminal and run:
     ```bash
     python -m venv venv
     ```
   - Activate the virtual environment:
     - On Windows:
       ```bash
       venv\Scripts\activate
       ```
     - On macOS/Linux:
       ```bash
       source venv/bin/activate
       ```

3. **Install Dependencies**:
   - Install Selenium by running:
     ```bash
     pip install selenium
     ```
   - Then install WebDriver Manager:
     ```bash
     pip install webdriver-manager
     ```

4. **Run the Script**:
   - Save the Python script in a file named `automation.py`.
   - Run the script with:
     ```bash
     python automation.py
     ```

## Final Considerations

- Adjust the XPath selectors in the script according to the structure of your form.
- Use `WebDriverWait` for a more robust approach instead of `time.sleep()`.

## Contributions

Feel free to contribute with improvements and suggestions!
