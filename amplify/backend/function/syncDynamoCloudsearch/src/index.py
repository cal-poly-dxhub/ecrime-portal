import boto3, os
import json

# initialize cloudsearch domain
document_endpoint = os.environ["DOCUMENT_ENDPOINT"]
region = os.environ["REGION"]
cloud_search_domain = boto3.client('cloudsearchdomain', endpoint_url=document_endpoint, region_name=region)

class Warrant(object):
    def __init__(self, id, subjectName, subjectNames, typename, approvedWarrantSubjectId, content, createdAt, creationYear, crimes, dataTypes, isTemplate, state, updatedAt, uploadTimestamp, votes, county):
        self.id  = id 
        self.subjectName = subjectName
        self.subjectNames = subjectNames
        self.typename = typename
        self.approvedWarrantSubjectId = approvedWarrantSubjectId
        self.content = content
        self.createdAt = createdAt
        self.creationYear = creationYear
        self.crimes = crimes
        self.dataTypes = dataTypes
        self.isTemplate = isTemplate
        self.state = state
        self.updatedAt = updatedAt
        self.uploadTimestamp = uploadTimestamp
        self.votes = votes
        self.county = county
        
def print_response(response):
    print("status:", response['status'], " adds:", response['adds'], " deletes:", response['deletes'])


# -------------- cloudsearch - helper functions --------------------
def append_field(document, key, value):
    if(value != None):
        document["fields"][key] = value 
    return document

# addes one warrant to cloudsearch
# 
def add_document(warrant): 
    documentBatch = [];
    document = {};
    document["id"] = warrant.id

    document["type"] = "add"
    document["fields"] = {}
    document = append_field(document, "subject_of_search", warrant.subjectName)
    document = append_field(document, "subjects_of_search", warrant.subjectNames)
    document = append_field(document, "upload_timestamp", warrant.uploadTimestamp)
    document = append_field(document, "content", warrant.content)
    document = append_field(document, "is_template", warrant.isTemplate)
    document = append_field(document, "types_of_data", warrant.dataTypes)
    document = append_field(document, "votes", warrant.votes)
    document = append_field(document, "state", warrant.state)
    document = append_field(document, "county", warrant.county)
    document = append_field(document, "creation_year", warrant.creationYear)
    document = append_field(document, "types_of_crime", warrant.crimes)
    documentBatch.append(document)
    print(warrant.dataTypes)
    print('***')
    print(documentBatch)
    response = cloud_search_domain.upload_documents(contentType="application/json", documents=json.dumps(documentBatch))
    print_response(response)
    return document

# deletes one document from cloudsearch
#   (list of strings): document ids
# 
def delete_document(id):
    documentBatch = []
    document = {}
    document["type"] = "delete"
    document["id"] = id
    documentBatch.append(document)
    
    response = cloud_search_domain.upload_documents(contentType="application/json", documents=json.dumps(documentBatch))
    print_response(response)
    return response

# -------------- dynomo - helper functions --------------------

# returns optional fields if they exist 
def get_field(item, key, type): 
    try:
        field = item[key][type]
        if(type == "L"): 
            fields = []
            for i in field:
                fields.append(i["S"])
            return fields
        return field
    except: 
        return None
        
# processes the json object returned when Dynamo Trigger runs
def read_stream(event):
    for record in event['Records']:
        print(record['eventName'])
        if (record['eventName'] == "INSERT") or (record['eventName'] == "MODIFY"):
            item = record['dynamodb']['NewImage']
            id = get_field(item, 'id', 'S')
            typename = get_field(item, '_typename', 'S')
            subjectName = get_field(item, 'subjectName', 'S')
            subjectNames = get_field(item, 'subjectNames', 'L')
            approvedWarrantSubjectId = get_field(item, 'approvedWarrantSubjectId', 'S')
            content = get_field(item, 'content', 'S')
            createdAt = get_field(item, 'createdAt', 'S')
            creationYear = get_field(item, 'creationYear', 'S')
            crimes = get_field(item, 'crimes', 'L')
            dataTypes = get_field(item, 'dataTypes', 'L')
            isTemplate = get_field(item, 'isTemplate', 'N')
            state = get_field(item, 'state', 'S')
            updatedAt = get_field(item, 'updatedAt', 'S')
            uploadTimestamp = get_field(item, 'uploadTimestamp', 'S')
            votes = get_field(item, 'votes', 'N')
            county = get_field(item, 'county', 'S')

            warrant = Warrant(id, subjectName, subjectNames, typename, approvedWarrantSubjectId, content, createdAt, creationYear, crimes, dataTypes, isTemplate, state, updatedAt, uploadTimestamp, votes, county)
            response = add_document(warrant)
            
            return None

        elif record['eventName'] == "REMOVE": 
            item = record['dynamodb']['Keys']
            id = get_field(item, 'id', 'S')
            
            response = delete_document(id)
            return response
            
        else: 
            message = "ERROR: unhandled eventName in read_stream"
            return message
        

def handler(event, context):
    try: 
        print('received event:')
        print(event)
        return read_stream(event)
        
    except Exception as e: 
        print("Error: something went wrong...")
        raise e