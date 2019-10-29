#!/bin/sh

set -euo pipefail

cd ../packages/jsii-pacmak/
yarn build
cd ../../sample
npm run package