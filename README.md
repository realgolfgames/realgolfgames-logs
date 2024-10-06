# MongoDB Logging Service

This is a self-hosted logging service that logs user actions to a MongoDB collection. The service provides an API endpoint for creating log entries, which is reachable under `yourdomain.com/logs`. The log entries contain details such as `userId`, `action`, `details`, `ipAddress`, and `userAgent`.

## Features

- Logs user actions with optional metadata.
- Stores logs in a MongoDB collection.
- Easily extendable for more metadata or custom logging.
- Self-hosted and customizable.

## Prerequisites

Before setting up the service, make sure you have the following:

- **Node.js** (v18+ recommended)
- **MongoDB** (Self-hosted or MongoDB Atlas)
- **SvelteKit** (for handling API routes)
- **NPM or Yarn** for managing dependencies

## Installation

1. **Fork the Repository:**

   Fork this repository to your GitHub account.

2. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/realgolfgames-logs.git
   cd realgolfgames-logs
   ```

3. **Install dependencies:**

Using NPM:

```bash
npm install
```

Usin pnpm

```bash
pnpm install
```

Using Yarn:

```bash
yarn install
```

3. **Setup Environment Variables:**

   Create a `.env` file in the root directory and add the following environment variables:

   ```env
   SECRET_MONGODB_CONNECTION_STRING= MonogDB connection string
   PUBLIC_YOUR_DOMAIN = your domain
   ```

   Replace the `MONGODB_URI` with your MongoDB connection string. You can use MongoDB Atlas or a self-hosted MongoDB instance.
   Replace the `PUBLIC_YOUR_DOMAIN` with your domain name you want the user to redirect when accessing the logs domain.

4. **Start the development server:**

   ```bash
   pnpm dev --host
   ```

   This will start the SvelteKit development server on `http://your-ip:5173`.

   You can now send POST requests to `https://your-ip:5173/logs` to create log entries.

## API Usage

### Logging a User Action

The logging API accepts `POST` requests at `/logs`. Each request should contain a JSON body with the following fields:

- **userId**: _(Optional)_ The ID of the user performing the action. Defaults to `'anonymous'`.
- **action**: A short description of the action performed by the user.
- **details**: Any additional details regarding the action.
- **ipAddress**: _(Optional)_ The IP address of the user. Automatically extracted from request headers.
- **userAgent**: _(Optional)_ The user-agent string. Automatically extracted from request headers.

#### Example Request

```javascript
const logEntry = {
 userId: '12345',
 action: 'LOGIN',
 details: 'User logged in successfully.'
};

fetch('http://localhost:3000/logs', {
 method: 'POST',
 headers: {
  'Content-Type': 'application/json',
  remote_addr: '0.0.0.0', // Replace with the actual IP address if known
  'user-agent': navigator.userAgent // Gets the user agent from the browser
 },
 body: JSON.stringify(logEntry)
})
 .then((response) => {
  if (!response.ok) {
   throw new Error('Network response was not ok');
  }
  return response.json();
 })
 .then((data) => {
  console.log(data.message, data.status);
 })
 .catch((error) => {
  console.error('There was a problem with the fetch operation:', error);
 });
```

#### Response

The API will respond with a JSON object containing the following fields:

- **status**: The HTTP status code of the response.
- **message**: A message indicating the success or failure of the log creation.

```json
{
 "status": 200,
 "message": "Log entry created."
}
```

## MongoDB Setup

Ensure your MongoDB instance is set up and accessible. If you are using MongoDB Atlas, make sure to whitelist your IP or use the appropriate connection string.

You can create the `audit_logs` collection manually or let the service create it when inserting the first log entry.

## Deployment

To deploy the logging service, you can use a Node.js hosting provider like Vercel or Render. Make sure to set the environment variables in the deployment settings.

### Example Deployment (Node Adapter)

1. Build the project:

   ```bash
   pnpm build
   ```

2. **Start the production server:**

   ```bash
   pnpm start
   ```

3. The service will now be running at your configured domain `(e.g., yourdomain.com/logs)`.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
