<div align="center">

# floy

commands flow executer

<img alt="floy" src="https://user-images.githubusercontent.com/26512984/178798194-12b2b340-0964-4aeb-85fc-e6ce0ae60074.png">

</div>

## Installation

```bash
npm install -g floy
```

## Usage

- Workflow configuration
  ```yml
  # workflow.yml
  title: floy-demo
  version: 1.0.0
  workflows:
    greeting:
      - echo Welcome to floy!
    get_node_version:
      - node -v
    waiting_3s:
      - sleep 3
    clone_floy:
      - git clone https://github.com/leegeunhyeok/floy.git
      - cd floy
    download_dependencies:
      - npm install
    finish:
      - echo Done
  ```
  - title (optional)
  - version (optional)
  - workflows (required)
    - task name with commands
- Run scripts via floy
  ```bash
  floy -f workflow.yml
  ```
## LICENSE

[MIT](./LICENSE)
