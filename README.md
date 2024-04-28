# Setting Up and Running osapiens-api Locally

This guide provides step-by-step instructions to get the `osapiens-client` project running on your local machine. Before you begin, make sure you have Node.js and npm installed on your system. If you do not have these installed, download and install them from [Node.js official website](https://nodejs.org/).

## Step 1: Run the API locally

First, you need to clone the `osapiens-api` repository from GitHub. Open your terminal or command prompt and run the following command:

```bash
git clone https://github.com/KONTORA-SOLUTIONS/osapiens-api.git
cd osapiens-api
docker-compose up
```

## Step 2: Install Dependencies

Once you have the project directory ready and are inside it, install the necessary dependencies by running:

```bash
npm install
```

## Step 3: Start the Client

After the installation of dependencies is complete, you can start the API server by running:

```bash
npm run start
```

This command will start the local server, typically on port 3000, unless configured otherwise in the project settings. You can access the API by navigating to http://localhost:3000 in your web browser.
