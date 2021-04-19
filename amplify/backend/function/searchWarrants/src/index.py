import json
import boto3, os

def search(query):
  search_endpoint = os.environ["SEARCH_ENDPOINT"]
  region = os.environ["REGION"]
  csd = boto3.client('cloudsearchdomain', endpoint_url=search_endpoint, region_name=region)
  
  returnFields = "votes,subjects_of_search,subject_of_search,upload_timestamp,state,county,is_template,types_of_data,creation_year,types_of_crime,_score"
  highlight = {"content": {"format": "text", "max_phrases": 3, "pre_tag": "**", "post_tag": "**"}}
  highlight = json.dumps(highlight, separators=(',', ':'))
  
  response = csd.search(query=query, highlight=highlight, returnFields=returnFields, queryParser='simple')
  return response

def handler(event, context):
  query = event["queryStringParameters"]['q']
  instanceData = search(query)
  response = {
    "isBase64Encoded": 'false',
    "statusCode": '200',
    "headers": {
      "Accept": "*/*",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type,Date,X-Amzn-Trace-Id,x-amz-apigw-id,x-amzn-RequestId",
    },
    "body": json.dumps(instanceData)
  }

  print(event)
  print(response)

  return response
