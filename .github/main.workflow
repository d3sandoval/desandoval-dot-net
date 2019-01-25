workflow "Build and Deploy" {
  on = "push"
  resolves = ["heroku release"]
}

action "npm install" {
  uses = "actions/npm@de7a3705a9510ee12702e124482fad6af249991b"
  args = "install"
}

action "npm build" {
  uses = "actions/npm@de7a3705a9510ee12702e124482fad6af249991b"
  needs = ["npm install"]
  args = "build"
}

action "heroku login" {
  uses = "actions/heroku@6db8f1c22ddf6967566b26d07227c10e8e93844b"
  needs = ["npm build"]
  args = "container:login"
  secrets = ["HEROKU_API_KEY"]
}

action "heroku push" {
  uses = "actions/heroku@6db8f1c22ddf6967566b26d07227c10e8e93844b"
  needs = ["heroku login"]
  args = "container:push -a desandoval-dot-net web"
  secrets = ["HEROKU_API_KEY"]
}

action "heroku release" {
  uses = "actions/heroku@6db8f1c22ddf6967566b26d07227c10e8e93844b"
  needs = ["heroku push"]
  args = "container:release -a desandoval-dot-net web"
  secrets = ["HEROKU_API_KEY"]
}
