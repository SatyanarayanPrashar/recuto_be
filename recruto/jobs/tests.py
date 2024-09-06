from django.test import TestCase

# Create your tests here.
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By

driver = webdriver.Chrome()
driver.get('https://jobfound.org/')
wait = WebDriverWait(driver, 10)

# Find job listings
jobs = wait.until(EC.presence_of_all_elements_located((By.CSS_SELECTOR, "div[class*='lg:w-[70%]'] > div")))

for job in jobs:
    # Extract job details
    title = job.find_element(By.CSS_SELECTOR, "div[class*='flex w-full justify-center']").text
    details = job.find_elements(By.CSS_SELECTOR, "div[class*='py-4 lw-full border-b']")
    company = details[0].text if len(details) > 0 else "N/A"
    # location = details[1].text if len(details) > 1 else "N/A"

    # job_info = job.find_elements(By.CSS_SELECTOR, "div[class*='py-4 lw-full border-b'] div[class*='flex w-full justify-center']")
    # job_type = job_info[0].text if len(job_info) > 0 else "N/A"
    # salary = job_info[1].text if len(job_info) > 1 else "N/A"
    # experience_required = job_info[2].text if len(job_info) > 2 else "N/A"

    # Try to get the source URL
    try:
        source_url = job.find_element(By.TAG_NAME, "a").get_attribute('href')
    except:
        source_url = "N/A"

    print(title)
    print(details)
    print(company)
    print(source_url)
