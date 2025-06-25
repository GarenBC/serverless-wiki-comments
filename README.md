# 🧩 Serverless Wiki Comment System – Project Walkthrough

## 🎯 Purpose
This project showcases a **lightweight, cost-effective serverless architecture** to enable users to post and retrieve comments on a wiki-style web interface. It utilizes AWS Lambda, API Gateway, and DynamoDB for scalable, on-demand compute and storage without server management.

---

## 🏗️ 1. CloudFormation Stack Creation
The infrastructure was deployed using a single CloudFormation template.

### Resources Created:
- `AWS::DynamoDB::Table` – for comment storage
- `AWS::Lambda::Function` – for GET and POST logic
- `AWS::ApiGateway::RestApi` – to expose endpoints
- `AWS::IAM::Role` – to grant Lambda permissions
- `AWS::S3::Bucket` (optional) – for hosting the frontend

Benefits:
- Reproducibility
- Infrastructure as Code (IaC)
- Easy integration with CI/CD

---

## ⚙️ 2. Frontend Integration
The front end is a static HTML/JavaScript page with AJAX calls.

### API Endpoints:
- `GET /comments` – Fetches comments from DynamoDB
- `POST /comments` – Posts new comment to the table

This decoupled structure ensures separation of concerns between UI and backend logic.

---

## 🧠 3. Lambda Function Logic

### POST Lambda:
- Parses and validates input
- Adds metadata (e.g., timestamp)
- Saves to DynamoDB

### GET Lambda:
- Scans or queries DynamoDB
- Returns JSON array of comments

All backend logic is handled via **on-demand execution** with zero server provisioning.

---

## 💾 4. DynamoDB Design

| Attribute     | Type     | Description                  |
|---------------|----------|------------------------------|
| `PageID`      | String   | Partition Key                |
| `Timestamp`   | String   | Sort Key                     |
| `Username`    | String   | Name of the commenter        |
| `Comment`     | String   | The comment text             |

This model supports efficient per-page querying and time-based sorting.

---

## 🧪 5. Testing and Monitoring

Testing was performed using browser-based interaction and CLI tools (`curl`, `httpie`).

- **POST** confirmed data write to DynamoDB.
- **GET** returned expected comment lists.
- **CloudWatch Logs** captured execution trace and performance metrics.

---

## 💡 6. Why Serverless?

### Benefits:
- No servers to manage
- Auto-scaling built in
- Pay-per-use pricing model

### Cost Breakdown (under AWS Free Tier limits):
- **Lambda**: ~$0.20 per 1M requests
- **API Gateway**: ~$3.50 per 1M calls
- **DynamoDB**: On-demand reads/writes = ~$1.25 per million

This architecture offers scalability, reliability, and **significant cost savings** compared to traditional hosting solutions.

---
