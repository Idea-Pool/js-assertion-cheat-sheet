# js-assertion-cheat-sheet

This repository contains examples of various, often used, and tricky assertions in the common JS assertion tools. The site is built using [Astro](https://astro.build/) and [Starlight](https://starlight.astro.build/getting-started/).

## Content

The site and pages are generated based on the following content:

1. **Introduction** ([src/content/docs/index.mdx](./src/content/docs/index.mdx)) - The content of the main page. To edit it, edit the file directly.
2. **Best Practices** ([src/content/docs/practices.mdx](./src/content/docs/practices.mdx)) - The content of the best practices and anti patterns page. To edit it, edit the file directly.
3. **Contribution** ([src/content/docs/contribution.mdx](./src/content/docs/contribution.mdx)) - The contribution guideline page content. To edit it, edit the file directly and [CONTRIBUTION.md](./CONTRIBUTION.md) as well.
4. **Assertions** ([src/content/docs/assertions](./src/content/docs/assertions/)) - The content of the pages related to assertions. 
    1. The main page describing the assertions as a concept is the [assertions/index.mdx](./src/content/docs/assertions/index.mdx) that can be edited directly.
    2. In the assertions folder, there should be one folder per assertion group, e.g. [equality](./src/content/docs/assertions/equality/), [relational](./src/content/docs/assertions/relational/). In each assertion group folder:
        1. The main page describing the assertion group is the [assertions/<group>/index.mdx](./src/content/docs/assertions/equality/index.mdx) that can be edited directly.
        2. The pages of the particular assertions of the group should be added in the folder, e.g. [assertions/equality/equal.mdx](./src/content/docs/assertions/equality/equal.mdx).
5. **Tools** ([src/content/docs/tools](./src/content/docs/tools/)) - The content of the pages related to tools.
    1. The main page describing the tools in general is the [tools/index.mdx](./src/content/docs/tools/index.mdx) that can be edited directly.
    2. In the tools folder, each tool should have a separate MDX file, e.g. [tools/chai.mdx](./src/content/docs/tools/chai.mdx).
6. **Examples** ([src/content/docs/examples](./src/content/docs/examples/)) - The folder containing all assertion examples, organized into folders by assertion tools. It is important, that each tools and assertion should have a simple ID, that is used for 4.2. and 5.2., and here for the folder names, and the JavaScript example files in the folders.
    
    For example, to create the assertion example for the **Greater Than** assertion on the **Chai** tool, the [src/content/docs/examples/chai/greaterThan.js](./src/content/docs/examples/chai/greaterThan.js) file is created. Note, that the [src/content/docs/tools/chai.mdx](./src/content/docs/tools/chai.mdx) and the [src/content/docs/assertions/relational/greaterThan.mdx](./src/content/docs/assertions/relational/greaterThan.mdx) files also exist.

## CI/CD

### Feature Branch deployment

> [!IMPORTANT]  
> Before deploying any feature branches, ensure that the AWS CDK Stack is already deployed.
> 
> Currently, this can be verified by checking that no [Stack Destroy](https://github.com/Idea-Pool/js-assertion-cheat-sheet/actions/workflows/stack-destroy.yaml) workflow executions have occurred since the last [Stack Deployment](https://github.com/Idea-Pool/js-assertion-cheat-sheet/actions/workflows/stack-deployment.yaml) workflow execution.

#### Deploying a Feature Branch

To deploy a feature branch, manually execute the [Feature Branch Deployment](https://github.com/Idea-Pool/js-assertion-cheat-sheet/actions/workflows/feature-branch-deployment.yaml) workflow.

> [!NOTE]  
> Make sure to select your feature branch from the dropdown before executing the workflow.

##### Redeployment

Feature branches can be redeployed by re-executing the deployment workflow.

#### Cleaning up a Feature Branch

Once a feature branch is merged or no longer needed, clean it up by executing the [Feature Branch Cleanup](https://github.com/Idea-Pool/js-assertion-cheat-sheet/actions/workflows/feature-branch-cleanup.yaml) workflow.

### AWS CDK Stack deployment

The AWS CDK stack sets up the necessary infrastructure for the application. It needs to be deployed only once initially, and then it remains active until explicitly destroyed.

#### Deploying the stack

Deploy the stack by manually executing the [Stack Deployment](https://github.com/Idea-Pool/js-assertion-cheat-sheet/actions/workflows/stack-deployment.yaml) workflow.

#### Destroying the stack

Destroy the stack manually with the [Stack Destroy](https://github.com/Idea-Pool/js-assertion-cheat-sheet/actions/workflows/stack-destroy.yaml) workflow.

## Development

To develop the site locally, use the following commands.

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
