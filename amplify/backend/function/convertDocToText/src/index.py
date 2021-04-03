import boto3, os
import docx2txt

def extractDocx(filename):
    return docx2txt.process(filename)

def getItemKey(Key):
    fileName = Key.split('/')[-1]
    decodedFileName = fileName.split('_')
    subject_of_search = decodedFileName[0]
    upload_timestamp = decodedFileName[1]
    return (subject_of_search,upload_timestamp)
    
def updateDyanmo(text, id):
    table = boto3.resource('dynamodb').Table(os.environ["UNAPPROVEDWARRANTTABLE_NAME"])
    table.update_item(
        Key={
            'id': id,
        },
        UpdateExpression='SET content = :val',
        ExpressionAttributeValues={
            ':val': text
        },
    )

def handler(event, context):
  print('received event:')
  print(event)

  BUCKET = event['Records'][0]['s3']['bucket']['name']
  KEY = str(event['Records'][0]['s3']['object']['key'])
  key = KEY.split('/')[-1]
  print("KEY: " ,key)
  print("Bucket: ", BUCKET)
  
  s3 = boto3.resource('s3')
  s3.Bucket(BUCKET).download_file(KEY, '/tmp/docx.docx')

  isDownloaded = os.path.isfile('/tmp/docx.docx')
  if not isDownloaded:
      raise ValueError('File did not download')
  else:
      text = str(extractDocx('/tmp/docx.docx'))
      print(text)
      updateDyanmo(text, key)
      
