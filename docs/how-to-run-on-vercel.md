# How to Run on Vercel

This is a guide for running this project production on Vercel.

## Deployment

Follow these steps to run this project on Vercel.

1. Import this project on Vercel from GitHub. If we can't found it, you need to configure it to allow Vercel to access the repo of this project from GitHub.

![Repo not found](./images/repo-not-found.png)
![Repo found](./images/repo-found.png)

2. Fill up production environment variables here and click "Deploy" button.

![Environment variables](./images/fill-env-vars.png)

3. After clicking "Deploy" button, wait for the build to complete and you will be redirected to the Congratulations page.

![Deployment success](./images/deployment-success.png)

## Change Server Region

I need to do change the server region from United States to Singapore because I want this Vercel server to be closer to the Turso database server that I did created in Singapore. This will decrease the latency between the server and the database server.

Follow these steps to change the server region from United States to Singapore.

1. Go to Project Settings page and click on the Functions menu on the left.

2. Find Function Region section, and change the region from "Washington, D.C., USA (East) - iad1" to "Singapore (Southeast) - sin1". Then click on the "Save" button.

![Server region before change](./images/server-region-us.png)
![Server region after change](./images/server-region-sg.png)

3. When you click on the "Save" button, you will be asked to redeploy the project.

4. In the Redeploy popup, add checkmark to the "Use existing Build Cache" to make the redeploy faster. Then click on the "Redeploy" button.

![Redeploy popup](./images/change-region-redeploy-popup.png)

5. After clicking "Redeploy" button, wait for the redeploy to complete.

![Redeploy progress](./images/change-region-redeploy-progress.png)
![Redeploy success](./images/change-region-redeploy-success.png)

## Change Domain

I want to change the default domain that Vercel created `heavy-notation-roan.vercel.app` to `heavynotation.vercel.app`. Actually, I want to have `heavy-notation.vercel.app` because it's easier to read but it turns out the domain is already used by someone.

Follow these steps to change the domain.

1. Go to Project Settings page and click on the Domain menu on the left.

![Old domain](./images/domain-old.png)

2. Change the domain name in this form and click on the "Save" button.

![Domain form](./images/domain-form.png)
![New domain](./images/domain-new.png)
