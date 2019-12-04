# ⚠️ Danger [![](https://circleci.com/gh/fiverr/dangerfile.js.svg?style=svg)](https://circleci.com/gh/fiverr/dangerfile.js)
## Automated pull request validations

Run Fiverr's dangerfile
```bash
npx @fiverr/dangerfile@2
```

Example usage as CircleCI step:
```yml
  danger:
    <<: *defaults
    docker:
      - image: circleci/node
    steps:
      - run:
          name: danger
          command: npx @fiverr/dangerfile@2
```

## Contribute
Follow documentation at [danger.js](https://danger.systems/js/)
