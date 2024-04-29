# js-assertion-cheat-sheet

This repository contains examples of various, often used, and tricky assertions in the common JS assertion tools.

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
