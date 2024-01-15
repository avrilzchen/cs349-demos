# CS349 W24 Demo Code

Code relating to lecture slides and in-class demos.

Most folders correspond with a set of slides posted on the course website. For example, code for the "Drawing" lecture is in the `drawing/` demo folder. Lecture demo slides will reference specific "sets" of demos, for example the "Drawing" lecture has demo slides with "minimal-canvas" in the title, these correspond to `drawing/src/minimal-canvas`. In some cases a specific function will be noted in the demo slides as well.

Demo code will be posted (or updated) shortly before each lecture.

### Setup

After you clone this repo, you'll have to do a bit more setup to run the demos.

1. Run `npm install` in the lecture demo folder you want to run (e.g. in `drawing/`). This installs Vite and other packages needed for that set of demos.

2. For demos requiring SimpleKit, you'll need to do a bit more setup to make the SimpleKit git "submodule" work.

   - Open a terminal and cd to the simplekit folder in the root of this repo (since it's a submodule, it initially appears empty)
   - Initialize the git submodule using `git submodule init`
   - Perform the first update of the git submodule using `git submodule update`
   - Now the simplekit folder will be populated to match the simplekit repo on GitHub, and you'll see the simplekit repo listed in the VS Code source control tab

### Keeping Up to Date

During the term frequently "pull" the latest code from this repo. You can do this from the VS Code "Source Control" interface or on the command line with git commands.

**Always pull from the cs349 public repo first.** The public repo will then tell you if the simplekit submodule changed too. If so, then pull from it as well.

## SimpleKit

This is a simple imperative-style toolkit that runs in the browser. We use it to show examples of UI toolkit architecture and it's used in the first two assignments.

See lecture demos for examples how to use SimpleKit, and see assignment write-ups for details how to setup SimpleKit for assignments.
