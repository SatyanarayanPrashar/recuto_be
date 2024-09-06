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
        logging.info("Initializing WebDriver")
        driver = webdriver.Chrome(service=service, options=options)

        logging.info("Navigating to jobfound.org")
        driver.get('https://jobfound.org/')
        wait = WebDriverWait(driver, 30)

        logging.info("Waiting for page to load")
        wait.until(EC.presence_of_element_located((By.TAG_NAME, "body")))

        logging.info(f"Page title: {driver.title}")
        logging.info(f"Current URL: {driver.current_url}")

        time.sleep(5)

        selectors = [
            "div[class*='xl:!w-[60%]']",
            "div[class*='py-4 lw-full border-b']",
            "div[class*='line-clamp-2']",
            "div[role='button']"
        ]

        for selector in selectors:
            try:
                elements = driver.find_elements(By.CSS_SELECTOR, selector)
                logging.info(f"Found {len(elements)} elements with selector: {selector}")
                if len(elements) > 0:
                    for i, element in enumerate(elements[:5]):  # Log first 5 elements
                        logging.info(f"Element {i} text: {element.text[:100]}...")
                    break
            except Exception as e:
                logging.error(f"Error with selector {selector}: {str(e)}")

        if len(elements) == 0:
            logging.info("No elements found. Logging page source.")
            logging.info(driver.page_source[:1000])

        for index, element in enumerate(elements, 1):
            try:
                text_content = element.text.strip()
                if text_content:
                    # Split the content into individual job posts
                    jobs = text_content.split("years")
                    jobs = [job + " years" if i < len(jobs) - 1 else job for i, job in enumerate(jobs)]

                    # Parse each job content and structure the data
                    for job in jobs:
                        parsed_job = parse_job_content(job.strip())
                        if parsed_job:
                            scraped_jobs.append(parsed_job)
                            logging.info(f"Parsed job: {parsed_job}")
            except Exception as e:
                logging.error(f"Error scraping element {index}: {str(e)}")

        # Remove the last element from the list, if it's empty
        if scraped_jobs and not any(scraped_jobs[-1].values()):  # Check if the last job has all empty fields
            scraped_jobs.pop()

        logging.info(f"Total jobs scraped: {len(scraped_jobs)}")

    except Exception as e:
        logging.error(f"An error occurred during scraping: {str(e)}")

    finally:
        logging.info("Closing WebDriver")
        driver.quit()

    return scraped_jobs
