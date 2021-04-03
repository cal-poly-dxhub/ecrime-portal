#!/bin/bash

# amplify push script copied from:
# https://docs.amplify.aws/cli/usage/headless#amplify-pushpublish-parameters

set -e
IFS='|'

CODEGEN="{\
\"generateCode\":true,\
\"codeLanguage\":\"javascript\",\
\"fileNamePattern\":\"src/graphql/**/*.js\",\
\"generatedFileName\":\"API\",\
\"generateDocs\":true\
}"

amplify push \
--codegen $CODEGEN \
--yes