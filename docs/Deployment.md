* Need to create **AWS_ACCESS_KEY_ID** and **AWS_SECRET_ACCESS_KEY** secrets in Github Repo.
* Repo contains aws.yml file for uploading image to Amazon ECR.
* Checkout branch *deploy*
* Merge updates into *deploy*
* Push *deploy* to Github. Will automatically build the docker image and push it to AWS ECR.