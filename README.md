# slack-bot-application

 This API is an example for creating interactivity with slack users based on their sport activities. API takes `running` or `biking` activities and supply a Leader Board due to activities which have been made within the last one hour. For each activity the users gain points. 

### Running Activity Slack Command

This command insert an activity for the slack user into database 

km: (Type: Double. Lesser than 20. Such as 5.78)

/running `km`



The points what users get will be multiplying of km by 1.25 (For Example 4 km running activity is equal 5 points)

### Biking Activity Slack Command

This command insert an activity for the slack user into database 

km: (Type: Double. Lesser than 20. Such as 5.78)

/biking `km`

The points what user gets will be multiplying of km by 1.5 (For Example 4 km biking activity is equal 6 points)

### Leaderboard Slack Command

/leaderboard

This command will publish the leaderboard to the specific slack channel. Leader board contains top 3 users due to their total points which have been gained within last one hour.

### Configs

For environment taking I did not define any method. It is up to your preferences. You can use your IDE env variable definition tools for local development or either you can use `dotenv` npm package for managing them or you can assign AWS IAM secrets for it. It is up to you.

The below slack credentials should be taken from your slack bot api credentials which is provided by slack itself.
https://api.slack.com/apps

`SLACK_SIGNING_SECRET_KEY`: slack api signing secret

`SLACK_API_TOKEN`: slack api token code

`SLACK_CHANNEL_ID`: slack channel id

`PORT`: port of the API

`DB_USER`: PostgreSQL user

`DB_PASSWORD`: PostgreSQL password

`DB_NAME`: PostgreSQL db name

`DB_HOST`: PostgreSQL host

### Activities Table Format

userId(varchar) | type(number) | createdAt(date) | updatedAt(date) | km(double) | point(double)

### Slack Auth

You need to create an slack app in here https://api.slack.com/apps and grant it with necessary scopes for those methods: `users.info` and `chat.postMessage` . You can check the Slack API Documentation(https://api.slack.com) for further details.
