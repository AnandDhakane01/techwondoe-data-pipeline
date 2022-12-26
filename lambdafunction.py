import json
import csv
import urllib.parse 
import boto3
import requests

s3 = boto3.client('s3')

def handler(event, context):
  bucket = event['Records'][0]['s3']['bucket']['name']
  key = urllib.parse.unquote_plus(event['Records'][0]['s3']['object']['key'], encoding='utf-8')
  api_data = []

  try:
    response = s3.get_object(Bucket=bucket, Key=key)
    csv_data = response['Body'].read()
    reader = csv.reader(csv_data.decode().splitlines())
    
    first_row = next(reader)
    n = len(first_row)

    # Iterate through the rows and get the data in a list
    for rw in reader:
        tmp = {}
        for i in range(n):
            tmp[first_row[i]] = rw[i]
        api_data.append(tmp)
    print("api_data", api_data)

    def divide_chunks(l, n):
      for i in range(0, len(l), n):
        yield l[i:i+n]
    
    chunks = list(divide_chunks(api_data, 100))
    print("chunks", chunks)

    for chunk in chunks:
      response = requests.post('http://techwondoebackend.ananddhakane.tech/register', json=chunk)
      if response.status_code == 200:
        data = response.json()
        print("Data inserted Successfully!!!", data)
      else:
        print('Error: ', response.status_code, response)
    
  except Exception as e:
    print(e)
    print("Error getting object!")