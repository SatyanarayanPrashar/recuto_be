# jobs/scrapers.py
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from datetime import datetime
import logging

# Set up logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
from selenium.common.exceptions import TimeoutException

from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, NoSuchElementException
import time

import re
def parse_job_content(content):
    try:
        # Split the content into lines
        lines = content.split("\n")
        
        # Extract title (before the first pipe "|")
        title_location_line = lines[0].split("|")
        title = title_location_line[0].strip()
        
        # Extract location (after the first pipe "|")
        location = title_location_line[1].strip() if len(title_location_line) > 1 else ""

        # Extract job_type, expected_salary, experience from respective lines
        job_type = ""
        expected_salary = ""
        experience = ""

        # Iterate through the lines to find job_type, expected_salary, and experience
        for i, line in enumerate(lines):
            if "Job Type" in line:
                job_type = lines[i + 1].strip()
            if "Expected Salary" in line:
                expected_salary = lines[i + 1].strip()
            if "Experience" in line:
                experience = lines[i + 1].strip()

        # Return a dictionary of parsed job details
        return {
            "title": title,
            "location": location,
            "job_type": job_type,
            "expected_salary": expected_salary,
            "experience": experience
        }

    except Exception as e:
        print(f"Error parsing job content: {str(e)}")
        return {}

def scrape_jobs():
    service = Service(r'C:\Program Files\chromedriver-win64\chromedriver.exe')
    options = webdriver.ChromeOptions()
    options.add_argument('--disable-gpu')
    options.add_argument('--no-sandbox')
    options.add_argument('--disable-dev-shm-usage')
    
    scraped_jobs = []

    try:
        driver = webdriver.Chrome(service=service, options=options)
        driver.get('https://jobfound.org/')
        wait = WebDriverWait(driver, 30)
        wait.until(EC.presence_of_element_located((By.TAG_NAME, "body")))

        time.sleep(5)

        selectors = [
            "div[class*='xl:!w-[60%]']",
            "div[class*='py-4 lw-full border-b']",
            "div[class*='line-clamp-2']",
            "div[role='button']"
        ]

        all_elements = []
        for selector in selectors:
            try:
                elements = driver.find_elements(By.CSS_SELECTOR, selector)
                all_elements.extend(elements)
            except Exception as e:
                logging.error(f"Error with selector {selector}: {str(e)}")

        for index, element in enumerate(all_elements, 0):
            try:
                text_content = element.text.strip()
                # Check if the content is not empty
                if text_content and len(text_content.split()) > 5:  # Ensure it's not too short
                    parsed_job = parse_job_content(text_content)
                    if parsed_job and parsed_job.get('title'):  # Ensure valid parsed data
                        scraped_jobs.append(parsed_job)
                else:
                    logging.warning(f"Empty or irrelevant content at index {index}: '{text_content}'")
            except Exception as e:
                logging.error(f"Error scraping element {index}: {str(e)}")

    except Exception as e:
        logging.error(f"An error occurred during scraping: {str(e)}")

    finally:
        driver.quit()

    return scraped_jobs
