# floy

commands flow executer

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

![preview](https://user-images.githubusercontent.com/26512984/178695299-751b0f60-5142-4f3b-9a3e-b41d20cc6838.png)


## LICENSE

[MIT](./LICENSE)
